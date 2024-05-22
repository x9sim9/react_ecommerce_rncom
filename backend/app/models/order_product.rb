# typed: strict
# frozen_string_literal: true

# Products in Order (snapshot of the product details when order created)
class OrderProduct < ApplicationRecord
	belongs_to :product, class_name: 'Product', optional: false
	has_one :line_item, class_name: 'LineItem', as: :product, dependent: :restrict_with_error

	validates :name, length: { minimum: 3 }, presence: true
	validates :price, presence: true
	validates_associated :line_item
end
