type AllowedKeys = {
	[key: string]: {
		[key: string]: object | string
	}
}

export type Component = {
	[key: string]: {
		description?: string
	}
}

export const component = {
	account: {
		customer: {
			addressList: {
				changeLabel: 'Edit Address',
				createLabel: 'Add New Address',
				deleteFailed: 'There was a problem removing the address please try again',
				deleteLabel: 'Delete',
				deleteSuccess: 'The address has been deleted',
				title: 'All Addresses',
			},
			saveAddress: {
				city: 'City',
				line1: 'Line 1',
				line2: 'Line 2',
				postcode: 'Postcode',
				saveFailure: 'There was a problem saving your address please check the details and try again',
				saveSuccess: 'Your address has been saved',
				submit: '{operation} Address',
			},
		},
		order: {
			orderList: {
				viewOrder: 'View Order',
			},
		},
		pageContent: {
			menu: {
				addresses: 'My Addresses',
				home: 'My Account',
				orders: 'My Orders',
			},
			menuTitle: 'My Account',
		},
	},

	common: {
		account: {
			accountNavitem: {
				menu: {
					account: 'My Account',
					addresses: 'My Addresses',
					logout: 'Logout',
					orders: 'My Orders',
				},
				menuTitle: 'My Account',
			},
		},
		customer: {
			login: {
				emailAddress: 'Email Address',
				loginAction: 'Login',
				loginError: 'Login was not successful due to an error, please try again',
				loginFailed: 'We were unable to authenticate your details, please check and try again',
				loginSuccess: 'You are now logged in to your account',
				password: 'Password',
				title: 'Login',
			},
			useCustomer: {
				logoutSuccess: 'You have been logged out of your account successfully',
			},
		},
		footer: {},
		header: {
			menu: {
				allCategories: 'All Categories',
				browseByCategory: 'Browse by Category',
			},
		},
	},

	crud: {
		change: {
			create: 'Create',
			failedMessage: 'There was a problem saving the item please check the details and try again',
			successMessage: 'The item has been saved',
			update: 'Update',
		},
		list: {
			change: 'Edit',
			delete: 'Delete',
			failedDeleteMessage: 'There was a problem removing the item please try again',
			successDeleteMessage: 'The item has been deleted',
			update: 'Update',
		},
	},

	storefront: {
		product: {
			categories: {
				title: 'All Categories',
			},
		},

		shoppingCart: {
			addToCart: {
				addToCart: 'Add to Cart',
				errorAddtoCart: 'We were unable to add the product to your cart, please refresh the page and try again',
				purchase: 'Purchase',
				quantityInCart: 'You have {quantity} of this item in your',
				shoppingCartLink: 'Shopping Cart',
			},
			checkout: {
				address: {
					city: 'City',
					line1: 'Line 1',
					line2: 'Line 2',
					newAddress: 'New Address',
					postcode: 'Post Code',
				},
				buyButton: 'Complete Purchase',
				createNewAccount: 'Create New Account',
				createOrderFailed: 'There was a problem creating the order please check the details and try again',
				createOrderSuccess: 'Thankyou for your purchase, your order has been placed and here is your order information',
				customer: {
					confirmPassword: 'Confirm Password',
					emailAddress: 'Email Address',
					firstName: 'First Name',
					lastName: 'Last Name',
					password: 'Password',
					phoneNumber: 'Phone Number',
				},
				details: 'Details',
				existingAddresses: 'Saved Addresses',
				existingCustomer: 'Existing Customer',
				newCustomer: 'New Customer',
				newCustomerParagraph: 'Simply follow the prompts during checkout to create your account',
				orderError: 'An error occurred completing your order please try again',
				selectAddress: 'Choose Address',
				shipping: 'Shipping',
				shippingLabel: 'Shipping',
				shippingOptions: 'Shipping Options',
				subtotal: 'Subtotal',
				tax: 'VAT',
				total: 'Total',
				totalsLabel: 'Total',
			},
			largeCart: {
				backToBrowse: 'Back to Shopping',
				browseProducts: 'Browse Products',
				emptyShoppingCart: 'Your Shopping cart is Empty',
				proceedToCheckout: 'Proceed to Checkout',
				shipping: 'Shipping',
				shippingMessage: 'Calculated at Checkout',
				subtotal: 'Subtotal',
				tax: 'VAT',
				title: 'Shopping Cart',
				total: 'Total',
			},
			smallCart: {
				checkoutLink: 'Checkout',
				otherItems: 'and {count} other item(s)',
				shoppingCartLink: 'Shopping Cart',
				title: 'Shopping Cart',
			},
		},
	},

	ui: {
		form: {
			errors: {
				fieldsHaveErrorsTryAgain: 'field(s) have errors, please check and try again',
			},
			submit: {
				fieldsHaveErrors: 'field(s) have errors',
			},
			validation: {
				criteria: {
					alphanumericExtra: 'can only include letters, number, spaces and hyphens',
					emailAddress: 'must be a valid email address',
					password: {
						lowercase: 'Lowercase character(s)',
						message: 'must be a secure password',
						minLength: 'characters in Length',
						number: 'Number(s)',
						special: 'Symbol(s) / Special Character(s)',
						uppercase: 'Uppercase character(s)',
					},
					trackingNumber: 'must be a valid Tracking Number',
					zendeskTicket: 'must be a valid Zendesk Ticket Number',
				},
				rules: {
					allSelected: 'All options must be selected for',
					doesNotMatch: 'does not match field',
					fileTooLarge: 'must be a valid phone number',
					integer: 'must be valid whole number',
					maxDate: 'must be a maximum date of',
					maxLength: 'must be a maximum of {max} characters',
					maxNumber: 'must be a maximum value of {max}',
					maxSelected: 'Must select a maximum of {max} options for',
					minDate: 'must be a minimum date of',
					minLength: 'must be a minimum of {min} characters',
					minNumber: 'must be a minimum value of {min}',
					minSelected: 'Must select a minimum of {min} options for',
					mustMatch: 'Must Match',
					required: 'is required',
					validPhoneNumber: 'must be a valid phone number',
				},
			},
		},
		navbar: {
			navbar: {
				openMenu: 'Open main menu',
			},
		},
	},
}

/* This checks that app has the keys defined in Component
   We cant apply the type directly to the object because it breaks type checking for keys when using the t() function
   So when you see an error here its because you are missing a required key from component */
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
const componentMustMatch: AllowedKeys & Component = component

export default component