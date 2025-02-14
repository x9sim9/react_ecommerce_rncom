# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::ShippingType do
	subject { described_class }

	it { is_expected.to have_field(:id).of_type('ID!') }
	it { is_expected.to have_field(:name).of_type('String!') }
	it { is_expected.to have_field(:description).of_type('String') }
end
