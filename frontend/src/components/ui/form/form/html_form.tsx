import { keys } from 'lodash'
import { DetailedHTMLProps, FC, type HTMLAttributes } from 'react'

import { sanitizeProps } from '@/helpers/component'
import { type OmitProps } from '@/helpers/typescript'

import type { FormPropsCommon } from '@/components/ui/form/form/index'
import type { MergeElement } from '@/components/ui/ui'

export type HtmlFormProps =
		MergeElement<
			Omit<DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement>, 'type'>,
			FormPropsCommon
		>

/**
 * props to omit for the field
 * @returns props to omit
 */
export const omitProps = (): OmitProps<HtmlFormProps, Omit<DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement>, 'type'>> => ({})

/**
 * html form
 * @param props HtmlForm props
 * @param props.children children
 * @returns the textarea field
 */
export const HtmlForm: FC<HtmlFormProps> = ({
	children,
	...props
}) => (
	<form {...sanitizeProps(props, [...keys(omitProps())] as const)}>{children}</form>
)

HtmlForm.displayName = 'Form.Form.HtmlForm'

export default HtmlForm