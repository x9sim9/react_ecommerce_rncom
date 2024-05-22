# typed: strict
# frozen_string_literal: true

# Shopping Cart Details
class ShoppingCart < ApplicationRecord
	has_many :line_items, as: :owner, class_name: 'LineItem', dependent: :delete_all
	belongs_to :session, class_name: 'Session', optional: false, dependent: :delete

	validates_associated :line_items
end
