import { filter, startCase, toLower } from 'lodash'

import { translateBreadcrumbs, translatePath } from '@/helpers/path'
import { locale } from '@/translations'

import type { BreadCrumbProps } from '@/components/common/breadcrumb'

import Common from '@pages/common'

/**
 * expect page title to match text
 * @param text the page title text to match
 */
export const shouldHavePageTitle = (text: string) => {
	Common.elements.pageTitle()
			.should('have.html', text)
}

/**
 * expect a specific breadcrumb in the breadcrumb tree to be correct
 * @param position the position of the breadcrumb from the root breadcrumb forward
 * @param props shouldHaveBreadcrumb props
 * @param props.href the href of the breadcrumb to match
 * @param props.label the label of the breadcrumb to match
 */
export const shouldHaveBreadcrumb = (position: number, { href, label }: { href?: string, label?: string }): void => {
	if (href !== undefined) {
		Common.elements.breadcrumb()
				.eq(position)
				.should('have.attr', 'href', href.replace(/\/$/, ''))
	} else if (label !== undefined) {
		Common.elements.breadcrumb()
				.eq(position)
				.should('have.html', label)
	} else {
		throw new Error('Must provide href or label')
	}
}

/**
 * expect the breadcrumb tree to be correct
 * @param subjectUrl the url the breadcrumbs generated from
 * @param options shouldHaveBreadcrumbs options
 * @param options.removeBreadcrumb remove a breadcrumb from the verification (use positive numbers to remove forward from the root breadcrumb, use negative numbers to remove backwards from the last breadcrumb)
 * @param options.title the title text of the last breadcrumb to match
 */
export const shouldHaveBreadcrumbs = (subjectUrl: string, options?: Pick<BreadCrumbProps, 'removeBreadcrumb' | 'title'>): void => {
	const basePath = new URL(Cypress.config().baseUrl || '/').pathname

	subjectUrl = subjectUrl.replace('...', ',,,') // translation has to use commas for pathname

	/* -- Copied from /components/breadcrumb -- */
	let pathNames = translatePath({ locale: locale, path: '/' + subjectUrl.split('/').filter((path) => path).join('/') as keyof typeof locale['app'] }).split('/')
	let breadcrumbs = translateBreadcrumbs({ capitalize: true, locale, path: subjectUrl.split('/').filter((path) => path).join('/') as keyof typeof locale['app'] })
	if (options?.removeBreadcrumb) {
		let removes = Array.isArray(options.removeBreadcrumb) ? options.removeBreadcrumb : [options.removeBreadcrumb]

		// converts negative index positions to positive so they can work with filter()
		removes = removes.map((remove) => {
			if (remove < 0) {
				return breadcrumbs.indexOf(breadcrumbs.slice(remove)[0])
			}
			return remove
		})

		pathNames = filter(pathNames, (value, index) => !removes.includes(index))
		breadcrumbs = filter(breadcrumbs, (value, index) => !removes.includes(index))
	}

	breadcrumbs.forEach((breadcrumb, index) => {
		const href = `${pathNames.slice(0, index + 1).join('/')}`
		const position = breadcrumbs.indexOf(breadcrumb)

		if (!breadcrumb.match(/\[\]/)) {
			Common.elements.breadcrumb()
					.eq(position)
					.should('have.attr', 'href')
					.and('contain', (basePath + href).split(/[[\]]/g)[0])
		} else {
			shouldHaveBreadcrumb(position, { href: basePath + href })
		}

		if (breadcrumb !== breadcrumbs[0]) {
			let label = breadcrumb
				? breadcrumb
				: startCase(toLower(pathNames[index].replace(/-/g, ' ')))

			if (breadcrumb === breadcrumbs.slice(-1)[0] && options?.title) {
				label = options.title.toString()
			}

			if (breadcrumb.match(/\[\]/) && !(breadcrumb === breadcrumbs.slice(-1)[0] && options?.title)) {
				Common.elements.breadcrumb()
						.eq(position)
						.should('contain', /^[a-z0-9 ]+$/i)
			} else {
				shouldHaveBreadcrumb(position, { label: label })
			}
		}
	})
}


