# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'ffaker'

# creates files in parallel
parallel_tasks = Rails.env.development? ? 10 : 1

if ARGV.include?('-q')
	printf "\nSeeding Database"
else
	printf "\n\n----- Seeding -----"
	printf "\n==================="
end

# -- Categories --
printf "\n- Creating Categories"
categories = ['Automotive', 'Baby', 'Beauty and Personal Care', 'Fashion', 'Health and Household',
		'Home and Kitchen', 'Industrial and Scientific', 'Luggage', 'Movies and Television',
		'Pet Supplies', 'Software', 'Sports and Outdoors', 'Tools & Home Improvement',
		'Toys and Games', 'Video Games'].map do |category_name|
	# 	# category.image.attach(io: FFaker::Image.file, filename: 'category_image.png')

	{
			name: category_name
	}
end
# rubocop:disable Rails/SkipsModelValidations
all_categories = Category.insert_all!(categories)
# rubocop:enable Rails/SkipsModelValidations

category_image_group = Workers::TaskGroup.new(pool: Workers::Pool.new(size: parallel_tasks))
Category.auto_include(true).find_each do |category|
	category_image_group.add(max_tries: 1) do
		begin
			file = UnsplashImage.tempfile(size: '600x600', tags: "category #{category.name}")
		rescue StandardError
			file = FFaker::Image.file(size: '600x600')
		end
		category.image.attach(io: file, filename: "category_#{category.id}.jpg", content_type: 'image/jpg')
		category_image_group.synchronize { printf '.' }
	rescue StandardError => e
		category_image_group.synchronize { puts e }
	end

	if ARGV.include?('-q')
		printf '.'
	else
		printf "\n  - #{category.id}, #{category.name}"
	end
end

unless ARGV.include? 'skip_images=true'
	printf "\n- Generating Category Images"
	category_image_group.run
	printf "\n  - #{category_image_group.successes.length} created"
	printf "\n  - #{category_image_group.failures.length} failed" if category_image_group.failures.length.positive?
end
ApplicationRecord.callbacks_after_create(all_categories, Category)

# -- Products -- #
printf "\n- Creating Products"
products = []
Category.auto_include(true).find_each do |category|
	rand(4..16).times do
		products << {
				name: FFaker::Product.product_name,
				description: FFaker::HipsterIpsum.paragraphs.join("\n\n"),
				price: rand(4..99) + (rand(0..99) / 100),
				category_id: category.id
		}
	end
end
# rubocop:disable Rails/SkipsModelValidations
all_products = Product.auto_include(true).insert_all!(products)
# rubocop:enable Rails/SkipsModelValidations

product_image_group = Workers::TaskGroup.new(pool: Workers::Pool.new(size: parallel_tasks))
Product.auto_include(true).find_each do |product|
	product_id = product.id
	product_image_group.add(max_tries: 1) do
		product = Product.auto_include(true).find_by(id: product_id)
		rand(4..8).times do |i|
			begin
				file = UnsplashImage.tempfile(size: '1920x1080', tags: "product #{product.name}")
			rescue StandardError
				file = FFaker::Image.file(size: '1920x1080')
			end

			product.images.attach(io: file, filename: "product_#{product.id}_#{i + 1}.jpg", content_type: 'image/jpg')
			product_image_group.synchronize { printf '.' }
		end
	end

	if ARGV.include?('-q')
		printf '.'
	else
		printf "\n  - #{product.id}, #{product.name}, #{product.category.name}"
	end
end

unless ARGV.include? 'skip_images=true'
	printf "\n- Generating Product Images"
	product_image_group.run
	printf "\n  - #{product_image_group.successes.length} created"
	printf "\n  - #{product_image_group.failures.length} failed" if product_image_group.failures.length.positive?
end
ApplicationRecord.callbacks_after_create(all_products, Product)

# -- Customers -- #
printf "\n- Creating Customers"
Customer.create!(first_name: FFaker::Name.first_name, last_name: FFaker::Name.last_name,
		email_address: 'test@test.com', phone_number: '07123123456', password: '12345678')
