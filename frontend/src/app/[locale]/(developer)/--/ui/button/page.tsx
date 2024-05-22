'use server'

import type { NextPage } from 'next'

import { getTranslation, type LocaleType } from '@/helpers/translation'

import CodeExample from '@/components/developer/code/code_example'

import { Button, Heading } from '@/components/ui'

export type ButtonPage = {
	params: {
		locale: LocaleType
	}
}

/**
 * button examples
 * @param props ButtonPage props
 * @param props.params page params
 * @param props.params.locale the current locale
 * @returns page content
 */
const ButtonPage: NextPage<ButtonPage> = async ({ params: { locale } }: ButtonPage) => {
	const t = await getTranslation({ app: '/--/ui/button', locale })
	return (
		<>
			<Heading>{t('title')}</Heading>

			<CodeExample>
				<Button>{t('dummy.button')} </Button>
			</CodeExample>

			<Heading className="pt-10" size="xs">{t('headingTypes')}</Heading>

			<CodeExample>
				<Button type="button">{t('dummy.button')} </Button>
			</CodeExample>


			<CodeExample>
				<Button type="submit">{t('dummy.submit')} </Button>
			</CodeExample>

			<CodeExample>
				<Button type="text">{t('dummy.text')} </Button>
			</CodeExample>

			<Heading className="pt-10" size="xs">{t('headingColors')} </Heading>

			<CodeExample>
				<Button color="light">{t('color.light')}</Button>
			</CodeExample>

			<CodeExample>
				<Button color="danger">{t('color.danger')}</Button>
			</CodeExample>

			<CodeExample>
				<Button color="dangerOutline">{t('color.dangerOutline')}</Button>
			</CodeExample>

			<CodeExample>
				<Button color="info">{t('color.info')}</Button>
			</CodeExample>

			<CodeExample>
				<Button color="infoOutline">{t('color.infoOutline')}</Button>
			</CodeExample>

			<CodeExample>
				<Button color="primary">{t('color.primary')}</Button>
			</CodeExample>

			<CodeExample>
				<Button color="primaryOutline">{t('color.primaryOutline')}</Button>
			</CodeExample>

			<CodeExample>
				<Button color="secondary">{t('color.secondary')}</Button>
			</CodeExample>

			<CodeExample>
				<Button color="secondaryOutline">{t('color.secondaryOutline')}</Button>
			</CodeExample>

			<CodeExample>
				<Button color="success">{t('color.success')}</Button>
			</CodeExample>

			<CodeExample>
				<Button color="successOutline">{t('color.successOutline')}</Button>
			</CodeExample>

			<CodeExample>
				<Button color="warning">{t('color.warning')}</Button>
			</CodeExample>

			<CodeExample>
				<Button color="warningOutline">{t('color.warningOutline')}</Button>
			</CodeExample>

			<CodeExample>
				<Button color="dark">{t('color.dark')}</Button>
			</CodeExample>

			<CodeExample>
				<Button color="darkOutline">{t('color.darkOutline')}</Button>
			</CodeExample>

			<Heading className="pt-10" size="small">{t('headingSizes')}</Heading>

			<CodeExample>
				<Button size="xs">{t('size.xs')}</Button>
			</CodeExample>

			<CodeExample>
				<Button size="small">{t('size.sm')}</Button>
			</CodeExample>

			<CodeExample>
				<Button size="medium">{t('size.md')}</Button>
			</CodeExample>
		</>
	)
}

export default ButtonPage