# typed: true

# DO NOT EDIT MANUALLY
# This is an autogenerated file for types exported from the `bullet` gem.
# Please instead update this file by running `bin/tapioca gem bullet`.

# source://bullet//lib/bullet/dependency.rb#3
module Bullet
  extend ::Bullet::Dependency

  class << self
    # Returns the value of attribute add_footer.
    #
    # source://bullet//lib/bullet.rb#43
    def add_footer; end

    # Sets the attribute add_footer
    #
    # @param value the value to set the attribute add_footer to.
    #
    # source://bullet//lib/bullet.rb#43
    def add_footer=(_arg0); end

    # source://bullet//lib/bullet.rb#111
    def add_safelist(options); end

    # source://bullet//lib/bullet.rb#53
    def airbrake=(arg); end

    # source://bullet//lib/bullet.rb#53
    def alert=(arg); end

    # Returns the value of attribute always_append_html_body.
    #
    # source://bullet//lib/bullet.rb#43
    def always_append_html_body; end

    # Sets the attribute always_append_html_body
    #
    # @param value the value to set the attribute always_append_html_body to.
    #
    # source://bullet//lib/bullet.rb#43
    def always_append_html_body=(_arg0); end

    # Rails.root might be nil if `railties` is a dependency on a project that does not use Rails
    #
    # source://bullet//lib/bullet.rb#87
    def app_root; end

    # source://bullet//lib/bullet.rb#53
    def appsignal=(arg); end

    # source://bullet//lib/bullet.rb#53
    def bugsnag=(arg); end

    # source://bullet//lib/bullet.rb#136
    def bullet_logger=(active); end

    # source://bullet//lib/bullet.rb#132
    def clear_safelist; end

    # source://bullet//lib/bullet.rb#53
    def console=(arg); end

    # @return [Boolean]
    #
    # source://bullet//lib/bullet.rb#252
    def console_enabled?; end

    # Sets the attribute counter_cache_enable
    #
    # @param value the value to set the attribute counter_cache_enable to.
    #
    # source://bullet//lib/bullet.rb#36
    def counter_cache_enable=(_arg0); end

    # @return [Boolean]
    #
    # source://bullet//lib/bullet.rb#99
    def counter_cache_enable?; end

    # source://bullet//lib/bullet.rb#53
    def customized_logger=(arg); end

    # source://bullet//lib/bullet.rb#146
    def debug(title, message); end

    # source://bullet//lib/bullet.rb#117
    def delete_safelist(options); end

    # source://bullet//lib/bullet.rb#65
    def enable=(enable); end

    # @return [Boolean]
    #
    # source://bullet//lib/bullet.rb#80
    def enable?; end

    # source://bullet//lib/bullet.rb#65
    def enabled=(enable); end

    # @return [Boolean]
    #
    # source://bullet//lib/bullet.rb#80
    def enabled?; end

    # source://bullet//lib/bullet.rb#166
    def end_request; end

    # source://bullet//lib/bullet.rb#210
    def footer_info; end

    # source://bullet//lib/bullet.rb#196
    def gather_inline_notifications; end

    # source://bullet//lib/bullet.rb#124
    def get_safelist_associations(type, class_name); end

    # source://bullet//lib/bullet.rb#53
    def honeybadger=(arg); end

    # @return [Boolean]
    #
    # source://bullet//lib/bullet.rb#256
    def inject_into_page?; end

    # Sets the attribute n_plus_one_query_enable
    #
    # @param value the value to set the attribute n_plus_one_query_enable to.
    #
    # source://bullet//lib/bullet.rb#36
    def n_plus_one_query_enable=(_arg0); end

    # @return [Boolean]
    #
    # source://bullet//lib/bullet.rb#91
    def n_plus_one_query_enable?; end

    # @return [Boolean]
    #
    # source://bullet//lib/bullet.rb#189
    def notification?; end

    # source://bullet//lib/bullet.rb#185
    def notification_collector; end

    # Returns the value of attribute orm_patches_applied.
    #
    # source://bullet//lib/bullet.rb#43
    def orm_patches_applied; end

    # Sets the attribute orm_patches_applied
    #
    # @param value the value to set the attribute orm_patches_applied to.
    #
    # source://bullet//lib/bullet.rb#43
    def orm_patches_applied=(_arg0); end

    # source://bullet//lib/bullet.rb#202
    def perform_out_of_channel_notifications(env = T.unsafe(nil)); end

    # source://bullet//lib/bullet.rb#232
    def profile; end

    # source://bullet//lib/bullet.rb#53
    def rails_logger=(arg); end

    # source://bullet//lib/bullet.rb#55
    def raise=(should_raise); end

    # source://bullet//lib/bullet.rb#128
    def reset_safelist; end

    # source://bullet//lib/bullet.rb#53
    def rollbar=(arg); end

    # Returns the value of attribute safelist.
    #
    # source://bullet//lib/bullet.rb#42
    def safelist; end

    # source://bullet//lib/bullet.rb#53
    def sentry=(arg); end

    # Sets the attribute skip_html_injection
    #
    # @param value the value to set the attribute skip_html_injection to.
    #
    # source://bullet//lib/bullet.rb#36
    def skip_html_injection=(_arg0); end

    # Returns the value of attribute skip_http_headers.
    #
    # source://bullet//lib/bullet.rb#43
    def skip_http_headers; end

    # Sets the attribute skip_http_headers
    #
    # @param value the value to set the attribute skip_http_headers to.
    #
    # source://bullet//lib/bullet.rb#43
    def skip_http_headers=(_arg0); end

    # Returns the value of attribute skip_user_in_notification.
    #
    # source://bullet//lib/bullet.rb#43
    def skip_user_in_notification; end

    # Sets the attribute skip_user_in_notification
    #
    # @param value the value to set the attribute skip_user_in_notification to.
    #
    # source://bullet//lib/bullet.rb#43
    def skip_user_in_notification=(_arg0); end

    # source://bullet//lib/bullet.rb#53
    def slack=(arg); end

    # source://bullet//lib/bullet.rb#107
    def stacktrace_excludes; end

    # Sets the attribute stacktrace_excludes
    #
    # @param value the value to set the attribute stacktrace_excludes to.
    #
    # source://bullet//lib/bullet.rb#36
    def stacktrace_excludes=(_arg0); end

    # source://bullet//lib/bullet.rb#103
    def stacktrace_includes; end

    # Sets the attribute stacktrace_includes
    #
    # @param value the value to set the attribute stacktrace_includes to.
    #
    # source://bullet//lib/bullet.rb#36
    def stacktrace_includes=(_arg0); end

    # @return [Boolean]
    #
    # source://bullet//lib/bullet.rb#181
    def start?; end

    # source://bullet//lib/bullet.rb#150
    def start_request; end

    # source://bullet//lib/bullet.rb#53
    def terminal_notifier=(arg); end

    # source://bullet//lib/bullet.rb#216
    def text_notifications; end

    # Sets the attribute unused_eager_loading_enable
    #
    # @param value the value to set the attribute unused_eager_loading_enable to.
    #
    # source://bullet//lib/bullet.rb#36
    def unused_eager_loading_enable=(_arg0); end

    # @return [Boolean]
    #
    # source://bullet//lib/bullet.rb#95
    def unused_eager_loading_enable?; end

    # source://bullet//lib/bullet.rb#224
    def warnings; end

    # source://bullet//lib/bullet.rb#53
    def xmpp=(arg); end

    private

    # source://bullet//lib/bullet.rb#273
    def build_request_uri(env); end

    # source://bullet//lib/bullet.rb#264
    def for_each_active_notifier_with_notification; end
  end
