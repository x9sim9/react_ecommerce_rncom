# typed: strict
# frozen_string_literal: true

# Address for Order (snapshot of the customer address details when order created)
class OrderAddress < ApplicationRecord
	belongs_to :address, class_name: 'Address', optional: true
	has_one :order, class_name: 'Order', foreign_key: :id, dependent: :delete, inverse_of: :order_address

	# removes any unwanted characters in postcode before save
	sig { params(value: String).returns(T.nilable(String)) }
	def postcode=(value)
		value.present? ? super(value.delete(' ')) : super
	end

	validates :line1, :city, :postcode, presence: true
end
