# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::OrderType do
	subject { described_class }

	it { is_expected.to have_field(:id).of_type('ID!') }
	it { is_expected.to have_field(:subtotal_amount).of_type('Float!') }
	it { is_expected.to have_field(:shipping_amount).of_type('Float!') }
	it { is_expected.to have_field(:tax_amount).of_type('Float!') }
	it { is_expected.to have_field(:total_amount).of_type('Float!') }
	it { is_expected.to have_field(:customer_id).of_type('ID!') }
	it { is_expected.to have_field(:customer).of_type('Customer!') }
	it { is_expected.to have_field(:order_address_id).of_type('ID!') }
	it { is_expected.to have_field(:order_address).of_type('OrderAddress!') }
	it { is_expected.to have_field(:line_items).of_type('[LineItem!]!') }
	it { is_expected.to have_field(:shipping).of_type('Shipping!') }
	it { is_expected.to have_field(:created_at).of_type('ISO8601DateTime!') }
end
