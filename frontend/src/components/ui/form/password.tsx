import { FC } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { Text, type TextProps } from './text'

export type PasswordProps = Omit<TextProps, 'field'>

/**
 * password form field
 * @param props password props
 * @param props.children the label for the field
 * @returns the password field
 */
export const Password: FC<PasswordProps> = ({ children, ...props }) => (
	<Text {...{ field: 'password', ...sanitizeProps(props) } as TextProps}>
		{children}
	</Text>
)

export default Password
