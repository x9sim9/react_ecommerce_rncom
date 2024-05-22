# typed: false
# frozen_string_literal: true

module Spec
	module GraphqlMatchers
		include Spec::GraphqlHelper

		RSpec::Matchers.matcher :have_successful_query_response do
			source = nil

			match do |actual|
				source = actual
				expect(actual).not_to include :errors
			end

			failure_message do
				<<~MESSAGE
				  expected
				  	#{source.inspect}
				  to have successful query response
				MESSAGE
			end

			failure_message_when_negated do
				<<~MESSAGE
				  expected
				  	#{source.inspect}
				  to not have successful query response
				MESSAGE
			end
		end

		RSpec::Matchers.matcher :have_error_query_response do
			match do |actual|
				expect(actual).to include :errors
			end
		end

		RSpec::Matchers.matcher :have_graphql_response do |result, ignore: []|
			source = nil
			target = nil

			match do |actual|
				parse_keys = lambda { |data, ignores|
					if data.is_a? OpenStruct
						data = data.to_h
					end

					data = data.to_h do |key, value|
						ignore_data = ignores.is_a?(Hash) ? ignores : {}
						key = key.to_s.camelize(:lower).to_sym
						if value.is_a?(Hash) || value.is_a?(OpenStruct)
							[key, parse_keys.call(value, ignore_data[key])]
						elsif value.is_a? Array
							[key, value.map do |item|
								if item.is_a?(Hash) || item.is_a?(OpenStruct)
									parse_keys.call(item, ignore_data[key])
								else
									item
								end
							end]
						else
							[key, value]
						end
					end

					if ignores.present?
						data = data&.reject do |key, value|
							if value.is_a?(Hash)
								true
							elsif ignores.is_a? Array
								ignores.include? key.to_s.underscore.to_sym
							else
								ignores == key.to_s.underscore.to_sym
							end
						end
					end

					data
				}

				parse_result = lambda { |data, ignores, parse = false|
					is_array = true
					unless data.is_a? Array
						data = [data]
						is_array = false
					end

					data = data.map do |item|
						item = if item.is_a? Array
							item.map { |field| parse_keys.call(field, ignores) }
						else
							parse_keys.call(item, ignores)
						end

						if parse
							item = Spec::GraphqlHelper.graphql_parse_values(item)
						end
						item
					end

					unless is_array
						data = data[0]
					end

					data
				}
				result = parse_result.call(result, ignore, true)
				actual = parse_result.call(actual, ignore, false)

				source = actual
				target = result

				actual == result
			end

			failure_message do
				<<~MESSAGE
				  expected
				  	#{source.inspect}
				  to have graphql response
				  	#{target.inspect}
				MESSAGE
			end

			failure_message_when_negated do
				<<~MESSAGE
				  expected
				  	#{source.inspect}
				  to not have graphql response
				  	#{target.inspect}
				MESSAGE
			end
		end
	end
end
