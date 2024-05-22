import { keys } from 'lodash'
import { DetailedHTMLProps, FC, type InputHTMLAttributes } from 'react'

import { sanitizeProps } from '@/helpers/component'
import { type OmitProps } from '@/helpers/typescript'

import { omitPropsField, omitPropsHtml } from '@/components/ui/form/field'
import { HtmlField, HtmlFieldProps } from '@/components/ui/form/field/html_field'
import type { MergeElement } from '@/components/ui/ui'

import { FilePropsCommon } from './index'

export type HtmlFileProps = MergeElement<
	Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type'>,
		{
			initialValue?: number | string
		} & FilePropsCommon>

/**
 * props to omit for the field
 * @returns props to omit
 */
export const omitProps = (): OmitProps<HtmlFileProps, Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type'>> => ({
	...omitPropsField,
	...omitPropsHtml,
})

/**
 * html file form field
 * @param props HtmlFile props
 * @returns the file field
 */
export const HtmlFile: FC<HtmlFileProps> = ({ ...props }) => (
	<HtmlField<HtmlFileProps> {...sanitizeProps(props) as HtmlFieldProps<HtmlFileProps>}>
		{({ className }) => (
			<input
				className={className}
				type="file"
				{...sanitizeProps(props, ['className', 'type', ...keys(omitProps())] as const)}
			/>
		)}
	</HtmlField>
)

HtmlFile.displayName = 'Form.File.HtmlFile'

export default HtmlFile