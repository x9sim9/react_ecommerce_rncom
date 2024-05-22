'use client'

import type { NextPage } from 'next'

import { useTranslation } from '@/helpers/translation'
import type { Empty } from '@/helpers/typescript'

import CodeExample from '@/components/developer/code/code_example'

import { Grid, Heading, Link } from '@/components/ui'
import { Boolean, Button, Checkbox, Date, File, Form, PhoneNumber, RadioGroup, Select, Submit, Text, Textarea } from '@/components/ui/form'

export type FormPageProps = Empty

/**
 * form examples
 * @returns page content
 */
const FormPage: NextPage<FormPageProps> = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const t = useTranslation({ app: '/--/ui/form' })

	return (
		<>
			<Heading size="small">Form Fields</Heading>


			<Grid>
				<Heading size="xs">Boolean</Heading>

				<CodeExample>
					<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
						<Grid size="normal">
							<Boolean helpTextAbove="This is a help text above" label="Click Me" name="my_boolean_field"/>
						</Grid>
					</Form>
				</CodeExample>

				<Link href="/--/ui/form/boolean">See more examples of Boolean</Link>
			</Grid>

			<Grid>
				<Heading size="xs">Button</Heading>

				<CodeExample>
					<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
						<Button>Button</Button>
					</Form>
				</CodeExample>

				<Link href="/--/ui/form/button">See more examples of Button</Link>
			</Grid>

			<Grid>
				<Heading size="xs">Checkbox</Heading>

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

				<Link href="/--/ui/form/checkbox">See more examples of Checkbox</Link>
			</Grid>

			<Grid>
				<Heading size="xs">CheckboxGroup</Heading>

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

				<Link href="/--/ui/form/checkbox_group">See more examples of CheckboxGroup</Link>
			</Grid>

			<Grid>
				<Heading size="xs">Date</Heading>

				<CodeExample>
					<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
						<Grid size="normal">
							<Date name="myDateField">My Date Field</Date>
						</Grid>
					</Form>
				</CodeExample>

				<Link href="/--/ui/form/date">See more examples of Date</Link>
			</Grid>

			<Grid>
				<Heading size="xs">File</Heading>

				<CodeExample>
					<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
						<Grid size="normal">
							<File helpTextAbove="This is a help text above" name="my_file_field"/>
						</Grid>
					</Form>
				</CodeExample>

				<Link href="/--/ui/form/file">See more examples of File</Link>
			</Grid>

			<Grid>
				<Heading size="xs">PhoneNumber</Heading>

				<CodeExample>
					<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
						<Grid size="normal">
							<PhoneNumber name="my_phone_field"/>
						</Grid>
					</Form>
				</CodeExample>

				<Link href="/--/ui/form/phone_number">See more examples of PhoneNumber</Link>
			</Grid>

			<Grid>
				<Heading size="xs">RadioGroup</Heading>

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

				<Link href="/--/ui/form/radio_group">See more examples of RadioGroup</Link>
			</Grid>

			<Grid>
				<Heading size="xs">Select</Heading>

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

				<Link href="/--/ui/form/select">See more examples of Select</Link>
			</Grid>

			<Grid>
				<Heading size="xs">Text</Heading>

				<CodeExample>
					<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
						<Grid size="normal">
							<Text name="myTextField" placeholder="enter text"/>

							<Submit>Submit</Submit>
						</Grid>
					</Form>
				</CodeExample>

				<Link href="/--/ui/form/text">See more examples of Text</Link>
			</Grid>

			<Grid>
				<Heading size="xs">Textarea</Heading>

				<CodeExample>
					<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
						<Grid size="normal">
							<Textarea
								helpTextAbove="This is a help text above"
								name="myTextareaField"
								placeholder="enter text"
							/>
						</Grid>
					</Form>
				</CodeExample>

				<Link href="/--/ui/form/textarea">See more examples of Textarea</Link>
			</Grid>

		</>
	)
}

export default FormPage