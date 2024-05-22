# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Queries::CategoriesQuery, type: :request do
	include Spec::GraphqlHelper

	let(:category) { Fabricate.create :category }
	let(:categories) { Fabricate.times 3, :category }

	describe 'all categories' do
		it 'has categories' do
			categories
			post_query(categories_query)
			expect(response_query).to have_successful_query_response
			expect(response_query(:categories)).to have_graphql_response categories_result, ignore: %i[image_thumbnail image_large image_source]
			expect(response_query(:categories)).to include(hash_including_present(:imageThumbnail, :imageLarge, :imageSource))
		end

		context 'with pagination limit = 1' do
			it 'shows one category' do
				categories
				post_query(categories_query(limit: 1))
				expect(response_query).to have_successful_query_response
				expect(response_query(:categories)).to have_graphql_response categories_result(limit: 1), ignore: %i[image_thumbnail image_large image_source]
				expect(response_query(:categories)).to include(hash_including_present(:imageThumbnail, :imageLarge, :imageSource))
				expect(response_query(:categories).count).to eq 1
			end
		end

		context 'with pagination limit = 1 and offset = 2' do
			it 'shows one category' do
				categories
				post_query(categories_query(limit: 1, offset: 1))
				expect(response_query).to have_successful_query_response
				expect(response_query(:categories)).to have_graphql_response categories_result(limit: 1, offset: 1), ignore: %i[image_thumbnail image_large image_source]
				expect(response_query(:categories)).to include(hash_including_present(:imageThumbnail, :imageLarge, :imageSource))
				expect(response_query(:categories).count).to eq 1
			end
		end
	end

	describe 'specific category' do
		context 'when category exists' do
			it 'has category' do
				post_query(categories_query(id: category.id))
				expect(response_query).to have_successful_query_response
				expect(response_query(:categories)).to have_graphql_response categories_result(id: category.id), ignore: %i[image_thumbnail image_large image_source]
				expect(response_query(:categories)).to include(hash_including_present(:imageThumbnail, :imageLarge, :imageSource))
			end
		end

		context 'when category does not exist' do
			it 'does not show category' do
				post_query(categories_query(id: 999_999))
				expect(response_query).to have_successful_query_response
				expect(response_query(:categories)).to have_graphql_response([])
			end
		end
	end

	def categories_result(id: nil, **pagination_params)
		target = if id.present?
			Category.where(id:)
		else
			Category.all
		end
		target = paginate_result(target, **pagination_params)
		target.order(name: :asc).map { |category|
			OpenStruct.new(
					id: category.id,
					name: category.name
			)
		}
	end

	def categories_query(id: nil, **pagination_params)
		gql(:categories,
				filters: { id:, **pagination_params },
				filter_literals: {},
				params: %i[
  						id
  						name
  						image_thumbnail
  						image_large
  						image_source
  				])
	end
end
