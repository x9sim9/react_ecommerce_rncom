'use client'

import type { StaticImageData } from 'next/image'
import { FC, useMemo, useState } from 'react'

import NoImageBlurBase64 from '@/assets/images/no_image_blur_base64'
import NoImageLarge from '@/assets/images/no_image_large.jpg'
import NoImageSmall from '@/assets/images/no_image_small.jpg'
import NoImageThumbnail from '@/assets/images/no_image_thumbnail.jpg'
import { Product, ProductImage as ProductImageType } from '@/graphql/types'
import { sanitizeProps } from '@/helpers/component'

import { Image, ImageProps } from '@/components/ui'

export type ProductImageProps = {
	image?: ProductImageType
	product: Product
	size: 'large' | 'small' | 'thumbnail'
} & Omit<ImageProps, 'alt' | 'blurDataURL' | 'height' | 'image' | 'placeholder' | 'size' | 'src' | 'width'>

type SizesProps = {
	[key in ProductImageProps['size']]: {
		height: number;
		width: number;
	};
}

type SourcesProps = {
	[key in ProductImageProps['size']]: StaticImageData | string;
}

/**
 * image for product
 * @param props ProductImage props
 * @param props.className html class names
 * @param props.image the product image
 * @param props.product the product
 * @param props.size the image size
 * @returns the image
 */
export const ProductImage: FC<ProductImageProps> = ({ className, image, product, size, ...props }) => {
	const [initialised, setInitialised] = useState<boolean>()

	useMemo(() => {
		setInitialised(false)
	}, [size, image])

	const sizes: SizesProps = {
		small: { height: 450, width: 450 },
		large: { height: 540, width: 960 },
		thumbnail: { height: 200, width: 200 },
	}

	const src: SourcesProps = {
		small: image?.imageSmall || NoImageSmall,
		large: image?.imageLarge || NoImageLarge,
		thumbnail: image?.imageThumbnail || NoImageThumbnail,
	}

	return (
		<Image alt={product.name} blurDataURL={image?.imageBlur || NoImageBlurBase64} className={`${initialised ? '' : 'opacity-25'} transition-opacity duration-[2s] ${className}`}
			data-testid="storefront.product.productImage.image"
			key={image?.imageBlur || NoImageBlurBase64}
			onLoad={(image) => setInitialised(true)}
			placeholder="blur" responsive source="backend" src={src[size]} {...sizes[size]} {...sanitizeProps(props)}/>
	)
}

export default ProductImage