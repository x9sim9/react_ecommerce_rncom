# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::UpdateCartQuantityMutation, type: :request do
	include Spec::MutationsHelper

	let(:session) { Fabricate.create :session, with_shopping_cart: true }
	let(:session_product) do
		Fabricate.create :session, with_shopping_cart: { with_line_items: { with_product: { with_category: true } } }
	end
	let(:product) { Fabricate.create :product, with_category: true }
	let(:quantity) { rand(1..9) }

	let(:input) do
		OpenStruct.new(
				product_id: product.id,
				quantity:
		)
	end

	context 'when shopping cart is empty' do
		context 'when product exists' do
			it 'adds item to shopping cart' do
				expect do
					post_mutation(update_cart_quantity_mutation(**input.to_h), auth: auth(session:))
					expect(response_mutation(:update_cart_quantity)).to have_successful_mutation_response
					expect(response_mutation(:update_cart_quantity, :new_quantity)).to eq quantity
					expect(session.shopping_cart.line_items.reload.last.quantity).to eq quantity
				end.to change(LineItem, :count).by(1)
			end
		end

		context 'when product does not exist' do
			it 'is invalid request' do
				expect do
					input.product_id = 999_999
					post_mutation(update_cart_quantity_mutation(**input.to_h), auth: auth(session:))
					expect(response_mutation(:update_cart_quantity)).to have_error_mutation_response
					expect(response_mutation(:update_cart_quantity)).to have_mutation_error 'product does not exist'
				end.to change(LineItem, :count).by(0)
			end
		end
	end

	context 'when product in cart' do
		it 'updates product quantity' do
			line_item = session_product.shopping_cart.line_items.first
			expect do
				input.product_id = line_item.product.id
				post_mutation(update_cart_quantity_mutation(**input.to_h), auth: auth(session: session_product))
				expect(response_mutation(:update_cart_quantity)).to have_successful_mutation_response
				expect(response_mutation(:update_cart_quantity, :new_quantity)).to eq quantity
				expect(line_item.reload.quantity).to eq quantity
			end.to change(LineItem, :count).by(0)
		end
	end

	describe 'Validation' do
		%i[product_id quantity].each do |field|
			context "when #{field} is not blank" do
				it 'does not create the order' do
					expect do
						input.send(:"#{field}=", nil)
						post_mutation(update_cart_quantity_mutation(**input.to_h), auth: auth(session:))
						expect(response_mutation(:update_cart_quantity)).to have_mutation_exception
						expect(response_mutation(:update_cart_quantity)).to have_mutation_error field.to_s.camelize(:lower)
						expect(response_mutation(:update_cart_quantity)).to have_mutation_error 'has an invalid value'
					end.to change(Order, :count).by(0)
				end
			end
		end
	end

	context 'when quantity is zero' do
		it 'removes item from cart' do
			line_item = session_product.shopping_cart.line_items.first
			expect do
				input.quantity = 0
				input.product_id = line_item.product.id
				post_mutation(update_cart_quantity_mutation(**input.to_h), auth: auth(session: session_product))
				expect(response_mutation(:update_cart_quantity)).to have_successful_mutation_response
				expect(response_mutation(:update_cart_quantity, :new_quantity)).to be_nil
			end.to change(LineItem, :count).by(-1)
		end
	end

	def update_cart_quantity_mutation(product_id:, quantity:)
		gql(:update_cart_quantity, input: {
				product_id:,
				quantity:
		}, params: %i[
				result
				errors
				show_error
				new_quantity
		])
	end
end
