# typed: false
# frozen_string_literal: true

# rubocop:disable Style/MixinUsage
include Spec::FabricatorHelper
# rubocop:enable Style/MixinUsage

Fabricator :order do
	instance_eval(&Spec::FabricatorHelper.belong_trait(:customer))
	instance_eval(&Spec::FabricatorHelper.belong_trait(:order_address))
	instance_eval(&Spec::FabricatorHelper.belong_trait(:shipping))

	instance_eval(&Spec::FabricatorHelper.many_trait(:line_item, join: { owner_id: :id }, params: { owner_type: 'ShoppingCart' }))
end
