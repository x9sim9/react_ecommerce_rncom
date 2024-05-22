# typed: false
# frozen_string_literal: true

require_relative 'boot'

require 'rails'
# Pick the frameworks you want:
require 'active_model/railtie'
require 'active_job/railtie'
require 'active_record/railtie'
require 'active_storage/engine'
require 'action_controller/railtie'
# require "action_mailer/railtie"
require 'action_mailbox/engine'
require 'action_text/engine'
require 'action_view/railtie'
# require "action_cable/engine"
require 'rails/test_unit/railtie'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Backend
	# Rails Application Config
	class Application < Rails::Application
		# Initialize configuration defaults for originally generated Rails version.
		config.load_defaults 7.0

		config.session_store :cookie_store, key: '_interslice_session'
		config.middleware.use ActionDispatch::Cookies
		config.middleware.use config.session_store, config.session_options

		# Configuration for the application, engines, and railties goes here.
		#
		# These settings can be overridden in specific environments using the files
		# in config/environments, which are processed later.
		#
		# config.time_zone = "Central Time (US & Canada)"
		# config.eager_load_paths << Rails.root.join("extras")

		# Only loads a smaller set of middleware suitable for API only apps.
		# Middleware like session, flash, cookies can be added back manually.
		# Skip views, helpers and assets when generating a new resource.
		config.api_only = true

		if ARGV.include?('-q')
			config.after_initialize do
				c = ActiveRecord::Base.establish_connection(**Rails.configuration.database_configuration[Rails.env], database: nil)
				begin
					ActiveRecord::Base.connection
				rescue ActiveRecord::ConnectionNotEstablished
					con = c.db_config.configuration_hash
					abort "- Error Unable to connect to database \n  - host: #{con[:host]}\n  - port: #{con[:port]}\n  - username: #{con[:username]}"
				end
			end

			ENV['VERBOSE'] = 'false'
		end
	end
end
