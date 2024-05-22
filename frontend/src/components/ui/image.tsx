import NextImage, { ImageProps as NextImageProps } from 'next/image'
import { FC } from 'react'

import { sanitizeProps } from '@/helpers/component'

export type ImageProps = {
	responsive?: boolean
	source?: 'backend' | 'frontend'
} & NextImageProps

/**
 * Styled image
 * @param props Image props
 * @param props.responsive if the image is responsive (automatically resizes to container width)
 * @param props.sizes the size of the image
 * @param props.source the source for the image
 * @param props.src the image or url for an image
 * @param props.style the style for the image
 * @returns the image
 */
export const Image: FC<ImageProps> = ({ responsive = false, sizes = undefined, source = 'frontend', src, style = undefined, ...props }) => {
	if (source === 'backend' && !src) {
		throw new Error('src cannot be blank when using source = backend')
	}

	if (responsive) {
		style = responsive ? { height: 'auto', width: '100%', ...style } : style
		sizes = `${sizes} 100vw`
	}

	if (source === 'backend' && typeof src === 'string') {
		src = `http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:${process.env.NEXT_PUBLIC_BACKEND_PORT}${src}`
	}

	return (
		<NextImage sizes={sizes} src={src} style={style} {...sanitizeProps(props)} />
	)
}

export default Image