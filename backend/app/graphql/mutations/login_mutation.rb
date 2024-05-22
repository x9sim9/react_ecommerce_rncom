# typed: strict
# frozen_string_literal: true

module Mutations
	# Login authentication for customer
	class LoginMutation < BaseMutation
		include Graphql::MutationConcern

		description 'login authentication for customer'

		argument :email_address, String, required: true, description: 'customer email address'
		argument :password, String, required: true, description: 'login password'

		field_mutation
		field :session, Types::SessionType, null: true, description: 'Session details if customer authenticated successfully'
		field :token, String, null: true, description: 'unique session token if customer authenticated successfully'

		# resolves graphql mutation
		sig { params(email_address: String, password: String).returns(T.nilable(MutationResultResult)) }
		def resolve(email_address:, password:)
			result = T.let(nil, T.nilable(MutationResultResult))

			%i[email_address password].each do |field|
				if binding.local_variable_get(field).blank?
					return mutation_result(errors: ["#{field.to_s.humanize} can't be blank"])
				end
			end

			ActiveRecord::Base.transaction do
				customer = Customer.auto_include(true).find_by(email_address:)
				if customer&.authenticate(password)
					if customer.session.blank?
						session = Session.create(customer:)
						ShoppingCart.create!(session:)
					end

					if context[:session].present? && !context[:session][:customer]
						session_line_items = context[:session]&.shopping_cart&.line_items
						customer_line_items = customer.session&.shopping_cart&.line_items

						if session_line_items&.count&.> 0
							session_line_items&.each do |line_item|
								existing_line_item = customer_line_items&.find_by(product: line_item.product)
								if existing_line_item.present?
									# rubocop:disable Rails/SkipsModelValidations
									existing_line_item.increment!(:quantity, line_item.quantity)
									# rubocop:enable Rails/SkipsModelValidations
									line_item.destroy!
								else
									line_item.update!(shopping_cart: customer.session.shopping_cart)
								end
							end
						end

						context[:session].reload.destroy!
					end

					customer.reload

					token = JWT.encode({ customer_id: customer.id, session_id: customer.session&.id }, ENV.fetch('JWT_SECRET', nil), 'HS256')

					result = mutation_result(result: true, token:, session: customer.session)
				else
					result = mutation_result(errors: ['Login was unsuccessful please check your Email Address and Password and try again'], show_error: true)
				end
			rescue StandardError => e
				result = mutation_exception(e)
				raise ActiveRecord::Rollback
			end

			result
		end
	end
end
