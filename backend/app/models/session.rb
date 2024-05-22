# typed: strict
# frozen_string_literal: true

# User Session
class Session < ApplicationRecord
	belongs_to :customer, class_name: 'Customer', optional: true
	has_one :shopping_cart, class_name: 'ShoppingCart', foreign_key: :id, dependent: :delete, inverse_of: :session

	validates_associated :shopping_cart
end
