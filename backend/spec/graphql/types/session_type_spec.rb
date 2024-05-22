# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::SessionType do
	subject { described_class }

	it { is_expected.to have_field(:id).of_type('ID!') }
	it { is_expected.to have_field(:customer_id).of_type('Int') }
	it { is_expected.to have_field(:customer).of_type('Customer') }
	it { is_expected.to have_field(:shopping_cart).of_type('ShoppingCart') }
end
