'use server'

import tailwindConfig from '@/../tailwind.config'
import type { NextPage } from 'next'

import { getTranslation, type LocaleType } from '@/helpers/translation'

import CodeExample from '@/components/developer/code/code_example'

import { Grid, GridSpan, Heading, Paragraph } from '@/components/ui'
import { Body, D, H, Row, Table } from '@/components/ui/table'

export type GridPagePageProps = {
	params: {
		locale: LocaleType
	}
}

/**
 * grid examples
 * @param props GridPage props
 * @param props.params page params
 * @param props.params.locale the current locale
 * @returns page content
 */
const GridPage: NextPage<GridPagePageProps> = async ({ params: { locale } }: GridPagePageProps) => {
	const t = await getTranslation({ app: '/--/ui/grid', locale })
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

			<Paragraph></Paragraph>

			<Grid gap="small" size="normal">
				<Heading size="2xs">{t('headingWithGrid')}</Heading>
				<CodeExample>
					<Grid gap="xs" size={{ default: 1, sm: 2, md: 3, lg: 4, xl: 5 }}>
						<p className="bg-red-100">{t('dummy.one')}</p>
						<p className="bg-yellow-100">{t('dummy.two')}</p>
						{/* eslint-disable-next-line sonarjs/no-duplicate-string */}
						<p className="bg-green-100">{t(('dummy.three'))}</p>
						{/* eslint-disable-next-line sonarjs/no-duplicate-string */}
						<p className="bg-blue-100">{t(('dummy.four'))}</p>
						{/* eslint-disable-next-line sonarjs/no-duplicate-string */}
						<p className="bg-orange-100">{t(('dummy.five'))}</p>
						<p className="bg-purple-100">{t(('dummy.six'))}</p>
					</Grid>
				</CodeExample>
			</Grid>

			<Grid gap="small" size="normal">
				<Heading size="2xs">{t('headingWithGridSpan')}</Heading>
				<CodeExample>
					<Grid gap="xs" size={12}>
						<GridSpan size={{ default: 12, md: 6, lg: 4, xl: 2 }}>
							<p className="bg-red-100">{t(('dummy.one'))}</p>
						</GridSpan>
						<GridSpan size={{ default: 12, md: 6, lg: 4, xl: 2 }}>
							<p className="bg-yellow-100">{t(('dummy.two'))}</p>
						</GridSpan>
						<GridSpan size={{ default: 12, md: 6, lg: 4, xl: 2 }}>
							<p className="bg-green-100">{t(('dummy.three'))}</p>
						</GridSpan>
						<GridSpan size={{ default: 12, md: 6, lg: 4, xl: 2 }}>
							<p className="bg-blue-100">{t(('dummy.four'))}</p>
						</GridSpan>
						<GridSpan size={{ default: 12, md: 6, lg: 4, xl: 2 }}>
							<p className="bg-orange-100">{t(('dummy.five'))}</p>
						</GridSpan>
						<GridSpan size={{ default: 12, md: 6, lg: 4, xl: 2 }}>
							<p className="bg-purple-100">{t(('dummy.six'))}</p>
						</GridSpan>
					</Grid>
				</CodeExample>
			</Grid>

			<Heading className="pt-10">{t('headingComponents')}</Heading>

			<Heading size="small">{t('headingGspd')}</Heading>

			<Grid gap="small" size="normal">
				<Heading size="xs">{t('size.xs')}</Heading>
				<CodeExample>
					<Grid gap="xs" size={3}>
						<p className="bg-red-100">{t(('dummy.one'))}</p>
						<p className="bg-yellow-100">{t(('dummy.two'))}</p>
						<p className="bg-green-100">{t(('dummy.three'))}</p>
					</Grid>
				</CodeExample>
			</Grid>

			<Grid gap="small" size="normal">
				<Heading size="xs">{t('size.sm')}</Heading>
				<CodeExample>
					<Grid gap="small" size={3}>
						<p className="bg-red-100">{t(('dummy.one'))}</p>
						<p className="bg-yellow-100">{t(('dummy.two'))}</p>
						<p className="bg-green-100">{t(('dummy.three'))}</p>
					</Grid>
				</CodeExample>
			</Grid>

			<Grid gap="small" size="row">
				<Heading size="xs">{t('size.md')}</Heading>
				<CodeExample>
					<Grid gap="medium" size={3}>
						<p className="bg-red-100">{t(('dummy.one'))}</p>
						<p className="bg-yellow-100">{t(('dummy.two'))}</p>
						<p className="bg-green-100">{t(('dummy.three'))}</p>
					</Grid>
				</CodeExample>
			</Grid>

			<Grid gap="small" size="row">
				<Heading size="xs">{t('size.lg')}</Heading>
				<CodeExample>
					<Grid gap="large" size={3}>
						<p className="bg-red-100">{t(('dummy.one'))}</p>
						<p className="bg-yellow-100">{t(('dummy.two'))}</p>
						<p className="bg-green-100">{t(('dummy.three'))}</p>
					</Grid>
				</CodeExample>
			</Grid>

			<Grid gap="small" size="row">
				<Heading size="xs">{t('size.xl')}</Heading>
				<CodeExample>
					<Grid gap="xl" size={3}>
						<p className="bg-red-100">{t(('dummy.one'))}</p>
						<p className="bg-yellow-100">{t(('dummy.two'))}</p>
						<p className="bg-green-100">{t(('dummy.three'))}</p>
					</Grid>
				</CodeExample>
			</Grid>

			<Heading className="pt-10" size="small">{t('headingCols')}</Heading>

			<Grid gap="small" size="row">
				<Heading size="xs">{t('headingTwoColumns')}</Heading>
				<CodeExample>
					<Grid size={2}>
						<p className="bg-red-100">{t(('dummy.one'))}</p>
						<p className="bg-yellow-100">{t(('dummy.two'))}</p>
						<p className="bg-green-100">{t(('dummy.three'))}</p>
						<p className="bg-blue-100">{t(('dummy.four'))}</p>
						<p className="bg-orange-100">{t(('dummy.five'))}</p>
						<p className="bg-purple-100">{t(('dummy.six'))}</p>
					</Grid>
				</CodeExample>
			</Grid>

			<Grid gap="small" size="row">
				<Heading size="xs">{t('headingFourColumns')}</Heading>
				<CodeExample>
					<Grid size={4}>
						<p className="bg-red-100">{t(('dummy.one'))}</p>
						<p className="bg-yellow-100">{t(('dummy.two'))}</p>
						<p className="bg-green-100">{t(('dummy.three'))}</p>
						<p className="bg-blue-100">{t(('dummy.four'))}</p>
						<p className="bg-orange-100">{t(('dummy.five'))}</p>
						<p className="bg-purple-100">{t(('dummy.six'))}</p>
					</Grid>
				</CodeExample>
			</Grid>

			<Grid gap="small" size="row">
				<Heading size="xs">{t('headingSixColumns')}</Heading>
				<CodeExample>
					<Grid size={6}>
						<p className="bg-red-100">{t(('dummy.one'))}</p>
						<p className="bg-yellow-100">{t(('dummy.two'))}</p>
						<p className="bg-green-100">{t(('dummy.three'))}</p>
						<p className="bg-blue-100">{t(('dummy.four'))}</p>
						<p className="bg-orange-100">{t(('dummy.five'))}</p>
						<p className="bg-purple-100">{t(('dummy.six'))}</p>
					</Grid>
				</CodeExample>
			</Grid>

			<Grid gap="small" size="row">
				<Heading size="xs">{t('headingTwelveColumns')}</Heading>
				<CodeExample>
					<Grid gap="large" size={12}>
						<p className="bg-red-100">1</p>
						<p className="bg-yellow-100">2</p>
						<p className="bg-green-100">3</p>
						<p className="bg-blue-100">4</p>
						<p className="bg-orange-100">5</p>
						<p className="bg-purple-100">6</p>
						<p className="bg-red-100">7</p>
						<p className="bg-yellow-100">8</p>
						<p className="bg-green-100">9</p>
						<p className="bg-blue-100">10</p>
						<p className="bg-orange-100">11</p>
						<p className="bg-purple-100">12</p>
					</Grid>
				</CodeExample>
			</Grid>

			<Heading className="pt-10" size="small">{t('headingGridSpan')}</Heading>

			<Grid gap="small" size="row">
				<Heading size="xs">{t('headingSixColWithSpan')}</Heading>
				<CodeExample>
					<Grid size={6}>
						<GridSpan size={2}>
							<p className="bg-red-100">{t(('dummy.one'))}</p>
						</GridSpan>
						<p className="bg-yellow-100">{t(('dummy.two'))}</p>
						<GridSpan size={2}>
							<p className="bg-green-100">{t(('dummy.three'))}</p>
						</GridSpan>
						<p className="bg-blue-100">{t(('dummy.four'))}</p>
						<p className="bg-orange-100">{t(('dummy.five'))}</p>
						<GridSpan size={5}>
							<p className="bg-purple-100">{t(('dummy.six'))}</p>
						</GridSpan>
					</Grid>
				</CodeExample>
			</Grid>

			<Heading className="pt-10" size="small">{t('headingRow')}</Heading>

			<Grid gap="small" size="row">
				<Heading size="xs">{t('headingSmall')}</Heading>
				<CodeExample>
					<Grid gap="small" size="row">
						<p className="bg-red-100">{t(('dummy.one'))}</p>
						<p className="bg-yellow-100">{t(('dummy.two'))}</p>
						<p className="bg-green-100">{t(('dummy.three'))}</p>
						<p className="bg-blue-100">{t(('dummy.four'))}</p>
						<p className="bg-orange-100">{t(('dummy.five'))}</p>
						<p className="bg-purple-100">{t(('dummy.six'))}</p>
					</Grid>
				</CodeExample>
			</Grid>

			<Heading className="pt-10" size="small">{t('headingVerticalAlign')}</Heading>

			<Grid gap="small" size="row">
				<Heading size="xs">{t('headingTop')}</Heading>
				<CodeExample>
					<Grid size={6} verticalAlign="top">
						<p className="h-10 bg-red-100">{t(('dummy.one'))}</p>
						<p className="bg-yellow-100">{t(('dummy.two'))}</p>
						<p className="bg-green-100">{t(('dummy.three'))}</p>
						<p className="bg-blue-100">{t(('dummy.four'))}</p>
						<p className="bg-orange-100">{t(('dummy.five'))}</p>
						<p className="bg-purple-100">{t(('dummy.six'))}</p>
					</Grid>
				</CodeExample>
			</Grid>

			<Grid gap="small" size="row">
				<Heading size="xs">{t('headingMiddle')}</Heading>
				<CodeExample>
					<Grid size={6} verticalAlign="middle">
						<p className="h-10 bg-red-100">{t(('dummy.one'))}</p>
						<p className="bg-yellow-100">{t(('dummy.two'))}</p>
						<p className="bg-green-100">{t(('dummy.three'))}</p>
						<p className="bg-blue-100">{t(('dummy.four'))}</p>
						<p className="bg-orange-100">{t(('dummy.five'))}</p>
						<p className="bg-purple-100">{t(('dummy.six'))}</p>
					</Grid>
				</CodeExample>
			</Grid>

			<Grid gap="small" size="row">
				<Heading size="xs">{t('headingBottom')}</Heading>
				<CodeExample>
					<Grid size={6} verticalAlign="bottom">
						<p className="h-10 bg-red-100">{t(('dummy.one'))}</p>
						<p className="bg-yellow-100">{t(('dummy.two'))}</p>
						<p className="bg-green-100">{t(('dummy.three'))}</p>
						<p className="bg-blue-100">{t(('dummy.three'))}</p>
						<p className="bg-orange-100">{t(('dummy.five'))}</p>
						<p className="bg-purple-100">{t(('dummy.six'))}</p>
					</Grid>
				</CodeExample>
			</Grid>
		</>
	)
}

export default GridPage