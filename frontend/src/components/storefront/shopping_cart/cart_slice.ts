import { createSlice, Draft } from '@reduxjs/toolkit'
import { map, sum } from 'lodash'

import { AddToCartResultItem, UpdateCartQuantityProps } from '@/graphql/mutations'
import { LineItem, Product, Session } from '@/graphql/types'
import { now, toIsoString } from '@/helpers/date'

export { type CaseReducer } from '@reduxjs/toolkit'

export type Cart = {
	id?: Session['id'],
	isLoading: boolean,
	isReady: boolean,
	lastUpdatedAt?: string
	lineItems: {
		[key: Product['id']]: LineItem & {
			lastUpdatedAt?: string
		}
	},
	total: number,
}

const initialState: Cart = {
	id: '',
	isLoading: false,
	isReady: false,
	lastUpdatedAt: undefined,
	lineItems: {},
	total: 0,
}

/**
 * calculate total for all products
 * @param lineItems all the cart line items
 * @returns the product total
 */
export const calculateTotal = (lineItems: Cart['lineItems']) =>
	sum(map(lineItems, (lineItem) => lineItem.quantity * lineItem.product.price)) || 0

/* -- Start Loading -- */
export type StartLoadingPayload = {
	payload?: object
}
export type StartLoadingReducer = (state: Draft<Cart>, payload: StartLoadingPayload) => void

/**
 * sets the loading status for cart
 * @param state the cart state
 */
export const startLoadingReducer: StartLoadingReducer = (state) => {
	state.isLoading = true
	state.isReady = false
}

/* -- Finished Loading -- */
export type FinishedLoadingPayload = {
	payload?: object
}
export type FinishedLoadingReducer = (state: Draft<Cart>, payload: FinishedLoadingPayload) => void

/**
 * sets the finished loading status for cart
 * @param state the cart state
 */
export const finishedLoadingReducer: FinishedLoadingReducer = (state) => {
	state.isLoading = false
	state.isReady = true
}

/* -- Empty Cart -- */
export type EmptyCartPayload = {
	payload?: object
}
export type EmptyCartReducer = (state: Draft<Cart>, payload: EmptyCartPayload) => void

/**
 * empties the cart
 * @param state the cart state
 */
export const emptyCartReducer: EmptyCartReducer = (state) => {
	state.lineItems = {}
	state.total = 0
}

/* -- Add to Cart -- */
export type AddToCartPayload = {
	payload: {
		lineItem: AddToCartResultItem['lineItem'],
	}
}
export type AddToCartReducer = (state: Draft<Cart>, payload: AddToCartPayload) => void

/**
 * add product line item to cart (increments quantity if product already in cart)
 * @param state the cart state
 * @param props addToCartReducer props
 * @param props.payload the redux reducer payload
 * @param props.payload.lineItem the lineitem to add to cart
 */
export const addToCartReducer: AddToCartReducer = (state, { payload: { lineItem } }) => {
	if (!lineItem) {
		throw new Error('line item is empty')
	}

	if (state.lineItems[+lineItem.product.id]) {
		state.lineItems[+lineItem.product.id].quantity = lineItem.quantity
	} else {
		state.lineItems[+lineItem.product.id] = lineItem
	}
	state.lineItems[+lineItem.product.id].lastUpdatedAt = toIsoString(now())

	state.total = calculateTotal(state.lineItems)
	state.lastUpdatedAt = toIsoString(now())
}

/* -- Cart From Session -- */
export type CartFromSessionPayload = {
	payload: {
		shoppingCart: Session['shoppingCart']
	}
}
export type CartFromSessionReducer = (state: Draft<Cart>, payload: CartFromSessionPayload) => void

/**
 * import cart from session
 * @param state the cart state
 * @param props cartFromSessionReducer props
 * @param props.payload the redux reducer payload
 * @param props.payload.shoppingCart the shopping cart data
 */
export const cartFromSessionReducer: CartFromSessionReducer = (state, { payload: { shoppingCart } }) => {
	if (!shoppingCart) {
		throw new Error('shopping cart empty')
	}

	state.id = shoppingCart.id
	state.lineItems = {}
	shoppingCart.lineItems?.map((lineItem) => {
		state.lineItems[+lineItem.product.id] = { lastUpdatedAt: toIsoString(now()), ...lineItem }
	})
	state.total = calculateTotal(state.lineItems)

	state.isLoading = false
	state.isReady = true
}

/* -- Update Cart Quantity -- */
export type UpdateCartQuantityPayload = {
	payload: {
		productId: Product['id'] | UpdateCartQuantityProps['productId'],
		quantity: LineItem['quantity']
	}
}
export type UpdateCartQuantityReducer = (state: Draft<Cart>, payload: UpdateCartQuantityPayload) => void

/**
 * update quantity of line item in cart (removes line item if quality is 0)
 * @param state the cart state
 * @param props updateCartQuantityReducer props
 * @param props.payload the redux reducer payload
 * @param props.payload.productId the id of the product
 * @param props.payload.quantity the quantity for the line item
 */
export const updateCartQuantityReducer: UpdateCartQuantityReducer = (state, { payload: { productId, quantity } }) => {
	if (!productId) {
		throw new Error('product id is empty')
	}

	if (quantity === 0) {
		delete state.lineItems[+productId]
	} else {
		state.lineItems[+productId].quantity = quantity
		state.lineItems[+productId].lastUpdatedAt = toIsoString(now())
	}
	state.total = calculateTotal(state.lineItems)
	state.lastUpdatedAt = toIsoString(now())
}

/* -- Redux -- */
export const cartSlice = createSlice({
	initialState,
	name: 'shopping_cart',
	reducers: {
		addToCart: addToCartReducer,
		cartFromSession: cartFromSessionReducer,
		emptyCart: emptyCartReducer,
		finishedLoading: finishedLoadingReducer,
		startLoading: startLoadingReducer,
		updateCartQuantity: updateCartQuantityReducer,
	},
})

export const { addToCart, cartFromSession, emptyCart, finishedLoading, startLoading, updateCartQuantity } = cartSlice.actions
export const cartReducer = cartSlice.reducer
export default cartReducer