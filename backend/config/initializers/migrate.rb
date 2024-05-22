# typed: strict
# frozen_string_literal: true

module ActiveRecord
	module ConnectionAdapters
		# adds friendly_id migration field option for migrations
		class TableDefinition
			extend T::Sig

			sig { params(args: T.untyped).void }
			def friendly_id(*args)
				options = args.extract_options!

				column('friendly_id', 'string', index: true, null: true, **options)
			end
		end
	end
end
