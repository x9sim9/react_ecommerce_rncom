# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::CustomerType do
	subject { described_class }

	it { expect(described_class).to have_field(:id).of_type('ID!') }
	it { expect(described_class).to have_field(:first_name).of_type('String!') }
	it { expect(described_class).to have_field(:last_name).of_type('String!') }
	it { expect(described_class).to have_field(:email_address).of_type('String!') }
	it { expect(described_class).to have_field(:phone_number).of_type('String!') }
	it { expect(described_class).to have_field(:addresses).of_type('[Address!]') }
end
