# typed: strict
# frozen_string_literal: true

# Orders
class Order < ApplicationRecord
	include FriendlyIdConcern

	has_many :line_items, as: :owner, class_name: 'LineItem', dependent: :delete_all
	belongs_to :customer, class_name: 'Customer', optional: false
	belongs_to :order_address, class_name: 'OrderAddress', optional: false
	belongs_to :shipping, class_name: 'Shipping', optional: false

	validates_associated :line_items

	before_save :save_address, :save_order_product
	after_touch :calculate_totals

	# calculate order totals including subtotal, shipping and tax
	sig { void }
	def calculate_totals
		if line_items != reload.line_items
			total = BigDecimal('0')
			line_items.each do |line_item|
				total += line_item.product.price
			end
			self.subtotal_amount = total
			self.shipping_amount = shipping&.price || BigDecimal('0')
			self.total_amount = (T.must(subtotal_amount) + T.must(shipping_amount)) * ENV['TAX'].to_f
			self.tax_amount = T.must(total_amount) - (T.must(subtotal_amount) + T.must(shipping_amount))
			save!
		end
	end

	# snapshot of the customer address details when order created
	sig { params(address: Address).void }
	def address=(address)
		self.order_address = OrderAddress.new(
				line1: address.line1,
				line2: address.line2,
				city: address.city,
				postcode: address.postcode,
				address:
		)
	end

	private

		# save address if not saved
		sig { void }
		def save_address
			return unless order_address.present? && order_address&.new_record?

			order_address&.save!
		end

		# snapshot of the product details when order created
		sig { void }
		def save_order_product
			line_items.each do |line_item|
				if line_item.product_type == 'Product'
					order_product = OrderProduct.create(
							name: line_item.product.name,
							price: line_item.product.price,
							product: line_item.product
					)

					line_item.update!(product: order_product)
				end
			end
		end
end
