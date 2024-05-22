'use client'

/**
 * Redux Store
 *
 * https://redux.js.org/api/store
 * https://redux-toolkit.js.org/api/configureStore
 */

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import { encryptTransform } from 'redux-persist-transform-encrypt'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

import { toIsoString } from '@/helpers/date'
import { logger } from '@/helpers/logger'

import { Customer, customerReducer } from '@/components/common/customer/customer_slice'
import { Session, sessionReducer } from '@/components/common/session/session_slice'
import { getAuthToken } from '@/components/common/use_auth_token'
import { Cart, cartReducer } from '@/components/storefront/shopping_cart/cart_slice'

import { Flash, flashReducer } from '@/components/ui/flash/flash_slice'
import { Ui, uiReducer } from '@/components/ui/ui/ui_slice'

export { Provider } from 'react-redux'
export { PersistGate } from 'redux-persist/integration/react'

let rehydrationComplete: (value?: unknown) => void
let rehydrationFailed: (value?: unknown) => void

const rehydrationPromise = new Promise((resolve, reject) => {
	rehydrationComplete = resolve
	rehydrationFailed = reject
})

const rehydration = () => rehydrationPromise

const createNoopStorage = () => ({
	getItem(_key: unknown): Promise<null | string> {
		return Promise.resolve('{}')
	},

	removeItem(_key: unknown): Promise<void> {
		return Promise.resolve()
	},
	setItem(_key: unknown, value: unknown): Promise<string | void> {
		return Promise.resolve('[]')
	},
})

const storage = typeof window !== 'undefined' ? createWebStorage('session') : createNoopStorage()

export type StoreProps = {
	cart: Cart
	customer: Customer
	flash: Flash
	session: Session
	ui: Ui
}


const persistConfig = (typeof window !== 'undefined' && getAuthToken())
	? {
			key: 'root',
			storage: createWebStorage('session'),
			transforms: [
				encryptTransform({
					onError: function (error) {
						logger.error((error))
					// Handle the error.
					},
				// if token is not provided invalidate the stored data by using a token that never persists
					secretKey: (typeof window !== 'undefined' && getAuthToken()) || toIsoString(),
				}),
			],
		}
	:	{
			key: 'root',
			storage: createNoopStorage(),
		}


// @ts-expect-error Reducer handles empty values as expected
const persistedReducer = persistReducer(persistConfig, combineReducers({
	cart: cartReducer,
	customer: customerReducer,
	flash: flashReducer,
	session: sessionReducer,
	ui: uiReducer,
}))

export const store = configureStore({
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
	reducer: persistedReducer,
})

export const persistor = persistStore(store, null, () => {
	rehydrationComplete()
})

/**
 * Redux selector for cart
 * @param state - redux state
 * @returns cart redux selector
 */
export const cartSelector = (state: StoreProps) => state.cart

/**
 * Redux selector for customer
 * @param state - redux state
 * @returns customer redux selector
 */
export const customerSelector = (state: StoreProps) => state.customer

/**
 * Redux selector for flash
 * @param state - redux state
 * @returns flash redux selector
 */
export const flashSelector = (state: StoreProps) => state.flash

/**
 * Redux selector for session
 * @param state - redux state
 * @returns session redux selector
 */
export const sessionSelector = (state: StoreProps) => state.session

/**
 * Redux selector for ui
 * @param state - redux state
 * @returns ui redux selector
 */
export const uiSelector = (state: StoreProps) => state.ui