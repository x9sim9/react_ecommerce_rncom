# typed: true

# DO NOT EDIT MANUALLY
# This is an autogenerated file for types exported from the `fabrication` gem.
# Please instead update this file by running `bin/tapioca gem fabrication`.

# source://fabrication//lib/fabricate.rb#1
class Fabricate
  class << self
    # source://fabrication//lib/fabricate.rb#14
    def attributes_for(name, overrides = T.unsafe(nil), &block); end

    # source://fabrication//lib/fabricate.rb#10
    def attributes_for_times(count, name, overrides = T.unsafe(nil), &block); end

    # source://fabrication//lib/fabricate.rb#24
    def build(name, overrides = T.unsafe(nil), &block); end

    # source://fabrication//lib/fabricate.rb#6
    def build_times(count, name, overrides = T.unsafe(nil), &block); end

    # source://fabrication//lib/fabricate.rb#33
    def create(name, overrides = T.unsafe(nil), &block); end

    # @raise [Fabrication::MisplacedFabricateError]
    #
    # source://fabrication//lib/fabricate.rb#51
    def fail_if_initializing(name); end

    # source://fabrication//lib/fabricate.rb#46
    def schematic(name); end

    # source://fabrication//lib/fabricate.rb#42
    def sequence(name = T.unsafe(nil), start = T.unsafe(nil), &block); end

    # source://fabrication//lib/fabricate.rb#2
    def times(count, name, overrides = T.unsafe(nil), &block); end

    # source://fabrication//lib/fabricate.rb#19
    def to_params(name, overrides = T.unsafe(nil), &block); end
  end
end

# source://fabrication//lib/fabrication/railtie.rb#1
module Fabrication
  class << self
    # source://fabrication//lib/fabrication.rb#40
    def clear_definitions; end

    # source://fabrication//lib/fabrication.rb#45
    def configure(&block); end

    # source://fabrication//lib/fabrication.rb#49
    def manager; end

    # source://fabrication//lib/fabrication.rb#53
    def schematics; end
  end
end

# source://fabrication//lib/fabrication/config.rb#4
module Fabrication::Config
  extend ::Fabrication::Config

  # @yield [_self]
  # @yieldparam _self [Fabrication::Config] the object that the method was called on
  #
  # source://fabrication//lib/fabrication/config.rb#7
  def configure; end

  # source://fabrication//lib/fabrication/config.rb#32
  def fabricator_dir; end

  # source://fabrication//lib/fabrication/config.rb#42
  def fabricator_dir=(folders); end

  # source://fabrication//lib/fabrication/config.rb#27
  def fabricator_path; end

  # source://fabrication//lib/fabrication/config.rb#38
  def fabricator_path=(folders); end

  # source://fabrication//lib/fabrication/config.rb#27
  def fabricator_paths; end

  # source://fabrication//lib/fabrication/config.rb#65
  def generator_for(default_generators, klass); end

  # source://fabrication//lib/fabrication/config.rb#61
  def generators; end

  # source://fabrication//lib/fabrication/config.rb#21
  def logger; end

  # Sets the attribute logger
  #
  # @param value the value to set the attribute logger to.
  #
  # source://fabrication//lib/fabrication/config.rb#19
  def logger=(_arg0); end

  # source://fabrication//lib/fabrication/config.rb#90
  def notifiers; end

  # source://fabrication//lib/fabrication/config.rb#56
  def path_prefix; end

  # source://fabrication//lib/fabrication/config.rb#52
  def path_prefix=(folders); end

  # source://fabrication//lib/fabrication/config.rb#56
  def path_prefixes; end

  # source://fabrication//lib/fabrication/config.rb#69
  def recursion_limit; end

  # source://fabrication//lib/fabrication/config.rb#73
  def recursion_limit=(limit); end

  # source://fabrication//lib/fabrication/config.rb#94
  def register_notifier(&block); end

  # source://fabrication//lib/fabrication/config.rb#77
  def register_with_steps=(value); end

  # source://fabrication//lib/fabrication/config.rb#11
  def reset_defaults; end

  # source://fabrication//lib/fabrication/config.rb#48
  def sequence_start; end

  # Sets the attribute sequence_start
  #
  # @param value the value to set the attribute sequence_start to.
  #
  # source://fabrication//lib/fabrication/config.rb#19
  def sequence_start=(_arg0); end
