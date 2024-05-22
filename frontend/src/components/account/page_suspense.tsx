import { FC, ReactNode, Suspense } from 'react'

import PageContent from '@/components/account/page_content'

import { Loading } from '@/components/ui'

export type PageSuspenseProps = {
	children: ReactNode
	fallback: ReactNode
}

/**
 * loading animations for account page when Suspense
 * @param props PageSuspense props
 * @param props.children children
 * @param props.fallback loading animations when suspense
 * @returns account loading animation and fallback when suspense, children when not suspense
 */
export const PageSuspense: FC<PageSuspenseProps> = ({ children, fallback }) => (
	<Suspense fallback={
		<>
			<Loading className="w-80" layout={[1, 3, 3, 5]} type="block"/>
			<Loading className="w-40" layoutClassName="h-8" type="block"/>
			<PageContent>
				{fallback}
			</PageContent>
		</>
	}>
		{children}
	</Suspense>
)

export default PageSuspense