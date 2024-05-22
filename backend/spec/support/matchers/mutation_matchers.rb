# typed: false
# frozen_string_literal: true

RSpec::Matchers.matcher :have_successful_mutation_response do
	match do |actual|
		expect(actual).to include result: true
		expect(actual).to include errors: []
	end
end

RSpec::Matchers.matcher :have_error_mutation_response do
	match do |actual|
		expect(actual).to include result: false
		expect(actual[:errors]).not_to be_empty
	end
end

RSpec::Matchers.matcher :have_mutation_error do |error|
	match do |actual|
		if actual.blank?
			raise _('expect does not contain valid response_mutation')
		end

		errors = actual[:errors]
		errors = errors.map do |item|
			item.gsub(/[^A-Za-z0-9 ]/, '').gsub(/\s+/, ' ').humanize
		end

		expect(errors).to(be_any { |m| m =~ /#{error}/i }) # shows error message
	end
end

RSpec::Matchers.matcher :have_mutation_exception do
	match do |actual|
		expect(actual[:exception]).to be_truthy
	end
end
