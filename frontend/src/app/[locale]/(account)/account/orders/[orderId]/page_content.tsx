'use client'

import { gql, useSuspenseQuery } from '@apollo/client'
import { DocumentIcon, DocumentTextIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import type { NextPage } from 'next'

import { type Order, OrderProps, OrderResult } from '@/graphql/queries/orders'
import { logger } from '@/helpers/logger'
import { useTranslation } from '@/helpers/translation'

import PageContent from '@/components/account/page_content'
import PageInfo from '@/components/common/page_info'
import ProductImage from '@/components/storefront/product/product_image'

import { Currency, Date, Grid, GridSpan, Id, Panel, Slug } from '@/components/ui'
import { formatId } from '@/components/ui/id'
import ResponsiveTable from '@/components/ui/table/responsive_table'

export type OrderPageProps = {
	orderId: Order['id'],
}

/**
 * order details
 * @param props OrderPageContent props
 * @param props.orderId the order id
 * @returns page content
 */
const OrderPageContent: NextPage<OrderPageProps> = ({ orderId }: OrderPageProps) => {
	const t = useTranslation({ app: '/account/orders/[orderId]' })

	const result = useSuspenseQuery<OrderResult, OrderProps>(
			gql`
				query OrderPageQuery($id: ID) {
					orders(id: $id) {
						...orderDetails
					}
				}`,
			{ variables: { id: orderId } },
	)
	const order = result.data.orders && result.data.orders[0] as Order
	logger.debug('OrderPage', { order: order?.id })

	const title = `${t('titlePrefix')}${formatId(order?.friendlyId)}`

	const tax = order.totalAmount / (order.subtotalAmount + order.shippingAmount)

	return (
		<>
			<PageInfo breadcrumbTitle={title} title={title}/>

			<PageContent>
				<Panel.Panel>
					<Panel.Head icon={DocumentIcon}>{t('orderTitle')}</Panel.Head>
					<Panel.Body gap="none">
						<ResponsiveTable data={[
							[t('orderDate'), <Date data-testid="OrderPage.orderDate" date={order.createdAt} key={order.createdAt} options="orderDate"/>],
							[t('orderFriendlyId'), <Id data-testid="OrderPage.orderFriendlyId" key={order.friendlyId}>{order.friendlyId}</Id>],
							[t('shippingTotal'), <Currency data-testid="OrderPage.shippingTotal" key={order.totalAmount} value={order.shippingAmount * tax}/>],
							[t('orderTotal'), <Currency data-testid="OrderPage.orderTotal" key={order.totalAmount} value={order.totalAmount}/>],
						]} layout={{ default: 'left', lg: 'top' }}/>
					</Panel.Body>
				</Panel.Panel>

				<Panel.Panel>
					<Panel.Head icon={DocumentTextIcon}>{t('addressTitle')}</Panel.Head>
					<Panel.Body gap="none">
						<ResponsiveTable data={[
							[t('line1'), <span data-testid="OrderPage.address.line1" key={order.orderAddress.line1}>{order.orderAddress.line1}</span>],
							[t('line2'), <span data-testid="OrderPage.address.line2" key={order.orderAddress.line2}>{order.orderAddress.line2}</span>],
							[t('city'), <span data-testid="OrderPage.address.city" key={order.orderAddress.city}>{order.orderAddress.city}</span>],
							[t('postcode'), <span data-testid="OrderPage.address.postcode" key={order.orderAddress.postcode}>{order.orderAddress.postcode}</span>],
						]} layout={{ default: 'left', lg: 'top' }}/>
					</Panel.Body>
				</Panel.Panel>

				<Panel.Panel>
					<Panel.Head icon={ShoppingCartIcon}>{t('orderItemsTitle')}</Panel.Head>
					<Panel.Body>
						<Grid data-testid="OrderPage.lineItems">
							{order?.lineItems?.map((lineItem, index) => (
								<Grid className="group grid-cols-[70px_auto] md:grid-cols-[70px_auto]" data-test-key={lineItem.product.productId} data-test-position={index} data-testid="OrderPage.lineItem"
									gap={{ default: 'medium', xl: 'large', '2xl': 'large' }}
									key={lineItem.id} verticalAlign={{ default: 'top', md: 'middle' }}>
									<Slug categoryId={lineItem.product.product.category.id}
										categoryName={lineItem.product.product.category.name} id={lineItem.product.product.id}
										name={lineItem.product.product.name} type="product">
										{lineItem.product.product.image
											? <ProductImage className="rounded-lg shadow-sm shadow-gray-500 group-hover:opacity-75 group-hover:transition-none" image={lineItem.product.product.image}
													product={lineItem.product.product}
													size="thumbnail"/>
											: null}
									</Slug>
									<Grid className="h-full grid-cols-12 md:grid-cols-[auto_260px] xl:md:grid-cols-[auto_440px]" gap={{ default: 'xs', md: 'medium' }}>
										<GridSpan size={{ default: 12, md: 'auto' }} verticalAlign={{ default: 'top', md: 'none' }}>
											<Slug categoryId={lineItem.product.product.category.id} categoryName={lineItem.product.product.category.name} className="font-semibold" color="black"
												id={lineItem.product.product.id} name={lineItem.product.product.name}
												size={{ default: 'small', md: 'medium', xl: 'large' }} type="product">
												<span data-testid="OrderPage.productName">{lineItem.product.name}</span>
											</Slug>
										</GridSpan>
										<GridSpan size={{ default: 'auto', sm: 0 }}/>
										<GridSpan size={{ default: 12, md: 1 }}>
											<Grid className="h-fit" size={{ default: 3, md: 4 }}>
												<GridSpan align={{ default: 'start', md: 'end' }}>
													<Currency data-testid="OrderPage.productPrice" tax={true} value={lineItem.product.price}/>
												</GridSpan>

												<GridSpan align={{ default: 'end', md: 'end' }}>
													<Grid gap={1} size="flex">
														<span data-testid="OrderPage.lineItemQuantity">{lineItem.quantity}</span>
														<ShoppingCartIcon height={20}/>
													</Grid>
												</GridSpan>

												<GridSpan align="end" size={{ default: 0, md: 1 }}>
													<Currency data-testid="OrderPage.productSubtotal" tax={true} value={lineItem.product.price * lineItem.quantity}/>
												</GridSpan>

												<GridSpan align="end">
													<Slug categoryId={lineItem.product.product.category.id} categoryName={lineItem.product.product.category.name} data-testid="OrderPage.productLink"
														id={lineItem.product.product.id} name={lineItem.product.product.name} size="small"
														type="product">
														{t('viewProduct')}
													</Slug>
												</GridSpan>
											</Grid>
										</GridSpan>
									</Grid>
								</Grid>
							))}
						</Grid>
					</Panel.Body>
				</Panel.Panel>
			</PageContent>
		</>
	)
}

export default OrderPageContent