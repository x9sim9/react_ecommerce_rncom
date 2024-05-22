# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::OrderAddressType do
	subject { described_class }

	it { is_expected.to have_field(:id).of_type('ID!') }
	it { is_expected.to have_field(:line1).of_type('String!') }
	it { is_expected.to have_field(:line2).of_type('String') }
	it { is_expected.to have_field(:city).of_type('String!') }
	it { is_expected.to have_field(:postcode).of_type('String!') }
	it { is_expected.to have_field(:address_id).of_type('ID!') }
	it { is_expected.to have_field(:address).of_type('Address!') }
end