end

# source://bullet//lib/bullet/active_job.rb#4
module Bullet::ActiveJob
  class << self
    # @private
    #
    # source://bullet//lib/bullet/active_job.rb#5
    def included(base); end
  end
end

# source://bullet//lib/bullet/active_record70.rb#13
module Bullet::ActiveRecord
  class << self
    # source://bullet//lib/bullet/active_record70.rb#14
    def enable; end
  end
end

# source://bullet//lib/bullet.rb#24
class Bullet::BulletRailtie < ::Rails::Railtie; end

# source://bullet//lib/bullet/dependency.rb#4
module Bullet::Dependency
  # @return [Boolean]
  #
  # source://bullet//lib/bullet/dependency.rb#77
  def active_record40?; end

  # @return [Boolean]
  #
  # source://bullet//lib/bullet/dependency.rb#81
  def active_record41?; end

  # @return [Boolean]
  #
  # source://bullet//lib/bullet/dependency.rb#85
  def active_record42?; end

  # @return [Boolean]
  #
  # source://bullet//lib/bullet/dependency.rb#61
  def active_record4?; end

  # @return [Boolean]
  #
  # source://bullet//lib/bullet/dependency.rb#89
  def active_record50?; end

  # @return [Boolean]
  #
  # source://bullet//lib/bullet/dependency.rb#93
  def active_record51?; end

  # @return [Boolean]
  #
  # source://bullet//lib/bullet/dependency.rb#97
  def active_record52?; end

  # @return [Boolean]
  #
  # source://bullet//lib/bullet/dependency.rb#65
  def active_record5?; end

  # @return [Boolean]
  #
  # source://bullet//lib/bullet/dependency.rb#101
  def active_record60?; end

  # @return [Boolean]
  #
  # source://bullet//lib/bullet/dependency.rb#105
  def active_record61?; end

  # @return [Boolean]
  #
  # source://bullet//lib/bullet/dependency.rb#69
  def active_record6?; end

  # @return [Boolean]
  #
  # source://bullet//lib/bullet/dependency.rb#109
  def active_record70?; end

  # @return [Boolean]
  #
  # source://bullet//lib/bullet/dependency.rb#113
  def active_record71?; end

  # @return [Boolean]
  #
  # source://bullet//lib/bullet/dependency.rb#73
  def active_record7?; end

  # @return [Boolean]
  #
  # source://bullet//lib/bullet/dependency.rb#9
  def active_record?; end

  # source://bullet//lib/bullet/dependency.rb#13
  def active_record_version; end

  # @return [Boolean]
  #
  # source://bullet//lib/bullet/dependency.rb#117
  def mongoid4x?; end

  # @return [Boolean]
  #
  # source://bullet//lib/bullet/dependency.rb#121
  def mongoid5x?; end

  # @return [Boolean]
  #
  # source://bullet//lib/bullet/dependency.rb#125
  def mongoid6x?; end

  # @return [Boolean]
  #
  # source://bullet//lib/bullet/dependency.rb#129
  def mongoid7x?; end

  # @return [Boolean]
  #
  # source://bullet//lib/bullet/dependency.rb#133
  def mongoid8x?; end

  # @return [Boolean]
  #
  # source://bullet//lib/bullet/dependency.rb#5
  def mongoid?; end

  # source://bullet//lib/bullet/dependency.rb#42
  def mongoid_version; end
