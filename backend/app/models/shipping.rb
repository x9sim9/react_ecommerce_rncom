# typed: strict
# frozen_string_literal: true

# Shipping Types
class Shipping < ApplicationRecord
	has_many :orders, class_name: 'Order', foreign_key: :id, dependent: :restrict_with_error, inverse_of: :shipping
end