rand(2..5).times do
	Customer.create!(first_name: FFaker::Name.first_name, last_name: FFaker::Name.last_name,
			email_address: FFaker::Internet.email, phone_number: '07123123456', password: '12345678')
end

Customer.auto_include(true).find_each do |customer|
	if ARGV.include?('-q')
		printf '.'
	else
		printf "\n  - #{customer.first_name}, #{customer.last_name}, #{customer.email_address}, #{customer.phone_number}"
	end
end
printf "\n  - Note: all customers have the password: 12345678"

# -- Addresses -- #
printf "\n- Creating Addresses"
Customer.auto_include(true).find_each do |customer|
	rand(2..3).times do
		Address.create!(line1: FFaker::AddressUK.street_address, line2: FFaker::AddressUK.street_address,
				city: FFaker::AddressUK.city, postcode: FFaker::AddressUK.postcode, customer:)
	end
end

Address.auto_include(true).find_each do |address|
	if ARGV.include?('-q')
		printf '.'
	else
		printf "\n  - #{address.id}. #{address.line1}, #{address.line2}, #{address.city}, #{address.postcode}, #{address.customer.id}"
	end
end

# -- Sessions -- #
printf "\n- Creating Sessions"
Session.create!(customer: Customer.first)

Session.auto_include(true).find_each do |session|
	if ARGV.include?('-q')
		printf '.'
	else
		printf "\n  - #{session.id}, #{session.customer.first_name}, #{session.customer.first_name}, #{session.customer.email_address}"
	end
end

# -- Shopping Carts -- #
printf "\n- Creating Shopping Carts"
ShoppingCart.create!(session: Session.first)

ShoppingCart.auto_include(true).find_each do |shopping_cart|
	if ARGV.include?('-q')
		printf '.'
	else
		printf "\n  - #{shopping_cart.id}, #{shopping_cart.session.customer.first_name}, #{shopping_cart.session.customer.first_name}, #{shopping_cart.session.customer.email_address}"
	end
end

# -- Line Items -- #
printf "\n- Creating Line Items"
LineItem.create!(product: Product.first, quantity: 5, owner: ShoppingCart.first)

LineItem.auto_include(true).find_each do |line_item|
	if ARGV.include?('-q')
		printf '.'
	else
		printf "\n  - #{line_item.id}, #{line_item.product.name}, #{line_item.shopping_cart.session.customer.first_name}, #{line_item.shopping_cart.session.customer.last_name}"
	end
end

# -- Shipping -- #
printf "\n- Creating Shipping"
Shipping.create!(name: 'Next Day Delivery', description: 'Guaranteed Next Day Delivery before Noon',
		price: (rand * 100).round(2))
Shipping.create!(name: 'Express Delivery', description: 'Delivery within 2 to 3 days', price: (rand * 100).round(2))
Shipping.create!(name: 'Economy Delivery', description: 'Delivery within 4 to 7 days', price: (rand * 100).round(2))

Shipping.auto_include(true).find_each do |shipping|
	if ARGV.include?('-q')
		printf '.'
	else
		printf "\n  - #{shipping.id}, #{shipping.name}, #{shipping.description}, #{shipping.price}"
	end
end

# -- Orders -- #
printf "\n- Creating Orders"
Customer.find_each do |customer|
	rand(2..3).times do
		order = Order.create!(customer:, address: customer.addresses.first, shipping: Shipping.first)
		products = Product.order('RANDOM()')
		rand(2..3).times do |i|
			LineItem.create!(product: products[i], quantity: rand(1..9), owner: order)
		end
	end

	# -- Customers -- #
	Order.where(customer:).find_each do |order|
		if ARGV.include?('-q')
			printf '.'
		else
			printf "\n  - #{order.id}, #{order.customer.first_name}, #{order.customer.last_name}, #{order.line_items.count}"
		end
	end
end

printf "\n\n- Complete...\n"
