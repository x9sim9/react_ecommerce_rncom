# typed: true

# DO NOT EDIT MANUALLY
# This is an autogenerated file for types exported from the `ptools` gem.
# Please instead update this file by running `bin/tapioca gem ptools`.

# source://ptools//lib/ptools.rb#4
class File < ::IO
  class << self
    # Returns whether or not +file+ is a binary non-image file, i.e. executable,
    # shared object, etc.
    #
    # Internally this method simply looks for a double null sequence. This will
    # work for the vast majority of cases, but it is not guaranteed to be
    # absolutely accurate.
    #
    # Example:
    #
    #   File.binary?('somefile.exe') # => true
    #   File.binary?('somefile.txt') # => false
    #
    # @return [Boolean]
    #
    # source://ptools//lib/ptools.rb#70
    def binary?(file); end

    # Is the file a bitmap file?
    #
    # @return [Boolean]
    #
    # source://ptools//lib/ptools.rb#424
    def bmp?(file); end

    # Is the file a gif?
    #
    # @return [Boolean]
    #
    # source://ptools//lib/ptools.rb#443
    def gif?(file); end

    # In block form, yields the first +num_lines+ from +filename+.  In non-block
    # form, returns an Array of +num_lines+
    #
    # Examples:
    #
    #  # Return an array
    #  File.head('somefile.txt') # => ['This is line1', 'This is line2', ...]
    #
    #  # Use a block
    #  File.head('somefile.txt'){ |line| puts line }
    #
    # source://ptools//lib/ptools.rb#203
    def head(filename, num_lines = T.unsafe(nil)); end

    # Is the file an ico file?
    #
    # @return [Boolean]
    #
    # source://ptools//lib/ptools.rb#466
    def ico?(file); end

    # Returns whether or not the file is an image. Only JPEG, PNG, BMP,
    # GIF, and ICO are checked against.
    #
    # This reads and checks the first few bytes of the file. For a version
    # that is more robust, but which depends on a 3rd party C library (and is
    # difficult to build on MS Windows), see the 'filemagic' library.
    #
    # By default the filename extension is also checked. You can disable this
    # by passing false as the second argument, in which case only the contents
    # are checked.
    #
    # Examples:
    #
    #    File.image?('somefile.jpg') # => true
    #    File.image?('somefile.txt') # => false
    # --
    # The approach I used here is based on information found at
    # http://en.wikipedia.org/wiki/Magic_number_(programming)
    #
    # @return [Boolean]
    #
    # source://ptools//lib/ptools.rb#50
    def image?(file, check_file_extension: T.unsafe(nil)); end

    # Is the file a jpeg file?
    #
    # @return [Boolean]
    #
    # source://ptools//lib/ptools.rb#431
    def jpg?(file); end

    # Converts a text file from one OS platform format to another, ala
    # 'dos2unix'. The possible values for +platform+ include:
    #
    # * MS Windows -> dos, windows, win32, mswin
    # * Unix/BSD   -> unix, linux, bsd, osx, darwin, sunos, solaris
    # * Mac        -> mac, macintosh, apple
    #
    # You may also specify 'local', in which case your CONFIG['host_os'] value
    # will be used. This is the default.
    #
    # Note that this method is only valid for an ftype of "file". Otherwise a
    # TypeError will be raised. If an invalid format value is received, an
    # ArgumentError is raised.
    #
    # @raise [ArgumentError]
    #
    # source://ptools//lib/ptools.rb#283
    def nl_convert(old_file, new_file = T.unsafe(nil), platform = T.unsafe(nil)); end

    # Returns the newline characters for the given platform.
    #
    # source://ptools//lib/ptools.rb#407
    def nl_for_platform(platform); end

    # Is the file a png file?
    #
    # @return [Boolean]
    #
    # source://ptools//lib/ptools.rb#437
    def png?(file); end

    # Returns whether or not +file+ is a sparse file.
    #
    # A sparse file is a any file where its size is greater than the number
    # of 512k blocks it consumes, i.e. its apparent and actual file size is
    # not the same.
    #
    # See http://en.wikipedia.org/wiki/Sparse_file for more information.
    #
    # @return [Boolean]
    #
    # source://ptools//lib/ptools.rb#383
    def sparse?(file); end

    # In block form, yields the last +num_lines+ of file +filename+.
    # In non-block form, it returns the lines as an array.
    #
    # Example:
    #
    #   File.tail('somefile.txt') # => ['This is line7', 'This is line8', ...]
    #
    # If you're looking for tail -f functionality, please use the file-tail
    # gem instead.
    #
    # --
    # Internally I'm using a 64 chunk of memory at a time. I may allow the size
    # to be configured in the future as an optional 3rd argument.
    #
    # source://ptools//lib/ptools.rb#234
    def tail(filename, num_lines = T.unsafe(nil), &block); end

    # Is the file a tiff?
    #
    # @return [Boolean]
    #
    # source://ptools//lib/ptools.rb#449
    def tiff?(file); end

    # Changes the access and modification time if present, or creates a 0
    # byte file +filename+ if it doesn't already exist.
    #
    # source://ptools//lib/ptools.rb#317
    def touch(filename); end

    # With no arguments, returns a four element array consisting of the number
    # of bytes, characters, words and lines in filename, respectively.
    #
    # Valid options are 'bytes', 'characters' (or just 'chars'), 'words' and
    # 'lines'.
    #
    # @raise [ArgumentError]
    #
    # source://ptools//lib/ptools.rb#333
    def wc(filename, option = T.unsafe(nil)); end

    # Returns an array of each +program+ within +path+, or nil if it cannot
    # be found.
    #
    # On Windows, it looks for executables ending with the suffixes defined
    # in your PATHEXT environment variable, or '.exe', '.bat' and '.com' if
    # that isn't defined, which you may optionally include in +program+.
    #
    # Examples:
    #
    #   File.whereis('ruby') # => ['/usr/bin/ruby', '/usr/local/bin/ruby']
    #   File.whereis('foo')  # => nil
    #
    # @raise [ArgumentError]
    #
    # source://ptools//lib/ptools.rb#146
    def whereis(program, path = T.unsafe(nil)); end

    # Looks for the first occurrence of +program+ within +path+.
    #
    # On Windows, it looks for executables ending with the suffixes defined
    # in your PATHEXT environment variable, or '.exe', '.bat' and '.com' if
    # that isn't defined, which you may optionally include in +program+.
    #
    # Returns nil if not found.
    #
    # Examples:
    #
    #   File.which('ruby') # => '/usr/local/bin/ruby'
    #   File.which('foo')  # => nil
    #
    # @raise [ArgumentError]
    #
    # source://ptools//lib/ptools.rb#93
    def which(program, path = T.unsafe(nil)); end

    private

    # Returns whether or not the given +text+ contains a BOM marker.
    # If present, we can generally assume it's a text file.
    #
    # @return [Boolean]
    #
    # source://ptools//lib/ptools.rb#392
    def check_bom?(file); end
  end
end

# source://ptools//lib/ptools.rb#27
File::IMAGE_EXT = T.let(T.unsafe(nil), Array)

# source://ptools//lib/ptools.rb#19
File::MSWINDOWS = T.let(T.unsafe(nil), FalseClass)

# The version of the ptools library.
#
# source://ptools//lib/ptools.rb#6
File::PTOOLS_VERSION = T.let(T.unsafe(nil), String)
