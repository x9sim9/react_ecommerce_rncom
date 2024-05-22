'use server'

import type { NextPage } from 'next'

import { getTranslation, type LocaleType } from '@/helpers/translation'

import Code from '@/components/developer/code/code'
import CodeExample from '@/components/developer/code/code_example'

import { Grid, Heading, Link, Paragraph } from '@/components/ui'

export type LinkPageProps = {
	params: {
		locale: LocaleType
	}
}

/**
 * link examples
 * @param props LinkPage props
 * @param props.params page params
 * @param props.params.locale the current locale
 * @returns page content
 */
const LinkPage: NextPage<LinkPageProps> = async ({ params: { locale } }: LinkPageProps) => {
	const t = await getTranslation({ app: '/--/ui/page', locale })

	return (
		<>
			<Heading>
				{t('title')}
			</Heading>
			<Paragraph>
				{t('description')}
			</Paragraph>

			<Heading className="pt-10" size="small">
				{t('headingDefault')}
			</Heading>

			<CodeExample>
				<Link href="/"> {t('linkClickHere')} </Link>
			</CodeExample>

			<Heading className="pt-10" size="small">
				{t('headingColors')}
			</Heading>

			<CodeExample>
				<Link color="primary" href="/">
					{t('color.primary')}
				</Link>
			</CodeExample>

			<CodeExample>
				<Link color="info" href="/">
					{t('color.info')}
				</Link>
			</CodeExample>

			<CodeExample>
				<Link color="success" href="/">
					{t('color.success')}
				</Link>
			</CodeExample>

			<CodeExample>
				<Link color="danger" href="/">
					{t('color.danger')}
				</Link>
			</CodeExample>

			<CodeExample>
				<Link color="warning" href="/">
					{t('color.warning')}
				</Link>
			</CodeExample>

			<Heading className="pt-10" size="small">
				{t('headingActive')}
			</Heading>

			<CodeExample>
				<Link active={true} highlight="simple" href="/">
					{t('linkCurrentPage')}
				</Link>
			</CodeExample>

			<CodeExample>
				<Link active={false} highlight="simple" href="/">
					{t('linkNotCurrentPage')}
				</Link>
			</CodeExample>

			<CodeExample>
				<Link active={true} highlight="none" href="/">
					{t('linkCurrentPage')}
				</Link>
			</CodeExample>

			<Heading className="pt-10" size="small">
				{t('headingProps')}
			</Heading>

			<Grid gap="xs" size="normal">
				<Link href="/">{({ active }) => <span>
					{t('linkCurrentlyActive')}: {
						active
							? t('dummy.yes')
							: t('dummy.no')
					}</span>}
				</Link>
				<Code>
					{
						`<Link to="uiLink">{({ active }) => <span>${
							t('linkCurrentlyActive')
						}: {active ? '${
							t('dummy.yes')}
							}' : '${
		t('dummy.no')}
							}'}</span>}</Link>`
					}
				</Code>
			</Grid>

			<Grid gap="xs" size="normal">
				<Link href="/">{({ active }) => <span>
					{t('linkCurrentlyActive')}: {
						active
							? t('dummy.yes')
							: t('dummy.no')
					}</span>}</Link>
				<Code>
					{
						`<Link to="uiLink">{({ active }) => <span>${
							t('linkCurrentlyActive')
						}: {active ? '${
							t('dummy.yes')
						}' : '${
							t('dummy.no')
						}'}</span>}</Link>`
					}
				</Code>
			</Grid>
		</>
	)
}

export default LinkPage