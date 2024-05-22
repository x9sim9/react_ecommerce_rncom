# typed: strict
# frozen_string_literal: true

module Types
	module Enums
		# Operation type for CUD (Create Update Delete) operation
		class OperationType < Types::BaseEnum
			description 'The type of operation for the save mutation'
			value 'CREATE', 'Create a new item'
			value 'UPDATE', 'Update an existing item'
			value 'DELETE', 'Delete an item'
		end
	end
end
