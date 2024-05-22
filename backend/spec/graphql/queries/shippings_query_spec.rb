# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Queries::ShippingsQuery, type: :request do
	include Spec::GraphqlHelper

	let(:shipping) { shippings.last }
	let(:shippings) do
		Fabricate.times 3, :shipping,
				with_order: { with_customer: { with_address: true }, with_line_items: { with_product: { with_category: true } } }
	end

	context 'when has shipping' do
		describe 'multiple shipping' do
			it 'shows shipping' do
				shippings
				post_query(shippings_query)
				expect(response_query).to have_successful_query_response
				expect(response_query(:shippings)).to have_graphql_response shippings_result
				expect(response_query(:shippings).count).to eq 3
			end

			context 'when with pagination limit = 1' do
				it 'shows one order' do
					shippings
					post_query(shippings_query(limit: 1))
					expect(response_query).to have_successful_query_response
					expect(response_query(:shippings)).to have_graphql_response shippings_result(limit: 1)
					expect(response_query(:shippings).count).to eq 1
				end
			end

			context 'when pagination limit = 1 and offset = 2' do
				it 'shows one order' do
					shippings
					post_query(shippings_query(limit: 1, offset: 1))
					expect(response_query).to have_successful_query_response
					expect(response_query(:shippings)).to have_graphql_response shippings_result(limit: 1, offset: 1)
					expect(response_query(:shippings).count).to eq 1
				end
			end
		end

		describe 'one shipping' do
			it 'shows shipping' do
				shippings
				post_query(shippings_query(id: shipping.id))
				expect(response_query).to have_successful_query_response
				expect(response_query(:shippings)).to have_graphql_response shippings_result(id: shipping.id)
				expect(response_query(:shippings).count).to eq 1
			end
		end
	end

	context 'when no shipping' do
		it 'show no shipping result' do
			post_query(shippings_query)
			expect(response_query).to have_successful_query_response
			expect(response_query(:shippings).count).to eq 0
		end
	end

	def shippings_result(id: nil, **pagination_params)
		target = if id.present?
			Shipping.where(id:)
		else
			Shipping.all
		end
		target = paginate_result(target, **pagination_params)
		target.order(name: :asc).map do |shipping|
			OpenStruct.new(
					id: shipping.id,
					name: shipping.name,
					description: shipping.description,
					price: shipping.price
			)
		end
	end

	def shippings_query(id: nil, **pagination_params)
		gql(:shippings,
				filters: { id:, **pagination_params },
				filter_literals: {},
				params: %i[
    				id
    				name
    				description
    				price
    		])
	end
end
