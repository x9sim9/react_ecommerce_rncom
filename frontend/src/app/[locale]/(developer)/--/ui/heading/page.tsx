'use server'

import type { NextPage } from 'next'

import { getTranslation, type LocaleType } from '@/helpers/translation'

import CodeExample from '@/components/developer/code/code_example'

import { Heading, Paragraph } from '@/components/ui'

export type HeadingPageProps = {
	params: {
		locale: LocaleType
	}
}

/**
 * heading examples
 * @param props HeadingPage props
 * @param props.params page params
 * @param props.params.locale the current locale
 * @returns page content
 */
const HeadingPage: NextPage<HeadingPageProps> = async ({ params: { locale } }: HeadingPageProps) => {
	const t = await getTranslation({ app: '/--/ui/heading', locale })
	return (
		<>
			<Heading>
				{t('title')}
			</Heading>
			<Paragraph>
				{t('description')}
			</Paragraph>

			<CodeExample>
				<Heading size="xs">
					{t('headingExtraSmall')}
				</Heading>
			</CodeExample>

			<CodeExample>
				<Heading size="small">
					{t('headingSmall')} </Heading>
			</CodeExample>

			<CodeExample>
				<Heading size="medium">
					{t('headingMedium')} </Heading>
			</CodeExample>

			<CodeExample>
				<Heading size="large">
					{t('headingLarge')} </Heading>
			</CodeExample>

			<CodeExample>
				<Heading size="xl">
					{t('headinxlg')} </Heading>
			</CodeExample>
		</>
	)
}

export default HeadingPage