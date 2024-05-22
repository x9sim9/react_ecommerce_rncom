'use server'

import type { NextPage } from 'next'

import { getTranslation, type LocaleType } from '@/helpers/translation'

import MarkdownFile from '@/components/ui/markdown/markdown_file'

export type ContributionsPageProps = {
	params: {
		locale: LocaleType
	},
}

/**
 * contributions page
 * shows a list of everyone who has contributed to the project
 * @param props ContributionsPage props
 * @param props.params page params
 * @param props.params.locale the current locale
 * @returns page content
 */
const ContributionsPage: NextPage<ContributionsPageProps> = async ({ params: { locale } }: ContributionsPageProps) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
	const t = await getTranslation({ app: '/', locale })

	return (
		<MarkdownFile file="@/app/[locale]/(license)/contributions/CONTRIBUTIONS.md"/>
	)
}

export default ContributionsPage