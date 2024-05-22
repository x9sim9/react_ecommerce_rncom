import { DetailedHTMLProps, FC, type HTMLAttributes } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { buildStyles, type FieldStyles, type StyleElement } from '@/components/ui/form/field'
import type { MergeElement } from '@/components/ui/ui'

export type ErrorProps = MergeElement<
	DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>,
	StyleElement
>

/**
 * error message for field
 * @param props Error props
 * @param props.children the error content
 * @param props.className html class names
 * @param props.ignoreStyles ignore styles for error
 * @param props.styleProfile profile for styles
 * @returns the field error message
 */
export const Error: FC<ErrorProps> = ({
	children,
	className,
	ignoreStyles,
	styleProfile,
	...props
}) => {
	const layout: FieldStyles<ErrorProps['styleProfile']> = {
		default: '',
	}

	const styles: FieldStyles<ErrorProps['styleProfile']> = {
		default: 'text-red-500 text-sm',
	}

	className = buildStyles<'layout' | 'styles', ErrorProps['styleProfile']>({
		className,
		ignoreStyles,
		styleProfile,
		styles: { layout, styles },
	})

	return (
		<p className={className} {...sanitizeProps(props)} data-testid="ui.form.error.message">{children}</p>
	)
}

Error.displayName = 'Form.Error'

export default Error