import { DateTime } from 'luxon'

// https://moment.github.io/luxon/demo/global.html
// Note use [DateStamp].toJSDate() to get Javascript Date

export type DateStampType = DateTime
// eslint-disable-next-line no-redeclare
export const DateStamp = DateTime

/**
 * get the current DateStamp
 * @returns the DateStamp
 */
export const now = (): DateStampType => DateTime.now()

/**
 * convert Date to DateStamp
 * @param date the Date
 * @returns the DateStamp
 */
export const importDate = (date: Date) => DateTime.fromJSDate(date)

/**
 * converts DateStamp to Date
 * @param date the DateStamp
 * @returns the Date
 */
export const exportDate = (date: DateStampType) => date.toJSDate()

/**
 * convert DateStamp to regional date with weekday
 * @param date the DateStamp (default to now())
 * @returns the regional date with weekday
 */
export const toRegionalDate = (date: DateStampType = now()) => date.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)

/**
 * convert DateStamp to regional date
 * @param date the DateStamp (default to now())
 * @returns the regional date
 */
export const toRegionalDateOnly = (date: DateStampType = now()) => date.toLocaleString(DateTime.DATE_FULL)

/**
 * converts DateStamp to uk date
 * @param date the DateStamp (default to now())
 * @returns the uk date
 */
export const toStringDate = (date: DateStampType = now()) => date.toFormat('dd/MM/yyyy')

/**
 * converts the uk date to DateStamp
 * @param date the uk date
 * @returns the DateStamp
 */
export const fromStringDate = (date: string) => DateTime.fromFormat(date, 'dd/MM/yyyy', { zone: 'Europe/London' })

/**
 * converts iso string date to DateStamp
 * @param date the iso string date
 * @returns the DateStamp
 */
export const fromIsoString = (date: string): DateStampType => DateTime.fromISO(date)

/**
 * converts the DateStamp to iso string date
 * @param date the DateStamp (default to now())
 * @returns the iso string date
 */
export const toIsoString = (date: DateStampType = now()): string => date.toISO() || ''
