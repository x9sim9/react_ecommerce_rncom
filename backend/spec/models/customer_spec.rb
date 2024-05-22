# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Customer do
	subject(:customer) { described_class.new(first_name: 'first_name', last_name: 'last_name', email_address: 'me@my.com', phone_number: '02123 123456', password: 'test_password') }

	it 'is valid with attributes', kind: :valid do
		expect(customer).to be_valid
		expect(customer.first_name).to eq 'first_name'
		expect(customer.last_name).to eq 'last_name'
		expect(customer.email_address).to eq 'me@my.com'
		expect(customer.phone_number).to eq '02123123456' # removes spaces
		expect(customer.password).to eq 'test_password'
	end

	describe 'Associations', group: :associations do
		it { is_expected.to have_one(:session) }
		it { is_expected.to have_many(:addresses) }
		it { is_expected.to have_many(:orders) }
	end

	describe 'Validations', group: :validation do
		context 'when first_name is empty' do
			it 'is not valid' do
				customer.first_name = nil
				expect(customer).not_to be_valid

				expect(customer.errors[:first_name]).to include "can't be blank"
			end
		end

		context 'when last_name is empty' do
			it 'is not valid' do
				customer.last_name = nil
				expect(customer).not_to be_valid

				expect(customer.errors[:last_name]).to include "can't be blank"
			end
		end

		context 'when email_address is empty' do
			it 'is not valid' do
				customer.email_address = nil
				expect(customer).not_to be_valid

				expect(customer.errors[:email_address]).to include "can't be blank"
			end
		end

		context 'when email_address is incorrect' do
			it 'is not valid' do
				customer.email_address = 'zzz.com'
				expect(customer).not_to be_valid

				expect(customer.errors[:email_address]).to include 'is invalid'
			end
		end

		context 'when phone_number is empty' do
			it 'is not valid' do
				customer.phone_number = ''
				expect(customer).not_to be_valid

				expect(customer.errors[:phone_number]).to include "can't be blank"
			end
		end

		context 'when password is empty' do
			it 'is not valid' do
				customer.password = nil
				expect(customer).not_to be_valid

				expect(customer.errors[:password]).to include "can't be blank"
			end
		end
	end
end