end

# source://fabrication//lib/fabrication/cucumber/step_fabricator.rb#4
module Fabrication::Cucumber; end

# source://fabrication//lib/fabrication/cucumber/step_fabricator.rb#90
class Fabrication::Cucumber::Fabrications
  include ::Singleton
  extend ::Singleton::SingletonClassMethods

  # source://fabrication//lib/fabrication/cucumber/step_fabricator.rb#105
  def fabrications; end

  class << self
    # source://fabrication//lib/fabrication/cucumber/step_fabricator.rb#97
    def [](fabricator); end

    # source://fabrication//lib/fabrication/cucumber/step_fabricator.rb#101
    def []=(fabricator, fabrication); end

    # source://fabrication//lib/fabrication/cucumber/step_fabricator.rb#93
    def fabrications; end

    private

    def allocate; end
    def new(*_arg0); end
  end
end

# source://fabrication//lib/fabrication/cucumber/step_fabricator.rb#5
class Fabrication::Cucumber::StepFabricator
  # @return [StepFabricator] a new instance of StepFabricator
  #
  # source://fabrication//lib/fabrication/cucumber/step_fabricator.rb#8
  def initialize(model_name, opts = T.unsafe(nil)); end

  # source://fabrication//lib/fabrication/cucumber/step_fabricator.rb#14
  def from_table(table, extra = T.unsafe(nil)); end

  # source://fabrication//lib/fabrication/cucumber/step_fabricator.rb#29
  def has_many(children); end

  # source://fabrication//lib/fabrication/cucumber/step_fabricator.rb#45
  def klass; end

  # Returns the value of attribute model.
  #
  # source://fabrication//lib/fabrication/cucumber/step_fabricator.rb#6
  def model; end

  # source://fabrication//lib/fabrication/cucumber/step_fabricator.rb#24
  def n(count, attrs = T.unsafe(nil)); end

  # source://fabrication//lib/fabrication/cucumber/step_fabricator.rb#39
  def parent; end

  private

  # source://fabrication//lib/fabrication/cucumber/step_fabricator.rb#63
  def dehumanize(string); end

  # source://fabrication//lib/fabrication/cucumber/step_fabricator.rb#71
  def make(attrs = T.unsafe(nil)); end

  # source://fabrication//lib/fabrication/cucumber/step_fabricator.rb#67
  def parameterize_hash(hash); end

  # source://fabrication//lib/fabrication/cucumber/step_fabricator.rb#75
  def parentship; end

  # source://fabrication//lib/fabrication/cucumber/step_fabricator.rb#51
  def remember(objects); end

  # @return [Boolean]
  #
  # source://fabrication//lib/fabrication/cucumber/step_fabricator.rb#59
  def singular?; end
end

# source://fabrication//lib/fabrication/errors/duplicate_fabricator_error.rb#2
class Fabrication::DuplicateFabricatorError < ::StandardError
  # @return [DuplicateFabricatorError] a new instance of DuplicateFabricatorError
  #
  # source://fabrication//lib/fabrication/errors/duplicate_fabricator_error.rb#3
  def initialize(string); end
end

# source://fabrication//lib/fabrication.rb#32
module Fabrication::Generator; end

# source://fabrication//lib/fabrication/generator/active_record.rb#3
class Fabrication::Generator::ActiveRecord < ::Fabrication::Generator::Base
  # source://fabrication//lib/fabrication/generator/active_record.rb#13
  def build_instance; end

  class << self
    # @return [Boolean]
    #
    # source://fabrication//lib/fabrication/generator/active_record.rb#4
    def supports?(klass); end
  end
end

