# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::ProductType do
	subject { described_class }

	it { is_expected.to have_field(:id).of_type('ID!') }
	it { is_expected.to have_field(:name).of_type('String!') }
	it { is_expected.to have_field(:description).of_type('String!') }
	it { is_expected.to have_field(:price).of_type('Float!') }
	it { is_expected.to have_field(:category_id).of_type('ID!') }
	it { is_expected.to have_field(:category).of_type('Category!') }
	it { is_expected.to have_field(:images).of_type('[ProductImage!]') }
end
