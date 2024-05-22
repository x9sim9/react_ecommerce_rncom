# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe OrderProduct do
	subject(:order_product) { described_class.new(name: product.name, price: product.price, product:) }

	let(:product) { Fabricate.build :product }

	it 'is valid with attributes', kind: :valid do
		expect(order_product).to be_valid
		expect(order_product.name).to eq product.name
		expect(order_product.price).to eq product.price
		expect(order_product.product).to eq product
	end

	describe 'Associations', group: :associations do
		it { is_expected.to belong_to(:product) }
		it { is_expected.to have_one(:line_item) }
	end

	describe 'Validations', group: :validation, kind: :invalid do
		context 'when name is empty' do
			it 'is not valid' do
				order_product.name = nil
				expect(order_product).not_to be_valid

				expect(order_product.errors[:name]).to include "can't be blank"
			end
		end

		context 'when name is too short' do
			it 'is not valid' do
				order_product.name = 'a' * 2
				expect(order_product).not_to be_valid

				expect(order_product.errors[:name]).to include 'is too short (minimum is 3 characters)'
			end
		end

		context 'when price is empty' do
			it 'is not valid' do
				order_product.price = nil
				expect(order_product).not_to be_valid

				expect(order_product.errors[:price]).to include "can't be blank"
			end
		end

		context 'when product is missing' do
			it 'is not valid' do
				order_product.product = nil
				expect(order_product).not_to be_valid

				expect(order_product.errors[:product]).to include 'must exist'
			end
		end
	end
end
