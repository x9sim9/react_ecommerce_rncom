import type { FC, ReactNode } from 'react'

export type CodeProps = {
	children: ReactNode
}

/**
 * styles source code
 * @param props Code props
 * @param props.children the source code
 * @returns the styled source code
 */
export const Code: FC<CodeProps> = ({ children }) => (
	<code className="block overflow-x-auto whitespace-pre bg-gray-100 p-3">{children}</code>
)

export default Code
