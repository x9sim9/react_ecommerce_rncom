'use client'

import type { NextPage } from 'next'

import { useTranslation } from '@/helpers/translation'
import type { Empty } from '@/helpers/typescript'

import CodeExample from '@/components/developer/code/code_example'

import { Grid, Heading } from '@/components/ui'
import { CheckboxGroup, Form, RadioGroup, Submit, validation } from '@/components/ui/form'

export type CheckboxGroupPageProps = Empty

/**
 * checkbox group form field examples
 * @returns page content
 */
const CheckboxGroupPage: NextPage<CheckboxGroupPageProps> = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const t = useTranslation({ app: '/--/ui/form/checkbox_group' })

	return (
		<>
			<Heading size="small">Checkbox Group Field</Heading>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<CheckboxGroup
							helpTextAbove="This is a help text above"
							name="myCheckboxField"
							options={{ 'Option One': 'one', 'Option Two': 'two' }}
						/>
					</Grid>
				</Form>
			</CodeExample>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<CheckboxGroup
							gridProps={{ size: 'flex' }}
							helpTextBelow="This is a help text below"
							name="myCheckboxField"
							options={{ 'Option One': 'one', 'Option Two': 'two' }}
						/>
					</Grid>
				</Form>
			</CodeExample>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<CheckboxGroup
							gridProps={{ size: 4 }}
							helpTextAbove="This is a help text above"
							helpTextBelow="This is a help text below"
							name="myCheckboxField"
							options={{
								'Option Eight': 'eight',
								'Option Five': 'five',
								'Option Four': 'four',
								'Option One': 'one',
								'Option Seven': 'seven',
								'Option Six': 'six',
								'Option Three': 'three',
								'Option Two': 'two',
							}}
						>
								Grid Size
						</CheckboxGroup>
					</Grid>
				</Form>
			</CodeExample>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<RadioGroup name="shown" options={{ hide: false, show: true }}>
								Depends
						</RadioGroup>
						<CheckboxGroup
							depends={{ name: 'shown', value: 'true' }}
							name="myCheckboxField"
							options={{ 'Option One': 'one', 'Option Two': 'two' }}
						>
								Depends Checkbox Field
						</CheckboxGroup>
					</Grid>
				</Form>
			</CodeExample>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<CheckboxGroup
							name="myCheckboxField"
							optionStyle="button"
							options={{
								'Option Four': 'four',
								'Option One': 'one',
								'Option Three': 'three',
								'Option Two': 'two',
							}}
						>
								Option Style
						</CheckboxGroup>
					</Grid>
				</Form>
			</CodeExample>

			<Heading className="pt-10" size="xs">Depends: Show / Hide</Heading>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<RadioGroup name="shown" options={{ hide: false, show: true }}>
								Date Field
						</RadioGroup>
						<CheckboxGroup
							depends={{ name: 'shown', value: 'true' }}
							name="myCheckboxField"
							optionStyle="button"
							options={{
								'Option Four': 'four',
								'Option One': 'one',
								'Option Three': 'three',
								'Option Two': 'two',
							}}
						>
								Option Style
						</CheckboxGroup>
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
              myCheckboxField: { label: 'My Radio Field', type: 'radio', required: true },
            })}`,
					}}
				>
					<Form
						initialValues={{
							myCheckboxField: '',
						}}
						onSubmit={(values: object) => console.info(values)}
						validationSchema={validation.schema({
							myCheckboxField: { label: 'My Checkbox Field', required: true, type: 'checkbox' },
						})}
					>
						<Grid size="normal">
							<CheckboxGroup name="myCheckboxField" options={{ 'Option One': 1, 'Option Two': 2 }}/>

							<Submit>Submit</Submit>
						</Grid>
					</Form>
				</CodeExample>
			</Grid>

			<Grid gap="small" size="normal">
				<Heading size="xs">Minimum Checked</Heading>
				<CodeExample
					replace={{
						onSubmit: '...',
						validationSchema: `{validation.schema({
              myCheckboxField: { label: 'My Radio Field', type: 'radio', required: true, min: 2 },
            })}`,
					}}
				>
					<Form
						initialValues={{
							myCheckboxField: '',
						}}
						onSubmit={(values: object) => console.info(values)}
						validationSchema={validation.schema({
							myCheckboxField: { label: 'My Checkbox Field', min: 2, required: true, type: 'checkbox' },
						})}
					>
						<Grid size="normal">
							<CheckboxGroup name="myCheckboxField" options={{ 'Option One': 1, 'Option Two': 2 }}/>

							<Submit>Submit</Submit>
						</Grid>
					</Form>
				</CodeExample>
			</Grid>

			<Grid gap="small" size="normal">
				<Heading size="xs">Maximum Checked</Heading>
				<CodeExample
					replace={{
						onSubmit: '...',
						validationSchema: `{validation.schema({
              myCheckboxField: { label: 'My Radio Field', type: 'radio', required: true, max: 1 },
            })}`,
					}}
				>
					<Form
						initialValues={{
							myCheckboxField: '',
						}}
						onSubmit={(values: object) => console.info(values)}
						validationSchema={validation.schema({
							myCheckboxField: { label: 'My Checkbox Field', max: 1, required: true, type: 'checkbox' },
						})}
					>
						<Grid size="normal">
							<CheckboxGroup name="myCheckboxField" options={{ 'Option One': 1, 'Option Two': 2 }}/>

							<Submit>Submit</Submit>
						</Grid>
					</Form>
				</CodeExample>
			</Grid>

			<Grid gap="small" size="normal">
				<Heading size="xs">All Checked</Heading>
				<CodeExample
					replace={{
						onSubmit: '...',
						validationSchema: `{validation.schema({
              myCheckboxField: { label: 'My Radio Field', type: 'radio', required: true, all: true },
            })}`,
					}}
				>
					<Form
						initialValues={{
							myCheckboxField: '',
						}}
						onSubmit={(values: object) => console.info(values)}
						validationSchema={validation.schema({
							myCheckboxField: { all: true, label: 'My Checkbox Field', min: 2, required: true, type: 'checkbox' },
						})}
					>
						<Grid size="normal">
							<CheckboxGroup name="myCheckboxField" options={{ 'Option One': 1, 'Option Two': 2 }}/>

							<Submit>Submit</Submit>
						</Grid>
					</Form>
				</CodeExample>
			</Grid>

		</>
	)
}

export default CheckboxGroupPage