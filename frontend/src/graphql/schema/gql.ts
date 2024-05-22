/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n\t\t\t\tquery OrderPageQuery($id: ID) {\n\t\t\t\t\torders(id: $id) {\n\t\t\t\t\t\t...orderDetails\n\t\t\t\t\t}\n\t\t\t\t}": types.OrderPageQueryDocument,
    "\n\t\t\tquery ProductPageQuery($id: ID) {\n\t\t\t\tproducts(id: $id) {\n\t\t\t\t\t...productDetails\n\t\t\t\t\tcategory {\n\t\t\t\t\t\t...categoryBasic\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}": types.ProductPageQueryDocument,
    "\n\t\t\tquery ProductPageStaticQuery {\n\t\t\t\tproducts {\n\t\t\t\t\t...productBasic\n\t\t\t\t\tcategory {\n\t\t\t\t\t\t...categoryBasic\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t": types.ProductPageStaticQueryDocument,
    "\n\t\t\tquery CategoryPageQuery($id: ID) {\n\t\t\t\tcategories(id: $id) {\n\t\t\t\t\t...categoryBasic\n\t\t\t\t\tproducts {\n\t\t\t\t\t\t...productBasic\n\t\t\t\t\t\t...productSmall\n\t\t\t\t\t\tprice\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t": types.CategoryPageQueryDocument,
    "\n\t\t\tquery CategoryPageStaticQuery {\n\t\t\t\tcategories {\n\t\t\t\t\t...categoryBasic\n\t\t\t\t}\n\t\t\t}\n\t\t": types.CategoryPageStaticQueryDocument,
    "\n\t\t\tquery CategoriesPageQuery {\n\t\t\t\tcategories {\n\t\t\t\t\t...categoryBasic\n\t\t\t\t\t...categoryThumbnail\n\t\t\t\t}\n\t\t\t}\n\t\t": types.CategoriesPageQueryDocument,
    "\n\t\t\tquery StorefrontLayoutQuery {\n\t\t\t\tcategories {\n\t\t\t\t\t...categoryBasic\n\t\t\t\t}\n\t\t\t}\n\t\t": types.StorefrontLayoutQueryDocument,
    "\n\t\t\tquery HomePageQuery {\n\t\t\t\tcategories {\n\t\t\t\t\t...categoryBasic\n\t\t\t\t}\n\t\t\t}\n\t\t": types.HomePageQueryDocument,
    " \n\t\t\t\t\t\t\t\tquery AddressListQuery {\n\t\t\t\t\t\t\t\t\taddresses {\n\t\t\t\t\t\t\t\t\t\t...addressAll\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}": types.AddressListQueryDocument,
    "\n\t\tquery UseAddressQuery($id: ID) {\n\t\t\taddresses(id: $id) {\n\t\t\t\t...addressAll\n\t\t\t}\n\t\t}": types.UseAddressQueryDocument,
    "\n\t\tquery OrderListQuery($id: ID) {\n\t\t\torders(id: $id) {\n\t\t\t\t...orderBasic\n\t\t\t}\n\t\t}": types.OrderListQueryDocument,
    "\n\tmutation MutationAddToCart($productId: ID!, $quantity: Int) {\n\t\taddToCart(input: { productId: $productId, quantity: $quantity }) {\n\t\t\tresult\n\t\t\terrors\n\t\t\tshowError\n\t\t\ttoken\n\t\t\tlineItem {\n\t\t\t\tid\n\t\t\t\tquantity\n\t\t\t\tproduct {\n\t\t\t\t\t... on Product {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tfriendlyId\n\t\t\t\t\t\tname\n\t\t\t\t\t\tprice\n\t\t\t\t\t\timage {\n\t\t\t\t\t\t\timageBlur\n\t\t\t\t\t\t\timageThumbnail\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcategory {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.MutationAddToCartDocument,
    "\n\tmutation MutationCreateOrder(\n\t\t$customerFirstName: String,\n\t\t$customerLastName: String,\n\t\t$customerEmailAddress: String,\n\t\t$customerPhoneNumber: String,\n\t\t$customerPassword: String,\n\t\t$customerConfirmPassword: String,\n\t\t$addressId: ID,\n\t\t$addressLine1: String,\n\t\t$addressLine2: String,\n\t\t$addressCity: String,\n\t\t$addressPostcode: String,\n\t\t$shippingId: ID!,\n\t) {\n\t\tcreateOrder(input: {\n\t\t\tcustomerFirstName: $customerFirstName,\n\t\t\tcustomerLastName: $customerLastName,\n\t\t\tcustomerEmailAddress: $customerEmailAddress,\n\t\t\tcustomerPhoneNumber: $customerPhoneNumber,\n\t\t\tcustomerPassword: $customerPassword,\n\t\t\tcustomerConfirmPassword: $customerConfirmPassword,\n\t\t\taddressId: $addressId,\n\t\t\taddressLine1: $addressLine1,\n\t\t\taddressLine2: $addressLine2,\n\t\t\taddressCity: $addressCity,\n\t\t\taddressPostcode: $addressPostcode,\n\t\t\tshippingId: $shippingId,\n\t\t}) {\n\t\t\tresult\n\t\t\terrors\n\t\t\tshowError\n\t\t\torderId\n\t\t\tcustomer {\n\t\t\t\t...sessionCustomer\n\t\t\t}\n\t\t}\n\t}\n": types.MutationCreateOrderDocument,
    "\n\tmutation MutationLogin($emailAddress: String!, $password: String!) {\n\t\tlogin(input: { emailAddress: $emailAddress, password: $password }) {\n\t\t\tresult\n\t\t\terrors\n\t\t\tshowError\n\t\t\ttoken\n\t\t\tsession {\n\t\t\t\tid\n\t\t\t\tcustomer {\n\t\t\t\t\tid\n\t\t\t\t\tfriendlyId\n\t\t\t\t\tfirstName\n\t\t\t\t\tlastName\n\t\t\t\t\temailAddress\n\t\t\t\t\tphoneNumber\n\t\t\t\t}\n\t\t\t\tshoppingCart {\n\t\t\t\t\tlineItems {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tquantity\n\t\t\t\t\t\tproduct {\n\t\t\t\t\t\t\t... on Product {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tfriendlyId\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\tprice\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\timage {\n\t\t\t\t\t\t\t\t\timageBlur\n\t\t\t\t\t\t\t\t\timageThumbnail\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\tcategory {\n\t\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.MutationLoginDocument,
    "\n\tmutation MutationSaveAddress($operation: Operation!, $id: ID, $line1: String, $line2: String, $city: String, $postcode: String) {\n\t\tsaveAddress(input: { operation: $operation, id: $id, line1: $line1, line2: $line2, city: $city, postcode: $postcode }) {\n\t\t\tresult\n\t\t\terrors\n\t\t\tshowError\n\t\t\taddress {\n\t\t\t\tid\n\t\t\t\tline1\n\t\t\t\tline2\n\t\t\t\tcity\n\t\t\t\tpostcode\n\t\t\t}\n\t\t}\n\t}\n": types.MutationSaveAddressDocument,
    "\n\tmutation MutationUpdateCartQuantity($productId: ID!, $quantity: Int!) {\n\t\tupdateCartQuantity(input: { productId: $productId, quantity: $quantity }) {\n\t\t\tresult\n\t\t\terrors\n\t\t\tshowError\n\t\t\tnewQuantity\n\t\t}\n\t}\n": types.MutationUpdateCartQuantityDocument,
    "\n\tquery QueryAddresses($id: ID) {\n\t\taddresses(id: $id) {\n\t\t\tid\n\t\t\tline1\n\t\t\tline2\n\t\t\tcity\n\t\t\tpostcode\n\t\t}\n\t}\n": types.QueryAddressesDocument,
    "\n\tfragment addressAll on Address {\n\t\tid\n\t\tline1\n\t\tline2\n\t\tcity\n\t\tpostcode\n\t}\n": types.AddressAllFragmentDoc,
    "\n\tquery QueryCategories($id: ID) {\n\t\tcategories(id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\timageBlur\n\t\t\timageThumbnail\n\t\t\timageLarge\n\t\t\tproducts {\n\t\t\t\tid\n\t\t\t\tfriendlyId\n\t\t\t\tname\n\t\t\t\tprice\n\t\t\t\timage {\n\t\t\t\t\timageBlur\n\t\t\t\t\timageThumbnail\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.QueryCategoriesDocument,
    "\n\tfragment categoryBasic on Category {\n\t\tid\n\t\tname\n\t}\n\n\tfragment categoryThumbnail on Category {\n\t\timageBlur\n\t\timageThumbnail\n\t}\n": types.CategoryBasicFragmentDoc,
    "\n\tquery QueryOrders($id: ID) {\n\t\torders(id: $id) {\n\t\t\tid\n\t\t\tfriendlyId\n\t\t\tcustomer {\n\t\t\t\tid\n\t\t\t\tfriendlyId\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\temailAddress\n\t\t\t\tphoneNumber\n\t\t\t}\n\t\t\torderAddress {\n\t\t\t\tid\n\t\t\t\tline1\n\t\t\t\tline2\n\t\t\t\tcity\n\t\t\t\tpostcode\n\t\t\t}\n\t\t\tlineItems {\n\t\t\t\tid\n\t\t\t\tquantity\n\t\t\t\tproduct {\n\t\t\t\t\t... on OrderProduct {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tprice\n\t\t\t\t\t\tproduct {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\timage {\n\t\t\t\t\t\t\t\timageBlur\n\t\t\t\t\t\t\t\timageThumbnail\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tcategory {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tsubtotalAmount\n\t\t\tshippingAmount\n\t\t\ttaxAmount\n\t\t\ttotalAmount\n\t\t\tcreatedAt\n\t\t}\n\t}\n": types.QueryOrdersDocument,
    "\n\tfragment orderBasic on Order {\n\t\tid\n\t\tfriendlyId\n\t\ttotalAmount\n\t\tcreatedAt\n\t\tlineItems {\n\t\t\tid\n\t\t}\n\t}\n\n\tfragment orderDetails on Order {\n\t\tid\n\t\tfriendlyId\n\t\torderAddress {\n\t\t\tid\n\t\t\tline1\n\t\t\tline2\n\t\t\tcity\n\t\t\tpostcode\n\t\t}\n\t\tlineItems {\n\t\t\tid\n\t\t\tquantity\n\t\t\tproduct {\n\t\t\t\t... on OrderProduct {\n\t\t\t\t\tname\n\t\t\t\t\tprice\n\t\t\t\t\tproduct {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t\timage {\n\t\t\t\t\t\t\timageBlur\n\t\t\t\t\t\t\timageThumbnail\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcategory {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tsubtotalAmount\n\t\tshippingAmount\n\t\ttaxAmount\n\t\ttotalAmount\n\t\tcreatedAt\n\t}\n": types.OrderBasicFragmentDoc,
    "\n\tquery QueryProducts($id: ID, $categoryId: Int, $orderBy: ProductOrderBy, $order: ProductOrder) {\n\t\tproducts(id: $id, categoryId: $categoryId, orderBy: $orderBy, order: $order) {\n\t\t\tid\n\t\t\tfriendlyId\n\t\t\tname\n\t\t\tdescription\n\t\t\tprice\n\t\t\tcategory {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t}\n\t\t\timages {\n\t\t\t\tid\n\t\t\t\timageBlur\n\t\t\t\timageThumbnail\n\t\t\t\timageSmall\n\t\t\t\timageLarge\n\t\t\t}\n\t\t}\n\t}\n": types.QueryProductsDocument,
    "\n\tfragment productBasic on Product {\n\t\tid\n\t\tname\n\t}\n\n\tfragment productThumbnail on Product {\n\t\timage {\n\t\t\timageBlur\n\t\t\timageThumbnail\n\t\t}\n\t}\n\n\tfragment productSmall on Product {\n\t\timage {\n\t\t\timageBlur\n\t\t\timageSmall\n\t\t}\n\t}\n\n\tfragment productLarge on Product {\n\t\timage {\n\t\t\timageBlur\n\t\t\timageLarge\n\t\t}\n\t}\n\n\tfragment productImages on Product {\n\t\timages {\n\t\t\tid\n\t\t\timageBlur\n\t\t\timageThumbnail\n\t\t\timageSmall\n\t\t\timageLarge\n\t\t}\n\t}\n\n\tfragment productDetails on Product {\n\t\t...productBasic\n\t\t...productImages\n\t\tfriendlyId\n\t\tname\n\t\tdescription\n\t\tprice\n\t}\n": types.ProductBasicFragmentDoc,
    "\n\tquery QuerySession {\n\t\tsession {\n\t\t\tid\n\t\t\tcustomer {\n\t\t\t\t...sessionCustomer\n\t\t\t}\n\t\t\tshoppingCart {\n\t\t\t\tlineItems {\n\t\t\t\t\tid\n\t\t\t\t\tquantity\n\t\t\t\t\tproduct {\n\t\t\t\t\t\t... on Product {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tfriendlyId\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\tprice\n\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\timage {\n\t\t\t\t\t\t\t\timageBlur\n\t\t\t\t\t\t\t\timageThumbnail\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tcategory {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.QuerySessionDocument,
    "\n\tfragment sessionCustomer on Customer {\n\t\tid\n\t\tfriendlyId\n\t\tfirstName\n\t\tlastName\n\t\temailAddress\n\t}\n": types.SessionCustomerFragmentDoc,
    "\n\tquery QueryShipping($id: ID) {\n\t\tshippings(id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\tdescription\n\t\t\tprice\n\t\t}\n\t}\n": types.QueryShippingDocument,
    "\n\tfragment shippingAll on Shipping {\n\t\tid\n\t\tname\n\t\tdescription\n\t\tprice\n\t}\n": types.ShippingAllFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\t\tquery OrderPageQuery($id: ID) {\n\t\t\t\t\torders(id: $id) {\n\t\t\t\t\t\t...orderDetails\n\t\t\t\t\t}\n\t\t\t\t}"): (typeof documents)["\n\t\t\t\tquery OrderPageQuery($id: ID) {\n\t\t\t\t\torders(id: $id) {\n\t\t\t\t\t\t...orderDetails\n\t\t\t\t\t}\n\t\t\t\t}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\tquery ProductPageQuery($id: ID) {\n\t\t\t\tproducts(id: $id) {\n\t\t\t\t\t...productDetails\n\t\t\t\t\tcategory {\n\t\t\t\t\t\t...categoryBasic\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}"): (typeof documents)["\n\t\t\tquery ProductPageQuery($id: ID) {\n\t\t\t\tproducts(id: $id) {\n\t\t\t\t\t...productDetails\n\t\t\t\t\tcategory {\n\t\t\t\t\t\t...categoryBasic\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\tquery ProductPageStaticQuery {\n\t\t\t\tproducts {\n\t\t\t\t\t...productBasic\n\t\t\t\t\tcategory {\n\t\t\t\t\t\t...categoryBasic\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t"): (typeof documents)["\n\t\t\tquery ProductPageStaticQuery {\n\t\t\t\tproducts {\n\t\t\t\t\t...productBasic\n\t\t\t\t\tcategory {\n\t\t\t\t\t\t...categoryBasic\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\tquery CategoryPageQuery($id: ID) {\n\t\t\t\tcategories(id: $id) {\n\t\t\t\t\t...categoryBasic\n\t\t\t\t\tproducts {\n\t\t\t\t\t\t...productBasic\n\t\t\t\t\t\t...productSmall\n\t\t\t\t\t\tprice\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t"): (typeof documents)["\n\t\t\tquery CategoryPageQuery($id: ID) {\n\t\t\t\tcategories(id: $id) {\n\t\t\t\t\t...categoryBasic\n\t\t\t\t\tproducts {\n\t\t\t\t\t\t...productBasic\n\t\t\t\t\t\t...productSmall\n\t\t\t\t\t\tprice\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\tquery CategoryPageStaticQuery {\n\t\t\t\tcategories {\n\t\t\t\t\t...categoryBasic\n\t\t\t\t}\n\t\t\t}\n\t\t"): (typeof documents)["\n\t\t\tquery CategoryPageStaticQuery {\n\t\t\t\tcategories {\n\t\t\t\t\t...categoryBasic\n\t\t\t\t}\n\t\t\t}\n\t\t"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\tquery CategoriesPageQuery {\n\t\t\t\tcategories {\n\t\t\t\t\t...categoryBasic\n\t\t\t\t\t...categoryThumbnail\n\t\t\t\t}\n\t\t\t}\n\t\t"): (typeof documents)["\n\t\t\tquery CategoriesPageQuery {\n\t\t\t\tcategories {\n\t\t\t\t\t...categoryBasic\n\t\t\t\t\t...categoryThumbnail\n\t\t\t\t}\n\t\t\t}\n\t\t"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\tquery StorefrontLayoutQuery {\n\t\t\t\tcategories {\n\t\t\t\t\t...categoryBasic\n\t\t\t\t}\n\t\t\t}\n\t\t"): (typeof documents)["\n\t\t\tquery StorefrontLayoutQuery {\n\t\t\t\tcategories {\n\t\t\t\t\t...categoryBasic\n\t\t\t\t}\n\t\t\t}\n\t\t"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\tquery HomePageQuery {\n\t\t\t\tcategories {\n\t\t\t\t\t...categoryBasic\n\t\t\t\t}\n\t\t\t}\n\t\t"): (typeof documents)["\n\t\t\tquery HomePageQuery {\n\t\t\t\tcategories {\n\t\t\t\t\t...categoryBasic\n\t\t\t\t}\n\t\t\t}\n\t\t"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: " \n\t\t\t\t\t\t\t\tquery AddressListQuery {\n\t\t\t\t\t\t\t\t\taddresses {\n\t\t\t\t\t\t\t\t\t\t...addressAll\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}"): (typeof documents)[" \n\t\t\t\t\t\t\t\tquery AddressListQuery {\n\t\t\t\t\t\t\t\t\taddresses {\n\t\t\t\t\t\t\t\t\t\t...addressAll\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\tquery UseAddressQuery($id: ID) {\n\t\t\taddresses(id: $id) {\n\t\t\t\t...addressAll\n\t\t\t}\n\t\t}"): (typeof documents)["\n\t\tquery UseAddressQuery($id: ID) {\n\t\t\taddresses(id: $id) {\n\t\t\t\t...addressAll\n\t\t\t}\n\t\t}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\tquery OrderListQuery($id: ID) {\n\t\t\torders(id: $id) {\n\t\t\t\t...orderBasic\n\t\t\t}\n\t\t}"): (typeof documents)["\n\t\tquery OrderListQuery($id: ID) {\n\t\t\torders(id: $id) {\n\t\t\t\t...orderBasic\n\t\t\t}\n\t\t}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation MutationAddToCart($productId: ID!, $quantity: Int) {\n\t\taddToCart(input: { productId: $productId, quantity: $quantity }) {\n\t\t\tresult\n\t\t\terrors\n\t\t\tshowError\n\t\t\ttoken\n\t\t\tlineItem {\n\t\t\t\tid\n\t\t\t\tquantity\n\t\t\t\tproduct {\n\t\t\t\t\t... on Product {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tfriendlyId\n\t\t\t\t\t\tname\n\t\t\t\t\t\tprice\n\t\t\t\t\t\timage {\n\t\t\t\t\t\t\timageBlur\n\t\t\t\t\t\t\timageThumbnail\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcategory {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation MutationAddToCart($productId: ID!, $quantity: Int) {\n\t\taddToCart(input: { productId: $productId, quantity: $quantity }) {\n\t\t\tresult\n\t\t\terrors\n\t\t\tshowError\n\t\t\ttoken\n\t\t\tlineItem {\n\t\t\t\tid\n\t\t\t\tquantity\n\t\t\t\tproduct {\n\t\t\t\t\t... on Product {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tfriendlyId\n\t\t\t\t\t\tname\n\t\t\t\t\t\tprice\n\t\t\t\t\t\timage {\n\t\t\t\t\t\t\timageBlur\n\t\t\t\t\t\t\timageThumbnail\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcategory {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation MutationCreateOrder(\n\t\t$customerFirstName: String,\n\t\t$customerLastName: String,\n\t\t$customerEmailAddress: String,\n\t\t$customerPhoneNumber: String,\n\t\t$customerPassword: String,\n\t\t$customerConfirmPassword: String,\n\t\t$addressId: ID,\n\t\t$addressLine1: String,\n\t\t$addressLine2: String,\n\t\t$addressCity: String,\n\t\t$addressPostcode: String,\n\t\t$shippingId: ID!,\n\t) {\n\t\tcreateOrder(input: {\n\t\t\tcustomerFirstName: $customerFirstName,\n\t\t\tcustomerLastName: $customerLastName,\n\t\t\tcustomerEmailAddress: $customerEmailAddress,\n\t\t\tcustomerPhoneNumber: $customerPhoneNumber,\n\t\t\tcustomerPassword: $customerPassword,\n\t\t\tcustomerConfirmPassword: $customerConfirmPassword,\n\t\t\taddressId: $addressId,\n\t\t\taddressLine1: $addressLine1,\n\t\t\taddressLine2: $addressLine2,\n\t\t\taddressCity: $addressCity,\n\t\t\taddressPostcode: $addressPostcode,\n\t\t\tshippingId: $shippingId,\n\t\t}) {\n\t\t\tresult\n\t\t\terrors\n\t\t\tshowError\n\t\t\torderId\n\t\t\tcustomer {\n\t\t\t\t...sessionCustomer\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation MutationCreateOrder(\n\t\t$customerFirstName: String,\n\t\t$customerLastName: String,\n\t\t$customerEmailAddress: String,\n\t\t$customerPhoneNumber: String,\n\t\t$customerPassword: String,\n\t\t$customerConfirmPassword: String,\n\t\t$addressId: ID,\n\t\t$addressLine1: String,\n\t\t$addressLine2: String,\n\t\t$addressCity: String,\n\t\t$addressPostcode: String,\n\t\t$shippingId: ID!,\n\t) {\n\t\tcreateOrder(input: {\n\t\t\tcustomerFirstName: $customerFirstName,\n\t\t\tcustomerLastName: $customerLastName,\n\t\t\tcustomerEmailAddress: $customerEmailAddress,\n\t\t\tcustomerPhoneNumber: $customerPhoneNumber,\n\t\t\tcustomerPassword: $customerPassword,\n\t\t\tcustomerConfirmPassword: $customerConfirmPassword,\n\t\t\taddressId: $addressId,\n\t\t\taddressLine1: $addressLine1,\n\t\t\taddressLine2: $addressLine2,\n\t\t\taddressCity: $addressCity,\n\t\t\taddressPostcode: $addressPostcode,\n\t\t\tshippingId: $shippingId,\n\t\t}) {\n\t\t\tresult\n\t\t\terrors\n\t\t\tshowError\n\t\t\torderId\n\t\t\tcustomer {\n\t\t\t\t...sessionCustomer\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation MutationLogin($emailAddress: String!, $password: String!) {\n\t\tlogin(input: { emailAddress: $emailAddress, password: $password }) {\n\t\t\tresult\n\t\t\terrors\n\t\t\tshowError\n\t\t\ttoken\n\t\t\tsession {\n\t\t\t\tid\n\t\t\t\tcustomer {\n\t\t\t\t\tid\n\t\t\t\t\tfriendlyId\n\t\t\t\t\tfirstName\n\t\t\t\t\tlastName\n\t\t\t\t\temailAddress\n\t\t\t\t\tphoneNumber\n\t\t\t\t}\n\t\t\t\tshoppingCart {\n\t\t\t\t\tlineItems {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tquantity\n\t\t\t\t\t\tproduct {\n\t\t\t\t\t\t\t... on Product {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tfriendlyId\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\tprice\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\timage {\n\t\t\t\t\t\t\t\t\timageBlur\n\t\t\t\t\t\t\t\t\timageThumbnail\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\tcategory {\n\t\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation MutationLogin($emailAddress: String!, $password: String!) {\n\t\tlogin(input: { emailAddress: $emailAddress, password: $password }) {\n\t\t\tresult\n\t\t\terrors\n\t\t\tshowError\n\t\t\ttoken\n\t\t\tsession {\n\t\t\t\tid\n\t\t\t\tcustomer {\n\t\t\t\t\tid\n\t\t\t\t\tfriendlyId\n\t\t\t\t\tfirstName\n\t\t\t\t\tlastName\n\t\t\t\t\temailAddress\n\t\t\t\t\tphoneNumber\n\t\t\t\t}\n\t\t\t\tshoppingCart {\n\t\t\t\t\tlineItems {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tquantity\n\t\t\t\t\t\tproduct {\n\t\t\t\t\t\t\t... on Product {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tfriendlyId\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\tprice\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\timage {\n\t\t\t\t\t\t\t\t\timageBlur\n\t\t\t\t\t\t\t\t\timageThumbnail\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\tcategory {\n\t\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation MutationSaveAddress($operation: Operation!, $id: ID, $line1: String, $line2: String, $city: String, $postcode: String) {\n\t\tsaveAddress(input: { operation: $operation, id: $id, line1: $line1, line2: $line2, city: $city, postcode: $postcode }) {\n\t\t\tresult\n\t\t\terrors\n\t\t\tshowError\n\t\t\taddress {\n\t\t\t\tid\n\t\t\t\tline1\n\t\t\t\tline2\n\t\t\t\tcity\n\t\t\t\tpostcode\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation MutationSaveAddress($operation: Operation!, $id: ID, $line1: String, $line2: String, $city: String, $postcode: String) {\n\t\tsaveAddress(input: { operation: $operation, id: $id, line1: $line1, line2: $line2, city: $city, postcode: $postcode }) {\n\t\t\tresult\n\t\t\terrors\n\t\t\tshowError\n\t\t\taddress {\n\t\t\t\tid\n\t\t\t\tline1\n\t\t\t\tline2\n\t\t\t\tcity\n\t\t\t\tpostcode\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation MutationUpdateCartQuantity($productId: ID!, $quantity: Int!) {\n\t\tupdateCartQuantity(input: { productId: $productId, quantity: $quantity }) {\n\t\t\tresult\n\t\t\terrors\n\t\t\tshowError\n\t\t\tnewQuantity\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation MutationUpdateCartQuantity($productId: ID!, $quantity: Int!) {\n\t\tupdateCartQuantity(input: { productId: $productId, quantity: $quantity }) {\n\t\t\tresult\n\t\t\terrors\n\t\t\tshowError\n\t\t\tnewQuantity\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery QueryAddresses($id: ID) {\n\t\taddresses(id: $id) {\n\t\t\tid\n\t\t\tline1\n\t\t\tline2\n\t\t\tcity\n\t\t\tpostcode\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery QueryAddresses($id: ID) {\n\t\taddresses(id: $id) {\n\t\t\tid\n\t\t\tline1\n\t\t\tline2\n\t\t\tcity\n\t\t\tpostcode\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment addressAll on Address {\n\t\tid\n\t\tline1\n\t\tline2\n\t\tcity\n\t\tpostcode\n\t}\n"): (typeof documents)["\n\tfragment addressAll on Address {\n\t\tid\n\t\tline1\n\t\tline2\n\t\tcity\n\t\tpostcode\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery QueryCategories($id: ID) {\n\t\tcategories(id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\timageBlur\n\t\t\timageThumbnail\n\t\t\timageLarge\n\t\t\tproducts {\n\t\t\t\tid\n\t\t\t\tfriendlyId\n\t\t\t\tname\n\t\t\t\tprice\n\t\t\t\timage {\n\t\t\t\t\timageBlur\n\t\t\t\t\timageThumbnail\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery QueryCategories($id: ID) {\n\t\tcategories(id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\timageBlur\n\t\t\timageThumbnail\n\t\t\timageLarge\n\t\t\tproducts {\n\t\t\t\tid\n\t\t\t\tfriendlyId\n\t\t\t\tname\n\t\t\t\tprice\n\t\t\t\timage {\n\t\t\t\t\timageBlur\n\t\t\t\t\timageThumbnail\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment categoryBasic on Category {\n\t\tid\n\t\tname\n\t}\n\n\tfragment categoryThumbnail on Category {\n\t\timageBlur\n\t\timageThumbnail\n\t}\n"): (typeof documents)["\n\tfragment categoryBasic on Category {\n\t\tid\n\t\tname\n\t}\n\n\tfragment categoryThumbnail on Category {\n\t\timageBlur\n\t\timageThumbnail\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery QueryOrders($id: ID) {\n\t\torders(id: $id) {\n\t\t\tid\n\t\t\tfriendlyId\n\t\t\tcustomer {\n\t\t\t\tid\n\t\t\t\tfriendlyId\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\temailAddress\n\t\t\t\tphoneNumber\n\t\t\t}\n\t\t\torderAddress {\n\t\t\t\tid\n\t\t\t\tline1\n\t\t\t\tline2\n\t\t\t\tcity\n\t\t\t\tpostcode\n\t\t\t}\n\t\t\tlineItems {\n\t\t\t\tid\n\t\t\t\tquantity\n\t\t\t\tproduct {\n\t\t\t\t\t... on OrderProduct {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tprice\n\t\t\t\t\t\tproduct {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\timage {\n\t\t\t\t\t\t\t\timageBlur\n\t\t\t\t\t\t\t\timageThumbnail\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tcategory {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tsubtotalAmount\n\t\t\tshippingAmount\n\t\t\ttaxAmount\n\t\t\ttotalAmount\n\t\t\tcreatedAt\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery QueryOrders($id: ID) {\n\t\torders(id: $id) {\n\t\t\tid\n\t\t\tfriendlyId\n\t\t\tcustomer {\n\t\t\t\tid\n\t\t\t\tfriendlyId\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\temailAddress\n\t\t\t\tphoneNumber\n\t\t\t}\n\t\t\torderAddress {\n\t\t\t\tid\n\t\t\t\tline1\n\t\t\t\tline2\n\t\t\t\tcity\n\t\t\t\tpostcode\n\t\t\t}\n\t\t\tlineItems {\n\t\t\t\tid\n\t\t\t\tquantity\n\t\t\t\tproduct {\n\t\t\t\t\t... on OrderProduct {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tprice\n\t\t\t\t\t\tproduct {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\timage {\n\t\t\t\t\t\t\t\timageBlur\n\t\t\t\t\t\t\t\timageThumbnail\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tcategory {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tsubtotalAmount\n\t\t\tshippingAmount\n\t\t\ttaxAmount\n\t\t\ttotalAmount\n\t\t\tcreatedAt\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment orderBasic on Order {\n\t\tid\n\t\tfriendlyId\n\t\ttotalAmount\n\t\tcreatedAt\n\t\tlineItems {\n\t\t\tid\n\t\t}\n\t}\n\n\tfragment orderDetails on Order {\n\t\tid\n\t\tfriendlyId\n\t\torderAddress {\n\t\t\tid\n\t\t\tline1\n\t\t\tline2\n\t\t\tcity\n\t\t\tpostcode\n\t\t}\n\t\tlineItems {\n\t\t\tid\n\t\t\tquantity\n\t\t\tproduct {\n\t\t\t\t... on OrderProduct {\n\t\t\t\t\tname\n\t\t\t\t\tprice\n\t\t\t\t\tproduct {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t\timage {\n\t\t\t\t\t\t\timageBlur\n\t\t\t\t\t\t\timageThumbnail\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcategory {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tsubtotalAmount\n\t\tshippingAmount\n\t\ttaxAmount\n\t\ttotalAmount\n\t\tcreatedAt\n\t}\n"): (typeof documents)["\n\tfragment orderBasic on Order {\n\t\tid\n\t\tfriendlyId\n\t\ttotalAmount\n\t\tcreatedAt\n\t\tlineItems {\n\t\t\tid\n\t\t}\n\t}\n\n\tfragment orderDetails on Order {\n\t\tid\n\t\tfriendlyId\n\t\torderAddress {\n\t\t\tid\n\t\t\tline1\n\t\t\tline2\n\t\t\tcity\n\t\t\tpostcode\n\t\t}\n\t\tlineItems {\n\t\t\tid\n\t\t\tquantity\n\t\t\tproduct {\n\t\t\t\t... on OrderProduct {\n\t\t\t\t\tname\n\t\t\t\t\tprice\n\t\t\t\t\tproduct {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tname\n\t\t\t\t\t\timage {\n\t\t\t\t\t\t\timageBlur\n\t\t\t\t\t\t\timageThumbnail\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcategory {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tsubtotalAmount\n\t\tshippingAmount\n\t\ttaxAmount\n\t\ttotalAmount\n\t\tcreatedAt\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery QueryProducts($id: ID, $categoryId: Int, $orderBy: ProductOrderBy, $order: ProductOrder) {\n\t\tproducts(id: $id, categoryId: $categoryId, orderBy: $orderBy, order: $order) {\n\t\t\tid\n\t\t\tfriendlyId\n\t\t\tname\n\t\t\tdescription\n\t\t\tprice\n\t\t\tcategory {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t}\n\t\t\timages {\n\t\t\t\tid\n\t\t\t\timageBlur\n\t\t\t\timageThumbnail\n\t\t\t\timageSmall\n\t\t\t\timageLarge\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery QueryProducts($id: ID, $categoryId: Int, $orderBy: ProductOrderBy, $order: ProductOrder) {\n\t\tproducts(id: $id, categoryId: $categoryId, orderBy: $orderBy, order: $order) {\n\t\t\tid\n\t\t\tfriendlyId\n\t\t\tname\n\t\t\tdescription\n\t\t\tprice\n\t\t\tcategory {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t}\n\t\t\timages {\n\t\t\t\tid\n\t\t\t\timageBlur\n\t\t\t\timageThumbnail\n\t\t\t\timageSmall\n\t\t\t\timageLarge\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment productBasic on Product {\n\t\tid\n\t\tname\n\t}\n\n\tfragment productThumbnail on Product {\n\t\timage {\n\t\t\timageBlur\n\t\t\timageThumbnail\n\t\t}\n\t}\n\n\tfragment productSmall on Product {\n\t\timage {\n\t\t\timageBlur\n\t\t\timageSmall\n\t\t}\n\t}\n\n\tfragment productLarge on Product {\n\t\timage {\n\t\t\timageBlur\n\t\t\timageLarge\n\t\t}\n\t}\n\n\tfragment productImages on Product {\n\t\timages {\n\t\t\tid\n\t\t\timageBlur\n\t\t\timageThumbnail\n\t\t\timageSmall\n\t\t\timageLarge\n\t\t}\n\t}\n\n\tfragment productDetails on Product {\n\t\t...productBasic\n\t\t...productImages\n\t\tfriendlyId\n\t\tname\n\t\tdescription\n\t\tprice\n\t}\n"): (typeof documents)["\n\tfragment productBasic on Product {\n\t\tid\n\t\tname\n\t}\n\n\tfragment productThumbnail on Product {\n\t\timage {\n\t\t\timageBlur\n\t\t\timageThumbnail\n\t\t}\n\t}\n\n\tfragment productSmall on Product {\n\t\timage {\n\t\t\timageBlur\n\t\t\timageSmall\n\t\t}\n\t}\n\n\tfragment productLarge on Product {\n\t\timage {\n\t\t\timageBlur\n\t\t\timageLarge\n\t\t}\n\t}\n\n\tfragment productImages on Product {\n\t\timages {\n\t\t\tid\n\t\t\timageBlur\n\t\t\timageThumbnail\n\t\t\timageSmall\n\t\t\timageLarge\n\t\t}\n\t}\n\n\tfragment productDetails on Product {\n\t\t...productBasic\n\t\t...productImages\n\t\tfriendlyId\n\t\tname\n\t\tdescription\n\t\tprice\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery QuerySession {\n\t\tsession {\n\t\t\tid\n\t\t\tcustomer {\n\t\t\t\t...sessionCustomer\n\t\t\t}\n\t\t\tshoppingCart {\n\t\t\t\tlineItems {\n\t\t\t\t\tid\n\t\t\t\t\tquantity\n\t\t\t\t\tproduct {\n\t\t\t\t\t\t... on Product {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tfriendlyId\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\tprice\n\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\timage {\n\t\t\t\t\t\t\t\timageBlur\n\t\t\t\t\t\t\t\timageThumbnail\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tcategory {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery QuerySession {\n\t\tsession {\n\t\t\tid\n\t\t\tcustomer {\n\t\t\t\t...sessionCustomer\n\t\t\t}\n\t\t\tshoppingCart {\n\t\t\t\tlineItems {\n\t\t\t\t\tid\n\t\t\t\t\tquantity\n\t\t\t\t\tproduct {\n\t\t\t\t\t\t... on Product {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tfriendlyId\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\tprice\n\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\timage {\n\t\t\t\t\t\t\t\timageBlur\n\t\t\t\t\t\t\t\timageThumbnail\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tcategory {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment sessionCustomer on Customer {\n\t\tid\n\t\tfriendlyId\n\t\tfirstName\n\t\tlastName\n\t\temailAddress\n\t}\n"): (typeof documents)["\n\tfragment sessionCustomer on Customer {\n\t\tid\n\t\tfriendlyId\n\t\tfirstName\n\t\tlastName\n\t\temailAddress\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery QueryShipping($id: ID) {\n\t\tshippings(id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\tdescription\n\t\t\tprice\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery QueryShipping($id: ID) {\n\t\tshippings(id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\tdescription\n\t\t\tprice\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment shippingAll on Shipping {\n\t\tid\n\t\tname\n\t\tdescription\n\t\tprice\n\t}\n"): (typeof documents)["\n\tfragment shippingAll on Shipping {\n\t\tid\n\t\tname\n\t\tdescription\n\t\tprice\n\t}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;