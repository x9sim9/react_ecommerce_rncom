# Sorbet Type Definitions

https://sorbet.org/

This project uses static type checking using sorbet, to keep code consistent with the frontend we use inline type definitions with the definition being inline with the code rather than in separate type definition files.

### Commands

| Command                  | Description                                                                                     |
|--------------------------|-------------------------------------------------------------------------------------------------|
| `npm run sorbet_watcher` | Runs sorbet type checker in watch mode, will automatically refresh as you make changes to files |

## Tapioca

The content in this folder is mostly generated from [Tapioca for Sorbet](https://github.com/Shopify/tapioca)

### Tapioca commands

| Command                    | Description                                                                                                                                                                                                                            |
|----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `npm run sorbet_constants` | This is a feature of Sorbet Tapioca `tapioca todo` if you get missing constants errors this can help                                                                                                                                   |
| `npm run gems`             | This is a feature of Sorbet Tapioca `tapioca gems` when installing new gems this will generate all the required types                                                                                                                  |
| `npm run dsl`              | This is a feature of Sorbet Tapioca `tapioca dsl` when creating new models or other features of rails that create automatic helper functions you may get type errors this will scan your project and create definitions where required |