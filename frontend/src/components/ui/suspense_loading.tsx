import { type ExoticComponent, FC, ReactNode, Suspense, type SuspenseProps } from 'react'

import { sanitizeProps } from '@/helpers/component'

import { type MergeElement } from '@/components/ui/ui'

import { Loading, LoadingProps } from './loading'

export type SuspenseLoadingProps = MergeElement<
	LoadingProps, {
		children: ReactNode
		suspenseProps?: Omit<ExoticComponent<SuspenseProps>, 'fallback'>
	}>


/**
 * Shows loading animation while suspense is active
 * @param props SuspenseLoading props
 * @param props.children children
 * @param props.suspenseProps react <Suspense> props
 * @returns loading animation when suspense, children when not suspense
 */
export const SuspenseLoading: FC<SuspenseLoadingProps> = ({ children, suspenseProps, ...props }: SuspenseLoadingProps) => (
	<Suspense fallback={<Loading {...sanitizeProps(props)}/>} {...sanitizeProps(suspenseProps)}>
		{children}
		{/* <Loading {...sanitizeProps(props)} /> */}
	</Suspense>
)

export default SuspenseLoading