end

# source://bullet//lib/bullet/detector.rb#4
module Bullet::Detector; end

# source://bullet//lib/bullet/detector/association.rb#5
class Bullet::Detector::Association < ::Bullet::Detector::Base
  class << self
    # source://bullet//lib/bullet/detector/association.rb#20
    def add_call_object_associations(object, associations); end

    # source://bullet//lib/bullet/detector/association.rb#7
    def add_object_associations(object, associations); end

    # impossible_objects keep the class to objects relationships
    # that the objects may not cause N+1 query.
    # e.g. { Post => ["Post:1", "Post:2"] }
    # if find collection returns only one object, then the object is impossible object,
    # impossible_objects are used to avoid treating 1+1 query to N+1 query.
    #
    # source://bullet//lib/bullet/detector/association.rb#45
    def impossible_objects; end

    # possible_objects keep the class to object relationships
    # that the objects may cause N+1 query.
    # e.g. { Post => ["Post:1", "Post:2"] }
    #
    # source://bullet//lib/bullet/detector/association.rb#36
    def possible_objects; end

    private

    # call_object_associations keep the object relationships
    # that object.associations is called.
    # e.g. { "Post:1" => [:comments] }
    # they are used to detect unused preload associations.
    #
    # source://bullet//lib/bullet/detector/association.rb#64
    def call_object_associations; end

    # cal_stacks keeps stacktraces where querie-objects were called from.
    # e.g. { 'Object:111' => [SomeProject/app/controllers/...] }
    #
    # source://bullet//lib/bullet/detector/association.rb#84
    def call_stacks; end

    # eager_loadings keep the object relationships
    # that the associations are preloaded by find :include.
    # e.g. { ["Post:1", "Post:2"] => [:comments, :user] }
    #
    # source://bullet//lib/bullet/detector/association.rb#78
    def eager_loadings; end

    # inversed_objects keeps object relationships
    # that association is inversed.
    # e.g. { "Comment:1" => ["post"] }
    #
    # source://bullet//lib/bullet/detector/association.rb#71
    def inversed_objects; end

    # object_associations keep the object relationships
    # that the object has many associations.
    # e.g. { "Post:1" => [:comments] }
    # the object_associations keep all associations that may be or may no be
    # unpreload associations or unused preload associations.
    #
    # source://bullet//lib/bullet/detector/association.rb#56
    def object_associations; end
  end
