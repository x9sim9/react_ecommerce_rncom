import { NextIntlClientProvider, useMessages } from 'next-intl'
import { FC, ReactNode } from 'react'

import { formats } from '@/i18n'

export type ProviderProps = {
	children: ReactNode
}

/**
 * next-intl locale provider
 * @param props Provider props
 * @param props.children children
 * @returns children
 */
export const Provider: FC<ProviderProps> = ({ children }) => {
	const messages = useMessages()

	return (
		<NextIntlClientProvider formats={formats} messages={messages}>
			{children}
		</NextIntlClientProvider>
	)
}

export default Provider