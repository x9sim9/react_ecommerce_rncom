import { DetailedHTMLProps, FC, type HTMLAttributes } from 'react'

import { sanitizeProps } from '@/helpers/component'

export type FootProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

/**
 * the panel footer
 * @param props Head props
 * @param props.children children
 * @param props.className html class names
 * @returns the panel header
 */
export const Foot: FC<FootProps> = ({ children, className, ...props }) => (
	<div className={` bg-gray-100 px-4 py-3 ${className}`} {...sanitizeProps(props)}>{children}</div>
)

Foot.displayName = 'Panel.Foot'

export default Foot
