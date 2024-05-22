# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Queries::AddressesQuery, type: :request do
	include Spec::GraphqlHelper

	let(:session) { Fabricate.create :session, with_customer: { with_addresses: true }, with_shopping_cart: true }
	let(:address) { session.customer.addresses.first }
	let(:another_address) { Fabricate.create :address, with_customer: true }

	context 'when logged in' do
		context 'when has address' do
			describe 'multiple addresses' do
				it 'shows address' do
					session
					post_query(addresses_query, auth: auth(session:))
					expect(response_query).to have_successful_query_response
					expect(response_query(:addresses)).to have_graphql_response addresses_result
					expect(response_query(:addresses).count).to eq 3
				end

				context 'with pagination limit = 1' do
					it 'shows one address' do
						session
						post_query(addresses_query(limit: 1), auth: auth(session:))
						expect(response_query).to have_successful_query_response
						expect(response_query(:addresses)).to have_graphql_response addresses_result(limit: 1)
						expect(response_query(:addresses).count).to eq 1
					end
				end

				context 'with pagination limit = 1 and offset = 2' do
					it 'shows one address' do
						session
						post_query(addresses_query(limit: 1, offset: 1), auth: auth(session:))
						expect(response_query).to have_successful_query_response
						expect(response_query(:addresses)).to have_graphql_response addresses_result(limit: 1, offset: 1)
						expect(response_query(:addresses).count).to eq 1
					end
				end
			end

			describe 'one address' do
				context 'when address belongs to current user' do
					it 'shows address' do
						session
						post_query(addresses_query(id: address.id), auth: auth(session:))
						expect(response_query).to have_successful_query_response
						expect(response_query(:addresses)).to have_graphql_response addresses_result(id: address.id)
						expect(response_query(:addresses).count).to eq 1
					end
				end

				context 'when address belongs to another user' do
					it 'does not show address' do
						session
						post_query(addresses_query(id: another_address.id), auth: auth(session:))
						expect(response_query).to have_successful_query_response
						expect(response_query(:addresses)).not_to have_graphql_response addresses_result(id: address.id)
						expect(response_query(:addresses).count).to eq 0
					end
				end

				context 'when address does not exist' do
					it 'does not show address' do
						session
						post_query(addresses_query(id: 99_999), auth: auth(session:))
						expect(response_query).to have_successful_query_response
						expect(response_query(:addresses)).not_to have_graphql_response addresses_result(id: address.id)
						expect(response_query(:addresses).count).to eq 0
					end
				end
			end
		end
	end

	context 'when not logged in' do
		it 'does not show address' do
			post_query(addresses_query(id: address.id))
			expect(response_query).to have_successful_query_response
			expect(response_query(:addresses)).not_to have_graphql_response addresses_result(id: address.id)
			expect(response_query(:addresses)).to be_nil
		end
	end

	def addresses_result(id: nil, **pagination_params)
		target = if id.present?
			Address.where(id:, customer: session.customer)
		else
			Address.where(customer: session.customer)
		end
		target = paginate_result(target, **pagination_params)
		target.order(updated_at: :desc).map { |address|
			OpenStruct.new(
					id: address.id,
					line1: address.line1,
					line2: address.line2,
					city: address.city,
					postcode: address.postcode
			)
		}
	end

	def addresses_query(id: nil, **pagination_params)
		gql(:addresses,
				filters: { id:, **pagination_params },
				filter_literals: {},
				params: %i[
  						id
  						line1
  						line2
  						city
  						postcode
  				])
	end
end
