'use server'

import glob from 'glob'
import type { NextPage } from 'next'
import process from 'node:process'

import { getTranslation, type LocaleType } from '@/helpers/translation'
import { redirect } from '@/navigation'

import NotReady from '@/components/common/not_ready'

import MarkdownFile from '@/components/ui/markdown/markdown_file'

export type MarkdownPageProps = {
	params: {
		locale: LocaleType
		target: string[]
	}
}

/**
 * Formats all markdown files in docs folder
 * @param props MarkdownPage props
 * @param props.params.locale the current locale
 * @param props.params page params
 * @param props.params.target the target markdown file
 * @returns the formatted markdown file contents
 */
const MarkdownPage: NextPage<MarkdownPageProps> = async ({ params: { locale, target } }: MarkdownPageProps) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
	const t = await getTranslation({ app: '/', locale })

	if (!target) {
		// @ts-expect-error redirect cannot resolve md file urls
		redirect('/--/docs/DOCUMENTATION.md')
		return <NotReady />
	}

	return (
		<MarkdownFile file={`@/app/[locale]/(developer)/--/docs/${target.join('/')}`}/>
	)
}

export type GenerateStaticParamsResult = () => Promise<Omit<MarkdownPageProps['params'], 'locale'>[]>

/**
 * get all markdown pages
 * @returns all markdown pages
 */
export const generateStaticParams: GenerateStaticParamsResult = async () => {
	const files = glob.sync(process.cwd() + '/src/app/\\[locale\\]/(developer)/\\-\\-/docs/**/*.md')

	return files.map((file) => ({
		target: file.replace(process.cwd() + '/src/app/[locale]/(developer)/--/docs/', '').replace(/^\.\.\//, '').split('/'),
	}))
}

export default MarkdownPage