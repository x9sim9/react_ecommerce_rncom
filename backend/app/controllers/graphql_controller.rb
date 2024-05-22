# typed: strict
# frozen_string_literal: true

# Handles all GraphQL Query and Mutation requests
class GraphqlController < ApplicationController
	extend T::Sig
	# If accessing from outside this domain, nullify the session
	# This allows for outside API access while preventing CSRF attacks,
	# but you'll have to authenticate your user separately
	# protect_from_forgery with: :null_session

	# handle the request
	sig { void }
	def execute
		variables = prepare_variables(params[:variables])
		query = params[:query]
		operation_name = params[:operationName]
		context = context_from_token
		result = ApplicationSchema.execute(query, variables:, context:, operation_name:)
		render json: result
	rescue StandardError => e
		raise e unless Rails.env.development?

		handle_error_in_development(e)
	end

	private

		# get the current graphql context from the provided Authorization header token
		sig do
			returns(T.any({
					customer: T.nilable(Customer),
					session: T.nilable(Session)
			}, {}))
		end
		def context_from_token
			token = request.headers['Authorization'].to_s.split.last
			return {} unless token

			decoded_token = JWT.decode(token, ENV.fetch('JWT_SECRET', nil), true, algorithm: 'HS256')

			customer_id = decoded_token[0]['customer_id']
			session_id = decoded_token[0]['session_id']

			{
					customer: customer_id && Customer.auto_include(true).find_by(id: customer_id),
					session: session_id && Session.auto_include(true).find_by(id: session_id)
			}
		end

		# Handle variables in form data, JSON body, or a blank value
		sig { params(variables_param: T.any(T.nilable(String), T::Hash[String, T.untyped], ActionController::Parameters)).returns(T::Hash[String, T.untyped]) }
		def prepare_variables(variables_param)
			case variables_param
				when String
					if variables_param.present?
						JSON.parse(variables_param) || {}
					else
						{}
					end
				when Hash
					variables_param
				when ActionController::Parameters
					variables_param.to_unsafe_hash # GraphQL-Ruby will validate name and type of incoming variables.
				when nil
					{}
			end
		end

		# handles errors in development
		sig { params(error: StandardError).void }
		def handle_error_in_development(error)
			logger.error error.message
			logger.error error.backtrace&.join("\n")

			render json: { errors: [{ message: error.message, backtrace: error.backtrace }], data: {} }, status: :internal_server_error
		end
end
