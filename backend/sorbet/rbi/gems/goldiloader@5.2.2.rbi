# typed: true

# DO NOT EDIT MANUALLY
# This is an autogenerated file for types exported from the `goldiloader` gem.
# Please instead update this file by running `bin/tapioca gem goldiloader`.

class ActiveRecord::Associations::Association
  include ::Goldiloader::AssociationPatch
end

class ActiveRecord::Associations::CollectionAssociation < ::ActiveRecord::Associations::Association
  include ::Goldiloader::CollectionAssociationPatch
end

class ActiveRecord::Associations::CollectionProxy < ::ActiveRecord::Relation
  include ::Goldiloader::CollectionProxyPatch
end

class ActiveRecord::Associations::HasManyThroughAssociation < ::ActiveRecord::Associations::HasManyAssociation
  include ::Goldiloader::ThroughAssociationPatch
end

class ActiveRecord::Associations::HasOneThroughAssociation < ::ActiveRecord::Associations::HasOneAssociation
  include ::Goldiloader::ThroughAssociationPatch
end

class ActiveRecord::Associations::SingularAssociation < ::ActiveRecord::Associations::Association
  include ::Goldiloader::SingularAssociationPatch
end

class ActiveRecord::Base
  include ::ActiveModel::ForbiddenAttributesProtection
  include ::ActiveModel::AttributeAssignment
  include ::ActiveModel::Serialization
  include ::Goldiloader::BasePatch
end

class ActiveRecord::Reflection::AssociationReflection < ::ActiveRecord::Reflection::MacroReflection
  include ::Goldiloader::AssociationReflectionPatch
end

class ActiveRecord::Reflection::ThroughReflection < ::ActiveRecord::Reflection::AbstractReflection
  include ::Goldiloader::AssociationReflectionPatch
end

class ActiveRecord::Relation
  include ::Goldiloader::RelationPatch
  include ::ActiveModel::ForbiddenAttributesProtection
end

class ActiveRecord::Relation::Merger
  include ::Goldiloader::MergerPatch
end

# source://goldiloader//lib/goldiloader/compatibility.rb#3
module Goldiloader
  class << self
    # source://goldiloader//lib/goldiloader.rb#39
    def disabled; end

    # source://goldiloader//lib/goldiloader.rb#31
    def enabled; end

    # source://goldiloader//lib/goldiloader.rb#27
    def enabled=(val); end

    # @return [Boolean]
    #
    # source://goldiloader//lib/goldiloader.rb#23
    def enabled?; end

    # Sets the process-wide enabled status
    #
    # source://goldiloader//lib/goldiloader.rb#21
    def globally_enabled; end

    # Sets the process-wide enabled status
    #
    # source://goldiloader//lib/goldiloader.rb#21
    def globally_enabled=(_arg0); end
  end
end

# source://goldiloader//lib/goldiloader/association_loader.rb#4
module Goldiloader::AssociationLoader
  extend ::Goldiloader::AssociationLoader

  # source://goldiloader//lib/goldiloader/association_loader.rb#7
  def load(model, association_name); end

  private

  # source://goldiloader//lib/goldiloader/association_loader.rb#17
  def eager_load(models, association_name); end

  # @return [Boolean]
  #
  # source://goldiloader//lib/goldiloader/association_loader.rb#32
  def has_association?(model, association_name); end

  # @return [Boolean]
  #
  # source://goldiloader//lib/goldiloader/association_loader.rb#25
  def load?(model, association_name); end
end

# source://goldiloader//lib/goldiloader/association_options.rb#4
module Goldiloader::AssociationOptions
  extend ::Goldiloader::AssociationOptions

  # source://goldiloader//lib/goldiloader/association_options.rb#20
  def register; end
end

# This is only used in Rails 5+
#
# source://goldiloader//lib/goldiloader/association_options.rb#10
module Goldiloader::AssociationOptions::AssociationBuilderExtension
  class << self
    # source://goldiloader//lib/goldiloader/association_options.rb#11
    def build(model, reflection); end

    # source://goldiloader//lib/goldiloader/association_options.rb#15
    def valid_options; end
  end
end

# source://goldiloader//lib/goldiloader/association_options.rb#7
Goldiloader::AssociationOptions::OPTIONS = T.let(T.unsafe(nil), Array)

