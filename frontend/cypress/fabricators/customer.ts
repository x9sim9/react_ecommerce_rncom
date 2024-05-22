import { faker } from '@faker-js/faker'

/**
 * creates random data for customer
 */
export class Customer {
	public emailAddress: string
	public firstName: string
	public id: number
	public lastName: string
	public password: string
	public phoneNumber: string

	/**
	 * creates the random test data
	 */
	constructor() {
		this.id = faker.number.int()
		this.firstName = faker.person.firstName()
		this.lastName = faker.person.lastName()
		this.emailAddress = faker.internet.email()
		this.phoneNumber = faker.helpers.fromRegExp(/07[0-9]{9}/)
		this.password = faker.internet.password()
	}
}

export default Customer