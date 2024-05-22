'use server'

import type { NextPage } from 'next'

import { getTranslation, type LocaleType } from '@/helpers/translation'

import CodeExample from '@/components/developer/code/code_example'

import { Currency, Heading, Paragraph } from '@/components/ui'

export type CurrencyPageProps = {
	params: {
		locale: LocaleType
	}
}

/**
 * currency examples
 * @param props CurrencyPage props
 * @param props.params page params
 * @param props.params.locale the current locale
 * @returns page content
 */
const CurrencyPage: NextPage<CurrencyPageProps> = async ({ params: { locale } }: CurrencyPageProps) => {
	const t = await getTranslation({ app: '/--/ui/currency', locale })

	return (
		<>
			<Heading>{t('title')}</Heading>
			<Paragraph>{t('description')}</Paragraph>

			<Heading className="pt-10" size="small">{t('headingComponents')}</Heading>

			<CodeExample>
				<Currency value={54321.32}/>
			</CodeExample>

			<CodeExample>
				<Currency value={1}/>
			</CodeExample>

			<CodeExample>
				<Currency value={0.5}/>
			</CodeExample>

			<CodeExample>
				<Currency value={100}/>
			</CodeExample>
		</>
	)
}

export default CurrencyPage