import type { CodegenConfig } from '@graphql-codegen/cli'
import 'dotenv/config'

if (!process.env.NEXT_PUBLIC_BACKEND_HOST) {
	throw new Error('Environment variable NEXT_PUBLIC_BACKEND_HOST is not defined, please define it in a .env file')
}

const config: CodegenConfig = {
	overwrite: true,
	schema: `http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/graphql`,
	documents: ['src/**/*.tsx', 'src/**/*.ts'],
	generates: {
		'src/graphql/schema/': {
			preset: 'client',
			plugins: [],
		},
		'./graphql.schema.json': {
			plugins: ['introspection'],
		},
	},
}

export default config
