# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::LineItemType do
	subject { described_class }

	it { is_expected.to have_field(:id).of_type('ID!') }
	it { is_expected.to have_field(:product_id).of_type('ID!') }
	it { is_expected.to have_field(:product_type).of_type('String') }
	it { is_expected.to have_field(:product).of_type('LineItemProduct!') }
	it { is_expected.to have_field(:quantity).of_type('Int!') }
	it { is_expected.to have_field(:owner_type).of_type('String') }
	it { is_expected.to have_field(:owner_id).of_type('ID') }
	it { is_expected.to have_field(:owner).of_type('LineItemProductOwner') }
end