# source://fabrication//lib/fabrication/generator/base.rb#3
class Fabrication::Generator::Base
  # @return [Base] a new instance of Base
  #
  # source://fabrication//lib/fabrication/generator/base.rb#91
  def initialize(resolved_class); end

  # source://fabrication//lib/fabrication/generator/base.rb#103
  def _klass; end

  # source://fabrication//lib/fabrication/generator/base.rb#8
  def build(attributes = T.unsafe(nil), callbacks = T.unsafe(nil)); end

  # source://fabrication//lib/fabrication/generator/base.rb#80
  def build_instance; end

  # source://fabrication//lib/fabrication/generator/base.rb#70
  def build_instance_with_constructor_override(callback); end

  # source://fabrication//lib/fabrication/generator/base.rb#75
  def build_instance_with_init_callback(callback); end

  # source://fabrication//lib/fabrication/generator/base.rb#25
  def create(attributes = T.unsafe(nil), callbacks = T.unsafe(nil)); end

  # source://fabrication//lib/fabrication/generator/base.rb#48
  def execute_callbacks(callbacks); end

  # source://fabrication//lib/fabrication/generator/base.rb#37
  def execute_deprecated_callbacks(callbacks, callback_type, replacement_callback); end

  # source://fabrication//lib/fabrication/generator/base.rb#99
  def method_missing(method_name, *args, &block); end

  # source://fabrication//lib/fabrication/generator/base.rb#85
  def set_attributes; end

  # source://fabrication//lib/fabrication/generator/base.rb#57
  def to_hash(attributes = T.unsafe(nil), _callbacks = T.unsafe(nil)); end

  # source://fabrication//lib/fabrication/generator/base.rb#52
  def to_params(attributes = T.unsafe(nil)); end

  protected

  # source://fabrication//lib/fabrication/generator/base.rb#115
  def _attributes; end

  # Returns the value of attribute _instance.
  #
  # source://fabrication//lib/fabrication/generator/base.rb#113
  def _instance; end

  # Sets the attribute _instance
  #
  # @param value the value to set the attribute _instance to.
  #
  # source://fabrication//lib/fabrication/generator/base.rb#113
  def _instance=(_arg0); end

  # source://fabrication//lib/fabrication/generator/base.rb#119
  def _transient_attributes; end

  # source://fabrication//lib/fabrication/generator/base.rb#123
  def persist; end

  # source://fabrication//lib/fabrication/generator/base.rb#127
  def process_attributes(attributes); end

  # Returns the value of attribute resolved_class.
  #
  # source://fabrication//lib/fabrication/generator/base.rb#113
  def resolved_class; end

  # Sets the attribute resolved_class
  #
  # @param value the value to set the attribute resolved_class to.
  #
  # source://fabrication//lib/fabrication/generator/base.rb#113
  def resolved_class=(_arg0); end

  private

  # @return [Boolean]
  #
  # source://fabrication//lib/fabrication/generator/base.rb#95
  def respond_to_missing?(method_name, _include_private = T.unsafe(nil)); end

  class << self
    # @return [Boolean]
    #
    # source://fabrication//lib/fabrication/generator/base.rb#4
    def supports?(_resolved_class); end
  end
end

# source://fabrication//lib/fabrication/generator/data_mapper.rb#3
class Fabrication::Generator::DataMapper < ::Fabrication::Generator::Base
  # source://fabrication//lib/fabrication/generator/data_mapper.rb#8
  def build_instance; end

  protected

  # source://fabrication//lib/fabrication/generator/data_mapper.rb#14
  def persist; end

  class << self
    # @return [Boolean]
    #
    # source://fabrication//lib/fabrication/generator/data_mapper.rb#4
    def supports?(klass); end
  end
end

# source://fabrication//lib/fabrication/generator/mongoid.rb#3
class Fabrication::Generator::Mongoid < ::Fabrication::Generator::Base
  # source://fabrication//lib/fabrication/generator/mongoid.rb#8
  def build_instance; end

  class << self
    # @return [Boolean]
    #
    # source://fabrication//lib/fabrication/generator/mongoid.rb#4
    def supports?(klass); end
  end
end

