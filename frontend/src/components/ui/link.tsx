import { LinkProps as NextLinkProps } from 'next/link'
import { AnchorHTMLAttributes, ComponentProps, DetailedHTMLProps, FC, ReactNode } from 'react'

import { sanitizeProps } from '@/helpers/component'
import { Link as NextLink, pathnames } from '@/navigation'

import { buttonColors } from '@/components/ui/button'
import { BasicButtonColors, BasicButtonSizes } from '@/components/ui/button/basic_button'
import { type ParagraphSizesText, textSizes } from '@/components/ui/paragraph'
import { type Breakpoints, type MergeElement, parseUi, type UiOptions } from '@/components/ui/ui'
import { With, type WithComponentProps, type WithContainerProps } from '@/components/ui/with'

import { Button, type ButtonProps, type ButtonPropsButton } from './button'

export type LinkColorsText = 'black' | 'danger' | 'info' | 'primary' | 'secondary' | 'success' | 'warning'
		| 'white'
export type LinkSizesText = ParagraphSizesText
export type LinkHighlights = 'simple' | 'standard'
export type LinkColors = BasicButtonColors | LinkColorsText
export type LinkSizes = BasicButtonSizes | LinkSizesText

export type LinkPropsShared = {
	active?: boolean
	align?: 'center' | 'end' | 'start',
	children?: (({ active }: { active: boolean }) => ReactNode) | ReactNode | string
	className?: string
	icon?: FC<ComponentProps<'svg'>>
}

export type LinkPropsButton = MergeElement<
	ButtonProps,
		{
			highlight?: never
			type?: 'button'
		} & LinkPropsShared>

export type LinkPropsText =
		{
			color?: Breakpoints<LinkColorsText>
			highlight?: keyof UiOptions<LinkHighlights>
			size?: Breakpoints<LinkSizesText>
			type?: 'heading' | 'text'
		} & LinkPropsShared

export type LinkPropsBasic =
		{
			color?: never
			highlight?: never
			size?: never
			type?: 'basic'
		} & LinkPropsShared

export type LinkPropsHtml = MergeElement<
	DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
		LinkPropsBasic | LinkPropsButton | LinkPropsText>

export type LinkPropsNext = MergeElement<
	NextLinkProps,
		LinkPropsBasic | LinkPropsButton | LinkPropsText>

export type LinkProps = LinkPropsHtml | LinkPropsNext

/**
 * Link styles to use with parseUi
 * @returns link styles
 */
export const linkColors = (): UiOptions<LinkColors> => ({
	...buttonColors({ type: 'button' }),
	black: 'text-black', // Tailwind: sm:text-black  md:text-black  lg:text-black  xl:text-black  2xl:text-black
	danger: 'text-red-500', // Tailwind: sm:text-red-500  md:text-red-500  lg:text-red-500  xl:text-red-500  2xl:text-red-500
	info: 'text-cyan-500', // Tailwind: sm:text-cyan-500  md:text-cyan-500  lg:text-cyan-500  xl:text-cyan-500  2xl:text-cyan-500
	primary: 'text-blue-500', // Tailwind: sm:text-blue-500  md:text-blue-500  lg:text-blue-500  xl:text-blue-500  2xl:text-blue-500
	secondary: 'text-gray-500', // Tailwind: sm:text-gray-500  md:text-gray-500  lg:text-gray-500  xl:text-gray-500  2xl:text-gray-500
	success: 'text-green-500', // Tailwind: sm:text-green-500  md:text-green-500  lg:text-green-500  xl:text-green-500  2xl:text-green-500
	warning: 'text-yellow-500', // Tailwind: sm:text-yellow-500  md:text-yellow-500  lg:text-yellow-500  xl:text-yellow-500  2xl:text-yellow-500
	white: 'text-white', // Tailwind: sm:text-white  md:text-white  lg:text-white  xl:text-white  2xl:text-white
})

/**
 * Link sizes to use with parseUi
 * @param type the link type
 * @returns link sizes
 */
export const linkSizes = (type: LinkProps['type']): UiOptions<LinkSizesText> => ({
	...textSizes,
	default: `${type === 'heading' ? 'font-extrabold tracking-tight no-underline' : ''}`,
} as UiOptions<LinkSizesText>)

const omitCommon = {
	active: undefined,
	align: undefined,
	highlight: undefined,
	size: 'medium' as const,
	// icon: undefined,
}
type UnionOverrideKeys<T, U> = Omit<T, keyof U> & U

type MakeUndefined<Target, Key extends string> = {
	[k in Key]: undefined
} & Omit<Target, Key>

/**
 * Styled links compatible with NextJS and Next Intl
 * @param props Link props
 * @param props.active if the link is active (default is active if href matches current url, but can be overridden)
 * @param props.align the alignment for the link
 * @param props.children the name of the link
 * @param props.className html class names
 * @param props.color color style
 * @param props.highlight highlight style
 * @param props.href the target destination when clicked
 * @param props.icon the @heroicon to use
 * @param props.size the size of the link
 * @param props.type the link type
 * @param props.withParams used by ui with component
 * @returns the link
 */
