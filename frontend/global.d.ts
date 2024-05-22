import en from './src/translations'

type Messages = typeof en;

declare global {
	// Use type safe message keys with `next-intl`
	interface IntlMessages extends Messages {
	}
}