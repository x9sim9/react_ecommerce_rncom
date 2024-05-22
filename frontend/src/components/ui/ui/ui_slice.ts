import { createSlice, Draft } from '@reduxjs/toolkit'

export { type CaseReducer } from '@reduxjs/toolkit'

export type Ui = {
	breakpoint: '2xl' | 'default' | 'lg' | 'md' | 'sm' | 'xl'
	breakpoints: ('2xl' | 'default' | 'lg' | 'md' | 'sm' | 'xl')[]
	width?: number,
}

const initialState: Ui = {
	breakpoint: 'sm',
	breakpoints: [],
	width: 0,
}

/* -- Update Width -- */
export type UpdateWidthPayload = {
	payload: Pick<Ui, 'breakpoint' | 'breakpoints' | 'width'>
}
export type UpdateWidthReducer = (state: Draft<Ui>, payload: UpdateWidthPayload) => void

/**
 * updates the width and current breakpoints based on size of viewport
 * @param state the ui state
 * @param props updateWidthReducer props
 * @param props.payload the redux reducer payload
 * @param props.payload.breakpoint the current breakpoint
 * @param props.payload.breakpoints the breakpoints from the current breakpoint backwards
 * @param props.payload.width the current viewport width
 */
export const updateWidthReducer: UpdateWidthReducer = (state, { payload: { breakpoint, breakpoints, width } }) => {
	state.width = width
	state.breakpoint = breakpoint
	state.breakpoints = breakpoints
}

/* -- Redux -- */
export const uiSlice = createSlice({
	initialState,
	name: 'ui',
	reducers: {
		updateWidth: updateWidthReducer,
	},
})

export const { updateWidth } = uiSlice.actions
export const uiReducer = uiSlice.reducer
export default uiReducer

