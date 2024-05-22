import { startCase, toLower } from 'lodash'
import { FC, ReactNode } from 'react'

import { Heading } from '@/components/ui'
import type { WithComponentProps } from '@/components/ui/with'

export type PageTitleProps = {
	title?: ReactNode
}

/**
 * page title
 * @param props PageTitle props
 * @param props.title the page title
 * @param props.withParams used by ui with component
 * @returns the page title
 */
export const PageTitle: FC<WithComponentProps<PageTitleProps>> = ({ title, withParams }) => {
	if (!title) {
		const pathNames = withParams.path.split('/').filter((path) => path)
		title = startCase(toLower(pathNames[0].replace(/-/g, ' ')))
	}

	return (
		<Heading as="h1" className="-mt-2 px-1" data-testid="common.pageTitle.title" size="xl">{title}</Heading>
	)
}

export default PageTitle