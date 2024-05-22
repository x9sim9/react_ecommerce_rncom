'use server'

import { DocumentTextIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import { NextPage } from 'next'

import { getTranslation, type LocaleType } from '@/helpers/translation'

import { Grid, Heading, Link, Paragraph } from '@/components/ui'

export type PageProps = {
	params: {
		locale: LocaleType
	}
}

/**
 * developer home page
 * @param props HomePage props
 * @param props.params page params
 * @param props.params.locale the current locale
 * @returns page content
 */
const Developer: NextPage<PageProps> = async ({ params: { locale } }: PageProps) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const t = await getTranslation({ app: '/--', locale })

	return (
		<>
			<Heading>
				{t('title')}
			</Heading>
			<Paragraph>
				{t('description')}
			</Paragraph>
			<Grid size={4}>
				<Link className="h-full" href="/--/ui">
					<Grid align="center" className="h-full rounded-md p-5 text-center ring-1 ring-gray-700">
						<PencilSquareIcon height={150} width={150}/>
						<Heading size="small">
							{t('menu.uiComponents')}
						</Heading>
					</Grid>
				</Link>
				<Link className="h-full" href="/--/docs">
					<Grid align="center" className="h-full rounded-md p-5 text-center ring-1 ring-gray-700">
						<DocumentTextIcon height={150} width={150}/>
						<Heading size="small">
							{t('menu.uiDocs')}
						</Heading>
					</Grid>
				</Link>
			</Grid>
		</>
	)
}

export default Developer