# source://fabrication//lib/fabrication/generator/sequel.rb#3
class Fabrication::Generator::Sequel < ::Fabrication::Generator::Base
  # @return [Sequel] a new instance of Sequel
  #
  # source://fabrication//lib/fabrication/generator/sequel.rb#4
  def initialize(klass); end

  # source://fabrication//lib/fabrication/generator/sequel.rb#23
  def persist; end

  # source://fabrication//lib/fabrication/generator/sequel.rb#13
  def set_attributes; end

  private

  # source://fabrication//lib/fabrication/generator/sequel.rb#29
  def association_for(field_name); end

  # source://fabrication//lib/fabrication/generator/sequel.rb#44
  def load_instance_hooks; end

  # source://fabrication//lib/fabrication/generator/sequel.rb#37
  def set_association(association, field_name, value); end

  # source://fabrication//lib/fabrication/generator/sequel.rb#33
  def set_attribute(field_name, value); end

  class << self
    # @return [Boolean]
    #
    # source://fabrication//lib/fabrication/generator/sequel.rb#9
    def supports?(klass); end
  end
end

# source://fabrication//lib/fabrication/errors/infinite_recursion_error.rb#2
class Fabrication::InfiniteRecursionError < ::StandardError
  # @return [InfiniteRecursionError] a new instance of InfiniteRecursionError
  #
  # source://fabrication//lib/fabrication/errors/infinite_recursion_error.rb#3
  def initialize(name); end
end

# source://fabrication//lib/fabrication/errors/misplaced_fabricate_error.rb#2
class Fabrication::MisplacedFabricateError < ::StandardError
  # @return [MisplacedFabricateError] a new instance of MisplacedFabricateError
  #
  # source://fabrication//lib/fabrication/errors/misplaced_fabricate_error.rb#3
  def initialize(name); end
end

# source://fabrication//lib/fabrication/railtie.rb#2
class Fabrication::Railtie < ::Rails::Railtie; end

# source://fabrication//lib/fabrication.rb#17
module Fabrication::Schematic; end

# source://fabrication//lib/fabrication/schematic/attribute.rb#3
class Fabrication::Schematic::Attribute
  # @return [Attribute] a new instance of Attribute
  #
  # source://fabrication//lib/fabrication/schematic/attribute.rb#7
  def initialize(klass, name, value, params = T.unsafe(nil), &block); end

  # Returns the value of attribute klass.
  #
  # source://fabrication//lib/fabrication/schematic/attribute.rb#4
  def klass; end

  # Sets the attribute klass
  #
  # @param value the value to set the attribute klass to.
  #
  # source://fabrication//lib/fabrication/schematic/attribute.rb#4
  def klass=(_arg0); end

  # Returns the value of attribute name.
  #
  # source://fabrication//lib/fabrication/schematic/attribute.rb#4
  def name; end

  # Sets the attribute name
  #
  # @param value the value to set the attribute name to.
  #
  # source://fabrication//lib/fabrication/schematic/attribute.rb#4
  def name=(_arg0); end

  # source://fabrication//lib/fabrication/schematic/attribute.rb#14
  def params; end

  # Sets the attribute params
  #
  # @param value the value to set the attribute params to.
  #
  # source://fabrication//lib/fabrication/schematic/attribute.rb#5
  def params=(_arg0); end

  # source://fabrication//lib/fabrication/schematic/attribute.rb#26
  def processed_value(processed_attributes); end

  # source://fabrication//lib/fabrication/schematic/attribute.rb#18
  def transient!; end

  # @return [Boolean]
  #
  # source://fabrication//lib/fabrication/schematic/attribute.rb#22
  def transient?; end

  # Returns the value of attribute value.
  #
  # source://fabrication//lib/fabrication/schematic/attribute.rb#4
  def value; end

  # Sets the attribute value
  #
  # @param value the value to set the attribute value to.
  #
  # source://fabrication//lib/fabrication/schematic/attribute.rb#4
  def value=(_arg0); end

  # @return [Boolean]
  #
  # source://fabrication//lib/fabrication/schematic/attribute.rb#40
  def value_proc?; end

  # @return [Boolean]
  #
  # source://fabrication//lib/fabrication/schematic/attribute.rb#36
  def value_static?; end

  private

  # source://fabrication//lib/fabrication/schematic/attribute.rb#54
  def count; end

  # source://fabrication//lib/fabrication/schematic/attribute.rb#46
  def execute(*_arg0, **_arg1, &_arg2); end

  # source://fabrication//lib/fabrication/schematic/attribute.rb#50
  def process_count; end

  # source://fabrication//lib/fabrication/schematic/attribute.rb#58
  def rand; end

  # source://fabrication//lib/fabrication/schematic/attribute.rb#67
  def rand_range; end
