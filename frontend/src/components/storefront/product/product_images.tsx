'use client'

import { FC, useState } from 'react'

import { Product } from '@/graphql/queries/products'
import { sanitizeProps } from '@/helpers/component'

import { Grid, GridProps, GridSpan } from '@/components/ui'

import { ProductImage } from './product_image'

export type ProductImagesProps = {
	product: Product
} & GridProps

/**
 * all image for product
 * @param props ProductImages props
 * @param props.product the product
 * @returns the image
 */
export const ProductImages: FC<ProductImagesProps> = ({ product, ...props }) => {
	const [currentImage, setCurrentImage] = useState<Product['image']>(product.images && product.images[0])
	const [currentPosition, setCurrentPosition] = useState<number>(1)

	return (
		<Grid size={12} verticalAlign="top" {...sanitizeProps(props)}>
			<GridSpan data-testid="storefront.product.productImages.selectedImage" size={{ default: 12, lg: 8 }}>
				{currentImage
					? <ProductImage className="rounded-lg shadow-sm shadow-gray-500" data-test-key={currentImage.id} data-test-position={currentPosition} image={currentImage} product={product} size="large"/>
					: null}
			</GridSpan>
			<GridSpan size={{ default: 12, lg: 4 }}>
				<Grid data-testid="storefront.product.productImages.availableImages" gap="medium" size={{ default: 4, sm: 6, lg: 3 }} verticalAlign="top">
					{product.images?.map((image, i) => (
						<ProductImage
							className={`cursor-pointer ${currentImage === image && 'ring-2 ring-yellow-500 '} rounded-lg shadow-sm shadow-gray-500 hover:opacity-75 hover:transition-none`}
							data-selected={`${currentImage === image ? 'true' : 'false'}`} data-test-key={image.id} data-test-position={i + 1}
							image={image} key={image.imageThumbnail} onClick={() => {
								setCurrentImage(image)
								setCurrentPosition(i + 1)
							}}
							product={product}
							size="thumbnail"
						/>
					))}
				</Grid>
			</GridSpan>
		</Grid>
	)
}

export default ProductImages
