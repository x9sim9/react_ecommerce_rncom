import { FC, ReactNode } from 'react'

import { useUi } from '@/components/ui/ui/use_ui'

export type UiProviderProps = {
	children: ReactNode
}

/**
 * The provider placeholder for useUi
 * @param props UiProvider props
 * @param props.children children
 * @returns children
 */
export const UiProvider: FC<UiProviderProps> = ({ children }) => {
	useUi()

	return (
		children
	)
}

export default UiProvider