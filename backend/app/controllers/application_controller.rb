# typed: strict
# frozen_string_literal: true

# Base controller for all Controllers
class ApplicationController < ActionController::API
	extend T::Sig

	before_action :set_url_options

	sig { void }
	def set_url_options
		ActiveStorage::Current.url_options = { protocol: request.protocol, host: request.host, port: request.port }
	end
end
