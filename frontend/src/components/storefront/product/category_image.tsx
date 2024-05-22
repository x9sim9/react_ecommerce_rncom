'use client'

import type { StaticImageData } from 'next/image'
import { FC } from 'react'

import NoImageBlurBase64 from '@/assets/images/no_image_blur_base64'
import NoImageLarge from '@/assets/images/no_image_large.jpg'
import NoImageThumbnail from '@/assets/images/no_image_thumbnail.jpg'
import type { Maybe } from '@/graphql/schema/graphql'
import { Category } from '@/graphql/types'
import { sanitizeProps } from '@/helpers/component'

import { Image, ImageProps } from '@/components/ui'

export type CategoryImageProps = {
	category: Category
	size: 'large' | 'thumbnail'
} & Omit<ImageProps, 'alt' | 'blurDataURL' | 'height' | 'image' | 'placeholder' | 'size' | 'src' | 'width'>

type SizesProps = {
	[key in CategoryImageProps['size']]: {
		height: number;
		width: number;
	};
}

type SourcesProps = {
	[key in CategoryImageProps['size']]: Maybe<string | undefined> | StaticImageData;
}

/**
 * the category image
 * @param props CategoryImage props
 * @param props.category the category
 * @param props.className html class names
 * @param props.size the image size
 * @returns the image
 */
export const CategoryImage: FC<CategoryImageProps> = ({ category, className, size, ...props }) => {
	const sizes: SizesProps = {
		large: { height: 600, width: 600 },
		thumbnail: { height: 330, width: 330 },
	}

	const src: SourcesProps = {
		large: category.imageLarge || NoImageLarge,
		thumbnail: category.imageThumbnail || NoImageThumbnail,
	}

	return src[size] && (category.imageBlur || NoImageBlurBase64)
		? (
				<Image alt={category.name} blurDataURL={category.imageBlur || NoImageBlurBase64} className={`opacity-25 transition-opacity duration-[1s] ${className}`}
					data-testid="storefront.product.categoryImage.image"
					onLoad={(image) => image.currentTarget.classList.remove('opacity-25')}
					placeholder="blur" responsive source="backend" src={src[size] as string} {...sizes[size]} {...sanitizeProps(props)}/>
			)
		: null
}

export default CategoryImage