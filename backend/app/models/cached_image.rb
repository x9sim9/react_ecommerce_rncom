# typed: false
# frozen_string_literal: true

# Cache ActiveStorage Variant images to improve performance
class CachedImage < ApplicationRecord
	belongs_to :owner, optional: false, polymorphic: true
	belongs_to :attachment, optional: false, polymorphic: true
end
