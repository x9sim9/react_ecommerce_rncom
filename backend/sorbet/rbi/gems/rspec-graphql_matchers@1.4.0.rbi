# typed: true

# DO NOT EDIT MANUALLY
# This is an autogenerated file for types exported from the `rspec-graphql_matchers` gem.
# Please instead update this file by running `bin/tapioca gem rspec-graphql_matchers`.

# source://rspec-graphql_matchers//lib/rspec/graphql_matchers/base_matcher.rb#3
module RSpec; end

# source://rspec-graphql_matchers//lib/rspec/graphql_matchers/base_matcher.rb#4
module RSpec::GraphqlMatchers; end

# source://rspec-graphql_matchers//lib/rspec/graphql_matchers/accept_argument.rb#8
class RSpec::GraphqlMatchers::AcceptArgument < ::RSpec::GraphqlMatchers::BaseMatcher
  # @return [AcceptArgument] a new instance of AcceptArgument
  #
  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/accept_argument.rb#9
  def initialize(expected_arg_name); end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/accept_argument.rb#55
  def description; end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/accept_argument.rb#46
  def failure_message; end

  # @return [Boolean]
  #
  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/accept_argument.rb#27
  def matches?(graph_object); end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/accept_argument.rb#41
  def of_type(expected_field_type); end

  private

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/accept_argument.rb#61
  def descriptions; end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/accept_argument.rb#65
  def failure_messages; end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/accept_argument.rb#69
  def field_arguments; end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/accept_argument.rb#78
  def results; end
end

# source://rspec-graphql_matchers//lib/rspec/graphql_matchers/accept_arguments.rb#7
class RSpec::GraphqlMatchers::AcceptArguments < ::RSpec::GraphqlMatchers::BaseMatcher
  # @return [AcceptArguments] a new instance of AcceptArguments
  #
  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/accept_arguments.rb#10
  def initialize(expected_args); end

  # Returns the value of attribute actual_field.
  #
  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/accept_arguments.rb#8
  def actual_field; end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/accept_arguments.rb#27
  def description; end

  # Returns the value of attribute expected_args.
  #
  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/accept_arguments.rb#8
  def expected_args; end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/accept_arguments.rb#22
  def failure_message; end

  # @return [Boolean]
  #
  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/accept_arguments.rb#14
  def matches?(actual_field); end

  private

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/accept_arguments.rb#41
  def describe_arguments(what_args); end

  # @return [Boolean]
  #
  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/accept_arguments.rb#33
  def matches_argument?(arg_name, arg_type); end
end

# source://rspec-graphql_matchers//lib/rspec/graphql_matchers/base_matcher.rb#5
class RSpec::GraphqlMatchers::BaseMatcher
  private

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/base_matcher.rb#8
  def member_name(member); end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/base_matcher.rb#18
  def type_name(a_type); end

  # @return [Boolean]
  #
  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/base_matcher.rb#14
  def types_match?(actual_type, expected_type); end
end

# source://rspec-graphql_matchers//lib/rspec/graphql_matchers/be_of_type.rb#7
class RSpec::GraphqlMatchers::BeOfType < ::RSpec::GraphqlMatchers::BaseMatcher
  # @return [BeOfType] a new instance of BeOfType
  #
  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/be_of_type.rb#10
  def initialize(expected); end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/be_of_type.rb#24
  def description; end

  # Returns the value of attribute expected.
  #
  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/be_of_type.rb#8
  def expected; end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/be_of_type.rb#19
  def failure_message; end

  # @return [Boolean]
  #
  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/be_of_type.rb#14
  def matches?(actual_sample); end

  # Returns the value of attribute sample.
  #
  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/be_of_type.rb#8
  def sample; end

  private

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/be_of_type.rb#30
  def to_graphql(field_sample); end
end

# source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field.rb#12
class RSpec::GraphqlMatchers::HaveAField < ::RSpec::GraphqlMatchers::BaseMatcher
  # @return [HaveAField] a new instance of HaveAField
  #
  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field.rb#13
  def initialize(expected_field_name, fields = T.unsafe(nil)); end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field.rb#72
  def description; end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field.rb#63
  def failure_message; end

  # @return [Boolean]
  #
  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field.rb#22
  def matches?(graph_object); end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field.rb#34
  def of_type(expected_field_type); end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field.rb#34
  def returning(expected_field_type); end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field.rb#34
  def that_returns(expected_field_type); end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field.rb#58
  def with_deprecation_reason(expected_reason = T.unsafe(nil)); end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field.rb#47
  def with_hash_key(expected_hash_key); end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field.rb#53
  def with_metadata(expected_metadata); end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field.rb#42
  def with_property(expected_property_name); end

  private

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field.rb#78
  def actual_field; end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field.rb#87
  def descriptions; end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field.rb#91
  def failure_messages; end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field.rb#95
  def field_collection; end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field.rb#104
  def matcher_name; end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field.rb#112
  def results; end
end

# source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field_matchers/of_type.rb#5
module RSpec::GraphqlMatchers::HaveAFieldMatchers; end

