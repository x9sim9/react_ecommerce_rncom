const pascalCase = "^_?[0-9]*[A-Z][a-z0-9]*(([A-Z][a-z0-9]+)*[A-Z]?|([a-z]+[A-Z])*|[A-Z])[0-9]*$"
const snakeCase = "^_?[0-9]*[a-z][a-z0-9]*(([A-Z][a-z0-9]+)*[A-Z]?|([a-z]+[A-Z])*|[A-Z])[0-9]*$"
const numbers = "(^[0-9]+$)"
const uppercase = "^_?[0-9]*[A-Z_]+[0-9]*$"
const symbols = "(^_$)|(^__$)"

module.exports = {
	root: true,
	ignorePatterns: [
		"/.next/**",
		"/.eslintrc.js",
		"/tailwind.config.ts"
	],
	extends: [
		"next/core-web-vitals",
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:react-redux/recommended",
		"plugin:react/jsx-runtime",
		"plugin:react-hooks/recommended",
		"plugin:boundaries/recommended",
		"plugin:cypress/recommended",
		"plugin:tailwindcss/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:i18next/recommended",
		"plugin:lodash/recommended",
		"plugin:sonarjs/recommended-legacy",
		"plugin:eslint-comments/recommended",
		"plugin:regexp/recommended",
		"plugin:jsdoc/recommended-typescript",
		"plugin:css/recommended",
		"plugin:chai-expect/recommended",
		"plugin:chai-friendly/recommended",
		"plugin:mocha/recommended",
	],
	plugins: [
		"react",
		"react-redux",
		"filename-rules",
		"boundaries",
		"cypress",
		"i18next",
		"perfectionist",
		'@stylistic',
		"lodash",
		"mocha",
		"chai-expect",
		"chai-friendly",
		"sonarjs",
		"write-good-comments",
		"regexp",
		"no-loops",
		"perf-standard",
		"no-secrets",
		"unused-imports",
		"no-relative-import-paths",
		"jsdoc",
		"css"
	],
	rules: {
		"arrow-body-style": ["error", "as-needed"],
		"consistent-return": "error",
		"consistent-this": "error",
		"eqeqeq": "error",
		"filename-rules/match": [
			"error",
			"/^_?([a-z0-9]+_)*[a-z0-9]+(?:\\..*)?$/" // snake_case with underscore at start
		],
		"func-name-matching": "error",
		"i18next/no-literal-string": "error",
		"import/no-anonymous-default-export": "error",
		"no-console": "error",
		"no-else-return": "error",
		"no-loops/no-loops": "error",
		"no-relative-import-paths/no-relative-import-paths": [
			"warn",
			{
				allowSameFolder: true,
				rootDir: "src",
				prefix: "@"
			}
		],
		"no-secrets/no-secrets": "error",
		"no-trailing-spaces": "warn",
		"no-use-before-define": "error",
		"no-unreachable": "error",
		"no-undef": "error",
		"no-unused-vars": "warn",
		"perf-standard/no-instanceof-guard": "error",
		"perf-standard/no-self-in-constructor": "error",
		"perf-standard/check-function-inline": "warn",
		"prefer-const": "error",
		"prefer-spread": "error",
		semi: [
			"error",
			"never"
		],
		"sort-imports": "off", // handled by perfectionist
		"sort-vars": "warn",
		"strict": "error",
		"tailwindcss/no-contradicting-classname": "off", // Currently a bug https://github.com/francoismassart/eslint-plugin-tailwindcss/issues/177
		"unused-imports/no-unused-imports": "warn",
		"write-good-comments/write-good-comments": "warn",


		/* -- Typescript -- */
		"@typescript-eslint/naming-convention": [
			"error",
			{
				selector: 'default',
				format: null,
				custom: {
					regex: `${pascalCase}|${snakeCase}|${uppercase}|${numbers}|${symbols}`,
					match: true
				}
			},
			{
				selector: 'import',
				format: ['camelCase', 'PascalCase'],
			},
			{
				selector: ['typeLike', 'typeParameter', 'class'],
				format: ["PascalCase"],
			},
			{
				selector: ['function', 'method'],
				format: ["camelCase"],
			},
			{
				"selector": [
					"classProperty",
					"objectLiteralProperty",
					"typeProperty",
					"classMethod",
					"objectLiteralMethod",
					"typeMethod",
					"accessor",
					"enumMember",
				],
				"format": null,
				"modifiers": ["requiresQuotes"],
			},
		],


		/* -- React -- */
		"react-hooks/exhaustive-deps": "off",
		"react-hooks/rules-of-hooks": "error",
		"react/button-has-type": "error",
		"react/default-props-match-prop-types": "error",
		"react/destructuring-assignment": "error",
		"react/display-name": "error",
		"react/jsx-curly-brace-presence": "error",
		"react/jsx-curly-newline": "error",
		"react/jsx-fragments": "error",
		"react/jsx-key": "error",
		"react/jsx-max-depth": ["error", {max: 12}],
		"react/jsx-no-constructed-context-values": "error",
		"react/jsx-no-leaked-render": "error",
		"react/jsx-no-script-url": "error",
		"react/jsx-no-target-blank": "error",
		"react/jsx-no-useless-fragment": "warn",
		"react/jsx-sort-props": "error",
		"react/jsx-uses-react": "error",
		"react/no-array-index-key": "error",
		"react/no-children-prop": "error",
		"react/no-danger": "error",
		"react/no-danger-with-children": "error",
		"react/no-unknown-property": ["error", {ignore: ['cy-id']}],
		"react/no-unstable-nested-components": "error",
		"react/no-unused-class-component-methods": "warn",
		"react/no-unused-prop-types": "warn",
		"react/prop-types": "warn",
		"react/sort-prop-types": "warn",


		/* -- Stylistic -- */
		"@stylistic/array-bracket-spacing": ["warn", "never"],
		"@stylistic/array-bracket-newline": ["warn", {"multiline": true}],
		"@stylistic/arrow-parens": ["warn", "always"],
		"@stylistic/arrow-spacing": ["warn", {"before": true, "after": true}],
		"@stylistic/block-spacing": ["warn", "always"],
		"@stylistic/brace-style": ["warn", "1tbs"],
		"@stylistic/comma-dangle": ["warn", "always-multiline"],
		"@stylistic/comma-spacing": ["warn", {"before": false, "after": true}],
		"@stylistic/comma-style": ["warn", "last"],
		"@stylistic/computed-property-spacing": ["warn", "never"],
		"@stylistic/dot-location": ["warn", "property"],
		"@stylistic/function-call-argument-newline": ["warn", "consistent"],
		"@stylistic/function-call-spacing": ["warn", "never"],
		"@stylistic/function-paren-newline": ["warn", "consistent"],
		"@stylistic/indent": ["warn", "tab", {
			"ArrayExpression": 1,
			"CallExpression": {"arguments": 2},
			"flatTernaryExpressions": false,
			"FunctionDeclaration": {"body": 1, "parameters": 2},
			"FunctionExpression": {"body": 1, "parameters": 2},
			"ignoreComments": true,
			"ImportDeclaration": 1,
			"MemberExpression": 2,
			"ObjectExpression": 1,
			"offsetTernaryExpressions": true,
			"StaticBlock": {"body": 1},
			"SwitchCase": 1,
			"VariableDeclarator": 2
		}],
		"@stylistic/key-spacing": ["warn", {beforeColon: false, afterColon: true, mode: "strict"}],
		"@stylistic/keyword-spacing": ["warn", {before: true, after: true}],
		"@stylistic/linebreak-style": ["warn", "unix"],
		"@stylistic/lines-around-comment": ["warn", {
			beforeBlockComment: true,
			afterBlockComment: false,
			beforeLineComment: false,
			afterLineComment: false,
			allowBlockStart: true,
			allowBlockEnd: true,
			allowClassStart: true,
			allowClassEnd: true,
			allowObjectStart: true,
			allowObjectEnd: true,
			allowArrayStart: true,
			allowArrayEnd: true,
			ignorePattern: "@ts-"
		}],
		"lines-between-class-members": ["warn", {
			enforce: [
				{blankLine: "always", prev: "method", next: "method"},
				{blankLine: "never", prev: "field", next: "field"}
			]
		}],
		"@stylistic/max-statements-per-line": ["warn", {max: 1}],
		"@stylistic/multiline-ternary": ["warn", "always-multiline"],
		"@stylistic/new-parens": ["warn", "never"],
		"@stylistic/no-mixed-operators": ["warn"],
		"@stylistic/no-mixed-spaces-and-tabs": ["warn"],
		"@stylistic/no-multi-spaces": ["warn"],
		"@stylistic/no-multiple-empty-lines": ["warn", {max: 2}],
		"@stylistic/no-trailing-spaces": ["warn"],
		"@stylistic/no-whitespace-before-property": ["warn"],
		"@stylistic/nonblock-statement-body-position": ["warn", "beside"],
		"@stylistic/object-curly-newline": ["warn", {
			"ObjectExpression": {"multiline": true, "consistent": true},
			"ObjectPattern": {"multiline": true},
		}],
		"@stylistic/object-curly-spacing": ["warn", "always"],
		"@stylistic/operator-linebreak": ["warn", "before",
			{"overrides": {"=": "after"}}
		],
		"@stylistic/padded-blocks": ["warn", "never"],
		"@stylistic/padding-line-between-statements": ["warn",
			{blankLine: "always", prev: "var", next: "return"},
			{blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"]},
			{blankLine: "always", prev: "directive", next: "*"},
		],
		"@stylistic/quote-props": ["warn", "as-needed"],
		"@stylistic/quotes": ["warn", "single"],
		"@stylistic/rest-spread-spacing": ["warn", "never"],
		"@stylistic/semi": ["warn", "never"],
		"@stylistic/space-before-blocks": ["warn", "always"],
		"@stylistic/space-before-function-paren": ["warn",
			{"anonymous": "always", "named": "never"}
		],
		"@stylistic/space-in-parens": ["warn", "never"],
		"@stylistic/space-infix-ops": ["warn", {"int32Hint": true}],
		"@stylistic/space-unary-ops": ["warn", {
			"words": true,
			"nonwords": false,
		}],
		"@stylistic/spaced-comment": ["warn", "always", {
			"line": {
				"markers": ["/"],
				"exceptions": ["-", "+"]
			},
			"block": {
				"markers": ["!"],
				"exceptions": ["*"],
				"balanced": true
			}
		}],
		"@stylistic/switch-colon-spacing": ["warn", {"after": true, "before": false}],
		"@stylistic/template-curly-spacing": ["warn", "never"],
		"@stylistic/wrap-iife": ["warn", "outside"],
		"@stylistic/yield-star-spacing": ["warn", "both"],


		/* -- Perfectionist -- */
		"perfectionist/sort-array-includes": "warn",
		"perfectionist/sort-astro-attributes": "warn",
		"perfectionist/sort-classes": "warn",
		"perfectionist/sort-enums": "warn",
		"perfectionist/sort-exports": "warn",
		"perfectionist/sort-imports": [
			"warn",
			{
				groups: [
					"external",
					"internal",
					"components",
					"ui",
					"css",
					"cypress",
				],
				"custom-groups": {
					"value": {
						"ui": ["@/components/ui/**", "@/components/ui"],
						"components": ["@/components/**", "@/components"],
						"css": ["**/*.css", "**/*.scss", "@/styles/*.css"],
						"cypress": ["@fixtures/**", "@fabricators/**", "@pages/**", "@support/**"],
					},
				},
				"internal-pattern": [
					"@/**",
					"@/translations",
					"@/translations/**",
					"@/navigation",
					"@/i18n",
					"@/middleware",
				]
			}
		],
		"perfectionist/sort-interfaces": "warn",
		"perfectionist/sort-named-exports": "warn",
		"perfectionist/sort-named-imports": "warn",
		"perfectionist/sort-object-types": "warn",
		"perfectionist/sort-objects": ["warn", {
			"groups": [
				'breakpoints_default', 'breakpoints_3xs', 'breakpoints_2xs', 'breakpoints_xs', 'breakpoints_sm',
				'breakpoints_md', 'breakpoints_lg', 'breakpoints_xl', 'breakpoints_2xl', 'breakpoints_3xl',
				'breakpoints_4xl', 'unknown'
			],
			'custom-groups': {
				"breakpoints_default": ["default"],
				"breakpoints_3xs": ["3xs"],
				"breakpoints_2xs": ["2xs"],
				"breakpoints_xs": ["xs"],
				"breakpoints_sm": ["sm", "small"],
				"breakpoints_md": ["md", "medium"],
				"breakpoints_lg": ["lg", "large"],
				"breakpoints_xl": ["xl"],
				"breakpoints_2xl": ["2xl"],
				"breakpoints_3xl": ["3xl"],
				"breakpoints_4xl": ["4xl"],
			}
		}],
		// "perfectionist/sort-intersection-types": "warn", # seems to be buggy at the moment
		"perfectionist/sort-union-types": "warn",

		/* -- Lodash -- */
		"lodash/import-scope": ["error", "member"],
		"lodash/prefer-immutable-method": "off",
		"lodash/prefer-lodash-method": "off",
		"lodash/prefer-lodash-typecheck": "off",
		"lodash/path-style": ["error", "as-needed"],
		"lodash/prefer-constant": "off",

		/* -- Cypress -- */
		"chai-friendly/no-unused-expressions": "off", // disabled here, enabled for cypress in overrides
		"cypress/assertion-before-screenshot": "error",
		"cypress/no-pause": "error",
		"mocha/no-mocha-arrows": "off",
		"mocha/no-exclusive-tests": "error",
		"mocha/no-skipped-tests": "error",
		"mocha/no-setup-in-describe": "off", // does not allow functions containing tests

		/* -- Sonar -- */
		"sonarjs/no-nested-template-literals": "off", // Perfectionist handles this better
		"sonarjs/no-inverted-boolean-check": "off", // raising false positives

		/* -- Regex -- */
		"regexp/prefer-d": "off",

		/* -- JSDOC -- */
		"jsdoc/require-jsdoc": [
			"error",
			{
				publicOnly: {
					cjs: true,
					esm: true,
					window: true,
				},
				require: {
					ArrowFunctionExpression: true,
					ClassDeclaration: true,
					ClassExpression: true,
					FunctionDeclaration: true,
					FunctionExpression: true,
					MethodDefinition: true,
				},
			},
		],
	},
	overrides: [
		/* ----- Enable ----- */
		/* ================== */

		/* -- Graphql -- */
		{
			files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
		},
		{
			files: ["*.graphql"],
			parser: "@graphql-eslint/eslint-plugin",
			plugins: ["@graphql-eslint"],
			rules: {
				"@graphql-eslint/known-type-names": "error"
			}
		},


		/* ----- Disable ----- */
		/* =================== */
		{
			files: [
				"*.md", '*.mdx',
			],
			rules: {
				"max-len": "off",
			}
		},
		{
			files: [
				"src/app/**/not-found.tsx",
				"src/**/mdx-components.tsx",
			],
			rules: {
				"filename-rules/match": "off",
			}
		},
		{
			files: [
				"src/graphql/schema/**", // folder is auto generated by npm run codegen
			],
			rules: {
				"eslint-comments/no-unlimited-disable": "off",
				"@stylistic/quotes": "off",
				"semi": "off",
				"@stylistic/semi": "off",
				"eslint-comments/disable-enable-pair": "off",
			}
		},
		{
			files: [
				"cypress/support/**",
				"src/components/**",
				"src/connections/**",
				"src/helpers/**",
				"src/lib/**",
			],
			rules: {
				"no-unused-vars": "off",
				"@typescript-eslint/no-unused-vars": "off"
			}
		},
		{
			files: ['*.ts', '*.tsx', '*.js'],
			parser: '@typescript-eslint/parser',
		},
		{
			files: [
				"src/app/\\[locale\\]/(developer)/**"
			],
			rules: {
				"no-console": "off"
			}
		},
		{ // Todo: Remove once form examples have been translated
			files: [
				"src/app/\\[locale\\]/(developer)/\\-\\-/ui/form/**"
			],
			rules: {
				"i18next/no-literal-string": "off",
				"sonarjs/no-duplicate-string": "off",
				"write-good-comments/write-good-comments": "off",
				"no-unused-vars": "off"
			}
		},
		{
			files: ['src/translations/**'],
			rules: {
				"sonarjs/no-duplicate-string": "off",
			}
		},

		/* -- Cypress -- */
		{
			files: ['cypress/**', 'cypress/**'],
			rules: {
				"cypress/no-unused-expressions": "off",
				"chai-friendly/no-unused-expressions": "warn",
				"sonarjs/no-duplicate-string": "off",
			},
		},
		{
			files: ['cypress/support/**', 'cypress/plugins/**'],
			rules: {
				'@typescript-eslint/no-namespace': "off",
				'import/no-anonymous-default-export': "off",
			},
		},
		{
			files: ['cypress.config.ts'],
			rules: {
				"@typescript-eslint/naming-convention": "off",
				"no-unused-vars": "off",
				"@typescript-eslint/no-unused-vars": "off",
			}
		},
		{
			files: ['cypress/pages/**'],
			rules: {
				"import/no-anonymous-default-export": "off",
			}
		},
		{
			files: ['cypress/e2e/**/shared_tests/**', 'cypress/e2e/**/helpers/**'],
			rules: {
				"mocha/no-exports": "off",
			}
		},
	],
	settings: {
		"boundaries/dependency-nodes": ["import", "dynamic-import"],
		"boundaries/elements": [
			{
				"type": "helpers",
				"pattern": "helpers/*"
			},
			{
				"type": "components",
				"pattern": "components/*"
			},
			{
				"type": "modules",
				"pattern": "modules/*"
			}
		],
	}
}