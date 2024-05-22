# typed: strict
# frozen_string_literal: true

# Product Information
class Product < ApplicationRecord
	include FriendlyIdConcern

	belongs_to :category, class_name: 'Category', optional: false
	has_many :line_items, class_name: 'LineItem', as: :product, dependent: :restrict_with_error
	has_many :cached_images, class_name: 'CachedImage', as: :owner, dependent: :restrict_with_error

	has_many_attached :images, dependent: :destroy do |attachable|
		attachable.variant :blur, resize_to_fill: [96, 54, { crop: :centre }]
		attachable.variant :thumbnail, resize_to_fill: [200, 200, { crop: :centre }]
		attachable.variant :small, resize_to_fill: [450, 450, { crop: :centre }]
		attachable.variant :large, resize_to_fill: [960, 540, { crop: :centre }]
	end

	validates :name, length: { minimum: 3 }, presence: true
	validates :description, :price, presence: true
	validates_associated :line_items

	# Active storage variants is very slow, so we generate the variants here and cache the urls in the cached_images table
	after_commit prepend: true do
		T.unsafe(images).each do |image|
			if image.present?
				cached_image = CachedImage.find_by(attachment: image.blob) || CachedImage.new(owner: self, attachment: image.blob)

				if ActiveStorage::Current.url_options.blank?
					ActiveStorage::Current.url_options = { host: '127.0.0.1' }
				end

				%i[blur thumbnail small large].each do |size|
					variant = image.variant(size).processed
					cached_image.send :"#{size}_url=", URI.parse(variant.url(forever_link: true)).path

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
	end

	# get first image
	sig { returns(T.nilable(ActiveStorage::Attachment)) }
	def image
		T.unsafe(images).first
	end

	# get first cached image
	sig { returns(T.nilable(CachedImage)) }
	def cached_image
		T.unsafe(cached_images).first
	end
end
