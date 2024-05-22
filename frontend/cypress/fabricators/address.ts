import { faker } from '@faker-js/faker'

/**
 * creates random data for address
 */
export class Address {
	public city: string
	public id: number
	public line1: string
	public line2: string
	public postcode: string

	/**
	 * creates the random test data
	 */
	constructor() {
		this.city = faker.location.city()
		this.id = faker.number.int()
		this.line1 = faker.location.streetAddress()
		this.line2 = faker.location.secondaryAddress()
		this.postcode = faker.location.zipCode()
	}
}

export default Address