end

# source://fabrication//lib/fabrication/schematic/definition.rb#3
class Fabrication::Schematic::Definition
  # @return [Definition] a new instance of Definition
  #
  # source://fabrication//lib/fabrication/schematic/definition.rb#14
  def initialize(name, options = T.unsafe(nil), &block); end

  # source://fabrication//lib/fabrication/schematic/definition.rb#28
  def append_or_update_attribute(attribute_name, value, params = T.unsafe(nil), &block); end

  # source://fabrication//lib/fabrication/schematic/definition.rb#24
  def attribute(name); end

  # source://fabrication//lib/fabrication/schematic/definition.rb#42
  def attributes; end

  # Sets the attribute attributes
  #
  # @param value the value to set the attribute attributes to.
  #
  # source://fabrication//lib/fabrication/schematic/definition.rb#40
  def attributes=(_arg0); end

  # Returns the value of attribute block.
  #
  # source://fabrication//lib/fabrication/schematic/definition.rb#12
  def block; end

  # Sets the attribute block
  #
  # @param value the value to set the attribute block to.
  #
  # source://fabrication//lib/fabrication/schematic/definition.rb#12
  def block=(_arg0); end

  # source://fabrication//lib/fabrication/schematic/definition.rb#60
  def build(overrides = T.unsafe(nil), &block); end

  # source://fabrication//lib/fabrication/schematic/definition.rb#47
  def callbacks; end

  # Sets the attribute callbacks
  #
  # @param value the value to set the attribute callbacks to.
  #
  # source://fabrication//lib/fabrication/schematic/definition.rb#40
  def callbacks=(_arg0); end

  # source://fabrication//lib/fabrication/schematic/definition.rb#76
  def fabricate(overrides = T.unsafe(nil), &block); end

  # source://fabrication//lib/fabrication/schematic/definition.rb#119
  def generate_value(name, params); end

  # source://fabrication//lib/fabrication/schematic/definition.rb#52
  def generator; end

  # source://fabrication//lib/fabrication/schematic/definition.rb#137
  def klass; end

  # source://fabrication//lib/fabrication/schematic/definition.rb#128
  def merge(overrides = T.unsafe(nil), &block); end

  # Returns the value of attribute name.
  #
  # source://fabrication//lib/fabrication/schematic/definition.rb#12
  def name; end

  # Sets the attribute name
  #
  # @param value the value to set the attribute name to.
  #
  # source://fabrication//lib/fabrication/schematic/definition.rb#12
  def name=(_arg0); end

  # Returns the value of attribute options.
  #
  # source://fabrication//lib/fabrication/schematic/definition.rb#12
  def options; end

  # Sets the attribute options
  #
  # @param value the value to set the attribute options to.
  #
  # source://fabrication//lib/fabrication/schematic/definition.rb#12
  def options=(_arg0); end

  # source://fabrication//lib/fabrication/schematic/definition.rb#20
  def process_block(&block); end

  # source://fabrication//lib/fabrication/schematic/definition.rb#56
  def sorted_attributes; end

  # source://fabrication//lib/fabrication/schematic/definition.rb#104
  def to_attributes(overrides = T.unsafe(nil), &block); end

  # source://fabrication//lib/fabrication/schematic/definition.rb#94
  def to_params(overrides = T.unsafe(nil), &block); end

  protected

  # source://fabrication//lib/fabrication/schematic/definition.rb#152
  def load_body; end

  # @return [Boolean]
  #
  # source://fabrication//lib/fabrication/schematic/definition.rb#148
  def loaded?; end

  # source://fabrication//lib/fabrication/schematic/definition.rb#166
  def parent; end

  private

  # source://fabrication//lib/fabrication/schematic/definition.rb#110
  def initialize_copy(original); end
end

# source://fabrication//lib/fabrication/schematic/definition.rb#4
Fabrication::Schematic::Definition::GENERATORS = T.let(T.unsafe(nil), Array)

