# typed: false
# frozen_string_literal: true

# rubocop:disable Style/MixinUsage
include Spec::FabricatorHelper
# rubocop:enable Style/MixinUsage

Fabricator :shipping do
	name { FFaker::Company.name }
	description { FFaker::Company.bs }
	price { (rand * 100).round(2) }

	instance_eval(&Spec::FabricatorHelper.many_trait(:orders, join: { shipping_id: :id }))
end
