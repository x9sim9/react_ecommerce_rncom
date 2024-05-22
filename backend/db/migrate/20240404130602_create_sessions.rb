# frozen_string_literal: true

# User Session
class CreateSessions < ActiveRecord::Migration[7.0]
	def change
		create_table :sessions do |t|
			t.references :customer, foreign_key: { to_table: 'customers' }, index: { unique: true }, null: true

			t.timestamps
		end
	end
end
