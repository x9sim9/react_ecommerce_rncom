# typed: strict
# frozen_string_literal: true

# Base Model for all Models
class ApplicationRecord < ActiveRecord::Base
	extend T::Sig

	primary_abstract_class

	# trigger all after create callbacks
	sig { params(ids: T.any(T::Array[String], ActiveRecord::Result), model: T.any(ActiveRecord::Relation, ActiveRecord::AssociationRelation, T.class_of(ActiveRecord::Base))).void }
	def self.callbacks_after_create(ids, model)
		records = model.where(id: ids.pluck('id'))
		records.each do |record|
			record.run_callbacks(:create) { true }
		end
	end
end
