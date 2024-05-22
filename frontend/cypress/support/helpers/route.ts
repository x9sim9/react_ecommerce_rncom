import slugify from 'slugify'

/* -- Refactored from /components/ui/slug.tsx -- */
export type SlugPropsCommon = {
	id: string
	name: string
}

export type SlugPropsCategory = {
	categoryId?: never
	categoryName?: never
	type: 'category'
} & SlugPropsCommon

export type SlugPropsProduct = {
	categoryId: string
	categoryName: string
	type: 'product'
} & SlugPropsCommon

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
export const getSlug = ({ categoryId, categoryName, id, name, type }: Pick<SlugProps, 'categoryId' | 'categoryName' | 'id' | 'name' | 'type'>): string => {
	const slug = slugify(name, {
		lower: true,
		trim: true,
	})

	if (type === 'product' && categoryName) {
		const categorySlug = slugify(categoryName, {
			lower: true,
			trim: true,
		})
		return `/categories/${categoryId}/${categorySlug}/${id}/${slug}`
	}

	return `/categories/${id}/${slug}`
}

/* -- Refactored from /components/ui/slug.tsx -- */


/**
 * remove the locale path part from the url
 * @param url the url to parse
 * @returns the new url
 */
export const removeLocale = (url) => url.split('/').slice(2).join('/')

export const routes = {
	account: {
		accountHomePage: '/account',
		addressesPage: '/account/addresses',
		addressPageCreate: '/account/addresses/create',
		addressPageUpdate: ({ addressId }: { addressId: number | string }) => `/account/addresses/update/${addressId}`,
		orderPage: ({ orderId }: { orderId: number | string }) => `/account/orders/${orderId}`,
		ordersPage: '/account/orders',
	},
	storefront: {
		categoriesPage: '/categories',
		categoryPage: (props: Pick<SlugProps, 'id' | 'name'>) => getSlug({ type: 'category', ...props }),
		checkoutPage: '/shopping_cart/checkout',
		homePage: '/',
		loginPage: '/login',
		productPage: (props: Pick<SlugProps, 'categoryId' | 'categoryName' | 'id' | 'name'>) => getSlug({ type: 'product', ...props }),
		shoppingCartPage: '/shopping_cart',
	},

}

export default routes