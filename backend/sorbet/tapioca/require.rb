# typed: strict
# frozen_string_literal: true

require 'action_controller/railtie'
require 'action_mailbox/engine'
require 'action_text/engine'
require 'action_view/railtie'
require 'active_job/railtie'
require 'active_model/railtie'
require 'active_record/railtie'
require 'active_storage/engine'
require 'active_support/core_ext/integer/time'
require 'bootsnap/setup'
require 'bundler/setup'
require 'ffaker'
require 'rails'
require 'rails/test_unit/railtie'
require 'rspec/rails'
