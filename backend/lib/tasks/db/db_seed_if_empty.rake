# typed: strict
# frozen_string_literal: true

# seeds the database only if database is currently empty
namespace :db do
	desc 'seed the database if the database is empty'
	task seed_if_empty: :environment do
		if Product.count.zero?
			Rake::Task['db:seed'].invoke
		end
	end
end
