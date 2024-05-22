# typed: false
# frozen_string_literal: true

# rubocop:disable Style/MixinUsage
include Spec::FabricatorHelper
# rubocop:enable Style/MixinUsage

Fabricator :category do
	name { FFaker::Product.product }

	after_build do |category|
		category.image.attach(io: File.open('spec/support/assets/test.png'), filename: 'category_image.png')
	end
end
