# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::ShoppingCartType do
	subject { described_class }

	it { is_expected.to have_field(:id).of_type('ID!') }
	it { is_expected.to have_field(:session_id).of_type('Int!') }
	it { is_expected.to have_field(:session).of_type('Session!') }
	it { is_expected.to have_field(:line_items).of_type('[LineItem!]') }
end
