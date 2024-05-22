# typed: false
# frozen_string_literal: true

# rubocop:disable Style/MixinUsage
include Spec::FabricatorHelper
# rubocop:enable Style/MixinUsage

Fabricator :line_item do
	quantity { rand(1..50) }

	instance_eval(&Spec::FabricatorHelper.belong_trait(:product))
	instance_eval(&Spec::FabricatorHelper.belong_trait(:shopping_cart))
	instance_eval(&Spec::FabricatorHelper.belong_trait(:session))
end
