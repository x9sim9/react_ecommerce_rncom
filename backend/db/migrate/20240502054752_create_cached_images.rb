# frozen_string_literal: true

# Cache ActiveStorage Variant images to improve performance
class CreateCachedImages < ActiveRecord::Migration[7.0]
	def change
		create_table :cached_images do |t|
			t.text :blur_base64, null: false # low resolution base64 image placeholder while image is still loading
			t.text :blur_url, null: false # url for blur image size
			t.text :thumbnail_url, null: false # url for thumbnail image size
			t.text :small_url, null: true # url for blur small size
			t.text :large_url, null: false # url for blur large size

			t.references :owner, polymorphic: true, index: true, null: false
			t.references :attachment, polymorphic: true, index: true, null: false

			t.timestamps
		end
	end
end
