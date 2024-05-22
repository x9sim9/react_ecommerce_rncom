# typed: false
# frozen_string_literal: true

Rake::Task['test:all'].enhance do
	puts 'Error:'
	puts '- Tests use RSpec'
	puts '- type `rspec` to test'
end

Rake::Task['test'].enhance do
	puts 'Error:'
	puts '- Tests use RSpec'
	puts '- type `rspec` to test'
end
