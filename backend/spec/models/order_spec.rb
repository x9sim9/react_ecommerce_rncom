# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Order do
	subject(:order) { described_class.new(customer:, address:, shipping:) }

	let(:customer) { Fabricate.build :customer }
	let(:address) { Fabricate.build :address }
	let(:shipping) { Fabricate.build :shipping }

	it 'is valid', kind: :valid do
		expect(order).to be_valid
		expect(order.customer).to eq customer
		expect(order.order_address.address).to eq address
		expect(order.shipping).to eq shipping
	end

	describe 'Associations', group: :associations do
		it { is_expected.to belong_to(:customer) }
		it { is_expected.to belong_to(:order_address) }
		it { is_expected.to have_many(:line_items) }
	end

	describe 'Validations', group: :validation do
		context 'when customer is missing' do
			it 'is not valid' do
				order.customer = nil
				expect(order).not_to be_valid

				expect(order.errors[:customer]).to include 'must exist'
			end
		end

		context 'when address is missing' do
			it 'is not valid' do
				order.order_address = nil
				expect(order).not_to be_valid

				expect(order.errors[:order_address]).to include 'must exist'
			end
		end

		context 'when address is missing' do
			it 'is not valid' do
				order.shipping = nil
				expect(order).not_to be_valid

				expect(order.errors[:shipping]).to include 'must exist'
			end
		end
	end
end
