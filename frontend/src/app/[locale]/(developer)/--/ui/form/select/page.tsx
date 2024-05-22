'use client'

import type { NextPage } from 'next'

import { useTranslation } from '@/helpers/translation'
import type { Empty } from '@/helpers/typescript'

import CodeExample from '@/components/developer/code/code_example'

import { Grid, Heading } from '@/components/ui'
import { Form, RadioGroup, Select, Submit, validation } from '@/components/ui/form'

export type SelectPageProps = Empty

/**
 * select form field examples
 * @returns page content
 */
const SelectPage: NextPage<SelectPageProps> = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const t = useTranslation({ app: '/--/ui/form/select' })

	return (
		<>
			<Heading size="small">Select Field</Heading>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<Select
							helpTextAbove="This is a help text above"
							name="mySelectField"
							options={{ 'Option One': 'one', 'Option Two': 'two' }}
						/>
					</Grid>
				</Form>
			</CodeExample>

			<CodeExample>
				<Form
					initialValues={{ mySelectField: ['one', 'four'] }}
					onSubmit={(values: object) => console.info(values)}
				>
					<Grid size="normal">
						<Select
							helpTextAbove="Multi Select"
							multiselect
							name="mySelectField"
							options={{ 'Option Four': 'four', 'Option One': 'one', 'Option Three': 'three', 'Option Two': 'two' }}
						/>
					</Grid>
				</Form>
			</CodeExample>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<Select
							helpTextBelow="This is a help text below"
							name="mySelectField"
							options={{ 'Option One': 'one', 'Option Two': 'two' }}
						/>
					</Grid>
				</Form>
			</CodeExample>


			<Heading className="pt-10" size="xs">Depends: Show / Hide</Heading>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<RadioGroup name="shown" options={{ hide: false, show: true }}>
								Radio Group Field
						</RadioGroup>
						<Select
							depends={{ name: 'shown', value: 'true' }}
							name="mySelectField"
							options={{ 'Option One': 'one', 'Option Two': 'two' }}
						>
								Depends Select Field
						</Select>
					</Grid>
				</Form>
			</CodeExample>

			<Heading className="pt-10" size="xs">Form Validation</Heading>

			<Grid gap="small" size="normal">
				<Heading size="2xs">Required</Heading>
				<CodeExample
					replace={{
						onSubmit: '...',
						validationSchema: `{validation.schema({
              mySelectField: { label: 'My Select Field', type: 'select', required: true },
            })}`,
					}}
				>
					<Form
						initialValues={{
							myRadioField: '',
						}}
						onSubmit={(values: object) => console.info(values)}
						validationSchema={validation.schema({
							mySelectField: { label: 'My Select Field', required: true, type: 'select' },
						})}
					>
						<Grid size="normal">
							<Select name="mySelectField" options={{ 'Option One': 1, 'Option Two': 2 }}/>

							<Submit>Submit</Submit>
						</Grid>
					</Form>
				</CodeExample>
			</Grid>

			<Grid gap="small" size="normal">
				<Heading size="2xs">Multiselect: Required</Heading>
				<CodeExample
					replace={{
						onSubmit: '...',
						validationSchema: `{validation.schema({
              mySelectField: { label: 'My Select Field', type: 'select', required: true },
            })}`,
					}}
				>
					<Form
						initialValues={{
							myRadioField: '',
						}}
						onSubmit={(values: object) => console.info(values)}
						validationSchema={validation.schema({
							mySelectField: { label: 'My Select Field', required: true, type: 'multiselect' },
						})}
					>
						<Grid size="normal">
							<Select
								multiselect
								name="mySelectField"
								options={{ 'Option Four': 'four', 'Option One': 'one', 'Option Three': 'three', 'Option Two': 'two' }}
							/>

							<Submit>Submit</Submit>
						</Grid>
					</Form>
				</CodeExample>
			</Grid>

		</>
	)
}

export default SelectPage