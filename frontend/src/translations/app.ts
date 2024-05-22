import { developerPages } from './developer'

export type AllowedKeys = {
	[key: string]: {
		[key: string]: object | string
	}
}

export type App = {
	[key: string]: {
		breadcrumbTitle: string,
		pageTitle: string
		urlName: string
	}
}

export const app = {
	'/': {
		breadcrumbTitle: 'Home',
		pageTitle: 'Home',
		urlName: '',
	},
	'/account': {
		addresses: 'My Addresses',
		breadcrumbTitle: 'My Account',
		pageTitle: 'My Account',
		recentOrders: 'Recent Orders',
		urlName: 'account',
	},
	'/account/addresses': {
		breadcrumbTitle: 'My Addresses',
		pageTitle: 'My Addresses',
		urlName: 'addresses',
	},
	'/account/addresses/[operation]/[[,,,orderId]]': {
		breadcrumbTitle: '{operation} Address',
		operation: {
			create: 'Create',
			update: 'Change',
		},
		pageTitle: '{operation} Address',
		urlName: '',
	},
	'/account/orders': {
		allOrders: 'All Orders',
		breadcrumbTitle: 'My Orders',
		pageTitle: 'My Orders',
		urlName: 'orders',
	},
	'/account/orders/[orderId]': {
		addressTitle: 'Shipping Address',
		breadcrumbTitle: '',
		city: 'City',
		line1: 'Line 1',
		line2: 'Line 2',
		orderDate: 'Order Date',
		orderFriendlyId: 'Order #',
		orderItemsTitle: 'Order Items',
		orderTitle: 'Order Details',
		orderTotal: 'Total',
		pageTitle: '',
		postcode: 'Postcode',
		shippingTotal: 'Shipping',
		titlePrefix: 'Order: ',
		urlName: '',
		viewProduct: 'View',
	},
	'/categories': {
		breadcrumbTitle: 'Categories',
		pageTitle: 'Categories',
		urlName: 'categories',
	},
	'/categories/[categoryId]': {
		breadcrumbTitle: '',
		pageTitle: '',
		urlName: '',
	},
	'/categories/[categoryId]/[categorySlug]/[productId]/[,,,slug]': {
		breadcrumbTitle: '',
		pageTitle: '',
		productDescription: 'Product Information',
		urlName: '',
	},
	'/login': {
		breadcrumbTitle: 'Login',
		pageTitle: 'Login',
		urlName: 'login',
	},
	'/shopping_cart': {
		breadcrumbTitle: 'Shopping Cart',
		pageTitle: 'Shopping Cart',
		urlName: 'shopping_cart',
	},
	'/shopping_cart/checkout': {
		breadcrumbTitle: 'Checkout',
		pageTitle: 'Checkout',
		urlName: 'checkout',
	},
	'not-found': {
		breadcrumbTitle: 'Not Found',
		pageTitle: 'Not Found',
		urlName: '404',
	},
	...developerPages,
}

/* This checks that app has the keys defined in App
   We cant apply the type directly to the object because it breaks type checking for keys when using the t() function
   So when you see an error here its because you are missing a required key from app */
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
const appMustMatch: AllowedKeys & App = app

export default app