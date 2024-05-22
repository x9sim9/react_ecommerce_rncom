# typed: false
# frozen_string_literal: true

# rubocop:disable Style/MixinUsage
include Spec::FabricatorHelper
# rubocop:enable Style/MixinUsage

Fabricator :shopping_cart do
	instance_eval(&Spec::FabricatorHelper.belong_trait(:session))
	instance_eval(&Spec::FabricatorHelper.many_trait(:line_items, join: { owner_id: :id },
			params: { owner_type: 'ShoppingCart' }))
end
