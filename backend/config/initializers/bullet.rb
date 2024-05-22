# typed: strict
# frozen_string_literal: true

# initializer for 'bullet' gem, checks for performance issues in development
class Application < Rails::Application
	config.after_initialize do
		if Rails.env.development?
			Bullet.enable = true
			Bullet.alert = true
			Bullet.bullet_logger = true
			Bullet.console = true
			Bullet.rails_logger = true
			Bullet.add_footer = true
		end
	end
end
