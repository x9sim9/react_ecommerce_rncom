# typed: strict
# frozen_string_literal: true

# BaseType for Enums
module Types
	class BaseEnum < GraphQL::Schema::Enum
		extend T::Sig
	end
end
