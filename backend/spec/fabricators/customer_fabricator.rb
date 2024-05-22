# typed: false
# frozen_string_literal: true

# rubocop:disable Style/MixinUsage
include Spec::FabricatorHelper
# rubocop:enable Style/MixinUsage

Fabricator :customer do
	first_name { FFaker::Name.first_name }
	last_name { FFaker::Name.last_name }
	email_address { FFaker::Internet.email }
	phone_number '01234123456' # FFaker phone number does not generate valid uk phone numbers
	password { FFaker::Internet.password }

	instance_eval(&Spec::FabricatorHelper.many_trait(:addresses, join: { customer_id: :id }))
	# instance_eval(&Spec::FabricatorHelper.many_trait(:orders, join: { customer_id: :id }))
	instance_eval(&Spec::FabricatorHelper.one_trait(:session, join: { customer_id: :id }))
end
