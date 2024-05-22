# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Queries::OrdersQuery, type: :request do
	include Spec::GraphqlHelper

	let(:customer) { Fabricate.create :customer, with_address: true }
	let(:session) { Fabricate.create :session, customer:, with_shopping_cart: true }
	let(:shipping) { Fabricate.create :shipping }
	let(:address) { customer.addresses.first }
	let(:order) { Fabricate.create :order, customer:, address:, shipping:, with_line_items: { with_product: { with_category: true } } }

	let(:another_customer) { Fabricate.create :customer, with_address: true }
	let(:another_address) { customer.addresses.first }
	let(:another_order) do
		Fabricate.create :order, customer: another_customer, address: another_address, shipping:, with_line_items: { with_product: { with_category: true } }
	end

	let(:orders) do
		Fabricate.times 3, :order, customer:, address:, shipping:, with_line_items: { with_product: { with_category: true } }
	end

	context 'when logged in' do
		context 'when has order' do
			describe 'multiple orders' do
				it 'shows order' do
					orders
					post_query(orders_query, auth: auth(session:))
					expect(response_query).to have_successful_query_response
					expect(response_query(:orders)).to have_graphql_response orders_result
					expect(response_query(:orders).count).to eq 3
				end

				context 'with pagination limit = 1' do
					it 'shows one order' do
						orders
						post_query(orders_query(limit: 1), auth: auth(session:))
						expect(response_query).to have_successful_query_response
						expect(response_query(:orders)).to have_graphql_response orders_result(limit: 1)
						expect(response_query(:orders).count).to eq 1
					end
				end

				context 'with pagination limit = 1 and offset = 2' do
					it 'shows one order' do
						orders
						post_query(orders_query(limit: 1, offset: 1), auth: auth(session:))
						expect(response_query).to have_successful_query_response
						expect(response_query(:orders)).to have_graphql_response orders_result(limit: 1, offset: 1)
						expect(response_query(:orders).count).to eq 1
					end
				end
			end

			describe 'one address' do
				context 'when order belongs to current user' do
					it 'shows order' do
						post_query(orders_query(id: order.id), auth: auth(session:))
						expect(response_query).to have_successful_query_response
						expect(response_query(:orders)).to have_graphql_response orders_result(id: order.id)
						expect(response_query(:orders).count).to eq 1
					end
				end

				context 'when order belongs to another user' do
					it 'does not shows order' do
						post_query(orders_query(id: another_order.id), auth: auth(session:))
						expect(response_query).to have_successful_query_response
						expect(response_query(:orders)).not_to have_graphql_response orders_result(id: order.id)
						expect(response_query(:orders).count).to eq 0
					end
				end

				context 'when order does not exits' do
					it 'does not shows order' do
						post_query(orders_query(id: 999_999), auth: auth(session:))
						expect(response_query).to have_successful_query_response
						expect(response_query(:orders)).not_to have_graphql_response orders_result(id: order.id)
						expect(response_query(:orders).count).to eq 0
					end
				end
			end
		end
	end

	context 'when not logged in' do
		it 'does not shows order' do
			post_query(orders_query(id: order.id))
			expect(response_query).to have_successful_query_response
			expect(response_query(:orders)).not_to have_graphql_response orders_result(id: order.id)
			expect(response_query(:orders)).to be_nil
		end
	end

	def orders_result(id: nil, **pagination_params)
		target = if id.present?
			Order.where(id:)
		else
			Order.all
		end
		target = paginate_result(target, **pagination_params)
		target.order(created_at: :desc).map do |order|
			OpenStruct.new(
					id: order.id,
					friendly_id: order.friendly_id,
					customer: {
							id: order.customer.id,
							friendly_id: order.customer.friendly_id,
							first_name: order.customer.first_name,
							last_name: order.customer.last_name,
							email_address: order.customer.email_address,
							phone_number: order.customer.phone_number
					},
					order_address: {
							id: order.order_address.id,
							line1: order.order_address.line1,
							line2: order.order_address.line2,
							city: order.order_address.city,
							postcode: order.order_address.postcode
					}
			)
		end
	end

	def orders_query(id: nil, **pagination_params)
		gql(:orders,
				filters: { id:, **pagination_params },
				filter_literals: {},
				params: [
						:id,
						:friendlyId,
						{ customer: %i[
  								  id
  								  friendlyId
  								  first_name
  								  last_name
  								  email_address
  								  phone_number
  						  ],
								order_address: %i[
  								  id
  								  line1
  								  line2
  								  city
  								  postcode
  						  ] }
				])
	end
end