end

# source://bullet//lib/bullet/detector/base.rb#5
class Bullet::Detector::Base; end

# source://bullet//lib/bullet/detector/counter_cache.rb#5
class Bullet::Detector::CounterCache < ::Bullet::Detector::Base
  class << self
    # source://bullet//lib/bullet/detector/counter_cache.rb#7
    def add_counter_cache(object, associations); end

    # source://bullet//lib/bullet/detector/counter_cache.rb#33
    def add_impossible_object(object); end

    # source://bullet//lib/bullet/detector/counter_cache.rb#19
    def add_possible_objects(object_or_objects); end

    # @return [Boolean]
    #
    # source://bullet//lib/bullet/detector/counter_cache.rb#42
    def conditions_met?(object, _associations); end

    # source://bullet//lib/bullet/detector/counter_cache.rb#50
    def impossible_objects; end

    # source://bullet//lib/bullet/detector/counter_cache.rb#46
    def possible_objects; end

    private

    # source://bullet//lib/bullet/detector/counter_cache.rb#56
    def create_notification(klazz, associations); end
  end
end

# source://bullet//lib/bullet/detector/n_plus_one_query.rb#5
class Bullet::Detector::NPlusOneQuery < ::Bullet::Detector::Association
  extend ::Bullet::Dependency
  extend ::Bullet::StackTraceFilter

  class << self
    # source://bullet//lib/bullet/detector/n_plus_one_query.rb#55
    def add_impossible_object(object); end

    # source://bullet//lib/bullet/detector/n_plus_one_query.rb#64
    def add_inversed_object(object, association); end

    # source://bullet//lib/bullet/detector/n_plus_one_query.rb#32
    def add_possible_objects(object_or_objects); end

    # check if object => associations already exists in object_associations.
    #
    # @return [Boolean]
    #
    # source://bullet//lib/bullet/detector/n_plus_one_query.rb#90
    def association?(object, associations); end

    # executed when object.associations is called.
    # first, it keeps this method call for object.association.
    # then, it checks if this associations call is unpreload.
    #   if it is, keeps this unpreload associations and caller.
    #
    # source://bullet//lib/bullet/detector/n_plus_one_query.rb#14
    def call_association(object, associations); end

    # decide whether the object.associations is unpreloaded or not.
    #
    # @return [Boolean]
    #
    # source://bullet//lib/bullet/detector/n_plus_one_query.rb#77
    def conditions_met?(object, associations); end

    # @return [Boolean]
    #
    # source://bullet//lib/bullet/detector/n_plus_one_query.rb#85
    def impossible?(object); end

    # @return [Boolean]
    #
    # source://bullet//lib/bullet/detector/n_plus_one_query.rb#81
    def possible?(object); end

    private

    # source://bullet//lib/bullet/detector/n_plus_one_query.rb#105
    def create_notification(callers, klazz, associations); end
  end
end

