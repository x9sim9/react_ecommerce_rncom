'use client'

import { ReactNode } from 'react'

import apollo, { Provider as ApolloProvider } from '@/connections/apollo/ssr'
import { PersistGate, persistor, Provider as StoreProvider, store } from '@/lib/store'

import NotReady from '@/components/common/not_ready'

import UiProvider from '@/components/ui/ui/ui_provider'

/**
 * All root level providers
 * @param props Provider props
 * @param props.children children
 * @returns children
 */
export const Provider = ({ children }: { children: ReactNode }) => (
	<ApolloProvider makeClient={apollo}>
		<StoreProvider store={store}>
			<PersistGate loading={<NotReady />} persistor={persistor}>
				<UiProvider>
					{children}
				</UiProvider>
			</PersistGate>
		</StoreProvider>
	</ApolloProvider>
)


export default Provider