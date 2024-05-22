'use server'

import { headers } from 'next/headers'
import { FC } from 'react'

import { sanitizeProps } from '@/helpers/component'
import { getRelativePath } from '@/helpers/path'
import { getLocale, getTranslation, type LocaleType } from '@/helpers/translation'

import type { WithComponentProps, WithPropsCommon } from './with'

export type WithServerPropsServer = {
	locale: LocaleType
}

export type WithServerPropsOnly<Props> = {
	client?: never
	server: WithServerPropsServer
} & Props

export type WithServerProps<Props> =
		WithServerPropsOnly<Props> &
		WithPropsCommon<Props>

/**
 * Special function to pass sever params to component
 * @param props WithServer props
 * @param props.component the target component
 * @param props.server the server config
 * @param props.translation the translation
 * @returns the result of the passed component
 */
export const WithServer = async <Props, >({ component, server, translation, ...props }: WithServerProps<Props>) => {
	const t = translation && server?.locale ? await getTranslation({ locale: server.locale, ...translation }) : undefined
	const path = await getRelativePath({ headers: headers() })
	const fullLocale = server?.locale ? await getLocale({ locale: server.locale }) : null

	const Component: FC<WithComponentProps<Props>> = component

	return (
		<>
			{/* @ts-expect-error is 100% valid but throwing type mismatch */}
			<Component withParams={{ fullLocale, path, t }} {...sanitizeProps(props)} />
		</>
	)
}

export default WithServer