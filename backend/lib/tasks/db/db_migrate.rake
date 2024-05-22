# typed: false
# frozen_string_literal: true

# adds extra tasks to run when db:migrate is run
namespace :db do
	@outstanding_migrations = nil

	desc 'Summarised migration info, run after db:migrate'
	task migrate_hooks: :environment do
		if ARGV.include?('-q') && @outstanding_migrations
			printf "\nMigrated Tables\n- "
			ActiveRecord::Base.connection.tables.each do |table|
				printf table
				unless table == ActiveRecord::Base.connection.tables.last
					printf ', '
				end
			end
			printf "\n"
		end
	end

	desc 'Summarised migration info, run before db:migrate'
	task migrate_hooks_before: :environment do
		@outstanding_migrations = ActiveRecord::Base.connection.migration_context.needs_migration?
	end
end

Rake::Task['db:migrate'].enhance([:migrate_hooks_before])
Rake::Task['db:migrate'].enhance do
	Rake::Task['db:migrate_hooks'].invoke
end
