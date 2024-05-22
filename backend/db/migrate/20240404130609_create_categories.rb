# frozen_string_literal: true

# Product Category
class CreateCategories < ActiveRecord::Migration[7.0]
	def change
		create_table :categories do |t|
			t.string :name, index: true, null: false # category name

			t.timestamps
		end
	end
end
