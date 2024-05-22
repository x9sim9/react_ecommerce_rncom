import { FC } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { Button as UIButton, ButtonPropsButton as UIButtonPropsButton } from '@/components/ui/button'

export type ButtonProps = Omit<UIButtonPropsButton, 'type'>

/**
 * form button
 * @param props Button props
 * @param props.children the button content
 * @returns the button
 */
export const Button: FC<ButtonProps> = ({ children, ...props }) => (
	<UIButton type="button" ui-component="Form.Button" {...(sanitizeProps(props) as UIButtonPropsButton)}>
		{children}
	</UIButton>
)

Button.displayName = 'Form.Button'

export default Button
