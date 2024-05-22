# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Session do
	subject(:session) { described_class.new(customer:, shopping_cart:) }

	let(:customer) { Fabricate.build :customer }
	let(:shopping_cart) { Fabricate.build :shopping_cart, with_session: true }

	it 'is valid', kind: :valid do
		expect(session.customer).to eq customer
		expect(session.shopping_cart).to eq shopping_cart

		expect(session).to be_valid
	end

	describe 'Associations', group: :associations do
		it { is_expected.to belong_to(:customer).without_validating_presence }
		it { is_expected.to have_one(:shopping_cart) }
	end

	describe 'Validations', group: :validation do
		context 'when customer is missing' do
			it 'is valid' do
				session.customer = nil
				expect(session).to be_valid

				expect(session.errors[:customer]).not_to include 'must exist'
			end
		end

		context 'when shopping_cart is missing' do
			it 'is valid' do
				session.shopping_cart = nil
				expect(session).to be_valid

				expect(session.errors[:shopping_cart]).not_to include 'must exist'
			end
		end
	end
end