# source://bullet//lib/bullet/detector/unused_eager_loading.rb#5
class Bullet::Detector::UnusedEagerLoading < ::Bullet::Detector::Association
  extend ::Bullet::Dependency
  extend ::Bullet::StackTraceFilter

  class << self
    # source://bullet//lib/bullet/detector/unused_eager_loading.rb#27
    def add_eager_loadings(objects, associations); end

    # check if there are unused preload associations.
    #   get related_objects from eager_loadings associated with object and associations
    #   get call_object_association from associations of call_object_associations whose object is in related_objects
    #   if association not in call_object_association, then the object => association - call_object_association is unused preload associations
    #
    # source://bullet//lib/bullet/detector/unused_eager_loading.rb#14
    def check_unused_preload_associations; end

    private

    # source://bullet//lib/bullet/detector/unused_eager_loading.rb#79
    def call_associations(bullet_key, associations); end

    # source://bullet//lib/bullet/detector/unused_eager_loading.rb#67
    def create_notification(callers, klazz, associations); end

    # source://bullet//lib/bullet/detector/unused_eager_loading.rb#90
    def diff_object_associations(bullet_key, associations); end
  end
end

# source://bullet//lib/bullet/notification.rb#4
module Bullet::Notification; end

# source://bullet//lib/bullet/notification/base.rb#5
class Bullet::Notification::Base
  # @return [Base] a new instance of Base
  #
  # source://bullet//lib/bullet/notification/base.rb#9
  def initialize(base_class, association_or_associations, path = T.unsafe(nil)); end

  # Returns the value of attribute associations.
  #
  # source://bullet//lib/bullet/notification/base.rb#7
  def associations; end

  # Returns the value of attribute base_class.
  #
  # source://bullet//lib/bullet/notification/base.rb#7
  def base_class; end

  # @raise [NoMethodError]
  #
  # source://bullet//lib/bullet/notification/base.rb#20
  def body; end

  # source://bullet//lib/bullet/notification/base.rb#41
  def body_with_caller; end

  # source://bullet//lib/bullet/notification/base.rb#24
  def call_stack_messages; end

  # @return [Boolean]
  #
  # source://bullet//lib/bullet/notification/base.rb#72
  def eql?(other); end

  # source://bullet//lib/bullet/notification/base.rb#76
  def hash; end

  # source://bullet//lib/bullet/notification/base.rb#63
  def notification_data; end

  # Returns the value of attribute notifier.
  #
  # source://bullet//lib/bullet/notification/base.rb#6
  def notifier; end

  # Sets the attribute notifier
  #
  # @param value the value to set the attribute notifier to.
  #
  # source://bullet//lib/bullet/notification/base.rb#6
  def notifier=(_arg0); end

  # source://bullet//lib/bullet/notification/base.rb#45
  def notify_inline; end

  # source://bullet//lib/bullet/notification/base.rb#49
  def notify_out_of_channel; end

  # Returns the value of attribute path.
  #
  # source://bullet//lib/bullet/notification/base.rb#7
  def path; end

  # source://bullet//lib/bullet/notification/base.rb#53
  def short_notice; end

  # @raise [NoMethodError]
  #
  # source://bullet//lib/bullet/notification/base.rb#16
  def title; end

  # Returns the value of attribute url.
  #
  # source://bullet//lib/bullet/notification/base.rb#6
  def url; end

  # Sets the attribute url
  #
  # @param value the value to set the attribute url to.
  #
  # source://bullet//lib/bullet/notification/base.rb#6
  def url=(_arg0); end

  # source://bullet//lib/bullet/notification/base.rb#28
  def whoami; end

  protected

  # source://bullet//lib/bullet/notification/base.rb#86
  def associations_str; end

  # source://bullet//lib/bullet/notification/base.rb#82
  def klazz_associations_str; end
end

# source://bullet//lib/bullet/notification/counter_cache.rb#5
class Bullet::Notification::CounterCache < ::Bullet::Notification::Base
  # source://bullet//lib/bullet/notification/counter_cache.rb#6
  def body; end

  # source://bullet//lib/bullet/notification/counter_cache.rb#10
  def title; end
end

