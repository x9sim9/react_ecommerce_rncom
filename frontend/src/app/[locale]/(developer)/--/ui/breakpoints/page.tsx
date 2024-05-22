'use server'

import tailwindConfig from '@/../tailwind.config'
import type { NextPage } from 'next'

import { getTranslation, type LocaleType } from '@/helpers/translation'

import CodeExample from '@/components/developer/code/code_example'

import { Button, Grid, GridSpan, Heading, Paragraph } from '@/components/ui'
import { Body, D, H, Row, Table } from '@/components/ui/table'

export type BreakpointPageProps = {
	params: {
		locale: LocaleType
	}
}

/**
 * breakpoint examples
 * @param props BreakpointPage props
 * @param props.params page params
 * @param props.params.locale the current locale
 * @returns page content
 */
const BreakpointPage: NextPage<BreakpointPageProps> = async ({ params: { locale } }: BreakpointPageProps) => {
	const t = await getTranslation({ app: '/--/ui/breakpoints', locale })
	return (
		<>
			<Heading>{t('title')}</Heading>
			<Paragraph>{t('description')}</Paragraph>

			<Heading className="pt-10" size="small">{t('headingUnderstandingBreakpoints')}</Heading>

			<Paragraph>
				{t('paragraphSixBreakpoints')}:
				<Table>
					<Body>
						<Row>
							{/* eslint-disable-next-line i18next/no-literal-string */}
							<H>default</H>
							{/* eslint-disable-next-line i18next/no-literal-string */}
							<D>0px &gt;</D>
						</Row>
						<Row>
							{/* eslint-disable-next-line i18next/no-literal-string */}
							<H>sm</H>
							<D>{// @ts-expect-error sm exists but not defined in type
								tailwindConfig?.theme?.screens?.sm
							} &gt;
							</D>
						</Row>
						<Row>
							{/* eslint-disable-next-line i18next/no-literal-string */}
							<H>md</H>
							<D>{// @ts-expect-error md exists but not defined in type
								tailwindConfig?.theme?.screens?.md
							} &gt;
							</D>
						</Row>
						<Row>
							{/* eslint-disable-next-line i18next/no-literal-string */}
							<H>lg</H>
							<D>{// @ts-expect-error lg exists but not defined in type
								tailwindConfig?.theme?.screens?.lg
							} &gt;
							</D>
						</Row>
						<Row>
							{/* eslint-disable-next-line i18next/no-literal-string */}
							<H>xl</H>
							<D>{// @ts-expect-error xl exists but not defined in type
								tailwindConfig?.theme?.screens?.xl
							} &gt;
							</D>
						</Row>
						<Row>
							{/* eslint-disable-next-line i18next/no-literal-string */}
							<H>2xl</H>
							<D>{// @ts-expect-error 2xl exists but not defined in type
								tailwindConfig?.theme?.screens['2xl']
							} &gt;
							</D>
						</Row>
					</Body>
				</Table>
			</Paragraph>

			<Paragraph className="pt-5">
				{t('paragraphUseManyBreakpoints')}
			</Paragraph>

			<Heading size="xs">
				{t('headingGridWithBreakpoints')}
			</Heading>
			<CodeExample>
				<Grid size={{ default: 1, sm: 2, md: 3, lg: 4, xl: 5 }}>
					<p className="bg-red-100">{t('dummy.one')}</p>
					<p className="bg-yellow-100">{t('dummy.two')}</p>
					<p className="bg-green-100">{t('dummy.three')}</p>
					<p className="bg-blue-100">{t('dummy.four')}</p>
					<p className="bg-orange-100">{t('dummy.five')}</p>
					<p className="bg-purple-100">{t('dummy.six')}</p>
				</Grid>
			</CodeExample>

			<Heading size="xs">
				{t('headingGridSpanWithBreakpoints')}
			</Heading>
			<CodeExample>
				<Grid size={6}>
					<GridSpan size={{ default: 1, sm: 2, md: 3, lg: 4, xl: 5 }}>
						{t('dummy.one')}
					</GridSpan>
					<p className="bg-yellow-100">{t('dummy.two')}</p>
				</Grid>
			</CodeExample>

			<Heading size="xs">
				{t('headingButtonsWithBreakpoints')}
			</Heading>
			<CodeExample>
				<Button color={{ default: 'danger', sm: 'primary', md: 'success', lg: 'warning', xl: 'successOutline' }}>
					{t('dummy.button')}
				</Button>
			</CodeExample>
		</>
	)
}

export default BreakpointPage