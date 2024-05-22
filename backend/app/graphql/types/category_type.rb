# typed: strict
# frozen_string_literal: true

module Types
	# Product Category
	class CategoryType < Types::BaseObject
		extend T::Sig

		description 'product category'

		field :id, ID, null: false, description: 'unique id for category'
		field :image_blur, String, null: true, description: 'low resolution base64 image placeholder while image is still loading'
		field :image_large, String, null: true, description: 'url for large image size'
		field :image_source, String, null: true, method: :image, description: 'url for original unmodified image'
		field :image_thumbnail, String, null: true, description: 'url for thumbnail image size'
		field :name, String, null: false, description: 'category name'
		field :products, [ProductType], description: 'all products in category'

		sig { params(object: T.untyped, context: T.untyped).void }
		def initialize(object, context)
			@variants = T.let({
					blur: 1,
					thumbnail: 2,
					large: 3
			}, T::Hash[String, Integer])
			super
		end

		# url for original unmodified image
		sig { returns(String) }
		def image_source
			URI.parse(object.image_attachment.blob.url).path || ''
		end

		# low resolution base64 image placeholder while image is still loading
		sig { returns(T.nilable(String)) }
		def image_blur
			object.cached_image&.blur_base64
		end

		# url for thumbnail image size
		sig { returns(T.nilable(String)) }
		def image_thumbnail
			object.cached_image&.thumbnail_url
		end

		# url for large image size
		sig { returns(T.nilable(String)) }
		def image_large
			object.cached_image&.large_url
			# Rails.application.routes.url_helpers.rails_representation_url(object.image.variant(:large).send(:record).image, only_path: true)
		end
	end
end
