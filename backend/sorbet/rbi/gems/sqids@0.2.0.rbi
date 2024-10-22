# typed: true

# DO NOT EDIT MANUALLY
# This is an autogenerated file for types exported from the `sqids` gem.
# Please instead update this file by running `bin/tapioca gem sqids`.

# source://sqids//lib/sqids.rb#5
class Sqids
  # @raise [ArgumentError]
  # @return [Sqids] a new instance of Sqids
  #
  # source://sqids//lib/sqids.rb#13
  def initialize(options = T.unsafe(nil)); end

  # source://sqids//lib/sqids.rb#53
  def decode(id); end

  # source://sqids//lib/sqids.rb#41
  def encode(numbers); end

  private

  # @return [Boolean]
  #
  # source://sqids//lib/sqids.rb#163
  def blocked_id?(id); end

  # source://sqids//lib/sqids.rb#179
  def contains_multibyte_chars(input_str); end

  # @raise [ArgumentError]
  #
  # source://sqids//lib/sqids.rb#104
  def encode_numbers(numbers, increment: T.unsafe(nil)); end

  # source://sqids//lib/sqids.rb#89
  def shuffle(alphabet); end

  # source://sqids//lib/sqids.rb#144
  def to_id(num, alphabet); end

  # source://sqids//lib/sqids.rb#158
  def to_number(id, alphabet); end

  class << self
    # source://sqids//lib/sqids.rb#187
    def max_value; end
  end
end

# source://sqids//lib/sqids.rb#6
Sqids::DEFAULT_ALPHABET = T.let(T.unsafe(nil), String)

# source://sqids//lib/sqids.rb#9
Sqids::DEFAULT_BLOCKLIST = T.let(T.unsafe(nil), Array)

# source://sqids//lib/sqids.rb#7
Sqids::DEFAULT_MIN_LENGTH = T.let(T.unsafe(nil), Integer)
