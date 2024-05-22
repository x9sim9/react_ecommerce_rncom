# typed: strict
# frozen_string_literal: true

module Mutations
	# Update or remove a product in the shopping cart
	class UpdateCartQuantityMutation < BaseMutation
		include Graphql::MutationConcern

		description 'update or remove a product in the shopping cart'

		argument :product_id, ID, required: true, description: 'unique id for product'
		argument :quantity, Integer, required: true, description: 'quantity of products, setting a quantity to 0 will remove the product from shopping cart'

		field_mutation
		field :new_quantity, Integer, null: true, description: 'the new total quantity for the product after update'

		# resolves graphql mutation
		sig { params(product_id: String, quantity: Integer).returns(T.nilable(MutationResultResult)) }
		def resolve(product_id:, quantity:)
			begin
				result = T.let(nil, T.nilable(MutationResultResult))

				session = context[:session]

				unless session
					return mutation_result(errors: ['No session present'])
				end

				product = Product.find_by(id: product_id)

				if product.nil?
					return mutation_result(errors: ['Product does not exist'])
				end

				ActiveRecord::Base.transaction do
					if session.shopping_cart.line_items
						line_item = session.shopping_cart.line_items.find_by(product:)
					end

					if quantity.zero?
						line_item&.destroy!
					else
						if line_item
							line_item.update(quantity:)
						else
							line_item = LineItem.create!(product:, quantity:, owner: session.shopping_cart)
						end

						valid_model!(line_item)
					end

					result = mutation_result(result: true, new_quantity: quantity.zero? ? nil : line_item&.quantity)
				rescue StandardError => e
					result = mutation_exception(e)
					raise ActiveRecord::Rollback
				end
			end

			result
		end
	end
end
