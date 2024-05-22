'use server'

import { headers } from 'next/headers'
import { DetailedHTMLProps, FC, type HTMLAttributes } from 'react'

import { sanitizeProps } from '@/helpers/component'
import { getRelativePath } from '@/helpers/path'
import { getTranslation, type LocaleType } from '@/helpers/translation'

import { Languages } from '@/components/common/languages'

import { Grid } from '@/components/ui'

export type FooterProps =
		{
			locale: LocaleType
		} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

/**
 * page footer
 * @param props Footer props
 * @param props.className html class names
 * @param props.locale the current locale (next-intl)
 * @returns the page footer
 */
export const Footer: FC<FooterProps> = async ({ className, locale, ...props }) => {
	const t = await getTranslation({ component: 'common.footer', locale })
	const path = await getRelativePath({ headers: headers() })

	return (
		<div className={`mb-10 mt-5 ${className}`} {...sanitizeProps(props)} data-testid="common.footer">
			<Grid align="center">
				<Languages locale={locale} type="list"/>
			</Grid>
		</div>
	)
}

export default Footer
