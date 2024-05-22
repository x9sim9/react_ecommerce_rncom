# typed: false
# frozen_string_literal: true

# Friendly ID column for models
module FriendlyIdConcern
	extend ActiveSupport::Concern

	included do
		after_create do
			if friendly_id.nil?
				create_friendly_id
			end
		end

		after_save do
			if friendly_id.nil?
				create_friendly_id
			end
		end

		before_commit do
			if friendly_id.nil?
				create_friendly_id
			end
		end
	end

	private

		# create friendly id from id
		def create_friendly_id
			if id.present?
				sqids = Sqids.new({ min_length: 8, alphabet: 'BCDFGHJKLMNPQRSTVWXYZ123456789' }) # ignore vowels and common mistake characters

				self.friendly_id = sqids.encode([id])
				save!
			end
		end
end
