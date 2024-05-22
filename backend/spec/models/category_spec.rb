# typed: false
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Category do
	subject(:category) { described_class.new(name: category2.name) }

	let(:customer) { Fabricate.build :customer }
	let(:category2) { Fabricate.build :category }

	before do
		category.image.attach(io: File.open('spec/support/assets/test.png'), filename: 'category_image.png')
	end

	it 'is valid', kind: :valid do
		expect(category).to be_valid
		expect(category.name).to eq category2.name
		expect(category.image).to be_an_instance_of ActiveStorage::Attached::One
	end

	describe 'Associations', group: :associations do
		it { is_expected.to have_many(:products) }
	end

	describe 'Validations', group: :validation do
		context 'when name is empty' do
			it 'is not valid' do
				category.name = nil
				expect(category).not_to be_valid

				expect(category.errors[:name]).to include "can't be blank"
			end
		end

		context 'when name is too short' do
			it 'is not valid' do
				category.name = 'a' * 2
				expect(category).not_to be_valid

				expect(category.errors[:name]).to include 'is too short (minimum is 3 characters)'
			end
		end

		context 'when image is missing' do
			it 'is valid' do
				category.image = nil
				expect(category).to be_valid
			end
		end
	end
end
