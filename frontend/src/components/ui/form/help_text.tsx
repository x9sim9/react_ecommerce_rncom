import { DetailedHTMLProps, FC, type HTMLAttributes } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { buildStyles, type FieldStyles, type StylesProps } from '@/components/ui/form/field'
import type { MergeElement } from '@/components/ui/ui'

export type HelpTextProps = MergeElement<
	DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
		{
			styleProfile?: 'default'
		} & StylesProps<'layout' | 'styles'>>

/**
 * help text for field
 * @param props HelpText props
 * @param props.children the helptext content
 * @param props.className html class names
 * @param props.ignoreStyles ignore styles for helptext
 * @param props.styleProfile profile for styles
 * @returns the help text
 */
export const HelpText: FC<HelpTextProps> = ({
	children,
	className,
	ignoreStyles,
	styleProfile = 'default',
	...props
}) => {
	const layout: FieldStyles<HelpTextProps['styleProfile']> = {
		default: '',
	}

	const styles: FieldStyles<HelpTextProps['styleProfile']> = {
		default: 'whitespace-pre-wrap text-gray-500 text-sm',
	}

	className = buildStyles<'layout' | 'styles', HelpTextProps['styleProfile']>({
		className,
		ignoreStyles,
		styleProfile,
		styles: { layout, styles },
	})

	return (
		<small {...{ className, ...sanitizeProps(props) }}>{children}</small>
	)
}

HelpText.displayName = 'Form.HelpText'

export default HelpText