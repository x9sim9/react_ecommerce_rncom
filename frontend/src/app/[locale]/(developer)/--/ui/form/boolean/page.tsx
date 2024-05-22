'use client'

import type { NextPage } from 'next'

import { useTranslation } from '@/helpers/translation'
import type { Empty } from '@/helpers/typescript'

import CodeExample from '@/components/developer/code/code_example'

import { Grid, Heading } from '@/components/ui'
import { Boolean, Form } from '@/components/ui/form'

export type BooleanPageProps = Empty

/**
 * boolean form field examples
 * @returns page content
 */
const BooleanPage: NextPage<BooleanPageProps> = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const t = useTranslation({ app: '/--/ui/form/boolean' })

	return (
		<>
			<Heading size="small">Boolean Field</Heading>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<Boolean helpTextAbove="This is a help text above" label="Click Me" name="my_boolean_field"/>
					</Grid>
				</Form>
			</CodeExample>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<Boolean label="Click Me" name="my_boolean_field" optionStyle="button">
								Option Style
						</Boolean>
					</Grid>
				</Form>
			</CodeExample>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<Boolean field="radio" helpTextBelow="This is a help text above" name="my_boolean_field">
								Click Me
						</Boolean>
					</Grid>
				</Form>
			</CodeExample>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<Boolean
							field="radio"
							helpTextBelow="This is a help text above"
							name="my_boolean_field"
							optionStyle="button"
						>
								Radio Option Style
						</Boolean>
					</Grid>
				</Form>
			</CodeExample>

			<Heading className="pt-10" size="xs">Depends: Show / Hide</Heading>


			<Heading className="pt-10" size="xs">Form Validation</Heading>
		</>
	)
}

export default BooleanPage