import parsePhoneNumber from 'libphonenumber-js'
import { toLower } from 'lodash'

/**
 * Convert phone number to regional format
 * @param phoneNumber the phone number
 * @returns the formatted phone number
 */
export const toRegionalPhoneNumber = (phoneNumber: string | undefined) => {
	if (phoneNumber) {
		const parsed = parsePhoneNumber(phoneNumber)

		if (parsed) {
			const type = ` (${toLower(parsed.getType())})`

			if (parsed.country === 'GB') {
				return parsed.formatNational() + type
			}

			return parsed.formatNational() + type
		}
	}
	return phoneNumber
}
