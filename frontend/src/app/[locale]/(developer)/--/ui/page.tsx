'use server'

import type { NextPage } from 'next'

import { getTranslation, type LocaleType } from '@/helpers/translation'

import { Heading, Paragraph } from '@/components/ui'

export type UiPageProps = {
	params: {
		locale: LocaleType
	}
}

/**
 * Ui components examples home page
 * @param props UiPage props
 * @param props.params page params
 * @param props.params.locale the current locale
 * @returns page content
 */
const UiPage: NextPage<UiPageProps> = async ({ params: { locale } }: UiPageProps) => {
	const t = await getTranslation({ app: '/--/ui', locale })

	return (
		<>
			<Heading>
				{t('title')}
			</Heading>
			<Paragraph>
				{t('description')}
			</Paragraph>

			<Heading className="pt-10" size="small"></Heading>
		</>
	)
}

export default UiPage