# source://bullet//lib/bullet/notification/n_plus_one_query.rb#5
class Bullet::Notification::NPlusOneQuery < ::Bullet::Notification::Base
  # @return [NPlusOneQuery] a new instance of NPlusOneQuery
  #
  # source://bullet//lib/bullet/notification/n_plus_one_query.rb#6
  def initialize(callers, base_class, associations, path = T.unsafe(nil)); end

  # source://bullet//lib/bullet/notification/n_plus_one_query.rb#12
  def body; end

  # source://bullet//lib/bullet/notification/n_plus_one_query.rb#20
  def notification_data; end

  # source://bullet//lib/bullet/notification/n_plus_one_query.rb#16
  def title; end

  protected

  # source://bullet//lib/bullet/notification/n_plus_one_query.rb#26
  def call_stack_messages; end
end

# source://bullet//lib/bullet/notification.rb#10
class Bullet::Notification::UnoptimizedQueryError < ::StandardError; end

# source://bullet//lib/bullet/notification/unused_eager_loading.rb#5
class Bullet::Notification::UnusedEagerLoading < ::Bullet::Notification::Base
  # @return [UnusedEagerLoading] a new instance of UnusedEagerLoading
  #
  # source://bullet//lib/bullet/notification/unused_eager_loading.rb#6
  def initialize(callers, base_class, associations, path = T.unsafe(nil)); end

  # source://bullet//lib/bullet/notification/unused_eager_loading.rb#12
  def body; end

  # source://bullet//lib/bullet/notification/unused_eager_loading.rb#20
  def notification_data; end

  # source://bullet//lib/bullet/notification/unused_eager_loading.rb#16
  def title; end

  protected

  # source://bullet//lib/bullet/notification/unused_eager_loading.rb#26
  def call_stack_messages; end
end

# source://bullet//lib/bullet/notification_collector.rb#6
class Bullet::NotificationCollector
  # @return [NotificationCollector] a new instance of NotificationCollector
  #
  # source://bullet//lib/bullet/notification_collector.rb#9
  def initialize; end

  # source://bullet//lib/bullet/notification_collector.rb#17
  def add(value); end

  # Returns the value of attribute collection.
  #
  # source://bullet//lib/bullet/notification_collector.rb#7
  def collection; end

  # @return [Boolean]
  #
  # source://bullet//lib/bullet/notification_collector.rb#21
  def notifications_present?; end

  # source://bullet//lib/bullet/notification_collector.rb#13
  def reset; end
end

# source://bullet//lib/bullet/rack.rb#4
class Bullet::Rack
  include ::Bullet::Dependency

  # @return [Rack] a new instance of Rack
  #
  # source://bullet//lib/bullet/rack.rb#9
  def initialize(app); end

  # source://bullet//lib/bullet/rack.rb#57
  def append_to_html_body(response_body, content); end

  # source://bullet//lib/bullet/rack.rb#13
  def call(env); end

  # fix issue if response's body is a Proc
  #
  # @return [Boolean]
  #
  # source://bullet//lib/bullet/rack.rb#48
  def empty?(response); end

  # @return [Boolean]
  #
  # source://bullet//lib/bullet/rack.rb#80
  def file?(headers); end

  # source://bullet//lib/bullet/rack.rb#68
  def footer_note; end

  # @return [Boolean]
  #
  # source://bullet//lib/bullet/rack.rb#88
  def html_request?(headers, response); end

  # source://bullet//lib/bullet/rack.rb#92
  def response_body(response); end

  # source://bullet//lib/bullet/rack.rb#72
  def set_header(headers, header_name, header_array); end

  # @return [Boolean]
  #
  # source://bullet//lib/bullet/rack.rb#84
  def sse?(headers); end

  private

  # source://bullet//lib/bullet/rack.rb#102
  def details_attributes; end

  # source://bullet//lib/bullet/rack.rb#121
  def footer_console_message; end

  # source://bullet//lib/bullet/rack.rb#115
  def footer_content_attributes; end

  # source://bullet//lib/bullet/rack.rb#109
  def summary_attributes; end

  # source://bullet//lib/bullet/rack.rb#138
  def with_security_policy_nonce(headers); end

  # Make footer work for XHR requests by appending data to the footer
  #
  # source://bullet//lib/bullet/rack.rb#128
  def xhr_script(nonce = T.unsafe(nil)); end
end

# source://bullet//lib/bullet/rack.rb#7
Bullet::Rack::NONCE_MATCHER = T.let(T.unsafe(nil), Regexp)

