# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Queries::ProductsQuery, type: :request do
	include Spec::GraphqlHelper

	let(:category) { Fabricate.create :category }
	let(:products) { Fabricate.times 3, :product, category_id: category.id }
	let(:product) { Fabricate :product, category_id: category.id }

	context 'when category exists' do
		describe 'all products' do
			context 'when product exists' do
				it 'has product' do
					products
					post_query(products_query)
					expect(response_query).to have_successful_query_response
					expect(response_query(:products)).to have_graphql_response products_result(category_id: category.id),
							ignore: [:images]
					expect(response_query(:products)).to include(hash_including_present(images: %i[imageThumbnail imageSmall
                                                                                    imageLarge]))
				end

				context 'with pagination limit = 1' do
					it 'shows one product' do
						products
						post_query(products_query(limit: 1))
						expect(response_query).to have_successful_query_response
						expect(response_query(:products)).to have_graphql_response products_result(category_id: category.id, limit: 1),
								ignore: [:images]
						expect(response_query(:products)).to include(hash_including_present(images: %i[imageThumbnail imageSmall
                                                                                     imageLarge]))
						expect(response_query(:products).count).to eq 1
					end
				end

				context 'with pagination limit = 1 and offset = 2' do
					it 'shows one product' do
						products
						post_query(products_query(limit: 1, offset: 1))
						expect(response_query).to have_successful_query_response
						expect(response_query(:products)).to have_graphql_response products_result(category_id: category.id, limit: 1, offset: 1),
								ignore: [:images]
						expect(response_query(:products)).to include(hash_including_present(images: %i[imageThumbnail imageSmall imageLarge]))
						expect(response_query(:products).count).to eq 1
					end
				end
			end

			context 'when product does not exist' do
				it 'has no product' do
					post_query(products_query)
					expect(response_query).to have_successful_query_response
					expect(response_query(:products)).to have_graphql_response []
				end
			end
		end

		describe 'filter by product' do
			context 'when product exists' do
				it 'has product' do
					post_query(products_query(id: product.id))
					expect(response_query).to have_successful_query_response
					expect(response_query(:products)).to have_graphql_response products_result(id: product.id), ignore: [:images]
					expect(response_query(:products)).to include(hash_including_present(images: %i[imageThumbnail imageSmall imageLarge imageSource]))
				end
			end

			context 'when product does not exist' do
				it 'has no product' do
					post_query(products_query(id: 99_999))
					expect(response_query).to have_successful_query_response
					expect(response_query(:products)).to have_graphql_response []
				end
			end
		end

		describe 'filter by category' do
			context 'when products exist' do
				it 'has products' do
					products
					post_query(products_query(category_id: category.id))
					expect(response_query).to have_successful_query_response
					expect(response_query(:products)).to have_graphql_response products_result(category_id: category.id),
							ignore: [:images]
					expect(response_query(:products)).to include(hash_including_present(images: %i[imageThumbnail imageSmall imageLarge imageSource]))
				end
			end

			context 'when products do not exists' do
				it 'has no products' do
					post_query(products_query(category_id: category.id))
					expect(response_query).to have_successful_query_response
					expect(response_query(:products)).to have_graphql_response []
				end
			end

			describe 'order by' do
				%i[price name].each do |field|
					%i[desc asc].each do |order|
						context "when order by #{field} #{order}" do
							it 'orders correctly' do
								products
								post_query(products_query(category_id: category.id, order_by: field, order:))
								expect(response_query).to have_successful_query_response
								expect(response_query(:products)).to have_graphql_response products_result(category_id: category.id, order_by: field, order:), ignore: [:images]
								expect(response_query(:products)).to include(hash_including_present(images: %i[imageThumbnail imageSmall imageLarge imageSource]))
							end
						end
					end
				end
			end
		end
	end

	context 'when category does not exist' do
		it 'returns no products' do
			post_query(products_query(category_id: 9999))
			expect(response_query).to have_successful_query_response
			expect(response_query(:products)).to have_graphql_response []
		end
	end

	def products_result(id: nil, category_id: nil, order_by: :name, order: :asc, **pagination_params)
		target = if id.present?
			Product.where(id:)
		elsif category_id.present?
			Product.where(category_id:)
		else
			Product.all
		end
		target = paginate_result(target, **pagination_params)
		target.order("#{order_by}": order).map do |product|
			OpenStruct.new(
					id: product.id,
					friendly_id: product.friendly_id,
					name: product.name,
					description: product.description,
					price: product.price,
					category: {
							id: product.category.id
					}
			)
		end
	end

	def products_query(id: nil, category_id: nil, order_by: :name, order: :asc, **pagination_params)
		gql(:products,
				filters: { id:, category_id:, **pagination_params },
				filter_literals: { order_by: order_by&.upcase, order: order&.upcase },
				params: [
						:id,
						:friendlyId,
						:name,
						:description,
						:price,
						category: [
								:id
						],
						images: %i[
  								imageThumbnail
  								imageSmall
  								imageLarge
  						]
				])
	end
end
