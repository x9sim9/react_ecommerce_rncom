# typed: false
# frozen_string_literal: true

module Spec
	module FabricatorHelper
		def many_trait(key, join:, items: 3, params: {})
			build = nil

			proc do
				transient :"with_#{key.to_s.pluralize}"
				transient :"with_#{key.to_s.singularize}"

				after_build do |model, transients|
					active, all_params, count = parse_trait(key:, join:, items:, params:, model:, transients:)

					if active
						build = Fabricate.build_times(count, key.to_s.singularize, **all_params)
						model.send(:"#{key.to_s.pluralize}=", build)
					end
				end

				before_create do |model, transients|
					active, = parse_trait(key:, join:, items:, params:, model:, transients:)
					if active
						model.send(:"#{key.to_s.pluralize}=", [])
					end
				end

				after_create do |model, transients|
					active, _, _, joins = parse_trait(key:, join:, items:, params:, model:, transients:)

					if active
						unless build
							raise _('missing build')
						end

						build.each do |record|
							record.update(joins)
						end

						model.send(key.to_s.pluralize).reload
						model.validate!
					end
				end
			end
		end

		def belong_trait(key, params: {})
			build = nil

			proc do
				transient :"with_#{key.to_s.singularize}"

				after_build do |model, transients|
					active, all_params, = parse_trait(key:, join: {}, items: 1, params:, model:, transients:)

					if active
						build = Fabricate.build(key.to_s.singularize, **all_params)
						model.send(:"#{key.to_s.singularize}=", build)
					end
				end

				after_create do |model, transients|
					active, all_params, = parse_trait(key:, join: {}, items: 1, params:, model:, transients:)

					if active
						unless build
							raise _('missing build')
						end

						model.send(:"#{key.to_s.singularize}=", Fabricate.create(key.to_s.singularize, **all_params))
						model.send(key.to_s.singularize.to_s).validate!
						model.validate!
						model.save!
						model.reload
					end
				end
			end
		end

		def one_trait(key, join:, params: {})
			build = nil

			proc do
				transient :"with_#{key.to_s.singularize}"

				after_build do |model, transients|
					active, all_params, = parse_trait(key:, join:, items: 1, params:, model:, transients:)

					if active
						build = Fabricate.build(key.to_s.singularize, **all_params)
						model.send(:"#{key.to_s.singularize}=", build)
					end
				end

				before_create do |model, transients|
					active, = parse_trait(key:, join:, items: 1, params:, model:, transients:)
					if active
						model.send(:"#{key.to_s.singularize}=", nil)
					end
				end

				after_create do |model, transients|
					active, _, _, joins = parse_trait(key:, join:, items: 1, params:, model:, transients:)
					if active
						unless build
							raise _('missing build')
						end

						new_build = build.dup
						build.attributes.each do |attribute, value|
							new_build.send(:"#{attribute}=", value)
						end
						build.class.reflect_on_all_associations.each do |association|
							new_build.send(:"#{association.name}=", build.send(association.name))
						end
						build = new_build

						build.assign_attributes(joins)
						model.send(:"#{key.to_s.singularize}=", build)
						model.send(key.to_s.singularize.to_s).validate!
						model.save!
						model.validate!
					end
				end
			end
		end

		private

			def parse_trait(key:, join:, items:, params:, model:, transients:)
				args = transients[:"with_#{key.to_s.pluralize}"] || transients[:"with_#{key.to_s.singularize}"]
				extra = args.is_a?(Hash) ? args : {}

				count = transients[:"with_#{key.to_s.singularize}"].present? && transients[:"with_#{key.to_s.pluralize}"].blank? ? 1 : items

				joins = join.transform_values { |join_key| model.send(join_key) }
				[args.present?, { **joins, **params, **extra }, count, joins]
			end
	end
end
