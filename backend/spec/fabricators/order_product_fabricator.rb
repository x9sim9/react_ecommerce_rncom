# typed: false
# frozen_string_literal: true

# rubocop:disable Style/MixinUsage
include Spec::FabricatorHelper
# rubocop:enable Style/MixinUsage

Fabricator :order_product do
	name { FFaker::Product.product }
	price { (rand * 100).round(2) }

	instance_eval(&Spec::FabricatorHelper.belong_trait(:product))
end
