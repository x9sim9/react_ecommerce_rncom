import { createSlice, Draft } from '@reduxjs/toolkit'

import { Session as SessionType } from '@/graphql/mutations/login'

export { type CaseReducer } from '@reduxjs/toolkit'

export type Session = {
	id?: SessionType['id'],
	isInitialised: boolean
	isLoading: boolean
	isReady: boolean
}

const initialState: Session = {
	isInitialised: false,
	isLoading: false,
	isReady: false,
}

/* -- Start Loading -- */
export type StartLoadingPayload = {
	payload?: object
}
export type StartLoadingReducer = (state: Draft<Session>, payload: StartLoadingPayload) => void

/**
 * sets the loading status for session
 * @param state the session state
 */
export const startLoadingReducer: StartLoadingReducer = (state) => {
	state.isLoading = true
	state.isReady = false
}

/* -- Finished Loading -- */
export type FinishedLoadingPayload = {
	payload?: object
}
export type FinishedLoadingReducer = (state: Draft<Session>, payload: FinishedLoadingPayload) => void

/**
 * sets the finished loading status for session
 * @param state the session state
 */
export const finishedLoadingReducer: FinishedLoadingReducer = (state) => {
	state.isLoading = false
	state.isReady = true
	state.isInitialised = true
}

/* -- Set Session -- */
export type SetSessionPayload = {
	payload: {
		session: SessionType
	}
}
export type SetSessionReducer = (state: Draft<Session>, payload: SetSessionPayload) => void

/**
 * set the session
 * @param state the session state
 * @param props setSessionReducer props
 * @param props.payload the redux reducer payload
 * @param props.payload.session the session data
 */
export const setSessionReducer: SetSessionReducer = (state, { payload: { session } }) => {
	if (!session) {
		return
	}

	state.id = session.id
	state.isLoading = false
	state.isReady = true
	state.isInitialised = true
}

/* -- Redux -- */
export const sessionSlice = createSlice({
	initialState,
	name: 'session',
	reducers: {
		finishedLoading: finishedLoadingReducer,
		setSession: setSessionReducer,
		startLoading: startLoadingReducer,
	},
})

export const { finishedLoading, setSession, startLoading } = sessionSlice.actions
export const sessionReducer = sessionSlice.reducer
export default sessionReducer