# source://fabrication//lib/fabrication/schematic/evaluator.rb#3
class Fabrication::Schematic::Evaluator < ::BasicObject
  # source://fabrication//lib/fabrication/schematic/evaluator.rb#20
  def after_build(&block); end

  # source://fabrication//lib/fabrication/schematic/evaluator.rb#45
  def after_create(&block); end

  # source://fabrication//lib/fabrication/schematic/evaluator.rb#50
  def after_save(&block); end

  # source://fabrication//lib/fabrication/schematic/evaluator.rb#30
  def after_validation(&block); end

  # source://fabrication//lib/fabrication/schematic/evaluator.rb#40
  def before_create(&block); end

  # source://fabrication//lib/fabrication/schematic/evaluator.rb#35
  def before_save(&block); end

  # source://fabrication//lib/fabrication/schematic/evaluator.rb#25
  def before_validation(&block); end

  # source://fabrication//lib/fabrication/schematic/evaluator.rb#63
  def init_with(*args); end

  # source://fabrication//lib/fabrication/schematic/evaluator.rb#59
  def initialize_with(&block); end

  # source://fabrication//lib/fabrication/schematic/evaluator.rb#13
  def method_missing(method_name, *args, &block); end

  # source://fabrication//lib/fabrication/schematic/evaluator.rb#55
  def on_init(&block); end

  # source://fabrication//lib/fabrication/schematic/evaluator.rb#4
  def process(definition, &block); end

  # source://fabrication//lib/fabrication/schematic/evaluator.rb#67
  def transient(*field_names); end

  private

  # @return [Boolean]
  #
  # source://fabrication//lib/fabrication/schematic/evaluator.rb#9
  def respond_to_missing?(_method_name, _include_private = T.unsafe(nil)); end
end

# source://fabrication//lib/fabrication/schematic/manager.rb#5
class Fabrication::Schematic::Manager
  include ::Singleton
  extend ::Singleton::SingletonClassMethods

  # source://fabrication//lib/fabrication/schematic/manager.rb#39
  def [](name); end

  # source://fabrication//lib/fabrication/schematic/manager.rb#47
  def build_stack; end

  # source://fabrication//lib/fabrication/schematic/manager.rb#21
  def clear; end

  # source://fabrication//lib/fabrication/schematic/manager.rb#43
  def create_stack; end

  # @return [Boolean]
  #
  # source://fabrication//lib/fabrication/schematic/manager.rb#25
  def empty?; end

  # source://fabrication//lib/fabrication/schematic/manager.rb#29
  def freeze; end

  # @return [Boolean]
  #
  # source://fabrication//lib/fabrication/schematic/manager.rb#13
  def initializing?; end

  # source://fabrication//lib/fabrication/schematic/manager.rb#55
  def load_definitions; end

  # source://fabrication//lib/fabrication/schematic/manager.rb#8
  def preinitialize; end

  # source://fabrication//lib/fabrication/schematic/manager.rb#72
  def prevent_recursion!; end

  # source://fabrication//lib/fabrication/schematic/manager.rb#33
  def register(name, options, &block); end

  # source://fabrication//lib/fabrication/schematic/manager.rb#17
  def schematics; end

  # source://fabrication//lib/fabrication/schematic/manager.rb#51
  def to_params_stack; end

  protected

  # source://fabrication//lib/fabrication/schematic/manager.rb#80
  def raise_if_registered(name); end

  # source://fabrication//lib/fabrication/schematic/manager.rb#84
  def store(name, aliases, options, &block); end

  class << self
    private

    def allocate; end
    def new(*_arg0); end
  end
end

# source://fabrication//lib/fabrication/schematic/runner.rb#3
class Fabrication::Schematic::Runner
  # @return [Runner] a new instance of Runner
  #
  # source://fabrication//lib/fabrication/schematic/runner.rb#6
  def initialize(klass); end

  # Returns the value of attribute klass.
  #
  # source://fabrication//lib/fabrication/schematic/runner.rb#4
  def klass; end

  # Sets the attribute klass
  #
  # @param value the value to set the attribute klass to.
  #
  # source://fabrication//lib/fabrication/schematic/runner.rb#4
  def klass=(_arg0); end

  # source://fabrication//lib/fabrication/schematic/runner.rb#10
  def sequence(name = T.unsafe(nil), start = T.unsafe(nil), &block); end
end

