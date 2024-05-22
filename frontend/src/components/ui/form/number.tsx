import { FC } from 'react'

import { Text, type TextProps } from './text'

export type NumberProps = Omit<TextProps, 'field'>

/**
 * number form field
 * @param props Number props
 * @param props.children the label for the field
 * @returns the number field
 */
export const Number: FC<NumberProps> = ({ children, ...props }) => (
	<Text {...{ field: 'number', ...props } as TextProps}>
		{children}
	</Text>
)

export default Number
