import type { MDXComponents } from 'mdx/types'
import { type AnchorHTMLAttributes, type DetailedHTMLProps, ReactNode } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { Heading, Link, type LinkProps, List, Paragraph } from '@/components/ui'
import { Body, D, H, Head, Row, Table } from '@/components/ui/table'

// export { default as MarkdownFile, type MarkdownProps } from './markdown_file'

export const styles: MDXComponents = {
	a: ({ children, ...props }: { children: ReactNode }) => <Link rel="nofollow" {...sanitizeProps(props)}>{children}</Link>,
	code: ({ children, ...props }: { children: ReactNode }) => <code className="inline-block whitespace-pre bg-gray-100 p-1 font-mono text-sm font-semibold text-gray-500" {...sanitizeProps(props)}>{children}</code>,
	h1: ({ children, ...props }: { children: ReactNode }) => <Heading size="xl" {...sanitizeProps(props)}>{children}</Heading>,
	h2: ({ children, ...props }: { children: ReactNode }) => <Heading size="large" {...sanitizeProps(props)}>{children}</Heading>,
	h3: ({ children, ...props }: { children: ReactNode }) => <Heading size="medium" {...sanitizeProps(props)}>{children}</Heading>,
	h4: ({ children, ...props }: { children: ReactNode }) => <Heading size="small" {...sanitizeProps(props)}>{children}</Heading>,
	h5: ({ children, ...props }: { children: ReactNode }) => <Heading size="xs" {...sanitizeProps(props)}>{children}</Heading>,
	h6: ({ children, ...props }: { children: ReactNode }) => <Heading size="2xs" {...sanitizeProps(props)}>{children}</Heading>,
	h7: ({ children, ...props }: { children: ReactNode }) => <Heading size="2xs" {...sanitizeProps(props)}>{children}</Heading>,
	h8: ({ children, ...props }: { children: ReactNode }) => <Heading size="2xs" {...sanitizeProps(props)}>{children}</Heading>,
	p: ({ children, ...props }: { children: ReactNode }) => <Paragraph {...sanitizeProps(props)}>{children}</Paragraph>,
	pre: ({ children, ...props }: { children: ReactNode }) => <Paragraph className="whitespace-pre-wrap" {...sanitizeProps(props)}>{children}</Paragraph>,
	table: ({ children, ...props }: { children: ReactNode }) => <Table {...sanitizeProps(props)}>{children}</Table>,
	tbody: ({ children, ...props }: { children: ReactNode }) => <Body {...sanitizeProps(props)}>{children}</Body>,
	td: ({ children, ...props }: { children: ReactNode }) => <D {...sanitizeProps(props)}>{children}</D>,
	th: ({ children, ...props }: { children: ReactNode }) => <H {...sanitizeProps(props)}>{children}</H>,
	thead: ({ children, ...props }: { children: ReactNode }) => <Head {...sanitizeProps(props)}>{children}</Head>,
	tr: ({ children, ...props }: { children: ReactNode }) => <Row {...sanitizeProps(props)}>{children}</Row>,
	ul: ({ children, ...props }: { children: ReactNode }) => <List {...sanitizeProps(props)}>{children}</List>,
} as MDXComponents

/**
 * all markdown styles
 * @param props styleWithPrefix props
 * @param props.prefix prefix link url path
 * @returns the styles
 */
export const styleWithPrefix = ({ prefix = '' }:{ prefix?: string }) => ({
	...styles,
	a: ({ children, ...props }: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => <Link rel="nofollow" {...sanitizeProps({ ...props, href: prefix + props.href }) as LinkProps}>{children}</Link>,
})
