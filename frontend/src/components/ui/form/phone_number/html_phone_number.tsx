import { DetailedHTMLProps, FC, type InputHTMLAttributes } from 'react'
import { Props as ReactPhoneNumberProps, Value as PhoneInputValue } from 'react-phone-number-input'
import type { Country } from 'react-phone-number-input/min'
import PhoneInput from 'react-phone-number-input/min'

import { sanitizeProps } from '@/helpers/component'
import { type OmitProps } from '@/helpers/typescript'

import { omitPropsField, omitPropsHtml } from '@/components/ui/form/field'
import { HtmlField, HtmlFieldProps } from '@/components/ui/form/field/html_field'
import type { MergeElement } from '@/components/ui/ui'

import { PhoneNumberPropsCommon } from './index'

export type HtmlPhoneNumberProps = MergeElement<
	Omit<ReactPhoneNumberProps<Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'ref'>>, 'onChange'>,
		{
			initialValue?: number | string
		} & PhoneNumberPropsCommon>

/**
 * props to omit for the field
 * @returns props to omit
 */
export const omitProps = (): OmitProps<HtmlPhoneNumberProps, ReactPhoneNumberProps<Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'ref'>>> => ({
	...omitPropsField,
	...omitPropsHtml,
})

/**
 * html phone number form field
 * @param props HtmlPhoneNumber props
 * @param props.defaultCountry the default country for phone number (defaults to COUNTRY_CODE)
 * @param props.initialValue the initial value for the field
 * @param props.onChange triggered on change event
 * @returns the phone number field
 */
export const HtmlPhoneNumber: FC<HtmlPhoneNumberProps> = ({
	defaultCountry = process.env.COUNTRY_CODE || 'GB',
	initialValue,
	onChange,
	...props
}) => (
	<HtmlField<HtmlPhoneNumberProps> {...sanitizeProps(props) as HtmlFieldProps<HtmlPhoneNumberProps>}>
		{({ className }) => (
			<PhoneInput
				className={className}
				defaultCountry={defaultCountry as Country}
				defaultValue={initialValue}
				international
				onChange={(value: PhoneInputValue) => {
					onChange && onChange(value)
				}}
				{...sanitizeProps(props, ['className', 'type'] as const)}
			/>
		)}
	</HtmlField>
)


HtmlPhoneNumber.displayName = 'Form.PhoneNumber.HtmlPhoneNumber'

export default HtmlPhoneNumber