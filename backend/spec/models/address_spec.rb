# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Address do
	subject(:address) { described_class.new(customer:, line1: address2.line1, city: address2.city, postcode: address2.postcode) }

	let(:customer) { Fabricate.build :customer }
	let(:address2) { Fabricate.build :address }

	it 'is valid', kind: :valid do
		expect(address).to be_valid
		expect(address.line1).to eq address2.line1
		expect(address.city).to eq address2.city
		expect(address.postcode).to eq address2.postcode
	end

	describe 'Associations', group: :associations do
		it { is_expected.to belong_to(:customer) }
	end

	describe 'Validations', group: :validation do
		context 'when line1 is empty' do
			it 'is not valid' do
				address.line1 = ''
				expect(address).not_to be_valid

				expect(address.errors[:line1]).to include "can't be blank"
			end
		end

		context 'when line2 is empty' do
			it 'is valid' do
				address.line2 = ''
				expect(address).to be_valid

				expect(address.errors[:line1]).not_to include "can't be blank"
			end
		end

		context 'when city is empty' do
			it 'is not valid' do
				address.city = ''
				expect(address).not_to be_valid

				expect(address.errors[:city]).to include "can't be blank"
			end
		end

		context 'when postcode is empty' do
			it 'is not valid' do
				address.postcode = ''
				expect(address).not_to be_valid

				expect(address.errors[:postcode]).to include "can't be blank"
			end
		end

		context 'when customer is empty' do
			it 'is not valid' do
				address.customer = nil
				expect(address).not_to be_valid

				expect(address.errors[:customer]).to include 'must exist'
			end
		end
	end
end
