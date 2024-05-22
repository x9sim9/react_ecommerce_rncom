# typed: strict
# frozen_string_literal: true

module Mutations
	# Add product to shopping cart, increases quantity if product already exists
	class AddToCartMutation < BaseMutation
		include Graphql::MutationConcern

		description 'add a product to shopping cart, increases quantity if product already exists'

		argument :product_id, ID, required: true, description: 'unique id for Product'
		argument :quantity, Integer, required: false, description: 'number of products to add to cart, default = 1'

		field_mutation
		field :line_item, Types::LineItemType, null: true, description: 'Line Item for product added to cart'
		field :token, String, null: true, description: 'unique session token if session did not exist'

		# resolves graphql mutation
		sig { params(product_id: String, quantity: T.nilable(Integer)).returns(T.nilable(MutationResultResult)) }
		def resolve(product_id:, quantity: 1)
			result = T.let(nil, T.nilable(MutationResultResult))

			ActiveRecord::Base.transaction do
				session = context[:session].presence || Session.create
				valid_model!(session)

				shopping_cart = session.shopping_cart.presence || ShoppingCart.create(session:)
				valid_model!(shopping_cart)

				product = Product.find_by(id: product_id)

				if shopping_cart.line_items
					line_item = shopping_cart.line_items.where(product:)&.first
				end

				if line_item
					# rubocop:disable Rails/SkipsModelValidations
					line_item.increment!(:quantity, quantity)
					# rubocop:enable Rails/SkipsModelValidations
				else
					line_item = LineItem.create(product:, quantity:, owner: shopping_cart)
				end
				valid_model!(line_item)

				if context[:session]
					result = mutation_result(result: true, line_item:)
				else
					token = JWT.encode({ session_id: session.id }, ENV.fetch('JWT_SECRET', nil), 'HS256')
					result = mutation_result(result: true, line_item:, token:)
				end
			rescue StandardError => e
				result = mutation_exception(e)
				raise ActiveRecord::Rollback
			end

			result
		end
	end
end
