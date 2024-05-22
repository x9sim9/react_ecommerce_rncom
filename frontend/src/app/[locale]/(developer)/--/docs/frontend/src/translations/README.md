# Translations

This folder contains the default translation split across multiple files

For more information on translations see [next-intl](https://next-intl-docs.vercel.app/)

Use this free translation service to create translations https://translate.i18next.com/

### Translation files

| File          | Description                                                                                                                                                                                                   |
|---------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| app           | translations for all pages in `/src/app/` the key for each page is the file path <br/><br/>NOTE: for paths containing dots (.) we replace the dots with commas (,) e.g. /[...slug] would be /[,,,slug]        |
| component     | translations for all components in `/src/components/` the each component file is nested within the translation object <br/><br/> e.g. /src/components/common/header would be `{ "common": { "header: { } } }` |
| developer     | translations for developer pages excluded from app so they can be easily deleted                                                                                                                              |
| miscellaneous | translation text used by multiple translations                                                                                                                                                                |

### Useful functions

| Command                     | Description                                                                                                                                                                                                                                                                                                                                                                                              |  
|-----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|  
| `npm run build_translation` | This command will merge all the translations in this folder into a single file  `src/messages/en.json` it is important however to delete this file as it will override the translations defined in this folder. We generate it so we can then create other translations from it in the `messages` folder such as `en-US.json` and `de-DE.json` translation files which live in the `messages` directory. |

### Add a new language (or update existing)

1. create the default language file `npm run build_translation` => `messages/en.json`
2. visit https://next-intl-docs.vercel.app/ and paste contents of `messages/en.json` into the left box
3. below the right box type the country code and translate the file
4. download the language file to the `messages/LANGUAGE_CODE.json` replacing LANGUAGE_CODE with the 2 or 5 digit language code
5. delete the generated translation file `messages/en.json`. it is important to delete this file as it will override `src/translations`