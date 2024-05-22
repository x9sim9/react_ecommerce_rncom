'use client'

import type { NextPage } from 'next'

import { useTranslation } from '@/helpers/translation'
import type { Empty } from '@/helpers/typescript'

import CodeExample from '@/components/developer/code/code_example'

import { Grid, Heading } from '@/components/ui'
import { Checkbox, Form, RadioGroup, Submit, validation } from '@/components/ui/form'

export type CheckboxPageProps = Empty

/**
 * checkbox form field examples
 * @returns page content
 */
const CheckboxPage: NextPage<CheckboxPageProps> = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const t = useTranslation({ app: '/--/ui/form/checkbox' })

	return (
		<>
			<Heading size="small">Checkbox Field</Heading>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<Checkbox
							helpTextAbove="This is a help text above"
							label="Click Me"
							name="mySingleCheckboxField"
						/>
					</Grid>
				</Form>
			</CodeExample>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<RadioGroup name="shown" options={{ hide: false, show: true }}>
								Checkbox Single Field
						</RadioGroup>
						<Checkbox
							depends={{ name: 'shown', value: 'true' }}
							label="Click Me"
							name="mySingleCheckboxField"
						>
								Depends Single Checkbox Field
						</Checkbox>
					</Grid>
				</Form>
			</CodeExample>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<Checkbox label="Click Me" name="mySingleCheckboxField" optionStyle="button">
								Option Style
						</Checkbox>
					</Grid>
				</Form>
			</CodeExample>

			<Heading className="pt-10" size="xs">Depends: Show / Hide</Heading>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<RadioGroup name="shown" options={{ hide: false, show: true }}>
								Text Field
						</RadioGroup>
						<Checkbox depends={{ name: 'shown', value: 'true' }} label="Click Me" name="mySingleCheckboxField" optionStyle="button">
								Option Style
						</Checkbox>
					</Grid>
				</Form>
			</CodeExample>

			<Heading className="pt-10" size="xs">Form Validation</Heading>

			<Grid gap="small" size="normal">
				<Heading size="xs">Required</Heading>
				<CodeExample
					replace={{
						onSubmit: '...',
						validationSchema: `{validation.schema({
              myCheckboxField: { label: 'My Radio Field', type: 'boolean', required: true },
            })}`,
					}}
				>
					<Form
						initialValues={{
							mySingleCheckboxField: '',
						}}
						onSubmit={(values: object) => console.info(values)}
						validationSchema={validation.schema({
							mySingleCheckboxField: { label: 'My Checkbox Field', required: true, type: 'boolean' },
						})}
					>
						<Grid size="normal">
							<Checkbox label="Click Me" name="mySingleCheckboxField"/>

							<Submit>Submit</Submit>
						</Grid>
					</Form>
				</CodeExample>
			</Grid>
		</>
	)
}

export default CheckboxPage