const LinkComponent = ({
	active = undefined, align, children, className, color = 'primary', highlight = 'simple', href, icon,
	size, type = 'text', withParams, ...props
}: WithComponentProps<LinkProps>) => {
	const Icon = icon

	const pathName = withParams.path

	if (active === undefined) {
		active = pathName === href
	}

	const aligns: UiOptions<LinkPropsShared['align']> = {
		center: 'text-center', // Tailwind: sm:justify-self-center  md:justify-self-center  lg:justify-self-center  xl:justify-self-center  2xl:justify-self-center
		end: 'text-end', // Tailwind: sm:justify-self-end  md:justify-self-end  lg:justify-self-end  xl:justify-self-end  2xl:justify-self-end
		start: 'text-start', // Tailwind: sm:justify-self-start  md:justify-self-start  lg:justify-self-start  xl:justify-self-start  2xl:justify-self-start
	}

	const sizes: UiOptions<LinkSizesText> = {
		...linkSizes(type),
	}

	const colors: UiOptions<LinkColors> = {
		...linkColors(),
	}

	const highlights: UiOptions<LinkHighlights> = {
		default: `${active ? 'cursor-default' : ''}`,
		simple: `${color !== 'none' && typeof children === 'string' && (active ? 'font-semibold' : '')}`,
		standard: `${color !== 'none' && typeof children === 'string' && (active ? 'font-bold' : 'underline')}`,
	}

	const styles = ['heading', 'text'].includes(type)
		? {
				colors: { options: colors, selected: color },
				highlights: { options: highlights, selected: highlight },
				sizes: { options: sizes, selected: size },
			}
		: undefined

	const containerStyles = {
		aligns: { options: aligns, selected: align },
	}

	const ui = parseUi({
		className: `${className} ${icon && children ? 'flex items-center' : ''} font-semibold decoration-gray-500 underline-offset-[4px] group-hover:underline hover:underline group-hover:drop-shadow-md hover:drop-shadow-md`,
		name: 'Link',
		styles,
	})

	children = typeof children === 'function' ? children({ active }) : children

	return (
		href?.toString().match(/^(http|www|mailto|tel)/)
			? (
					<a {...ui.attributes} className={ui.className} {...active ? { 'data-active': true } : {}}
						href={href as LinkPropsHtml['href']} {...sanitizeProps(props, ['href'] as const) as DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>}>
						{['basic', 'heading', 'text'].includes(type) && (
							<>
								{Icon ? <Icon className={`inline-block size-5 ${children ? 'mr-1' : ''}`}/> : null}
								{children}
							</>
						)}
						{type === 'button' && (
							<Button color={color as ButtonPropsButton['color']} {...active ? { 'data-active': true } : {}}
								size={size as ButtonPropsButton['size']} {...sanitizeProps(props, ['color', 'size'] as const) as ButtonPropsButton}>
								{Icon ? <Icon className={`inline-block size-5 ${children ? 'mr-1' : ''}`}/> : null}
								{children}
							</Button>
						)}
					</a>
				)
			: (
					<NextLink {...ui.attributes} className={ui.className} {...active ? { 'data-active': true } : {}}
									// @ts-expect-error throws typescript error as it cannot compare href against the navigation
						href={href as keyof typeof pathnames} {...sanitizeProps(props, ['className', 'href'] as const) as Omit<NextLinkProps, 'className' | 'href'>}>
						{['basic', 'heading', 'text'].includes(type) && (
							<>
								{Icon ? <Icon className={`inline-block size-5 ${children ? 'mr-1' : ''}`}/> : null}
								{children}
							</>
						)}
						{type === 'button' && (
							<Button color={color as ButtonPropsButton['color']} {...active ? { 'data-active': true } : {}}
								size={size as ButtonPropsButton['size']} {...sanitizeProps(props, ['color', 'size'] as const) as ButtonPropsButton}>
								{Icon ? <Icon className={`inline-block size-5 ${children ? 'mr-1' : ''}`}/> : null}
								{children}
							</Button>
						)}
					</NextLink>
				)
	)
}

/**
 * Styled links compatible with NextJS and Next Intl
 * @param props Link props
 * @param props.active if the link is active (default is active if href matches current url, but can be overridden)
 * @param props.align the alignment for the link
 * @param props.children the name of the link
 * @param props.className html class names
 * @param props.color color style
 * @param props.highlight highlight style
 * @param props.href the target destination when clicked
 * @param props.icon the @heroicon to use
 * @param props.size the size of the link
 * @param props.type the link type
 * @returns the link
 */
export const Link = (props: WithContainerProps<LinkProps>) => (
	<With<LinkProps> component={LinkComponent} {...sanitizeProps(props)}/>
)

LinkComponent.displayName = 'Link'

export default Link
