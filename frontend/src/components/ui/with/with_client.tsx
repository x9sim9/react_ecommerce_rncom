'use client'

import { FC } from 'react'

import { sanitizeProps } from '@/helpers/component'
import { useRelativePath } from '@/helpers/path'
import { useLocale, useTranslation } from '@/helpers/translation'
import type { Empty } from '@/helpers/typescript'

import type { WithComponentProps, WithPropsCommon } from './with'

export type WithClientPropsClient = Empty

export type WithClientPropsOnly<Props> = {
	client?: WithClientPropsClient
	server?: never
} & Props

export type WithClientProps<Props> =
		WithClientPropsOnly<Props> &
		WithPropsCommon<Props>

/**
 * Special function to pass client params to component
 * @param props WithClient props
 * @param props.client the client config
 * @param props.component the target component
 * @param props.translation the translation
 * @returns the result of the passed component
 */
export const WithClient = <Props, >({ client, component, translation, ...props }: WithClientProps<Props>) => {
	const t = useTranslation(translation)
	const path = useRelativePath()
	const fullLocale = useLocale()

	const Component: FC<WithComponentProps<Props>> = component

	return (
		<>
			{/* @ts-expect-error is 100% valid but throwing type mismatch */}
			<Component withParams={{ fullLocale, path, t }} {...sanitizeProps(props)} />
		</>
	)
}

export default WithClient