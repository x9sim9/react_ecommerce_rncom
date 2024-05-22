# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::SaveAddressMutation, type: :request do
	include Spec::MutationsHelper

	let(:another_address) { Fabricate.create :address, with_customer: true }
	let(:existing_address) { Fabricate.create :address, customer: session_line_items_customer.customer }
	let(:new_address) { Fabricate.create :address, customer: session_line_items_customer.customer }
	let(:session_line_items_customer) { Fabricate.create :session, with_customer: { with_address: true }, with_shopping_cart: { with_line_item: { with_product: { with_category: true } } } }

	context 'when session' do
		it 'updates the address' do
			session_line_items_customer
			existing_address
			new_address
			expect {
				post_mutation(save_address_mutation(operation: 'UPDATE', id: existing_address.id, line1: new_address.line1, line2: new_address.line2, city: new_address.city, postcode: new_address.postcode), auth: auth(session: session_line_items_customer))
				expect(response_mutation(:save_address)).to have_successful_mutation_response
				expect([response_mutation(:save_address, :address)]).to have_graphql_response address(id: existing_address.id)
			}.to change(Address, :count).by(0)
		end

		describe 'operation = DESTROY' do
			context 'when address exists' do
				context 'when address belongs to user' do
					it 'deletes the address' do
						session_line_items_customer
						existing_address
						expect {
							post_mutation(save_address_mutation(operation: 'DELETE', id: existing_address.id), auth: auth(session: session_line_items_customer))
							expect(response_mutation(:save_address)).to have_successful_mutation_response
						}.to change(Address, :count).by(-1)
					end
				end

				context 'when address belongs to different user' do
					it 'does not delete the address' do
						session_line_items_customer
						another_address
						expect {
							post_mutation(save_address_mutation(operation: 'DELETE', id: another_address.id), auth: auth(session: session_line_items_customer))
							expect(response_mutation(:save_address)).to have_error_mutation_response
							expect(response_mutation(:save_address)).to have_mutation_error 'Record not found'
						}.to change(Address, :count).by(0)
					end
				end
			end

			context 'when address does not exist' do
				it 'does not delete the address' do
					session_line_items_customer
					expect {
						post_mutation(save_address_mutation(operation: 'DELETE', id: 9_999_999), auth: auth(session: session_line_items_customer))
						expect(response_mutation(:save_address)).to have_error_mutation_response
						expect(response_mutation(:save_address)).to have_mutation_error 'Record not found'
					}.to change(Address, :count).by(0)
				end
			end
		end

		describe 'operation = UPDATE' do
			context 'when address exists' do
				context 'when address belongs to user' do
					it 'updates the address' do
						session_line_items_customer
						existing_address
						new_address
						expect {
							post_mutation(save_address_mutation(operation: 'UPDATE', id: existing_address.id, line1: new_address.line1, line2: new_address.line2, city: new_address.city, postcode: new_address.postcode), auth: auth(session: session_line_items_customer))
							expect(response_mutation(:save_address)).to have_successful_mutation_response
							expect([response_mutation(:save_address, :address)]).to have_graphql_response address(id: existing_address.id)
						}.to change(Address, :count).by(0)
					end
				end

				context 'when address belongs to different user' do
					it 'does not update the address' do
						session_line_items_customer
						another_address
						expect {
							post_mutation(save_address_mutation(operation: 'UPDATE', id: another_address.id, line1: another_address.line1, line2: another_address.line2, city: another_address.city, postcode: another_address.postcode), auth: auth(session: session_line_items_customer))
							expect(response_mutation(:save_address)).to have_error_mutation_response
							expect(response_mutation(:save_address)).to have_mutation_error 'Record not found'
						}.to change(Address, :count).by(0)
					end
				end
			end

			context 'when address does not exist' do
				it 'does not update the address' do
					session_line_items_customer
					another_address
					expect {
						post_mutation(save_address_mutation(operation: 'UPDATE', id: 999_999, line1: another_address.line1, line2: another_address.line2, city: another_address.city, postcode: another_address.postcode), auth: auth(session: session_line_items_customer))
						expect(response_mutation(:save_address)).to have_error_mutation_response
						expect(response_mutation(:save_address)).to have_mutation_error 'Record not found'
					}.to change(Address, :count).by(0)
				end
			end
		end

		describe 'operation = CREATE' do
			it 'creates the address' do
				session_line_items_customer
				new_address
				expect {
					post_mutation(save_address_mutation(operation: 'CREATE', line1: new_address.line1, line2: new_address.line2, city: new_address.city, postcode: new_address.postcode), auth: auth(session: session_line_items_customer))
					expect(response_mutation(:save_address)).to have_successful_mutation_response
					expect([response_mutation(:save_address, :address)]).to have_graphql_response address(id: response_mutation(:save_address, :address, :id))
				}.to change(Address, :count).by(1)
			end
		end
	end

	context 'when no session' do
		it 'does not update address' do
			session_line_items_customer
			existing_address
			new_address
			expect {
				post_mutation(save_address_mutation(operation: 'UPDATE', id: existing_address.id, line1: new_address.line1, line2: new_address.line2, city: new_address.city, postcode: new_address.postcode))
				expect(response_mutation(:save_address)).to have_error_mutation_response
				expect(response_mutation(:save_address)).to have_mutation_error 'Record not found'
			}.to change(Address, :count).by(0)
		end
	end

	def address(id:)
		Address.where(id:).auto_include(true).map { |current_address|
			OpenStruct.new(
					id: current_address.id,
					line1: current_address.line1,
					line2: current_address.line2,
					city: current_address.city,
					postcode: current_address.postcode
			)
		}
	end

	def save_address_mutation(operation:, id: nil, line1: nil, line2: nil, city: nil, postcode: nil)
		gql(:save_address, input: {
				operation:,
				id:,
				line1:,
				line2:,
				city:,
				postcode:
		}, params: [
				:result,
				:errors,
				:show_error,
				address: %i[
						id
						line1
						line2
						city
						postcode
				]
		])
	end
end
