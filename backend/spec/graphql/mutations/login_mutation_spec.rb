# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::LoginMutation, type: :request do
	include Spec::MutationsHelper

	let(:customer) { Fabricate.create :customer, password: }
	let(:password) { FFaker::Internet.password }

	context 'when user exists' do
		context 'with valid login credentials' do
			it 'authenticates user' do
				post_mutation(login_mutation(email_address: customer.email_address, password:))
				expect(response_mutation(:login)).to have_successful_mutation_response
				expect(response_mutation(:login, :token)).to be_present

				decoded_token = JWT.decode(response_mutation(:login, :token), ENV.fetch('JWT_SECRET', nil), true, algorithm: 'HS256')
				expect(decoded_token[0]['customer_id']).to eq customer.id # has valid JWT token
			end
		end

		context 'with invalid login credentials' do
			it 'does not authenticate user' do
				post_mutation(login_mutation(email_address: customer.email_address, password: FFaker::Internet.password))

				expect(response_mutation(:login)).to have_error_mutation_response
				expect(response_mutation(:login)).to have_mutation_error 'Login was unsuccessful please check your Email Address and Password and try again'
				expect(response_mutation(:login, :token)).not_to be_present
			end
		end

		context 'when email_addresss is blank' do
			it 'does not authenticate user' do
				post_mutation(login_mutation(email_address: nil, password: FFaker::Internet.password))

				expect(response_mutation(:login)).to have_mutation_exception
				expect(response_mutation(:login, :token)).not_to be_present
				expect(response_mutation(:login)).to have_mutation_error 'emailAddress'
				expect(response_mutation(:login)).to have_mutation_error 'has an invalid value'
			end
		end

		context 'when password is blank' do
			it 'does not authenticate user' do
				post_mutation(login_mutation(email_address: customer.email_address, password: nil))

				expect(response_mutation(:login)).to have_mutation_exception
				expect(response_mutation(:login, :token)).not_to be_present
				expect(response_mutation(:login)).to have_mutation_error 'password'
				expect(response_mutation(:login)).to have_mutation_error 'has an invalid value'
			end
		end
	end

	context 'when user does not exist' do
		it 'does not authenticate user' do
			post_mutation(login_mutation(email_address: FFaker::Internet.email, password: FFaker::Internet.password))

			expect(response_mutation(:login)).to have_error_mutation_response
			expect(response_mutation(:login)).to have_mutation_error 'Login was unsuccessful please check your Email Address and Password and try again'
			expect(response_mutation(:login, :token)).not_to be_present
		end
	end
end

def login_mutation(email_address:, password:)
	gql(:login, input: {
			email_address:,
			password:
	}, params: %i[
			result
			errors
			show_error
			token
	])
end
