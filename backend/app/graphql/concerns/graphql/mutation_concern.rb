# typed: strict
# frozen_string_literal: true

module Graphql
	# Shared functionality for all GraphQL Mutation definitions
	module MutationConcern
		extend ActiveSupport::Concern

		extend T::Sig
		extend T::Helpers

		requires_ancestor { GraphQL::Schema::RelayClassicMutation }

		# rubocop:disable GraphQL/ObjectDescription

		# Error when model is not valid for mutation
		class ValidException < StandardError
			extend T::Sig

			# name of model
			sig { returns(String) }
			attr_reader :model_name

			# errors for model
			sig { returns(T.nilable(T::Array[String])) }
			attr_reader :model_errors

			# set model and errors for Error
			sig { params(model_name: String, model_errors: T.nilable(ActiveModel::Errors)).void }
			def initialize(model_name:, model_errors: nil)
				@model_name = model_name
				@model_errors = T.let(model_errors&.map(&:full_message), T.nilable(T::Array[String]))
				super
			end

			# parse error messages
			sig { returns(T::Array[String]) }
			def errors
				model_errors&.map do |model_error|
					"::#{model_name} - #{model_error}"
				end || []
			end
		end

		# rubocop:enable GraphQL/ObjectDescription

		class_methods do
			extend T::Sig
			include ::GraphQL::Schema::Member::HasArguments
			include ::GraphQL::Schema::Member::HasFields

			# create shared fields for all mutations
			sig { void }
			def field_mutation
				field :result, GraphQL::Schema::Member::GraphQLTypeNames::Boolean, null: true, description: 'if the mutation is successful'
				field :errors, [String], null: true, description: 'mutation specific error messages'
				field :show_error, GraphQL::Schema::Member::GraphQLTypeNames::Boolean, null: true, description: 'if the error messages should be shown to the end user'
			end

			# create argument for CUD (Create Update Delete) mutations
			sig { void }
			def argument_cud
				argument :operation, Types::Enums::OperationType, required: true, description: 'The type of operation'
			end
		end

		# shared functionality for all CUD (Create Update Delete) mutations
		sig { params(id: T.nilable(T.any(Integer, String)), operation: String, model: T.class_of(ActiveRecord::Base), find_params: T::Hash[T.any(String, Symbol), T.untyped],
				save_params: T::Hash[T.any(String, Symbol), T.untyped])
				.returns(T::Array[T.untyped]) }
		def resolve_cud(id:, operation:, model:, find_params: {}, save_params: {})
			session = context[:session]
			error = nil
			if session.blank?
				error = mutation_result(errors: ['Session not found'])
			end

			unless operation == 'CREATE'
				if id.blank?
					error = mutation_result(errors: ['id must exist'])
				end

				instance = model.where(id:, **find_params)&.first

				if instance.blank?
					error = mutation_result(errors: ['Record not found'])
				end
			end

			success = false

			unless error
				case operation
					when 'DELETE'
						success = instance&.destroy!
					when 'CREATE'
						instance = model.create!(id:, **save_params, **find_params)
						success = instance
					when 'UPDATE'
						success = instance&.update!(**save_params)
					else
						mutation_result(errors: ['Operation not supported'])
				end
			end

			[success, instance, error]
		end

		# checks if a model is valid and raises an mutation error if invalid
		sig { params(model: ActiveRecord::Base).void }
		def valid_model!(model)
			unless model.valid?
				raise ValidException.new(model_errors: model.errors, model_name: model.class.name.to_s)
			end
		end

		# Sorbet Type Definition for shared mutation fields
		MutationResultResult = T.type_alias do
			T.any({
					result: T::Boolean,
					errors: T::Array[String],
					show_error: T::Boolean
			}, T::Hash[Symbol, T.untyped])
		end

		# Formats GraphQL result for mutation
		sig { params(result: T::Boolean, errors: T::Array[String], show_error: T::Boolean, extra_params: T.untyped).returns(MutationResultResult) }
		def mutation_result(result: false, errors: [], show_error: false, **extra_params)
			T.let({
					result:,
					errors:,
					show_error:,
					**extra_params
			}, MutationResultResult)
		end

		# raises a mutation error
		sig { params(exception: T.any(StandardError, ValidException, Exception)).returns(MutationResultResult) }
		def mutation_exception(exception)
			if exception.instance_of? ValidException
				mutation_result(errors: T.cast(exception, ValidException).errors)
			else
				raise exception if Rails.env.development?

				mutation_result(errors: [exception.message])
			end
		end
	end
end
