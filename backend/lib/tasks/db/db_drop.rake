# typed: false
# frozen_string_literal: true

# adds extra tasks to run when db:drop is run
namespace :db do
	desc 'Empty local ActiveStorage, run after db:drop'
	task drop_hooks: :environment do
		unless ARGV.include?('-q')
			printf "\nRemoving all files from ActiveStorage (Disk)"
		end
		FileUtils.rm_rf(Rails.root.glob('storage/*'))
	end
end

Rake::Task['db:drop'].enhance(['db:drop_hooks'])
