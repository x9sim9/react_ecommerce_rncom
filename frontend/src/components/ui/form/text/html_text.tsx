import { keys } from 'lodash'
import { DetailedHTMLProps, FC, type InputHTMLAttributes } from 'react'

import { sanitizeProps } from '@/helpers/component'
import { type OmitProps } from '@/helpers/typescript'

import { omitPropsField, omitPropsHtml } from '@/components/ui/form/field'
import { HtmlField, HtmlFieldProps } from '@/components/ui/form/field/html_field'
import type { MergeElement } from '@/components/ui/ui'

import { TextPropsCommon } from './index'

export type HtmlTextProps = MergeElement<
	Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type'>, {
		initialValue?: number | string
	} & TextPropsCommon>

/**
 * props to omit for the field
 * @returns props to omit
 */
export const omitProps = (): OmitProps<Omit<HtmlTextProps, 'placeholder'>, Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type'>> => ({
	...omitPropsField,
	...omitPropsHtml,
})

/**
 * html text form field
 * @param props HtmlText props
 * @param props.field the field type
 * @returns the text field
 */
export const HtmlText: FC<HtmlTextProps> = ({
	field = 'text',
	...props
}) => (
	<HtmlField<HtmlTextProps> {...sanitizeProps(props) as HtmlFieldProps<HtmlTextProps>}>
		{({ className }) => (
			<input
				className={className}
				type={field}
				{...sanitizeProps(props, ['className', 'type', ...keys(omitProps())] as const)}
			/>
		)}
	</HtmlField>
)


HtmlText.displayName = 'Form.Text.HtmlText'

export default HtmlText