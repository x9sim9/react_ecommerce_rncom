# typed: strict
# frozen_string_literal: true

# Customer with login
class Customer < ApplicationRecord
	include FriendlyIdConcern

	has_many :orders, class_name: 'Order', dependent: :delete_all
	has_many :addresses, class_name: 'Address', dependent: :delete_all
	has_one :session, class_name: 'Session', dependent: :delete

	has_secure_password :password

	validates_associated :orders
	validates :first_name, :last_name, :phone_number, presence: true
	validates :email_address, presence: true, format: { with: %r{(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])} } # https://emailregex.com/

	# removes any unwanted characters in phone number before save
	sig { params(number: String).returns(T.nilable(String)) }
	def phone_number=(number)
		number.present? ? super(number.delete(' ')) : super
	end
end
