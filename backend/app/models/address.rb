# typed: strict
# frozen_string_literal: true

# Customer Address
class Address < ApplicationRecord
	belongs_to :customer, class_name: 'Customer', optional: false

	# removes any unwanted characters in postcode before save
	sig { params(value: String).returns(T.nilable(String)) }
	def postcode=(value)
		value.present? ? super(value.delete(' ')) : super
	end

	validates :line1, :city, :postcode, presence: true
end