# source://fabrication//lib/fabrication/sequencer.rb#4
class Fabrication::Sequencer
  include ::Singleton
  extend ::Singleton::SingletonClassMethods

  # source://fabrication//lib/fabrication/sequencer.rb#37
  def reset; end

  # source://fabrication//lib/fabrication/sequencer.rb#18
  def sequence(name = T.unsafe(nil), start = T.unsafe(nil), &block); end

  # source://fabrication//lib/fabrication/sequencer.rb#33
  def sequence_blocks; end

  # source://fabrication//lib/fabrication/sequencer.rb#29
  def sequences; end

  class << self
    # source://fabrication//lib/fabrication/sequencer.rb#13
    def clear; end

    # source://fabrication//lib/fabrication/sequencer.rb#9
    def sequence(name = T.unsafe(nil), start = T.unsafe(nil), &block); end

    private

    def allocate; end
    def new(*_arg0); end
  end
end

# source://fabrication//lib/fabrication/sequencer.rb#7
Fabrication::Sequencer::DEFAULT = T.let(T.unsafe(nil), Symbol)

# source://fabrication//lib/fabrication/support.rb#2
module Fabrication::Support
  extend ::Fabrication::Support

  # source://fabrication//lib/fabrication/support.rb#13
  def class_for(class_or_to_s); end

  # source://fabrication//lib/fabrication/support.rb#19
  def constantize(camel_cased_word); end

  # source://fabrication//lib/fabrication/support.rb#27
  def extract_options!(args); end

  # @return [Boolean]
  #
  # source://fabrication//lib/fabrication/support.rb#5
  def fabricatable?(name); end

  # source://fabrication//lib/fabrication/support.rb#43
  def find_definitions; end

  # source://fabrication//lib/fabrication/support.rb#50
  def hash_class; end

  # source://fabrication//lib/fabrication/support.rb#9
  def log_deprecation(message); end

  # source://fabrication//lib/fabrication/support.rb#54
  def singularize(string); end

  # source://fabrication//lib/fabrication/support.rb#60
  def underscore(string); end

  # source://fabrication//lib/fabrication/support.rb#31
  def variable_name_to_class_name(name); end
end

# source://fabrication//lib/fabrication/transform.rb#4
class Fabrication::Transform
  include ::Singleton
  extend ::Singleton::SingletonClassMethods

  # source://fabrication//lib/fabrication/transform.rb#31
  def apply_transform(schematic, attribute, value); end

  # source://fabrication//lib/fabrication/transform.rb#27
  def overrides; end

  # source://fabrication//lib/fabrication/transform.rb#35
  def transforms; end

  class << self
    # source://fabrication//lib/fabrication/transform.rb#8
    def apply_to(schematic, attributes_hash); end

    # source://fabrication//lib/fabrication/transform.rb#13
    def clear_all; end

    # source://fabrication//lib/fabrication/transform.rb#18
    def define(attribute, transform); end

    # source://fabrication//lib/fabrication/transform.rb#22
    def only_for(schematic, attribute, transform); end

    private

    def allocate; end
    def new(*_arg0); end
  end
end

# source://fabrication//lib/fabrication/errors/unfabricatable_error.rb#2
class Fabrication::UnfabricatableError < ::StandardError
  # @return [UnfabricatableError] a new instance of UnfabricatableError
  #
  # source://fabrication//lib/fabrication/errors/unfabricatable_error.rb#3
  def initialize(name, original_error); end
end

# source://fabrication//lib/fabrication/errors/unknown_fabricator_error.rb#2
class Fabrication::UnknownFabricatorError < ::StandardError
  # @return [UnknownFabricatorError] a new instance of UnknownFabricatorError
  #
  # source://fabrication//lib/fabrication/errors/unknown_fabricator_error.rb#3
  def initialize(name); end
end

# source://fabrication//lib/fabrication.rb#70
module FabricationMethods
  # source://fabrication//lib/fabrication.rb#71
  def fabrications; end
end

class Object < ::BasicObject
  include ::Kernel
  include ::PP::ObjectMixin

  private

  # source://fabrication//lib/fabrication.rb#65
  def Fabricate(name, overrides = T.unsafe(nil), &block); end

  # source://fabrication//lib/fabrication.rb#61
  def Fabricator(name, options = T.unsafe(nil), &block); end
end
