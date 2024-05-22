# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::AddToCartMutation, type: :request do
	include Spec::MutationsHelper

	let(:product) { Fabricate.create :product, with_category: true }
	let(:session) { Fabricate.create :session, with_customer: true, with_shopping_cart: true }
	let(:quantity) { rand(0..9) }

	context 'when product_exists' do
		context 'when session does not exist' do
			it 'adds to cart' do
				expect {
					post_mutation(add_to_cart_mutation(product_id: product.id, quantity:))
					expect(response_mutation(:add_to_cart)).to have_successful_mutation_response
					expect([response_mutation(:add_to_cart, :line_item)]).to have_graphql_response line_item(product_id: product.id)
				}.to change(Session, :count).by(1) and # creates new session
						change(ShoppingCart, :count).by(1) and # creates new shopping cart
						change(LineItem, :count).by(1) # creates new line item
				expect(LineItem.last.product).to eq product
				expect(LineItem.last.quantity).to eq quantity
			end

			it 'returns valid session token' do
				post_mutation(add_to_cart_mutation(product_id: product.id, quantity:))
				decoded_token = JWT.decode(response_mutation(:add_to_cart, :token), ENV.fetch('JWT_SECRET', nil), true, algorithm: 'HS256')

				expect(decoded_token[0]['session_id']).to eq Session.last.id # has valid JWT token
			end
		end

		context 'when session exists' do
			it 'adds to cart' do
				session
				expect {
					post_mutation(add_to_cart_mutation(product_id: product.id, quantity:), auth: auth(session:))
					expect(response_mutation(:add_to_cart)).to have_successful_mutation_response
					expect([response_mutation(:add_to_cart, :line_item)]).to have_graphql_response line_item(product_id: product.id, shopping_cart: session.shopping_cart)
				}.to change(Session, :count).by(0) and # uses existing session
						change(ShoppingCart, :count).by(0) and # uses existing shopping cart
						change(LineItem, :count).by(1) # creates new line item
				expect(LineItem.last.product).to eq product
				expect(LineItem.last.quantity).to eq quantity
			end
		end
	end

	context 'when product does not exist' do
		subject(:add_to_cart) { post_mutation(add_to_cart_mutation(product_id: 999_999)) }

		it 'does not add product to cart' do
			expect {
				add_to_cart
				expect(response_mutation(:add_to_cart)).to have_error_mutation_response
				expect(response_mutation(:add_to_cart)).to have_mutation_error 'product must exist'
			}.to change(Session, :count).by(0) and
					change(ShoppingCart, :count).by(0) and
					change(LineItem, :count).by(0)
			expect(LineItem.last&.product).not_to eq product
		end
	end

	def line_item(product_id:, shopping_cart: ShoppingCart.last)
		if ActiveStorage::Current.url_options.blank?
			ActiveStorage::Current.url_options = { host: '127.0.0.1' }
		end

		LineItem.where(product_id:, owner: shopping_cart).auto_include(true).map { |line_item|
			OpenStruct.new(
					id: line_item.id,
					quantity: line_item.quantity,
					product: {
							id: line_item.product.id,
							name: line_item.product.name,
							price: line_item.product.price,
							images: line_item.product.images.map { |image|
								OpenStruct.new({
										imageThumbnail: URI.parse(image.variant(:thumbnail).processed.url(forever_link: true)).path
								})
							}
					}
			)
		}
	end

	def add_to_cart_mutation(product_id:, quantity: 1)
		gql(:add_to_cart, input: {
				product_id:,
				quantity:
		}, params: [
				:result,
				:errors,
				:show_error,
				:token,
				line_item: [
						:id,
						:quantity,
						product: [
								'... on Product': [
										:id,
										:name,
										:price,
										images: [
												:imageThumbnail
										]
								]
						]
				]
		])
	end
end
