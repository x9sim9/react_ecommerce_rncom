# typed: strict
# frozen_string_literal: true

module Graphql
	# Shared functionality for all GraphQL Query definitions
	module QueryConcern
		extend ActiveSupport::Concern

		extend T::Sig
		extend T::Helpers

		requires_ancestor { GraphQL::Schema::Resolver }

		class_methods do
			extend T::Sig
			include ::GraphQL::Schema::Member::HasArguments

			# creates arguments for pagination
			sig { void }
			def argument_pagination
				argument :limit, Integer, required: false, description: 'pagination result limit'
				argument :offset, Integer, required: false, description: 'pagination result offset'
			end

			# creates friendly id argument for query
			sig { void }
			def argument_friendly_id
				argument :friendly_id, String, required: true, description: 'unique user friendly id for record'
			end
		end

		# paginates a model result
		sig do
			params(model: T.nilable(T.any(ActiveRecord::Relation, ActiveRecord::AssociationRelation)),
					offset: T.nilable(Integer), limit: T.nilable(Integer)).returns(
					  T.nilable(T.any(ActiveRecord::Relation, ActiveRecord::AssociationRelation))
			  )
		end
		def paginate(model, offset: nil, limit: nil)
			if model.present?
				if offset.present?
					model = model.offset(offset)
				end
				if limit.present?
					model = model.limit(limit)
				end
			end

			model
		end

		extend ActiveSupport::Concern
	end
end
