# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe LineItem do
	subject(:line_item) { described_class.new(product:, owner: shopping_cart, quantity: 123) }

	let(:product) { Fabricate.build :product }
	let(:shopping_cart) { Fabricate.build :shopping_cart }

	it 'is valid', kind: :valid do
		expect(line_item.product).to eq product
		expect(line_item.owner).to eq shopping_cart
		expect(line_item.quantity).to eq 123

		expect(line_item).to be_valid
	end

	describe 'Associations', group: :associations do
		it { is_expected.to belong_to(:product) }
		it { is_expected.to belong_to(:owner) }
		it { is_expected.to belong_to(:order).without_validating_presence }
		it { is_expected.to belong_to(:shopping_cart).without_validating_presence }
	end

	describe 'Validations', group: :validation, kind: :invalid do
		context 'when quantity is empty' do
			it 'is not valid' do
				line_item.quantity = nil
				expect(line_item).not_to be_valid

				expect(line_item.errors[:quantity]).to include "can't be blank"
			end
		end

		context 'when product is missing' do
			it 'is not valid' do
				line_item.product = nil
				expect(line_item).not_to be_valid

				expect(line_item.errors[:product]).to include 'must exist'
			end
		end

		context 'when owner is missing' do
			it 'is not valid' do
				line_item.owner = nil
				expect(line_item).not_to be_valid

				expect(line_item.errors[:owner]).to include 'must exist'
			end
		end
	end
end
