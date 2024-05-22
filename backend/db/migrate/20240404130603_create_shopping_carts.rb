# frozen_string_literal: true

# Shopping Cart Details
class CreateShoppingCarts < ActiveRecord::Migration[7.0]
	def change
		create_table :shopping_carts do |t|
			t.references :session, foreign_key: { to_table: 'sessions' }, index: true, null: true

			t.timestamps
		end
	end
end
