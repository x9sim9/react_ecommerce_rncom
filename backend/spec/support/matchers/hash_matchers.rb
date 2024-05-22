# typed: false
# frozen_string_literal: true

RSpec::Matchers.define :be_a_hash_like do |expected_hash|
	matching_results = nil
	hash = nil

	match do |actual_hash|
		hash = actual_hash
		matching_results = actual_hash == expected_hash

		matching_results
	end

	failure_message do |_x|
		unless matching_results
			system(
					"git diff $(echo '#{JSON.pretty_generate(expected_hash)}' | git hash-object -w --stdin) " \
							"$(echo '#{JSON.pretty_generate(hash)}' | git hash-object -w --stdin) --word-diff",
					out: $stdout,
					err: :out
			)
		end
	end
end

RSpec::Matchers.matcher :hash_including_present do |*keys, **kwkeys|
	match do |actual|
		if keys.present?
			keys.each do |key|
				expect(actual[key]).to be_present
			end
		end

		if kwkeys.present?
			parse_keys = lambda { |keys, data|
				keys.each do |key, value|
					if value.is_a? Array
						parse_keys.call(value, data[key])
					else
						expect(key).to be_present
					end
				end
			}

			parse_keys.call(kwkeys, actual)
		end

		true
	end
end
