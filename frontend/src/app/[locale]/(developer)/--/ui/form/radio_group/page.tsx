'use client'

import type { NextPage } from 'next'

import { useTranslation } from '@/helpers/translation'
import type { Empty } from '@/helpers/typescript'

import CodeExample from '@/components/developer/code/code_example'

import { Grid, Heading } from '@/components/ui'
import { Form, RadioGroup, Submit, validation } from '@/components/ui/form'

export type RadioGroupPageProps = Empty

/**
 * radio group form field examples
 * @returns page content
 */
const RadioGroupPage: NextPage<RadioGroupPageProps> = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const t = useTranslation({ app: '/--/ui/form/radio_group' })

	return (
		<>
			<Heading size="small">Radio Group Field</Heading>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<RadioGroup
							helpTextAbove="This is a help text above"
							name="my_radiofield"
							options={{ 'Option One': 'one', 'Option Two': 'two' }}
						/>
					</Grid>
				</Form>
			</CodeExample>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<RadioGroup
							gridProps={{ size: 'flex' }}
							helpTextBelow="This is a help text below"
							name="my_radiofield"
							options={{ 'Option One': 'one', 'Option Two': 'two' }}
						/>
					</Grid>
				</Form>
			</CodeExample>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<RadioGroup
							gridProps={{ size: 4 }}
							helpTextAbove="This is a help text above"
							helpTextBelow="This is a help text below"
							name="my_radiofield"
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
						</RadioGroup>
					</Grid>
				</Form>
			</CodeExample>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<RadioGroup name="shown" options={{ hide: false, show: true }}>
								Radio Group Field
						</RadioGroup>
						<RadioGroup
							depends={{ name: 'shown', value: 'true' }}
							name="my_radiofield"
							options={{ 'Option One': 'one', 'Option Two': 'two' }}
						>
								Depends Radio Field
						</RadioGroup>
					</Grid>
				</Form>
			</CodeExample>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<RadioGroup
							name="my_radiofield"
							optionStyle="button"
							options={{
								'Option One': 'one',
								'Option Three': 'three',
								'Option Two': 'two',
							}}
						>
								Radio Group Buttons
						</RadioGroup>
					</Grid>
				</Form>
			</CodeExample>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<RadioGroup
							name="my_radiofield"
							optionStyle="buttonGroup"
							options={{
								'Option One': 'one',
								'Option Three': 'three',
								'Option Two': 'two',
							}}
						>
								Radio Group Range
						</RadioGroup>
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
						<RadioGroup
							depends={{ name: 'shown', value: 'true' }}
							name="my_radiofield"
							optionStyle="buttonGroup"
							options={{
								'Option One': 'one',
								'Option Three': 'three',
								'Option Two': 'two',
							}}
						>
								Radio Group Range
						</RadioGroup>
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
              myRadioField: { label: 'My Radio Field', type: 'radio', required: true },
            })}`,
					}}
				>
					<Form
						initialValues={{
							myRadioField: '',
						}}
						onSubmit={(values: object) => console.info(values)}
						validationSchema={validation.schema({
							myRadioField: { label: 'My Radio Field', required: true, type: 'radio' },
						})}
					>
						<Grid size="normal">
							<RadioGroup name="myRadioField" options={{ 'Option One': 1, 'Option Two': 2 }}/>

							<Submit>Submit</Submit>
						</Grid>
					</Form>
				</CodeExample>
			</Grid>
		</>
	)
}

export default RadioGroupPage