import { keys } from 'lodash'

import { locale as enGB } from '../src/translations'
import de from './de.json'
import enAU from './en-CA.json'
import enCA from './en-CA.json'
import enUS from './en-US.json'
import esES from './es-ES.json'
import frFR from './fr-FR.json'
import itIT from './it-IT.json'
import jaJP from './ja-JP.json'
import nl from './nl.json'
import pt from './pt.json'
import zh from './zh.json'

export const languages = {
	de,
	'en-AU': enAU,
	'en-CA': enCA,
	'en-GB': enGB,
	'en-US': enUS,
	'es-ES': esES,
	'fr-FR': frFR,
	'it-IT': itIT,
	'ja-JP': jaJP,
	nl,
	pt,
	zh,
}

export const locales = keys(languages)

export type Locales = keyof typeof languages

export default languages