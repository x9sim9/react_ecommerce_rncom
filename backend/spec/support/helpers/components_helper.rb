# typed: false
# frozen_string_literal: true

module Spec
	module ComponentsHelper
		extend ActiveSupport::Concern

		def strip_spacing(value)
			value.gsub(/(\n|\r|\t)+/, ' ')
		end

		module Form
			extend ActiveSupport::Concern
			included do
				include RSpec::Rails::ViewExampleGroup
				include RSpec::Rails::ViewExampleGroup::ExampleMethods
			end

			def form(model)
				ActionView::Helpers::FormBuilder.new('', model, view, {})
			end
		end
	end
end