# source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field_matchers/of_type.rb#6
class RSpec::GraphqlMatchers::HaveAFieldMatchers::OfType < ::RSpec::GraphqlMatchers::BeOfType
  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field_matchers/of_type.rb#7
  def description; end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field_matchers/of_type.rb#11
  def failure_message; end
end

# source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field_matchers/with_deprecation_reason.rb#6
class RSpec::GraphqlMatchers::HaveAFieldMatchers::WithDeprecationReason
  # @return [WithDeprecationReason] a new instance of WithDeprecationReason
  #
  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field_matchers/with_deprecation_reason.rb#7
  def initialize(expected_reason); end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field_matchers/with_deprecation_reason.rb#26
  def description; end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field_matchers/with_deprecation_reason.rb#21
  def failure_message; end

  # @return [Boolean]
  #
  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field_matchers/with_deprecation_reason.rb#11
  def matches?(actual_field); end
end

# source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field_matchers/with_hash_key.rb#6
class RSpec::GraphqlMatchers::HaveAFieldMatchers::WithHashKey
  # @return [WithHashKey] a new instance of WithHashKey
  #
  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field_matchers/with_hash_key.rb#7
  def initialize(expected_hash_key); end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field_matchers/with_hash_key.rb#11
  def description; end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field_matchers/with_hash_key.rb#20
  def failure_message; end

  # @return [Boolean]
  #
  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field_matchers/with_hash_key.rb#15
  def matches?(actual_field); end

  private

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field_matchers/with_hash_key.rb#26
  def get_hash_key(actual_field); end
end

# source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field_matchers/with_metadata.rb#6
class RSpec::GraphqlMatchers::HaveAFieldMatchers::WithMetadata
  # @return [WithMetadata] a new instance of WithMetadata
  #
  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field_matchers/with_metadata.rb#7
  def initialize(expected_metadata); end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field_matchers/with_metadata.rb#11
  def description; end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field_matchers/with_metadata.rb#20
  def failure_message; end

  # @return [Boolean]
  #
  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field_matchers/with_metadata.rb#15
  def matches?(actual_field); end
end

# source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field_matchers/with_property.rb#6
class RSpec::GraphqlMatchers::HaveAFieldMatchers::WithProperty
  # @return [WithProperty] a new instance of WithProperty
  #
  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field_matchers/with_property.rb#7
  def initialize(expected_property_name); end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field_matchers/with_property.rb#11
  def description; end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field_matchers/with_property.rb#20
  def failure_message; end

  # @return [Boolean]
  #
  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field_matchers/with_property.rb#15
  def matches?(actual_field); end

  private

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/have_a_field_matchers/with_property.rb#26
  def property(field); end
end

# source://rspec-graphql_matchers//lib/rspec/graphql_matchers/implement.rb#7
class RSpec::GraphqlMatchers::Implement < ::RSpec::GraphqlMatchers::BaseMatcher
  # @return [Implement] a new instance of Implement
  #
  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/implement.rb#8
  def initialize(interfaces); end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/implement.rb#30
  def description; end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/implement.rb#18
  def failure_message; end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/implement.rb#24
  def failure_message_when_negated; end

  # @return [Boolean]
  #
  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/implement.rb#12
  def matches?(graph_object); end

  private

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/implement.rb#36
  def actual; end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/implement.rb#47
  def interface_name(interface); end
end

# source://rspec-graphql_matchers//lib/rspec/graphql_matchers/types_helper.rb#7
module RSpec::GraphqlMatchers::TypesHelper
  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/types_helper.rb#8
  def types; end
end

