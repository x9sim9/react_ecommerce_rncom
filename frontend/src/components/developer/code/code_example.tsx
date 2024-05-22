import prettify from 'html-prettify'
import { cloneElement, FC, ReactElement } from 'react'
import reactElementToJSXString from 'react-element-to-jsx-string'

import { Grid } from '@/components/ui/grid'

import Code from './code'

export type CodeExampleProps = {
	children: ReactElement,
	filterProps?: Array<string>

	replace?: {
		[key: string]: object | string
	}
}

/**
 * displays the source code for a react component
 * @param props CodeExample props
 * @param props.children the target react component
 * @param props.filterProps remove the react component props
 * @param props.replace replace the react component props
 * @returns the source code
 */
export const CodeExample: FC<CodeExampleProps> = ({
	children,
	filterProps,
	replace,
}) => {
	const newProps = { ...children.props, ...replace }

	const code = prettify(
			reactElementToJSXString(cloneElement(children, { ...newProps }), { filterProps })
					.toString()
					.replace(/([a-z-_]+)="\{(.*)\}"/i, '$1={$2}'),
	)
			.replace(/\n( +)?([a-z0-9])/gi, '$2')
			.replace(/( +)?([>[\]])( +)?/g, '$2')
			.replace(/<(\/)?([A-Z])/g, '<$1UI.$2')

	return (
		<Grid gap="xs" size="normal">
			<>
				<div>{children}</div>
				<Code>{code}</Code>
			</>
		</Grid>
	)
}

CodeExample.defaultProps = { filterProps: [] }

export default CodeExample
