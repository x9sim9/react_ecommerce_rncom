# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::CreateOrderMutation, type: :request do
	include Spec::MutationsHelper

	subject(:input_order_customer_existing_address) { OpenStruct.new(**input.to_h, address_id: session_line_items_customer.customer.addresses.first.id, shipping_id: shipping.id) }

	let(:session_no_line_items) { Fabricate.create :session, with_customer: true, with_shopping_cart: true }
	let(:session_line_items) { Fabricate.create :session, with_shopping_cart: { with_line_item: { with_product: { with_category: true } } } }
	let(:session_line_items_customer) { Fabricate.create :session, with_customer: { with_address: true }, with_shopping_cart: { with_line_item: { with_product: { with_category: true } } } }
	let(:session_with_address) { Fabricate.create :session, with_customer: { with_address: true }, with_shopping_cart: { with_line_item: { with_product: { with_category: true } } } }
	let(:shipping) { Fabricate.create :shipping }
	let(:customer) { Fabricate.build :customer }
	let(:address) { Fabricate.build :address }
	let(:password) { FFaker::Product.product }

	let(:input) do
		OpenStruct.new(
				customer_first_name: nil,
				customer_last_name: nil,
				customer_email_address: nil,
				customer_phone_number: nil,
				customer_password: nil,
				customer_confirm_password: nil,
				address_id: nil,
				address_line1: nil,
				address_line2: nil,
				address_city: nil,
				address_postcode: nil,
				shipping_id: nil
		)
	end

	let(:input_order) do
		OpenStruct.new(
				**input.to_h,
				customer_first_name: customer.first_name,
				customer_last_name: customer.last_name,
				customer_email_address: customer.email_address,
				customer_phone_number: customer.phone_number,
				customer_password: password,
				customer_confirm_password: password,
				address_line1: address.line1,
				address_line2: address.line2,
				address_city: address.city,
				address_postcode: address.postcode,
				shipping_id: shipping.id
		)
	end

	let(:input_order_customer_new_address) do
		OpenStruct.new(
				**input.to_h,
				address_line1: address.line1,
				address_line2: address.line2,
				address_city: address.city,
				address_postcode: address.postcode,
				shipping_id: shipping.id
		)
	end

	context 'when session exists' do
		context 'when no items in cart' do
			it 'does not create the order' do
				expect do
					post_mutation(create_order_mutation(**input_order.to_h))
					expect(response_mutation(:create_order)).to have_error_mutation_response
				end.to change(Order, :count).by(0)
			end
		end

		context 'with items in cart' do
			context 'when new customer' do
				context 'when valid order' do
					it 'creates a new order' do
						expect do
							post_mutation(create_order_mutation(**input_order.to_h), auth: auth(session: session_line_items))
							expect(response_mutation(:create_order)).to have_successful_mutation_response
						end.to change(Order, :count).by(1)

						new_customer = session_line_items.reload.customer

						expect(new_customer.first_name).to eq input_order.customer_first_name
						expect(new_customer.last_name).to eq input_order.customer_last_name
						expect(new_customer.email_address).to eq input_order.customer_email_address
						expect(new_customer.phone_number).to eq input_order.customer_phone_number

						new_order = session_line_items.customer.orders.last.reload

						expect(new_order.order_address.line1).to eq input_order.address_line1
						expect(new_order.order_address.line2).to eq input_order.address_line2
						expect(new_order.order_address.city).to eq input_order.address_city
						expect(new_order.order_address.postcode).to eq input_order.address_postcode

						expect(new_order.shipping_id).to eq input_order.shipping_id

						expect(response_mutation(:create_order, :order_id)).to eq new_order.id
						expect(response_mutation(:create_order, :customer)).to eq response_customer(customer: new_customer).to_h
					end
				end

				describe 'Validations' do
					%i[customer_first_name customer_last_name customer_email_address customer_phone_number
							 address_line1 address_city address_postcode].each do |field|
						context "when #{field} is blank" do
							it 'does not create the order' do
								expect do
									input_order.send :"#{field}=", ''
									post_mutation(create_order_mutation(**input_order.to_h), auth: auth(session: session_line_items))
									expect(response_mutation(:create_order)).to have_error_mutation_response
									expect(response_mutation(:create_order)).to have_mutation_error "#{field.to_s.humanize} cant be blank"
								end.to change(Order, :count).by(0)
							end
						end
					end

					context 'when address_line2 is blank' do
						it 'creates the order' do
							expect do
								input_order.address_line2 = ''
								post_mutation(create_order_mutation(**input_order.to_h), auth: auth(session: session_line_items))
								expect(response_mutation(:create_order)).to have_successful_mutation_response
							end.to change(Order, :count).by(1)
						end
					end

					context 'when password is blank' do
						it 'does not create the order' do
							expect do
								input_order.customer_password = ''
								input_order.customer_confirm_password = ''
								post_mutation(create_order_mutation(**input_order.to_h), auth: auth(session: session_line_items))
								expect(response_mutation(:create_order)).to have_error_mutation_response
								expect(response_mutation(:create_order)).to have_mutation_error 'password cant be blank'
							end.to change(Order, :count).by(0)
						end
					end

					context 'when passwords do not match' do
						it 'does not create the order' do
							expect do
								input_order.customer_confirm_password = ''
								post_mutation(create_order_mutation(**input_order.to_h), auth: auth(session: session_line_items))
								expect(response_mutation(:create_order)).to have_error_mutation_response
								expect(response_mutation(:create_order)).to have_mutation_error 'Password and Confirm Password must match'
							end.to change(Order, :count).by(0)
						end
					end
				end
			end

			context 'when existing customer' do
				context 'when valid order' do
					it 'creates a new order' do
						expect do
							post_mutation(create_order_mutation(**input_order_customer_new_address.to_h), auth: auth(session: session_line_items_customer))
							expect(response_mutation(:create_order)).to have_successful_mutation_response
						end.to change(Order, :count).by(1) and
								change(Customer, :count).by(0)

						new_order = session_line_items_customer.customer.orders.reload.last

						expect(new_order.order_address.line1).to eq input_order_customer_new_address.address_line1
						expect(new_order.order_address.line2).to eq input_order_customer_new_address.address_line2
						expect(new_order.order_address.city).to eq input_order_customer_new_address.address_city
						expect(new_order.order_address.postcode).to eq input_order_customer_new_address.address_postcode
						expect(new_order.shipping_id).to eq input_order.shipping_id

						expect(response_mutation(:create_order, :order_id)).to eq new_order.id
					end
				end

				describe 'Validations' do
					%i[customer_first_name customer_last_name customer_email_address customer_phone_number
							 customer_password customer_confirm_password].each do |field|
						context "when #{field} is not blank" do
							it 'does not create the order' do
								expect do
									input_order_customer_new_address.send(:"#{field}=", 'something')
									post_mutation(create_order_mutation(**input_order_customer_new_address.to_h), auth: auth(session: session_line_items_customer))
									expect(response_mutation(:create_order)).to have_error_mutation_response
									expect(response_mutation(:create_order)).to have_mutation_error "#{field.to_s.humanize} cannot be changed"
								end.to change(Order, :count).by(0)
							end
						end
					end

					context 'when new address' do
						context 'when valid order' do
							it 'creates a new order' do
								expect do
									post_mutation(create_order_mutation(**input_order_customer_new_address.to_h), auth: auth(session: session_line_items_customer))
									expect(response_mutation(:create_order)).to have_successful_mutation_response
								end.to change(Order, :count).by(1) and
										change(Address, :count).by(1)
							end
						end

						describe 'Validations' do
							%i[address_city address_city address_postcode].each do |field|
								context "when #{field} is not blank" do
									it 'does not create the order' do
										expect do
											input_order_customer_new_address.send(:"#{field}=", nil)
											post_mutation(create_order_mutation(**input_order_customer_new_address.to_h), auth: auth(session: session_line_items_customer))
											expect(response_mutation(:create_order)).to have_error_mutation_response
											expect(response_mutation(:create_order)).to have_mutation_error "#{field.to_s.humanize} cant be blank"
										end.to change(Order, :count).by(0) and
												change(Address, :count).by(0)
									end
								end
							end

							context 'when address_line2 is blank' do
								it 'creates a new order' do
									expect do
										input_order_customer_new_address.address_line2 = nil
										post_mutation(create_order_mutation(**input_order_customer_new_address.to_h), auth: auth(session: session_line_items_customer))
										expect(response_mutation(:create_order)).to have_successful_mutation_response
									end.to change(Order, :count).by(1) and
											change(Address, :count).by(1)
								end
							end
						end
					end

					context 'with existing address' do
						context 'when valid order' do
							it 'creates a new order' do
								expect do
									post_mutation(create_order_mutation(**input_order_customer_existing_address.to_h), auth: auth(session: session_line_items_customer))
									expect(response_mutation(:create_order)).to have_successful_mutation_response
								end.to change(Order, :count).by(1) and
										change(Customer, :count).by(0) and
										change(Address, :count).by(0)

								new_order = session_line_items_customer.customer.orders.reload.last

								expect(new_order.order_address.address.id).to eq input_order_customer_existing_address.address_id
							end
						end

						context 'when address does not exist for customer' do
							it 'does not create the order' do
								expect do
									input_order_customer_new_address.address_id = 9999
									post_mutation(create_order_mutation(**input_order_customer_new_address.to_h), auth: auth(session: session_line_items_customer))
									expect(response_mutation(:create_order)).to have_error_mutation_response
									expect(response_mutation(:create_order)).to have_mutation_error 'address cannot be found'
								end.to change(Order, :count).by(0) and
										change(Address, :count).by(0)
							end
						end
					end
				end
			end
		end
	end

	def response_customer(customer:)
		OpenStruct.new(
				id: customer.id.to_s,
				friendlyId: customer.friendly_id,
				firstName: customer.first_name,
				lastName: customer.last_name,
				emailAddress: customer.email_address
		)
	end

	def create_order_mutation(customer_first_name: nil, customer_last_name: nil, customer_email_address: nil,
			customer_phone_number: nil, customer_password: nil, customer_confirm_password: nil, address_id: nil,
			address_line1: nil, address_line2: nil, address_city: nil, address_postcode: nil, shipping_id: nil)
		gql(:create_order, input: {
				customer_first_name:,
				customer_last_name:,
				customer_email_address:,
				customer_phone_number:,
				customer_password:,
				customer_confirm_password:,
				address_id:,
				address_line1:,
				address_line2:,
				address_city:,
				address_postcode:,
				shipping_id:
		}, params: [
				:result,
				:order_id,
				:errors,
				:show_error,
				customer: %i[
						id
						friendly_id
						first_name
						last_name
						email_address
				]
		])
	end
end
