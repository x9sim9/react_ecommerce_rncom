# typed: false
# frozen_string_literal: true

# rubocop:disable Style/MixinUsage
include Spec::FabricatorHelper
# rubocop:enable Style/MixinUsage

Fabricator :product do
	name { FFaker::Product.product }
	price { (rand * 100).round(2) }
	description { FFaker::HipsterIpsum.paragraph }

	instance_eval(&Spec::FabricatorHelper.belong_trait(:category))

	after_build do |product|
		product.images.attach(io: File.open('spec/support/assets/test.png'), filename: 'product_image.png')
	end
end
