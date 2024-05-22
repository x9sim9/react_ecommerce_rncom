# typed: false
# frozen_string_literal: true

module Spec
	module GraphqlHelper
		class << self
			def graphql_parse_params(params)
				params.map do |param|
					if param.is_a? Hash
						param.map do |key, value|
							"#{key.to_s.camelize(:lower)} {\n#{graphql_parse_params(value)}}"
						end
					else
						"#{param.to_s.camelize(:lower)}\n"
					end
				end.join
			end

			def graphql_parse_values(values)
				parse_item = lambda { |value, key = nil|
					case value
						when Integer
							if key == :id
								value.to_s
							else
								value
							end
						when BigDecimal
							Float(value)
						when Hash
							graphql_parse_values(value)
						when Array
							value.map { |item| parse_item.call(item) }
						else
							value
					end
				}

				values.to_h do |key, value|
					[key, parse_item.call(value, key)]
				end
			end
		end

		def auth(session:)
			JWT.encode({ customer_id: session.customer&.id, session_id: session.id }, ENV.fetch('JWT_SECRET', nil), 'HS256')
		end

		def post_query(*query, auth: nil)
			post('/graphql', params: { query: <<~GQL
			  query {
			  	#{query.join("\n")}
			  }
			GQL
			}, headers: { Authorization: auth })
		end

		def response_query(*keys)
			response_body = JSON.parse(response.body, symbolize_names: true)

			if response_body[:errors].present?
				return response_body
			end

			result = response_body[:data]

			keys.each do |key|
				result = result[key.to_s.camelize(:lower).to_sym]
			end
			result
		rescue StandardError
			{}
		end

		def paginate_result(model, offset: nil, limit: nil)
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

		def gql(name, params:, filters: {}, filter_literals: {})
			filter_data = <<~FILTERS
			  #{filters.transform_keys { |key| key.to_s.camelize(:lower) }.to_json.gsub(/"([^"]+)":/) { "\n#{::Regexp.last_match(1)}: " }.gsub(/(^\{)|(\}$)/, '')}
			  #{filter_literals.transform_keys { |key| key.to_s.camelize(:lower) }.to_json.delete('"').gsub(/"([^"]+)":/) { "\n#{::Regexp.last_match(1)}: " }.gsub(/(^\{)|(\}$)/, '')}
			FILTERS

			<<~GQL
			  #{name.to_s.camelize(:lower)}
			  		#{filter_data.strip.present? ? "(\n#{filter_data}\n)" : ''}
			  	{
			  			#{graphql_parse_params(params)}
			  	}
			GQL
		end

		private

			def graphql_parse_values(values)
				Spec::GraphqlHelper.graphql_parse_values(values)
			end

			def graphql_parse_params(params)
				Spec::GraphqlHelper.graphql_parse_params(params)
			end
	end
end
