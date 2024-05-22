# typed: strict
# frozen_string_literal: true

# Order and Shopping Cart Line Items
class LineItem < ApplicationRecord
	default_scope { order(created_at: :asc) }

	belongs_to :product, polymorphic: true, optional: false
	belongs_to :owner, optional: false, polymorphic: true, touch: true

	belongs_to :shopping_cart, lambda {
		where(line_items: { owner_type: 'ShoppingCart' }).joins(:line_items).auto_include(true)
	}, foreign_key: :owner_id, optional: true, inverse_of: :line_items
	belongs_to :order, -> { where(line_items: { owner_type: 'Order' }).joins(:line_items).auto_include(true) }, foreign_key: :owner_id, optional: true, inverse_of: :line_items

	validates :quantity, presence: true
end