# source://rspec-graphql_matchers//lib/rspec/graphql_matchers/matchers.rb#11
module RSpec::Matchers
  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def a_block_changing(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def a_block_outputting(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def a_block_raising(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def a_block_throwing(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def a_block_yielding_control(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def a_block_yielding_successive_args(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def a_block_yielding_with_args(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def a_block_yielding_with_no_args(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def a_collection_containing_exactly(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def a_collection_ending_with(*args, **_arg1, &block); end

  # source://rspec-collection_matchers/1.2.1/lib/rspec/collection_matchers/matchers.rb#33
  def a_collection_having(n); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def a_collection_including(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def a_collection_starting_with(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def a_falsey_value(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def a_falsy_value(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def a_hash_including(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def a_kind_of(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def a_nil_value(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def a_range_covering(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def a_string_ending_with(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def a_string_including(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def a_string_matching(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def a_string_starting_with(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def a_truthy_value(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def a_value(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def a_value_between(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def a_value_within(*args, **_arg1, &block); end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/matchers.rb#16
  def accept_argument(expected_argument); end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/matchers.rb#20
  def accept_arguments(expected_args); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#305
  def aggregate_failures(label = T.unsafe(nil), metadata = T.unsafe(nil), &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#662
  def all(expected); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def an_array_matching(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def an_instance_of(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def an_object_eq_to(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def an_object_eql_to(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def an_object_equal_to(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def an_object_existing(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def an_object_having_attributes(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def an_object_matching(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def an_object_responding_to(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def an_object_satisfying(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#349
  def be(*args); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#355
  def be_a(klass); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#378
  def be_a_kind_of(expected); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#355
  def be_an(klass); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#366
  def be_an_instance_of(expected); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#395
  def be_between(min, max); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#316
  def be_falsey; end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def be_falsy(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#366
  def be_instance_of(expected); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#378
  def be_kind_of(expected); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#324
  def be_nil; end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/matchers.rb#12
  def be_of_type(expected); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#310
  def be_truthy; end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#405
  def be_within(delta); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#492
  def change(receiver = T.unsafe(nil), message = T.unsafe(nil), &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def changing(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#510
  def contain_exactly(*items); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def containing_exactly(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#528
  def cover(*values); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def covering(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#543
  def end_with(*expected); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def ending_with(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#558
  def eq(expected); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def eq_to(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#572
  def eql(expected); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def eql_to(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#586
  def equal(expected); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def equal_to(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#596
  def exist(*args); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def existing(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/expectations/syntax.rb#72
  def expect(value = T.unsafe(nil), &block); end

  # source://rspec-collection_matchers/1.2.1/lib/rspec/collection_matchers/matchers.rb#33
  def have(n); end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/matchers.rb#25
  def have_a_field(field_name); end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/matchers.rb#35
  def have_a_return_field(field_name); end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/matchers.rb#30
  def have_an_input_field(field_name); end

  # source://rspec-collection_matchers/1.2.1/lib/rspec/collection_matchers/matchers.rb#47
  def have_at_least(n); end

  # source://rspec-collection_matchers/1.2.1/lib/rspec/collection_matchers/matchers.rb#59
  def have_at_most(n); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#616
  def have_attributes(expected); end

  # source://rspec-collection_matchers/1.2.1/lib/rspec/collection_matchers/matchers.rb#33
  def have_exactly(n); end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/matchers.rb#25
  def have_field(field_name); end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/matchers.rb#30
  def have_input_field(field_name); end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/matchers.rb#35
  def have_return_field(field_name); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def having_attributes(*args, **_arg1, &block); end

  # source://rspec-graphql_matchers//lib/rspec/graphql_matchers/matchers.rb#41
  def implement(*interface_names); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#639
  def include(*expected); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def including(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#697
  def match(expected); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#715
  def match_array(items); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def match_regex(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def matching(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#752
  def output(expected = T.unsafe(nil)); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#773
  def raise_error(error = T.unsafe(nil), message = T.unsafe(nil), &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#773
  def raise_exception(error = T.unsafe(nil), message = T.unsafe(nil), &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def raising(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#792
  def respond_to(*names); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def responding_to(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#813
  def satisfy(description = T.unsafe(nil), &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def satisfying(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#828
  def start_with(*expected); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def starting_with(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#850
  def throw_symbol(expected_symbol = T.unsafe(nil), expected_arg = T.unsafe(nil)); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def throwing(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def within(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#871
  def yield_control; end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#940
  def yield_successive_args(*args); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#919
  def yield_with_args(*args); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#889
  def yield_with_no_args; end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def yielding_control(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def yielding_successive_args(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def yielding_with_args(*args, **_arg1, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers/dsl.rb#38
  def yielding_with_no_args(*args, **_arg1, &block); end

  private

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#961
  def method_missing(method, *args, **_arg2, &block); end

  # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#974
  def respond_to_missing?(method, *_arg1); end

  class << self
    # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#250
    def alias_matcher(*args, &block); end

    # source://rspec-expectations/3.13.0/lib/rspec/matchers/generated_descriptions.rb#11
    def clear_generated_description; end

    # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#951
    def configuration; end

    # source://rspec-expectations/3.13.0/lib/rspec/matchers/generated_descriptions.rb#19
    def generated_description; end

    # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#1008
    def is_a_describable_matcher?(obj); end

    # source://rspec-expectations/3.13.0/lib/rspec/matchers.rb#988
    def is_a_matcher?(obj); end

    # source://rspec-expectations/3.13.0/lib/rspec/matchers/generated_descriptions.rb#25
    def last_description; end

    # source://rspec-expectations/3.13.0/lib/rspec/matchers/generated_descriptions.rb#5
    def last_expectation_handler; end

    # source://rspec-expectations/3.13.0/lib/rspec/matchers/generated_descriptions.rb#5
    def last_expectation_handler=(_arg0); end

    # source://rspec-expectations/3.13.0/lib/rspec/matchers/generated_descriptions.rb#5
    def last_matcher; end

    # source://rspec-expectations/3.13.0/lib/rspec/matchers/generated_descriptions.rb#5
    def last_matcher=(_arg0); end
  end
end

# source://rspec-graphql_matchers//lib/rspec/graphql_matchers/version.rb#3
module Rspec; end

# source://rspec-graphql_matchers//lib/rspec/graphql_matchers/version.rb#4
module Rspec::GraphqlMatchers; end

# source://rspec-graphql_matchers//lib/rspec/graphql_matchers/version.rb#5
Rspec::GraphqlMatchers::VERSION = T.let(T.unsafe(nil), String)
