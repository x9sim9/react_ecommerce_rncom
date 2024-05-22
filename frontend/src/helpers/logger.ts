import 'dotenv/config'
import { noop } from 'lodash'

export { isDevelopment, isProduction } from './environment'

export type Log = {
	(message?: unknown, ...optionalParams: unknown[]): void;
}

export type LoggerType = {
	debug: Log;
	error: Log;
	log: Log;
	warn: Log;
}

export type LogLevel = 'debug' | 'error' | 'log' | 'none' | 'warn'

const NOOP: Log = noop

/**
 * Handles project wide logging to both console and browser
 *
 * Set the LogLevel to show or hide logs
 */
export class Logger implements LoggerType {
	readonly debug: Log
	readonly error: Log
	readonly log: Log
	readonly warn: Log

	// eslint-disable-next-line perf-standard/check-function-inline
	/**
	 * new Logger
	 * @param options Logger props
	 * @param options.level the current log level
	 */
	constructor(options?: { level?: LogLevel }) {
		const { level } = options || {}

		if (level === 'none') {
			this.error = NOOP
			this.warn = NOOP
			this.log = NOOP
			this.debug = NOOP

			return
		}

		// eslint-disable-next-line no-console
		this.error = (...props) => console.error(...props)

		if (level === 'error') {
			this.warn = NOOP
			this.log = NOOP
			this.debug = NOOP

			return
		}

		// eslint-disable-next-line no-console
		this.warn = (...props) => console.warn(...props)

		if (level === 'warn') {
			this.log = NOOP
			this.debug = NOOP

			return
		}

		// eslint-disable-next-line no-console
		this.log = (...props) => console.log(...props)

		if (level === 'log') {
			this.debug = NOOP

			return
		}

		// eslint-disable-next-line no-console
		this.debug = (...props) => console.debug(...props)
	}
}

export const logger = new Logger({ level: (process.env.NEXT_PUBLIC_LOG_LEVEL || 'error') as LogLevel })