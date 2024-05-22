export type Operator = '-' | '*' | '/' | '+' | 'toFixed'

/**
 * perform a calculation on two numbers
 * @param a the first number
 * => (operator) the calculation to perform
 * => (b) the second number
 * @returns the result
 */
export const calculate = (a: number) => (operator: Operator) => (b: number) => {
	switch (operator) {
		case '+':
			return a + b
		case '-':
			return a - b
		case '/':
			return a / b
		case '*':
			return a * b
		case 'toFixed':
			return a.toFixed(b)
		default:
			return 'Invalid operation'
	}
}

/**
 * remove any text that is not a float number
 * @param target the number to sanitize
 * @returns the sanitized number
 */
export const sanitizeFloat = (target: number | string) => +target.toString().replace(/[^\-0-9.]/g, '')

/**
 * remove any text that is not a fixed number
 * @param target the number to sanitize
 * @param precision the number of decimal places
 * @returns the sanitized number
 */
export const sanitizeFixed = (target: number | string, precision?: number) => sanitizeFloat(target).toFixed(precision || 2)

/**
 * remove any text that is not a integer number
 * @param target the number to sanitize
 * @returns the sanitized number
 */
export const sanitizeInt = (target: number | string) => +target.toString().replace(/[^\-0-9]/g, '')

/**
 * remove any text that is not a number
 * @param target the number to sanitize
 * @returns the sanitized number
 */
export const toNumber = (target: number | string) => sanitizeFloat(target)


