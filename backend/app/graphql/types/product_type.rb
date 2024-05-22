# typed: strict
# frozen_string_literal: true

module Types
	# Product Information
	class ProductType < Types::BaseObject
		# Product Images
		class ProductImageType < Types::BaseObject
			extend T::Sig

			description 'images for products'

			field :id, ID, null: false, description: 'unique id for cached image'
			field :image_blur, String, null: false, description: 'low resolution base64 image placeholder while image is still loading', method: :blur_base64
			field :image_large, String, null: false, description: 'url for large image size', method: :large_url
			field :image_small, String, null: false, description: 'url for small image size', method: :small_url
			field :image_thumbnail, String, null: false, description: 'url for thumbnail image size', method: :thumbnail_url

			# set image variant types
			sig { params(object: T.untyped, context: T.untyped).void }
			def initialize(object, context)
				@variants = T.let({
						blur: 1,
						thumbnail: 2,
						small: 3,
						large: 4
				}, T::Hash[String, Integer])
				super
			end

			# low resolution base64 image placeholder while image is still loading
			sig { returns(String) }
			def image_blur
				object.blur_base64
			end

			# url for thumbnail image size
			sig { returns(String) }
			def image_thumbnail
				object.thumbnail_url
			end

			# url for small image size
			sig { returns(String) }
			def image_small
				object.small_url
			end

			# url for large image size
			sig { returns(String) }
			def image_large
				object.large_url
			end
		end

		# cached images
		sig { returns(T.nilable(ActiveRecord::Associations::CollectionProxy)) }
		def images
			object.cached_images
		end

		# first cached image
		sig { returns(T.nilable(CachedImage)) }
		def image
			object.cached_image
		end

		description 'product information'
		field_friendly_id
		field :cached_image, ProductImageType, null: true, description: 'first Cached Image for product'
		field :cached_images, [ProductImageType], null: true, description: 'Cached Image(s) for product'
		field :category, CategoryType, null: false, description: 'Category for product'
		field :category_id, ID, null: false, description: 'unique id for Category'
		field :description, String, null: false, description: 'description of product'
		field :id, ID, null: false, description: 'unique id for product'
		field :image, ProductImageType, null: true, description: 'first Image for product', method: :cached_image
		field :images, [ProductImageType], null: true, description: 'Image for product', method: :cached_images
		field :name, String, null: false, description: 'name of product'
		field :price, Float, null: false, description: 'price of product'
	end
end
