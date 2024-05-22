import { keys } from 'lodash'
import { DetailedHTMLProps, FC, type TextareaHTMLAttributes } from 'react'

import { sanitizeProps } from '@/helpers/component'
import { type OmitProps } from '@/helpers/typescript'

import { omitPropsField, omitPropsHtml } from '@/components/ui/form/field'
import { HtmlField } from '@/components/ui/form/field/html_field'
import type { MergeElement } from '@/components/ui/ui'

import { TextareaPropsCommon } from './index'

export type HtmlTextareaProps = MergeElement<
	Omit<DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, 'type'>,
		{
			initialValue?: number | string
		} & TextareaPropsCommon>

/**
 * props to omit for the field
 * @returns props to omit
 */
export const omitProps = (): OmitProps<HtmlTextareaProps, Omit<DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, 'type'>> => ({
	...omitPropsField,
	...omitPropsHtml,
	validationMessageAs: 'text',
})

/**
 * html textarea form field
 * @param props HtmlTextarea props
 * @returns the textarea field
 */
export const HtmlTextarea: FC<HtmlTextareaProps> = ({ ...props }) => (
	<HtmlField<HtmlTextareaProps> {...sanitizeProps(props)}>
		{({ className }) => (
			<textarea
				className={className}
				{...sanitizeProps(props, ['className', 'type', ...keys(omitProps())] as const)}
			/>
		)}
	</HtmlField>
)

HtmlTextarea.displayName = 'Form.Textarea.HtmlTextArea'

export default HtmlTextarea