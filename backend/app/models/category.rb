# typed: strict
# frozen_string_literal: true

# Product Category
class Category < ApplicationRecord
	has_many :products, class_name: 'Product', dependent: :delete_all
	has_one :cached_image, class_name: 'CachedImage', as: :owner, dependent: :restrict_with_error

	has_one_attached :image, dependent: :destroy do |attachable|
		attachable.variant :blur, resize_to_fill: [60, 60, { crop: :centre }]
		attachable.variant :thumbnail, resize_to_fill: [330, 330, { crop: :centre }]
		attachable.variant :large, resize_to_fill: [600, 600, { crop: :centre }]
	end

	# Active storage variants is very slow, so we generate the variants here and cache the urls in the cached_images table
	after_commit prepend: true do
		if image.present?
			cached_image = CachedImage.find_by(attachment: T.unsafe(image).blob) || CachedImage.new(owner: self, attachment: T.unsafe(image).blob)

			if ActiveStorage::Current.url_options.blank?
				ActiveStorage::Current.url_options = { host: '127.0.0.1' }
			end

			%i[blur thumbnail large].each do |size|
				variant = T.unsafe(image).variant(size).processed
				cached_image.send :"#{size}_url=", URI.parse(variant.url).path

				if size == :blur
					file_image = variant.send(:record).image

					file_image.open do |file|
						cached_image.blur_base64 = "data:#{T.unsafe(image).blob.content_type};base64,#{Base64.strict_encode64(file.read)}"
					end
				end
			end

			cached_image.save!
		end
	end

	validates :name, length: { minimum: 3 }, presence: true
end
