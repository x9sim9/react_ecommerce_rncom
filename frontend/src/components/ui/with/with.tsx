// eslint-disable-next-line write-good-comments/write-good-comments
/*
	With, WithServer and WithClient are special components designed to retrieve specific information differently
	depending on whether the component has been executed as a React Server Component, Server Side Component
	or Client Side Component and then pass the specific information to the component.

	For example useHooks do not work well with React Server Components and await functions are not allowed in
	Client Components
 */
import { FC } from 'react'

import { sanitizeProps } from '@/helpers/component'
import { useRelativePath } from '@/helpers/path'
import { getLocale, getTranslation, useTranslation } from '@/helpers/translation'

import WithClient, { WithClientProps, type WithClientPropsClient, type WithClientPropsOnly } from './with_client'
import WithServer, { WithServerProps, type WithServerPropsOnly, type WithServerPropsServer } from './with_server'

export type WithComponentProps<Props> = {
	withParams: {
		client?: WithClientPropsClient
		fullLocale?: Awaited<ReturnType<typeof getLocale>>,
		path: Awaited<ReturnType<typeof useRelativePath>>,
		server?: WithServerPropsServer
		t?: Awaited<ReturnType<typeof useTranslation>>
	}
} & Props

export type WithPropsCommon<Props> = {
	component: FC<WithComponentProps<Props>>
	translation?: Omit<Parameters<typeof getTranslation>[0], 'locale'>
}

export type WithContainerProps<Props> = WithClientPropsOnly<Props> | WithServerPropsOnly<Props>

export type WithProps<Props> = WithClientProps<Props> | WithServerProps<Props>

/**
 * Special function to pass params to component
 * @param props WithClient props
 * @param props.component the target component
 * @param props.server the server config
 * @param props.translation the translation
 * @returns the result of the passed component
 */
export const With = <Props, >({ component, server, translation, ...props }: WithProps<Props>) => typeof window === 'undefined'
	? (
			<>
				{/* @ts-expect-error is 100% valid but throwing type mismatch */}
				<WithServer<Props> component={component} server={server} translation={translation} {...sanitizeProps(props) as Omit<WithServerProps<Props>, 'component' | 'server' | 'translation'>} />
			</>
		)
	: (
			<>
				{/* @ts-expect-error is 100% valid but throwing type mismatch */}
				<WithClient<Props> component={component} translation={translation} {...sanitizeProps(props) as Omit<WithClientProps<Props>, 'component' | 'translation'>} />
			</>
		)

export default With