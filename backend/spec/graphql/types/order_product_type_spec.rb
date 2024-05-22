# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::OrderProductType do
	subject { described_class }

	it { is_expected.to have_field(:id).of_type('ID!') }
	it { is_expected.to have_field(:name).of_type('String!') }
	it { is_expected.to have_field(:price).of_type('Float!') }
	it { is_expected.to have_field(:product_id).of_type('ID!') }
	it { is_expected.to have_field(:product).of_type('Product!') }
end
