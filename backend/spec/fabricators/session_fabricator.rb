# typed: false
# frozen_string_literal: true

# rubocop:disable Style/MixinUsage
include Spec::FabricatorHelper
# rubocop:enable Style/MixinUsage

Fabricator :session do
	instance_eval(&Spec::FabricatorHelper.belong_trait(:customer))
	instance_eval(&Spec::FabricatorHelper.one_trait(:shopping_cart, join: { session_id: :id }))
end