# source://bullet//lib/bullet/registry.rb#4
module Bullet::Registry; end

# source://bullet//lib/bullet/registry/association.rb#5
class Bullet::Registry::Association < ::Bullet::Registry::Base
  # source://bullet//lib/bullet/registry/association.rb#6
  def merge(base, associations); end

  # source://bullet//lib/bullet/registry/association.rb#10
  def similarly_associated(base, associations); end
end

# source://bullet//lib/bullet/registry/base.rb#5
class Bullet::Registry::Base
  # @return [Base] a new instance of Base
  #
  # source://bullet//lib/bullet/registry/base.rb#8
  def initialize; end

  # source://bullet//lib/bullet/registry/base.rb#12
  def [](key); end

  # source://bullet//lib/bullet/registry/base.rb#28
  def add(key, value); end

  # source://bullet//lib/bullet/registry/base.rb#20
  def delete(base); end

  # source://bullet//lib/bullet/registry/base.rb#16
  def each(&block); end

  # @return [Boolean]
  #
  # source://bullet//lib/bullet/registry/base.rb#37
  def include?(key, value); end

  # Returns the value of attribute registry.
  #
  # source://bullet//lib/bullet/registry/base.rb#6
  def registry; end

  # source://bullet//lib/bullet/registry/base.rb#24
  def select(*args, &block); end
end

# source://bullet//lib/bullet/registry/call_stack.rb#5
class Bullet::Registry::CallStack < ::Bullet::Registry::Base
  # remembers found association backtrace
  #
  # source://bullet//lib/bullet/registry/call_stack.rb#7
  def add(key); end
end

# source://bullet//lib/bullet/registry/object.rb#5
class Bullet::Registry::Object < ::Bullet::Registry::Base
  # source://bullet//lib/bullet/registry/object.rb#6
  def add(bullet_key); end

  # @return [Boolean]
  #
  # source://bullet//lib/bullet/registry/object.rb#10
  def include?(bullet_key); end
end

# source://bullet//lib/bullet/active_record70.rb#4
module Bullet::SaveWithBulletSupport
  # source://bullet//lib/bullet/active_record70.rb#5
  def _create_record(*_arg0); end
end

# source://bullet//lib/bullet/stack_trace_filter.rb#6
module Bullet::StackTraceFilter
  # @param bullet_key [String] - use this to get stored call stack from call_stacks object.
  #
  # source://bullet//lib/bullet/stack_trace_filter.rb#11
  def caller_in_project(bullet_key = T.unsafe(nil)); end

  # @return [Boolean]
  #
  # source://bullet//lib/bullet/stack_trace_filter.rb#23
  def excluded_stacktrace_path?; end

  private

  # source://bullet//lib/bullet/stack_trace_filter.rb#54
  def location_as_path(location); end

  # @return [Boolean]
  #
  # source://bullet//lib/bullet/stack_trace_filter.rb#31
  def pattern_matches?(location, pattern); end

  # source://bullet//lib/bullet/stack_trace_filter.rb#60
  def select_caller_locations(bullet_key = T.unsafe(nil)); end
end

# source://bullet//lib/bullet/stack_trace_filter.rb#8
Bullet::StackTraceFilter::IS_RUBY_19 = T.let(T.unsafe(nil), FalseClass)

# source://bullet//lib/bullet/stack_trace_filter.rb#7
Bullet::StackTraceFilter::VENDOR_PATH = T.let(T.unsafe(nil), String)

# source://bullet//lib/bullet/ext/object.rb#3
class Object < ::BasicObject
  include ::Kernel
  include ::PP::ObjectMixin

  # source://bullet//lib/bullet/ext/object.rb#4
  def bullet_key; end

  # source://bullet//lib/bullet/ext/object.rb#8
  def bullet_primary_key_value; end

  private

  # source://bullet//lib/bullet/ext/object.rb#24
  def bullet_join_potential_composite_primary_key(primary_keys); end
end

# source://bullet//lib/bullet/ext/string.rb#3
class String
  include ::Comparable

  # source://bullet//lib/bullet/ext/string.rb#4
  def bullet_class_name; end
end