# source://goldiloader//lib/goldiloader/active_record_patches.rb#101
module Goldiloader::AssociationPatch
  extend ::ActiveSupport::Concern
  include GeneratedInstanceMethods

  mixes_in_class_methods GeneratedClassMethods

  # @return [Boolean]
  #
  # source://goldiloader//lib/goldiloader/active_record_patches.rb#109
  def auto_include?; end

  # @return [Boolean]
  #
  # source://goldiloader//lib/goldiloader/active_record_patches.rb#115
  def fully_load?; end

  private

  # @return [Boolean]
  #
  # source://goldiloader//lib/goldiloader/active_record_patches.rb#121
  def eager_loadable?; end

  # source://goldiloader//lib/goldiloader/active_record_patches.rb#125
  def load_with_auto_include; end

  module GeneratedClassMethods
    def default_fully_load; end
    def default_fully_load=(value); end
    def default_fully_load?; end
  end

  module GeneratedInstanceMethods
    def default_fully_load; end
    def default_fully_load=(value); end
    def default_fully_load?; end
  end
end

# source://goldiloader//lib/goldiloader/active_record_patches.rb#75
module Goldiloader::AssociationReflectionPatch
  # Note we need to pass the association's target class as an argument since it won't be known
  # outside the context of an association instance for polymorphic associations.
  #
  # @return [Boolean]
  #
  # source://goldiloader//lib/goldiloader/active_record_patches.rb#78
  def eager_loadable?(target_klass); end
end

# source://goldiloader//lib/goldiloader/auto_include_context.rb#4
class Goldiloader::AutoIncludeContext
  include ::Goldiloader::CustomPreloads

  # @return [AutoIncludeContext] a new instance of AutoIncludeContext
  #
  # source://goldiloader//lib/goldiloader/custom_preloads.rb#5
  def initialize; end

  # Returns the value of attribute models.
  #
  # source://goldiloader//lib/goldiloader/auto_include_context.rb#5
  def models; end

  # source://goldiloader//lib/goldiloader/auto_include_context.rb#39
  def register_model(models); end

  # source://goldiloader//lib/goldiloader/auto_include_context.rb#39
  def register_models(models); end

  # source://goldiloader//lib/goldiloader/auto_include_context.rb#7
  def size(*_arg0, **_arg1, &_arg2); end

  class << self
    # source://goldiloader//lib/goldiloader/auto_include_context.rb#13
    def register_models(models, included_associations = T.unsafe(nil)); end
  end
end

# source://goldiloader//lib/goldiloader/active_record_patches.rb#4
module Goldiloader::BasePatch
  extend ::ActiveSupport::Concern

  # source://goldiloader//lib/goldiloader/active_record_patches.rb#20
  def auto_include_context; end

  # source://goldiloader//lib/goldiloader/active_record_patches.rb#29
  def goldiload(cache_name = T.unsafe(nil), key: T.unsafe(nil), &block); end

  # source://goldiloader//lib/goldiloader/active_record_patches.rb#24
  def reload(*_arg0); end

  private

  # source://goldiloader//lib/goldiloader/active_record_patches.rb#15
  def initialize_copy(other); end
end

# source://goldiloader//lib/goldiloader/active_record_patches.rb#157
module Goldiloader::CollectionAssociationPatch
  # source://goldiloader//lib/goldiloader/active_record_patches.rb#160
  def empty?(*args, &block); end

  # @return [Boolean]
  #
  # source://goldiloader//lib/goldiloader/active_record_patches.rb#170
  def find_from_target?; end

  # source://goldiloader//lib/goldiloader/active_record_patches.rb#160
  def ids_reader(*args, &block); end

  # source://goldiloader//lib/goldiloader/active_record_patches.rb#166
  def load_target(*args); end

  # source://goldiloader//lib/goldiloader/active_record_patches.rb#160
  def size(*args, &block); end
end

# source://goldiloader//lib/goldiloader/active_record_patches.rb#199
module Goldiloader::CollectionProxyPatch
  # The CollectionProxy just forwards exists? to the underlying scope so we need to intercept this and
  # force it to use size which handles fully_load properly.
  #
  # @return [Boolean]
  #
  # source://goldiloader//lib/goldiloader/active_record_patches.rb#202
  def exists?(*args); end
