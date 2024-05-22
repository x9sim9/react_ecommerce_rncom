# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Queries::SessionQuery, type: :request do
	include Spec::GraphqlHelper

	let(:customer) { Fabricate.create :customer, with_address: true }
	let(:session) { Fabricate.create :session, customer:, with_shopping_cart: true }
	let(:session_products) { Fabricate.create :session, customer:, with_shopping_cart: { with_line_items: { with_product: { with_category: true } } } }

	context 'when session' do
		context 'when products in basket' do
			it 'shows session' do
				post_query(session_query, auth: auth(session: session_products))
				expect(response_query).to have_successful_query_response
				expect(response_query(:session)).to have_graphql_response session_result(id: session_products.id)
				expect(response_query(:session, :shopping_cart, :line_items).count).to eq 3
			end
		end

		context 'when no products in basket' do
			it 'shows session' do
				post_query(session_query, auth: auth(session:))
				expect(response_query).to have_successful_query_response
				expect(response_query(:session)).to have_graphql_response session_result(id: session.id), ignore: { shopping_cart: :line_items }
				expect(response_query(:session, :shopping_cart, :line_items).count).to eq 0
			end
		end
	end

	context 'when not have a session' do
		it 'does not show session' do
			post_query(session_query)
			expect(response_query).to have_successful_query_response
			expect(response_query(:session)).to have_graphql_response({})
			expect(response_query(:session, :shopping_cart, :line_items).count).to eq 0
		end
	end

	def session_result(id:)
		target = Session.where(id:)
		target.map do |session|
			OpenStruct.new(
					id: session.id,
					customer: OpenStruct.new(
							id: session.customer.id,
							friendly_id: session.customer.friendly_id,
							first_name: session.customer.first_name,
							last_name: session.customer.last_name,
							email_address: session.customer.email_address,
							phone_number: session.customer.phone_number
					),
					shopping_cart: OpenStruct.new(
							line_items: session.shopping_cart.line_items.map do |line_item|
								OpenStruct.new(
										id: line_item.id,
										quantity: line_item.quantity,
										product: OpenStruct.new(
												id: line_item.product.id,
												friendly_id: line_item.product.friendly_id,
												name: line_item.product.name,
												price: line_item.product.price,
												description: line_item.product.description
										)
								)
							end
					)
			)
		end.first
	end

	def session_query
		gql(:session,
				filters: {},
				filter_literals: {},
				params: [
						:id,
						customer: %i[
  								  id
  								  friendlyId
  								  first_name
  								  last_name
  								  email_address
  								  phone_number
  						  ],
						shopping_cart: [
								line_items: [
										:id,
										:quantity,
										product: [
												'... on Product': %i[
    														id
    														friendlyId
    														name
    														price
    														description
    												]
										# images: [
										# 		:thumbnail
										# ]
										]
								]
						]
				])
	end
end
