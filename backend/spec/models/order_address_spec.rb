# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe OrderAddress do
	subject(:order_address) { described_class.new(address:, line1: address.line1, city: address.city, postcode: address.postcode) }

	let(:customer) { Fabricate.build :customer }
	let(:order_address2) { Fabricate.build :order_address, with_address: true }
	let(:address) { order_address2.address }

	it 'is valid', kind: :valid do
		expect(order_address).to be_valid
		expect(order_address.line1).to eq address.line1
		expect(order_address.city).to eq address.city
		expect(order_address.postcode).to eq address.postcode
	end

	describe 'Associations', group: :associations do
		it { is_expected.to belong_to(:address).optional(true) }
		it { is_expected.to have_one(:order) }
	end

	describe 'Validations', group: :validation do
		context 'when line1 is empty' do
			it 'is not valid' do
				order_address.line1 = ''
				expect(order_address).not_to be_valid

				expect(order_address.errors[:line1]).to include "can't be blank"
			end
		end

		context 'when line2 is empty' do
			it 'is valid' do
				order_address.line2 = ''
				expect(order_address).to be_valid

				expect(order_address.errors[:line1]).not_to include "can't be blank"
			end
		end

		context 'when city is empty' do
			it 'is not valid' do
				order_address.city = ''
				expect(order_address).not_to be_valid

				expect(order_address.errors[:city]).to include "can't be blank"
			end
		end

		context 'when postcode is empty' do
			it 'is not valid' do
				order_address.postcode = ''
				expect(order_address).not_to be_valid

				expect(order_address.errors[:postcode]).to include "can't be blank"
			end
		end

		context 'when customer is empty' do
			it 'is valid' do
				order_address.address = nil
				expect(order_address).to be_valid
			end
		end
	end
end