end

# source://goldiloader//lib/goldiloader/compatibility.rb#4
module Goldiloader::Compatibility
  class << self
    # @return [Boolean]
    #
    # source://goldiloader//lib/goldiloader/compatibility.rb#5
    def pre_rails_7?; end

    # @return [Boolean]
    #
    # source://goldiloader//lib/goldiloader/compatibility.rb#9
    def rails_6_1?; end

    # @return [Boolean]
    #
    # source://goldiloader//lib/goldiloader/compatibility.rb#13
    def rails_6_1_or_greater?; end
  end
end

# source://goldiloader//lib/goldiloader/custom_preloads.rb#4
module Goldiloader::CustomPreloads
  # source://goldiloader//lib/goldiloader/custom_preloads.rb#5
  def initialize; end

  # source://goldiloader//lib/goldiloader/custom_preloads.rb#10
  def preloaded(model, cache_name:, key:, &block); end

  private

  # source://goldiloader//lib/goldiloader/custom_preloads.rb#45
  def fetch_preloaded(cache_name, instance, key:); end

  # source://goldiloader//lib/goldiloader/custom_preloads.rb#29
  def key_from_record(record, key_or_key_list); end

  # @return [Boolean]
  #
  # source://goldiloader//lib/goldiloader/custom_preloads.rb#49
  def preloaded?(cache_name); end

  # source://goldiloader//lib/goldiloader/custom_preloads.rb#40
  def store_preloaded(cache_name, preloaded_hash); end
end

# source://goldiloader//lib/goldiloader/active_record_patches.rb#65
module Goldiloader::MergerPatch
  private

  # source://goldiloader//lib/goldiloader/active_record_patches.rb#68
  def merge_single_values; end
end

# source://goldiloader//lib/goldiloader/active_record_patches.rb#36
module Goldiloader::RelationPatch
  # source://goldiloader//lib/goldiloader/active_record_patches.rb#45
  def auto_include(auto_include = T.unsafe(nil)); end

  # source://goldiloader//lib/goldiloader/active_record_patches.rb#49
  def auto_include!(auto_include = T.unsafe(nil)); end

  # source://goldiloader//lib/goldiloader/active_record_patches.rb#54
  def auto_include_value; end

  # source://goldiloader//lib/goldiloader/active_record_patches.rb#58
  def auto_include_value=(value); end

  # source://goldiloader//lib/goldiloader/active_record_patches.rb#37
  def exec_queries; end
end

# source://goldiloader//lib/goldiloader/scope_info.rb#4
class Goldiloader::ScopeInfo
  # @return [ScopeInfo] a new instance of ScopeInfo
  #
  # source://goldiloader//lib/goldiloader/scope_info.rb#7
  def initialize(scope); end

  # @return [Boolean]
  #
  # source://goldiloader//lib/goldiloader/scope_info.rb#19
  def auto_include?; end

  # @return [Boolean]
  #
  # source://goldiloader//lib/goldiloader/scope_info.rb#23
  def from?; end

  # @return [Boolean]
  #
  # source://goldiloader//lib/goldiloader/scope_info.rb#27
  def group?; end

  # @return [Boolean]
  #
  # source://goldiloader//lib/goldiloader/scope_info.rb#15
  def limit?; end

  # @return [Boolean]
  #
  # source://goldiloader//lib/goldiloader/scope_info.rb#11
  def offset?; end

  # @return [Boolean]
  #
  # source://goldiloader//lib/goldiloader/scope_info.rb#31
  def order?; end

  # Returns the value of attribute scope.
  #
  # source://goldiloader//lib/goldiloader/scope_info.rb#5
  def scope; end
end

# source://goldiloader//lib/goldiloader/active_record_patches.rb#148
module Goldiloader::SingularAssociationPatch
  private

  # source://goldiloader//lib/goldiloader/active_record_patches.rb#151
  def find_target(*args); end
end

# source://goldiloader//lib/goldiloader/active_record_patches.rb#176
module Goldiloader::ThroughAssociationPatch
  # @return [Boolean]
  #
  # source://goldiloader//lib/goldiloader/active_record_patches.rb#177
  def auto_include?; end
end