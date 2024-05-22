# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ShoppingCart do
	subject(:shopping_cart) { described_class.new(session:) }

	let(:session) { Fabricate.build :session }

	it 'is valid with attributes', kind: :valid do
		expect(shopping_cart).to be_valid
		expect(shopping_cart.session).to eq session
	end

	describe 'Associations', group: :associations do
		it { is_expected.to belong_to(:session) }
		it { is_expected.to have_many(:line_items) }
	end

	describe 'Validations', group: :validation do
		context 'when session is missing' do
			it 'is not valid' do
				shopping_cart.session = nil
				expect(shopping_cart).not_to be_valid

				expect(shopping_cart.errors[:session]).to include 'must exist'
			end
		end
	end
end
