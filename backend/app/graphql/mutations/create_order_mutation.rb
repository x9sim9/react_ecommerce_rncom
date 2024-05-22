# typed: strict
# frozen_string_literal: true

module Mutations
	# Create a new order
	class CreateOrderMutation < BaseMutation
		include ::Graphql::MutationConcern

		description 'Create a new order (for authenticated customer or new customer)'

		argument :address_city, String, required: false, description: 'city of address'
		argument :address_id, ID, required: false, description: 'address id of an existing address for customer'
		argument :address_line1, String, required: false, description: 'first line of address'
		argument :address_line2, String, required: false, description: 'second line of address'
		argument :address_postcode, String, required: false, description: 'postcode of address'
		argument :customer_confirm_password, String, required: false, description: 'confirm login password (when new customer) - must match customer_password'
		argument :customer_email_address, String, required: false, description: 'customer email address (when new customer)'
		argument :customer_first_name, String, required: false, description: 'customer first name (when new customer)'
		argument :customer_last_name, String, required: false, description: 'customer last name (when new customer)'
		argument :customer_password, String, required: false, description: 'login password (when new customer)'
		argument :customer_phone_number, String, required: false, description: 'customer phone number (when new customer)'
		argument :shipping_id, ID, required: true, description: 'unique id for shipping type'

		field_mutation
		field :customer, Types::CustomerType, null: true, description: 'Customer that placed this order (when new customer)'
		field :order_id, Integer, null: true, description: 'unique id for order (if order created)'

		# resolves graphql mutation
		sig { params(address_id: T.nilable(String), address_line1: T.nilable(String), address_line2: T.nilable(String), address_city: T.nilable(String),
				address_postcode: T.nilable(String), shipping_id: T.nilable(String), customer_first_name: T.nilable(String), customer_last_name: T.nilable(String),
				customer_email_address: T.nilable(String), customer_phone_number: T.nilable(String), customer_password: T.nilable(String),
				customer_confirm_password: T.nilable(String))
				.returns(T.nilable(MutationResultResult)) }
		def resolve(address_id:, address_line1:, address_line2:, address_city:, address_postcode:, shipping_id:, customer_first_name: nil, customer_last_name: nil, customer_email_address: nil, customer_phone_number: nil,
				customer_password: nil, customer_confirm_password: nil)
			result = T.let(nil, T.nilable(MutationResultResult))

			session = context[:session]

			if session.blank?
				return mutation_result(errors: ['no session present'])
			end

			if session.shopping_cart&.line_items.blank?
				return mutation_result(errors: ['no products in shopping cart'])
			end

			if address_id.present?
				address = Address.find_by(id: address_id)
			end

			if session.customer.present?
				%i[customer_first_name customer_last_name customer_email_address customer_phone_number
						customer_password customer_confirm_password].each do |field|
					if binding.local_variable_get(field).present?
						return mutation_result(errors: ["#{field.to_s.humanize} cannot be changed"])
					end
				end

				if address_id.present? && address_id != 'new'
					if context[:customer]&.addresses&.find_by(id: address_id).blank?
						return mutation_result(errors: ['address cannot be found'])
					end
				else
					%i[address_line1 address_city address_postcode].each do |field|
						if binding.local_variable_get(field).blank?
							return mutation_result(errors: ["#{field.to_s.humanize} can't be blank"])
						end
					end
				end
			else
				%i[customer_first_name customer_last_name customer_email_address customer_phone_number
						customer_password customer_confirm_password].each do |field|
					if binding.local_variable_get(field).nil?
						return mutation_result(errors: ["#{field.to_s.humanize} can't be blank"])
					end
				end

				unless customer_password == customer_confirm_password
					return mutation_result(errors: ['Password and Confirm Password must match'], show_error: true)
				end
			end

			ActiveRecord::Base.transaction do
				new_customer = T.let(nil, T.nilable(Customer))

				if session.customer.present?
					customer = session.customer
				else
					customer = Customer.create(
							first_name: customer_first_name,
							last_name: customer_last_name,
							email_address: customer_email_address,
							phone_number: customer_phone_number,
							password: customer_password
					)

					session.update(customer:)

					new_customer = customer
				end

				valid_model!(customer)
				valid_model!(session)

				if address.blank?
					address = Address.create(customer:, line1: address_line1,
							line2: address_line2, city: address_city, postcode: address_postcode)
				end
				valid_model!(address)

				order = Order.create(
						customer:,
						address:,
						shipping_id:
				)
				valid_model!(order)

				session.shopping_cart.line_items.each do |line_item|
					line_item.update(owner: order)
					valid_model!(line_item)
				end

				result = mutation_result(result: true, order_id:
						order.id,
						customer: new_customer)
			rescue StandardError => e
				result = mutation_exception(e)
				raise ActiveRecord::Rollback
			end

			result
		end
	end
end
