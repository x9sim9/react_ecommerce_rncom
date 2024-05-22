import { newtonsCradle } from 'ldrs'
import { forEach, merge, set, transform } from 'lodash'
import { FC } from 'react'
import Skeleton, { SkeletonProps } from 'react-loading-skeleton'

import { sanitizeProps } from '@/helpers/component'

import { Grid, GridGaps, type GridProps, type GridSizes, type GridWidths } from '@/components/ui/grid'
import { GridSpan, type GridSpanProps, GridSpanSizes } from '@/components/ui/grid_span'
import { parseUi, type UiOptions } from '@/components/ui/ui'

export type LoadingTypes = 'block' | 'contentBlock' | 'panel'
export type LoadingWidths = GridWidths
export type LoadingGaps = GridGaps

typeof window !== 'undefined' && newtonsCradle.register()

const loadingTypes: UiOptions<LoadingTypes> = {
	block: '',
	contentBlock: '',
	panel: 'min-h-12 px-3 py-2',
}

type LoadingPropsLayoutValue = (number | string)[] | number | string

type LoadingPropsLayoutValueBreakpointsOnly = {
	'2xl'?: GridSpanSizes[]
	default?: GridSpanSizes[]
	lg?: GridSpanSizes[]
	md?: GridSpanSizes[]
	sm?: GridSpanSizes[]
	xl?: GridSpanSizes[]
}

type LoadingPropsLayoutValueBreakpoints = GridSpanSizes[] | LoadingPropsLayoutValueBreakpointsOnly

export type LoadingProps = {
	className?: string,
	containerProps?: GridProps
	gap?: LoadingGaps
	layout?: LoadingPropsLayoutValueBreakpoints
	layoutClassName?: string,
	size?: GridSizes
	type: LoadingTypes
	width?: LoadingWidths
} & SkeletonProps

/**
 * Loading animations
 * @param props Loading props
 * @param props.className html class names
 * @param props.containerProps props for the Grid container
 * @param props.gap the gap between elements (default based on type)
 * @param props.layout the layout for the animations (defaults to one animation)
 * @param props.layoutClassName the html class names for each layout
 * @param props.size the size of Grid (defaults to 12)
 * @param props.type the Grid type
 * @param props.width the width of Grid (default based on type)
 * @returns the loading animations
 */
export const Loading: FC<LoadingProps> = ({ className, containerProps, gap, layout, layoutClassName, size = 12, type, width, ...props }) => {
	if (!gap) {
		gap = {
			block: 'xs',
			contentBlock: 'medium',
			panel: 3,
		}[type] as LoadingGaps
	}

	if (!width) {
		width = {
			block: 'none',
			contentBlock: 'full',
			panel: 'full',
		}[type] as LoadingWidths
	}

	const ui = parseUi({
		className: className,
		name: 'Loading',
		styles: {
			types: { options: loadingTypes, selected: type },
		},
	})

	const parseLayout = (current: LoadingPropsLayoutValueBreakpoints): Partial<GridSpanProps>[] => {
		switch (typeof current) {
			case 'number':
				return [{ size: current }]
			case 'object':
				if (Array.isArray(current)) {
					return current.map((item) => ({ size: item }))
				}
				// eslint-disable-next-line no-use-before-define
				return parseBreakpoints(current)
			default:
				return current
		}
	}

	const parseBreakpoints = (breakpoints: LoadingPropsLayoutValueBreakpointsOnly): Partial<GridSpanProps>[] => {
		type BreakpointGroups = { [key: string]: { [key: string]: number | string } }
		const breakpointGroups: BreakpointGroups[][] = []

		forEach(breakpoints, (breakpointValue, breakpoint) => {
			if (breakpointValue) {
				const layout = parseLayout(breakpointValue)

				if (Array.isArray(layout)) {
					layout.forEach((gridProps, index) => {
						if (!breakpointGroups[index]) {
							breakpointGroups[index] = []
						}

						const newGridProps = transform(gridProps, (newGridProps: BreakpointGroups, propValue, propKey) => {
							newGridProps[propKey] = set({}, breakpoint, propValue)
						})

						breakpointGroups[index].push(newGridProps)
					})
				} else {
					const newGridProps = transform(layout, (newGridProps: BreakpointGroups, propValue, propKey) => {
						newGridProps[propKey] = set({}, breakpoint, propValue)
					})

					breakpointGroups.push([newGridProps])
				}
			}
		})

		const gridProps: BreakpointGroups[] = []
		breakpointGroups.forEach((items) => {
			let result = {}

			items.forEach((item) => {
				result = merge(result, item)
			})

			gridProps.push(result)
		})

		return gridProps
	}

	const gridSpanProps: Partial<GridSpanProps>[] = layout ? parseLayout(layout) : [{ size: 12 }]

	return (
		<Grid {...ui.attributes} className={ui.className} gap={gap} size={size} width={width} {...sanitizeProps(containerProps)}>
			{gridSpanProps.map((props, index) => (
						// eslint-disable-next-line react/no-array-index-key
				<GridSpan {...sanitizeProps(props)} className={`h-full overflow-hidden rounded-md ${layoutClassName}`} key={index}>
					{type === 'contentBlock'
						? (
								<div className="size-full" key="loadingAnimation">
									<div className="relative left-1/2 top-1/2 z-10">
										<div className="size-fit -translate-x-1/2 -translate-y-3/4 opacity-20">
											<l-newtons-cradle color="black" size="100" speed="1.4"></l-newtons-cradle>
										</div>
									</div>
								</div>
							)
						: null}
					<div className={`h-full ${type === 'contentBlock' ? '-translate-y-full' : ''}`} key="loadingBlock">
						<Skeleton className="size-full" style={{ lineHeight: 'inherit' }} {...sanitizeProps(props)}/>
					</div>
				</GridSpan>
			))}
		</Grid>
	)
}

export default Loading