# typed: false
# frozen_string_literal: true

# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

# initializer for 'rack-cors' gem, sets CORS headers
Rails.application.config.middleware.insert_before 0, Rack::Cors do
	allow do
		origins '127.0.0.1:3021'

		resource '*',
				headers: :any,
				methods: %i[get post put patch delete options head]
	end
end
