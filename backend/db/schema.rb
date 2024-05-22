# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_05_02_054752) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "addresses", force: :cascade do |t|
    t.string "line1", null: false
    t.string "line2"
    t.string "city", null: false
    t.string "postcode", null: false
    t.bigint "customer_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["city"], name: "index_addresses_on_city"
    t.index ["customer_id"], name: "index_addresses_on_customer_id"
    t.index ["line1"], name: "index_addresses_on_line1"
    t.index ["line2"], name: "index_addresses_on_line2"
    t.index ["postcode"], name: "index_addresses_on_postcode"
  end

  create_table "cached_images", force: :cascade do |t|
    t.text "blur_base64", null: false
    t.text "blur_url", null: false
    t.text "thumbnail_url", null: false
    t.text "small_url"
    t.text "large_url", null: false
    t.string "owner_type", null: false
    t.bigint "owner_id", null: false
    t.string "attachment_type", null: false
    t.bigint "attachment_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["attachment_type", "attachment_id"], name: "index_cached_images_on_attachment"
    t.index ["owner_type", "owner_id"], name: "index_cached_images_on_owner"
  end

  create_table "categories", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_categories_on_name"
  end

  create_table "customers", force: :cascade do |t|
    t.string "friendly_id"
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "email_address", null: false
    t.string "phone_number", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email_address"], name: "index_customers_on_email_address"
    t.index ["first_name"], name: "index_customers_on_first_name"
    t.index ["friendly_id"], name: "index_customers_on_friendly_id"
    t.index ["last_name"], name: "index_customers_on_last_name"
    t.index ["password_digest"], name: "index_customers_on_password_digest"
    t.index ["phone_number"], name: "index_customers_on_phone_number"
  end

  create_table "line_items", force: :cascade do |t|
    t.integer "quantity", null: false
    t.string "product_type", null: false
    t.bigint "product_id", null: false
    t.string "owner_type", null: false
    t.bigint "owner_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["owner_type", "owner_id"], name: "index_line_items_on_owner"
    t.index ["product_type", "product_id"], name: "index_line_items_on_product"
  end

  create_table "order_addresses", force: :cascade do |t|
    t.string "line1", null: false
    t.string "line2"
    t.string "city", null: false
    t.string "postcode", null: false
    t.bigint "address_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["address_id"], name: "index_order_addresses_on_address_id"
    t.index ["city"], name: "index_order_addresses_on_city"
    t.index ["line1"], name: "index_order_addresses_on_line1"
    t.index ["line2"], name: "index_order_addresses_on_line2"
    t.index ["postcode"], name: "index_order_addresses_on_postcode"
  end

  create_table "order_products", force: :cascade do |t|
    t.string "name", null: false
    t.decimal "price", precision: 10, scale: 2, null: false
    t.bigint "product_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_order_products_on_name"
    t.index ["price"], name: "index_order_products_on_price"
    t.index ["product_id"], name: "index_order_products_on_product_id"
  end

  create_table "orders", force: :cascade do |t|
    t.string "friendly_id"
    t.decimal "subtotal_amount", precision: 10, scale: 2
    t.decimal "shipping_amount", precision: 10, scale: 2
    t.decimal "tax_amount", precision: 10, scale: 2
    t.decimal "total_amount", precision: 10, scale: 2
    t.bigint "customer_id", null: false
    t.bigint "order_address_id", null: false
    t.bigint "shipping_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["customer_id"], name: "index_orders_on_customer_id"
    t.index ["friendly_id"], name: "index_orders_on_friendly_id"
    t.index ["order_address_id"], name: "index_orders_on_order_address_id"
    t.index ["shipping_id"], name: "index_orders_on_shipping_id"
  end

  create_table "products", force: :cascade do |t|
    t.string "friendly_id"
    t.string "name", null: false
    t.text "description", null: false
    t.decimal "price", precision: 10, scale: 2, null: false
    t.bigint "category_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_products_on_category_id"
    t.index ["friendly_id"], name: "index_products_on_friendly_id"
    t.index ["name"], name: "index_products_on_name"
    t.index ["price"], name: "index_products_on_price"
  end

  create_table "sessions", force: :cascade do |t|
    t.bigint "customer_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["customer_id"], name: "index_sessions_on_customer_id", unique: true
  end

  create_table "shippings", force: :cascade do |t|
    t.string "name", null: false
    t.string "description"
    t.decimal "price", precision: 10, scale: 2, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_shippings_on_name"
    t.index ["price"], name: "index_shippings_on_price"
  end

  create_table "shopping_carts", force: :cascade do |t|
    t.bigint "session_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["session_id"], name: "index_shopping_carts_on_session_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "addresses", "customers"
  add_foreign_key "order_addresses", "addresses", on_delete: :nullify
  add_foreign_key "order_products", "products"
  add_foreign_key "orders", "customers"
  add_foreign_key "orders", "order_addresses"
  add_foreign_key "orders", "shippings"
  add_foreign_key "products", "categories"
  add_foreign_key "sessions", "customers"
  add_foreign_key "shopping_carts", "sessions"
end
