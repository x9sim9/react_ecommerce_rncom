# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::CategoryType do
	subject { described_class }

	it { is_expected.to have_field(:id).of_type('ID!') }
	it { is_expected.to have_field(:name).of_type('String!') }
	it { is_expected.to have_field(:products).of_type('[Product!]') }
	it { is_expected.to have_field(:image_thumbnail).of_type('String') }
	it { is_expected.to have_field(:image_large).of_type('String') }
end
