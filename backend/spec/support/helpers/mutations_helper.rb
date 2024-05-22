# typed: false
# frozen_string_literal: true

module Spec
	module MutationsHelper
		def auth(session:)
			JWT.encode({ customer_id: session.customer&.id, session_id: session.id }, ENV.fetch('JWT_SECRET', nil), 'HS256')
		end

		def post_mutation(*query, auth: nil)
			post('/graphql', params: { query: <<~GQL
			  mutation {
			  	#{query.join("\n")}
			  }
			GQL
			}, headers: { Authorization: auth })
		end

		def response_mutation(*keys)
			response_body = JSON.parse(response.body, symbolize_names: true)

			if response_body[:errors].present?
				if keys.length == 1
					{
							result: false,
							errors: response_body[:errors].pluck(:message),
							exception: true
					}
				end
			else
				result = response_body[:data]

				keys.each do |key|
					result = result[key.to_s.camelize(:lower).to_sym]
				end
				result
			end
		rescue StandardError
			{}
		end

		def mutation_errors(key)
			errors = response_mutation(key, :errors)
			errors.map do |item|
				item.gsub(/[^A-Za-z0-9 ]/, '').gsub(/\s+/, ' ').humanize
			end
		end

		def gql(name, input:, params:)
			<<~GQL
			  #{name.to_s.camelize(:lower)}(input:#{' '}
			  		#{input.transform_keys { |key| key.to_s.camelize(:lower) }.to_json.gsub(/"([^"]+)":/) { "\n#{::Regexp.last_match(1)}: " }.gsub(/"([A-Z]+)"/, '\1')}
			  	) {
			  		#{Spec::GraphqlHelper.graphql_parse_params(params)}
			  }
			GQL
		end

		def expect_successful_response(response)
			expect(response).to include result: true
			expect(response).to include errors: []
		end
	end
end
