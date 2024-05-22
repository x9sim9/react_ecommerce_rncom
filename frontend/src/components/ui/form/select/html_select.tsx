import { keys, map } from 'lodash'
import { FC } from 'react'
import Select, { Props as SelectProps } from 'react-select'

import { sanitizeProps } from '@/helpers/component'
import { type OmitProps } from '@/helpers/typescript'

import { omitPropsField, omitPropsHtml } from '@/components/ui/form/field'
import { HtmlField, HtmlFieldProps } from '@/components/ui/form/field/html_field'

import { omitPropsShared, SelectPropsCommon } from './index'

export type HtmlSelectProps =
		Omit<SelectProps, 'isMulti' | 'options'> & Omit<SelectPropsCommon, 'children'> & {
			initialValue?: number | string
		}

/**
 * props to omit for the field
 * @returns props to omit
 */
export const omitProps = (): OmitProps<HtmlSelectProps, Omit<SelectProps, 'isMulti' | 'options'>> => ({
	...omitPropsField,
	...omitPropsHtml,
	...omitPropsShared,
})

/**
 * formik select form field
 * @param props HtmlSelect props
 * @param props.multiselect select more than one value
 * @param props.options react-select options
 * @returns the select field
 */
export const HtmlSelect: FC<HtmlSelectProps> = ({
	multiselect,
	options,
	...props
}) => {
	const selectOptions: SelectProps['options'] = map(options, (value, label) => ({ label, value }))

	return (
		<HtmlField<HtmlSelectProps> {...sanitizeProps(props) as HtmlFieldProps<HtmlSelectProps>}>
			{({ className }) => (
				<Select
					className={className}
					isMulti={multiselect}
					options={selectOptions}
					{...sanitizeProps(props, ['className', 'options', ...keys(omitProps())] as const)}
				/>
			)}
		</HtmlField>
	)
}


HtmlSelect.displayName = 'Form.Select.HtmlSelect'

export default HtmlSelect