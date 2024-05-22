import { HomeIcon } from '@heroicons/react/24/outline'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import { filter, parseInt, startCase, toLower } from 'lodash'
import { type FC, Fragment, ReactNode } from 'react'

import { getRelativePath, translateBreadcrumbs, translatePath } from '@/helpers/path'

import { Grid, Link } from '@/components/ui'
import type { WithComponentProps } from '@/components/ui/with'

// must use via <WithServer component={Breadcrumb} /> or <WithClient component={Breadcrumb} />

export type BreadCrumbProps = {
	capitalizeLinks?: boolean
	removeBreadcrumb?: number | number[],
	title?: ReactNode
}

// Subcomponent
/**
 * single breadcrumb
 * @param props SingleBreadcrumb props
 * @param props.breadcrumb the current breadcrumb
 * @param props.breadcrumbs  all breadcrumbs
 * @param props.capitalizeLinks capitalize breadcrumb name if generated from path
 * @param props.index the position of the breadcrumb in the tree
 * @param props.path the current file path
 * @param props.pathNames the entire file path
 * @param props.title the breadcrumb title
 * @returns the breadcrumb
 */
const SingleBreadcrumb = ({ breadcrumb, breadcrumbs, capitalizeLinks, index, path, pathNames, title }: {
	breadcrumb: string,
	breadcrumbs: string[],
	capitalizeLinks: BreadCrumbProps['capitalizeLinks']
	index: number,
	path: Awaited<ReturnType<typeof getRelativePath>>,
	pathNames: string[],
	title?: ReactNode
}) => {
	const href = `${pathNames.slice(0, index + 1).join('/')}`
	const label = breadcrumb
		? breadcrumb
		: capitalizeLinks
			? startCase(toLower(pathNames[index].replace(/-/g, ' ')))
			: pathNames[index]

	// ignore numeric breadcrumbs unless last breadcrumb
	if (parseInt(label) && !(breadcrumb === breadcrumbs.slice(-1)[0] && title)) {
		return null
	}

	return (
		<>
			{pathNames.length !== index && <ChevronRightIcon className="h-[0.9rem]"/>}
			<Link className={`${path === href ? 'brightness-[0.7]' : ''} font-semibold hover:text-black`} color="secondary" data-testid="common.breadcrumb.link" href={href}
				size="small">{breadcrumb === breadcrumbs.slice(-1)[0] ? title || label : label}</Link>
		</>
	)
}

// Main Component
/**
 * breadcrumb tree
 * @param props Breadcrumb props
 * @param props.capitalizeLinks capitalize breadcrumb namees if generated from path
 * @param props.removeBreadcrumb remove breadcrumbs
 * @param props.title the last breadcrumb title
 * @param props.withParams used by ui with component
 * @returns the breadcrumb tree
 */
export const Breadcrumb: FC<WithComponentProps<BreadCrumbProps>> = ({ capitalizeLinks = true, removeBreadcrumb, title, withParams }) => {
	if (!withParams.fullLocale) {
		throw new Error('fullLocale is blank')
	}

	// @ts-expect-error translate looks for an existing key but cant do a direct compare due to all the commands
	let pathNames = translatePath({ locale: withParams.fullLocale, path: '/' + withParams.path.split('/').filter((path) => path).join('/') }).split('/')
	// @ts-expect-error translate looks for an existing key but cant do a direct compare due to all the commands
	let breadcrumbs = translateBreadcrumbs({ capitalize: capitalizeLinks, locale: withParams.fullLocale, path: withParams.path.split('/').filter((path) => path).join('/') })

	// Remove an item from the breadcrumb tree based on the position in the breadcrumbs, can use positive or negative index positions
	if (removeBreadcrumb) {
		let removes = Array.isArray(removeBreadcrumb) ? removeBreadcrumb : [removeBreadcrumb]

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

	return (
		<Grid gap={2} size="flex" verticalAlign="middle">
			{breadcrumbs.map((breadcrumb, index) => (
				breadcrumb === breadcrumbs[0]
					? (
							<Link className="hover:text-black" color="secondary" data-testid="common.breadcrumb.link" href="/" key={`/${breadcrumbs.slice(0, index).join('/')} `} size="small">
								<Grid gap="small" size="flex" width="fit">
									<HomeIcon className="-mt-px" height={20}/>
								</Grid>
							</Link>
						)
					: (
							<SingleBreadcrumb breadcrumb={breadcrumb} breadcrumbs={breadcrumbs} capitalizeLinks={capitalizeLinks} index={index} key={`/${breadcrumbs.slice(0, index).join('/')}`}
								path={withParams.path} pathNames={pathNames}
								title={title}/>
						)
			))}
		</Grid>
	)
}


export default Breadcrumb