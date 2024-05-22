'use server'

import type { NextPage } from 'next'

import { getTranslation, type LocaleType } from '@/helpers/translation'

import CodeExample from '@/components/developer/code/code_example'

import { Heading, List, Paragraph } from '@/components/ui'

export type ListPageProps = {
	params: {
		locale: LocaleType
	}
}

/**
 * list examples
 * @param props ListPage props
 * @param props.params page params
 * @param props.params.locale the current locale
 * @returns page content
 */
const ListPage: NextPage<ListPageProps> = async ({ params: { locale } }: ListPageProps) => {
	const t = await getTranslation({ app: '/--/ui/list', locale })
	return (
		<>
			<Heading>
				{t('title')}
			</Heading>
			<Paragraph>
				{t('description')}
			</Paragraph>

			<CodeExample>
				<List>
					<li>
						{t('dummy.one')}
					</li>
					<li>
						{t('dummy.two')}
					</li>
				</List>
			</CodeExample>

			<CodeExample>
				<List listStyle="number">
					<li>
						{t('dummy.one')}
					</li>
					<li>
						{t('dummy.two')}
					</li>
				</List>
			</CodeExample>
		</>
	)
}

export default ListPage