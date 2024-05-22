'use server'

import { existsSync, promises as fs } from 'fs'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import * as process from 'node:process'
import { FC } from 'react'
import remarkGfm from 'remark-gfm'

import { styleWithPrefix } from '@/components/ui/markdown/index'

export type MarkdownProps = {
	file: string
	pathPrefix?: string
}

/**
 * Formats markdown file
 * @param props MarkdownFile props
 * @param props.file the markdown file path (must be absolute path, i.e. start with @/...)
 * @param props.pathPrefix prefix link url path
 * @returns the formatted markdown file contents
 */
export const MarkdownFile: FC<MarkdownProps> = async ({ file, pathPrefix }) => {
	file = process.cwd() + file.replace(/^@/, '/src')

	if (!(await existsSync(file))) {
		notFound()
	}

	const content = await fs.readFile(file, 'utf8')

	return (
		<MDXRemote components={styleWithPrefix({ prefix: pathPrefix })} options={{
			mdxOptions: {
				rehypePlugins: [],
				remarkPlugins: [remarkGfm],
			},
		}} source={content}/>
	)
}

export default MarkdownFile