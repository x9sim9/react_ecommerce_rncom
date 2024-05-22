# typed: false
# frozen_string_literal: true

# rubocop:disable Style/MixinUsage
include Spec::FabricatorHelper
# rubocop:enable Style/MixinUsage

Fabricator :address do
	line1 { FFaker::AddressUK.street_address }
	line2 { FFaker::AddressUK.street_address }
	city { FFaker::AddressUK.city }
	postcode { FFaker::AddressUK.postcode }

	instance_eval(&Spec::FabricatorHelper.belong_trait(:customer))
end
