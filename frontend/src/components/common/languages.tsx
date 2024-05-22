'use server'

import { AU, CA, CN, DE, ES, type FlagComponent, FR, GB, IT, JP, NL, PT, US } from 'country-flag-icons/react/3x2'
import { map } from 'lodash'
import { type Locales } from 'messages'
import { headers } from 'next/headers'
import { FC } from 'react'

import { getRelativePath } from '@/helpers/path'
import type { LocaleType } from '@/helpers/translation'

import Grid from '@/components/ui/grid'
import Link from '@/components/ui/link'
import { NavItem, type NavItemProps } from '@/components/ui/navbar'

export type LanguagesProps = {
	className?: string,
	dropdownPosition?: NavItemProps['dropdownPosition']
	locale: LocaleType
	type: 'list' | 'navitem'
}

/**
 * language changer
 * @param props Languages props
 * @param props.className html class names
 * @param props.dropdownPosition the position of the dropdown when clicked
 * @param props.locale the current locale e.g. en-GB
 * @param props.type language changer type
 * @returns the language options
 */
export const Languages: FC<LanguagesProps> = async ({ className, dropdownPosition = 'right', locale, type }) => {
	const path = await getRelativePath({ headers: headers() })

	const labels: { [key in Locales]: string } = {
		de: 'Deutsch',
		'en-AU': 'Australian English',
		'en-CA': 'Canadian English',
		'en-GB': 'British English',
		'en-US': 'American English',
		'es-ES': 'Español',
		'fr-FR': 'Français',
		'it-IT': 'Italiano',
		'ja-JP': '日本語',
		nl: 'Nederlands',
		pt: 'Português',
		zh: '中文',
	}

	const icons: { [key in Locales]: FlagComponent } = {
		de: DE,
		'en-AU': AU,
		'en-CA': CA,
		'en-GB': GB,
		'en-US': US,
		'es-ES': ES,
		'fr-FR': FR,
		'it-IT': IT,
		'ja-JP': JP,
		nl: NL,
		pt: PT,
		zh: CN,
	}

	const CurrentIcon = icons[locale as keyof typeof icons]

	return {
		list: (
			<Grid className={`flex-wrap ${className}`} data-testid="common.languages" size="flex" width="fit">
				{map(icons, (Icon: FlagComponent, key: keyof typeof icons) => (
					<Link active={false} color="black" data-test-key={key} data-testid="common.languages.language" href={path} key={key} locale={key}>
						<Icon className="w-7 rounded-sm ring-1 ring-gray-400" title={labels[key]}/>
					</Link>
				))}
			</Grid>
		),
		navitem: (
			<NavItem className={className} data-testid="common.languages" dropdownPosition={dropdownPosition}
				label={<CurrentIcon className="w-7 rounded-sm ring-1 ring-gray-400" key="de" title={labels[locale as keyof typeof labels]}/>}
				showCollapsed={true}
				showDialog={false}>
				<Grid gap={{ default: 'small', lg: 3 }}>
					{map(icons, (Icon: FlagComponent, key: keyof typeof icons) => (
						<Link active={false} color="black" data-test-key={key} data-testid="common.languages.language" href={path} key={key} locale={key}>
							<Grid gap="xs" size="flex">
								<Icon className="w-7 rounded-sm ring-1 ring-gray-400" title={labels[key]}/>
								{labels[key]}
							</Grid>
						</Link>
					))}
				</Grid>
			</NavItem>
		),
	}[type]
}

export default Languages