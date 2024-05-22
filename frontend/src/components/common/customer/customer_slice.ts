import { createSlice, Draft } from '@reduxjs/toolkit'

import { Customer as CustomerType, Session } from '@/graphql/types'

export { type CaseReducer } from '@reduxjs/toolkit'

export type Customer = {
	isAuthenticated: boolean
	isLoading: boolean
	isReady: boolean
} & Partial<Pick<CustomerType, 'addresses' | 'emailAddress' | 'firstName' | 'id' | 'lastName' | 'phoneNumber'>>

const initialState: Customer = {
	addresses: [],
	isAuthenticated: false,
	isLoading: false,
	isReady: true,
}

/* -- Start Loading -- */
export type StartLoadingPayload = {
	payload?: object
}
export type StartLoadingReducer = (state: Draft<Customer>, payload: StartLoadingPayload) => void

/**
 * sets the loading status for customer
 * @param state the customer state
 */
export const startLoadingReducer: StartLoadingReducer = (state) => {
	state.isLoading = true
	state.isReady = false
}

/* -- Finished Loading -- */
export type FinishedLoadingPayload = {
	payload?: object
}
export type FinishedLoadingReducer = (state: Draft<Customer>, payload: FinishedLoadingPayload) => void

/**
 * sets the finished loading status for customer
 * @param state the customer state
 */
export const finishedLoadingReducer: FinishedLoadingReducer = (state) => {
	state.isLoading = false
	state.isReady = true
}

/* -- Logout -- */
export type LogoutPayload = {
	payload?: object
}
export type LogoutReducer = (state: Draft<Customer>, payload: LogoutPayload) => void

/**
 * removes current customer
 * @param state the customer state
 */
export const logoutReducer: LogoutReducer = (state) => {
	state.id = undefined
	state.firstName = undefined
	state.lastName = undefined
	state.emailAddress = undefined
	state.phoneNumber = undefined
	state.addresses = []

	state.isAuthenticated = false
}

/* -- Set Customer -- */
export type SetCustomerPayload = {
	payload: {
		customer: Session['customer']
	}
}
export type SetCustomerReducer = (state: Draft<Customer>, payload: SetCustomerPayload) => void

/**
 * set the customer
 * @param state the customer state
 * @param props setCustomerReducer props
 * @param props.payload the redux reducer payload
 * @param props.payload.customer the customer
 */
export const setCustomerReducer: SetCustomerReducer = (state, { payload: { customer } }) => {
	if (!customer) {
		throw new Error('Customer empty')
	}

	state.id = customer.id
	state.firstName = customer.firstName
	state.lastName = customer.lastName
	state.emailAddress = customer.emailAddress
	state.phoneNumber = customer.phoneNumber
	state.addresses = customer.addresses || []

	state.isAuthenticated = !!customer.id
	state.isLoading = false
	state.isReady = true
}

/* -- Redux -- */
export const customerSlice = createSlice({
	initialState,
	name: 'customer',
	reducers: {
		finishedLoading: finishedLoadingReducer,
		logout: logoutReducer,
		setCustomer: setCustomerReducer,
		startLoading: startLoadingReducer,
	},
})

export const { finishedLoading, logout, setCustomer, startLoading } = customerSlice.actions
export const customerReducer = customerSlice.reducer
export default customerReducer