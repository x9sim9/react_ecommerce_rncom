# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Product do
	subject(:product) { described_class.new(name: product2.name, description: product2.description, price: product2.price, category:) }

	let(:category) { Fabricate.build :category }
	let(:product2) { Fabricate.build :product }

	before do
		product.images.attach(io: File.open('spec/support/assets/test.png'), filename: 'product_image.png')
	end

	it 'is valid with attributes', kind: :valid do
		expect(product).to be_valid
		expect(product.name).to eq product2.name
		expect(product.description).to eq product2.description
		expect(product.price).to eq product2.price
		expect(product.category).to eq category
		expect(product.images.first).to be_an_instance_of ActiveStorage::Attachment
	end

	describe 'Associations', group: :associations do
		it { is_expected.to belong_to(:category) }
		it { is_expected.to have_many(:line_items) }
	end

	describe 'Validations', group: :validation, kind: :invalid do
		context 'when name is empty' do
			it 'is not valid' do
				product.name = nil
				expect(product).not_to be_valid

				expect(product.errors[:name]).to include "can't be blank"
			end
		end

		context 'when name is too short' do
			it 'is not valid' do
				product.name = 'a' * 2
				expect(product).not_to be_valid

				expect(product.errors[:name]).to include 'is too short (minimum is 3 characters)'
			end
		end

		context 'when description is empty' do
			it 'is not valid' do
				product.description = nil
				expect(product).not_to be_valid

				expect(product.errors[:description]).to include "can't be blank"
			end
		end

		context 'when price is empty' do
			it 'is not valid' do
				product.price = nil
				expect(product).not_to be_valid

				expect(product.errors[:price]).to include "can't be blank"
			end
		end

		context 'when category is missing' do
			it 'is not valid' do
				product.category = nil
				expect(product).not_to be_valid

				expect(product.errors[:category]).to include 'must exist'
			end
		end
	end
end
