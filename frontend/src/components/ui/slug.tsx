import { FC } from 'react'
import slugify from 'slugify'

import { Category } from '@/graphql/types/category'
import { Product } from '@/graphql/types/product'
import { sanitizeProps } from '@/helpers/component'
import { redirect } from '@/navigation'
import { Locale } from '@/translations'

import { Link, LinkProps } from './link'

export type SlugPropsCommon = {
	id: string
	linkType?: LinkProps['type']
	name: string
} & Omit<LinkProps, 'type'>

export type SlugPropsCategory = {
	categoryId?: never
	categoryName?: never
	type: 'category'
} & Pick<Category, 'id' | 'name'> & SlugPropsCommon

export type SlugPropsProduct = {
	categoryId: string
	categoryName: string
	type: 'product'
} & Pick<Product, 'id' | 'name'> & SlugPropsCommon

export type SlugProps = SlugPropsCategory | SlugPropsProduct

/**
 * generate the slug url for a product of category
 * @param props getSlug props
 * @param props.categoryId the category id (when type is product)
 * @param props.categoryName the category name (when type is product)
 * @param props.id (when type is product => product id, when type is category => category id)
 * @param props.name (when type is product => product name, when type is category => category name)
 * @param props.type product or category
 * @returns the slug url
 */
export const getSlug = ({ categoryId, categoryName, id, name, type }: Pick<SlugProps, 'categoryId' | 'categoryName' | 'id' | 'name' | 'type'>): Parameters<typeof redirect>[0] => {
	const slug = slugify(name, {
		lower: true,
		trim: true,
	})

	if (type === 'product' && categoryName) {
		const categorySlug = slugify(categoryName, {
			lower: true,
			trim: true,
		})
		return `/categories/${categoryId}/${categorySlug}/${id}/${slug}` as keyof Locale['app'] as Parameters<typeof redirect>[0]
	}

	return `/categories/${id}/${slug}` as keyof Locale['app'] as Parameters<typeof redirect>[0]
}

/**
 * Slug url for products or categories
 * @param props Slug props
 * @param props.categoryId the category id (when type is product)
 * @param props.categoryName the category name (when type is product)
 * @param props.children children
 * @param props.id (when type is product => product id, when type is category => category id)
 * @param props.linkType the link type
 * @param props.name (when type is product => product name, when type is category => category name)
 * @param props.type product or category
 * @returns the Slug
 */
export const Slug: FC<SlugProps> = ({ categoryId, categoryName, children, id, linkType = 'text', name, type, ...props }) => (
	<Link data-testid={`ui.slug.${type}Link`}
		{...{ ...sanitizeProps(props), href: getSlug({ categoryId, categoryName, id, name, type }), type: linkType } as LinkProps}
	>
		{children}
	</Link>
)


export default Slug