# typed: strict
# frozen_string_literal: true

require 'active_record/connection_adapters/postgresql_adapter'
module ActiveRecord
	module ConnectionAdapters
		# prevent accidental deletion of a production database
		class PostgreSQLAdapter < AbstractAdapter
			def drop_database(name)
				raise _('cannot drop the production database') if Rails.env.production?

				execute <<-SQL.squish
          UPDATE pg_catalog.pg_database
          SET datallowconn=false WHERE datname='#{name}'
				SQL

				execute <<-SQL.squish
          SELECT pg_terminate_backend(pg_stat_activity.pid)
          FROM pg_stat_activity
          WHERE pg_stat_activity.datname = '#{name}';
				SQL
				execute "DROP DATABASE IF EXISTS #{quote_table_name(name)}"
			end
		end
	end
end
