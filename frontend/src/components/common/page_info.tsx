import { FC, ReactNode } from 'react'

import { sanitizeProps } from '@/helpers/component'

import Breadcrumb from '@/components/common/breadcrumb'
import PageTitle from '@/components/common/page_title'

import { With, type WithComponentProps, type WithContainerProps } from '@/components/ui/with'

export type PageInfoProps = {
	breadcrumbTitle?: ReactNode
	hideBreadcrumb?: boolean
	hideTitle?: boolean
	removeBreadcrumb?: number | number[],
	title?: ReactNode
}

/**
 * page information
 * @param props PageInfo props
 * @param props.breadcrumbTitle the title from the breadcrumbs (defaults to translation or url)
 * @param props.hideBreadcrumb hide breadcrumbs
 * @param props.hideTitle hide the page title
 * @param props.removeBreadcrumb remove breadcrumbs from the breadcrumb tree
 * @param props.title the page title
 * @param props.withParams used by ui with component
 * @returns the page information
 */
export const PageInfoComponent: FC<WithComponentProps<PageInfoProps>> = ({
	breadcrumbTitle,
	hideBreadcrumb,
	hideTitle,
	removeBreadcrumb,
	title,
	withParams,
}) => (
	<>
		{!hideBreadcrumb && (<Breadcrumb removeBreadcrumb={removeBreadcrumb} title={breadcrumbTitle || title} withParams={withParams}/>)}
		{!hideTitle && (<PageTitle title={title} withParams={withParams}/>)}
	</>
)

/**
 * page information
 * @param props PageInfo props
 * @param props.breadcrumbTitle the title from the breadcrumbs (defaults to translation or url)
 * @param props.hideBreadcrumb hide breadcrumbs
 * @param props.hideTitle hide the page title
 * @param props.removeBreadcrumb remove breadcrumbs from the breadcrumb tree
 * @param props.title the page title
 * @returns the page information
 */
export const PageInfo = (props: WithContainerProps<PageInfoProps>) => (
	<With<PageInfoProps> component={PageInfoComponent} {...sanitizeProps(props)}/>
)

export default PageInfo