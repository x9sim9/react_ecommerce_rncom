'use client'

import type { NextPage } from 'next'

import { useTranslation } from '@/helpers/translation'
import type { Empty } from '@/helpers/typescript'

import CodeExample from '@/components/developer/code/code_example'

import { Grid, Heading, Paragraph } from '@/components/ui'
import { Form, RadioGroup, Submit, Text, validation } from '@/components/ui/form'

export type TextPageProps = Empty

/**
 * text form field examples
 * @returns page content
 */
const TextPage: NextPage<TextPageProps> = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const t = useTranslation({ app: '/--/ui/form/text' })

	return (
		<>
			<Heading size="small">Text Field</Heading>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<Text name="myTextField" placeholder="enter text"/>

						<Submit>Submit</Submit>
					</Grid>
				</Form>
			</CodeExample>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<Text
							errorMessage="Manual error message string"
							helpTextAbove="This is a help text above"
							name="myTextField"
							placeholder="enter text"
						/>
					</Grid>
				</Form>
			</CodeExample>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<Text helpTextBelow="This is a help text below" name="myTextField" placeholder="enter text"/>
					</Grid>
				</Form>
			</CodeExample>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<Text
							helpTextAbove="This is a help text above"
							helpTextBelow="This is a help text below"
							name="myTextField"
							placeholder="enter text"
						/>
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
						<Text depends={{ name: 'shown', value: 'true' }} name="myTextField" placeholder="enter text">
								Depends Date Field
						</Text>
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
              myTextField: { label: 'My Text Field', type: 'string', required: true },
            })}`,
					}}
				>
					<Form
						initialValues={{
							myTextField: '',
						}}
						onSubmit={(values: object) => console.info(values)}
						validationSchema={validation.schema({
							myTextField: { label: 'My Text Field', required: true, type: 'string' },
						})}
					>
						<Grid size="normal">
							<Text name="myTextField" placeholder="enter text"/>

							<Submit>Submit</Submit>
						</Grid>
					</Form>
				</CodeExample>
			</Grid>

			<Grid gap="small" size="normal">
				<Heading size="2xs">Min Length</Heading>
				<CodeExample
					replace={{
						onSubmit: '...',
						validationSchema: `{validation.schema({
              myTextField: { label: 'My Text Field', type: 'string', minLength: 5 },
            })}`,
					}}
				>
					<Form
						initialValues={{
							myTextField: '',
						}}
						onSubmit={(values: object) => console.info(values)}
						validationSchema={validation.schema({
							myTextField: { label: 'My Text Field', min: 5, type: 'string' },
						})}
					>
						<Grid size="normal">
							<Text name="myTextField" placeholder="enter text"/>

							<Submit>Submit</Submit>
						</Grid>
					</Form>
				</CodeExample>
			</Grid>

			<Grid gap="small" size="normal">
				<Heading size="2xs">Max Length</Heading>
				<CodeExample
					replace={{
						onSubmit: '...',
						validationSchema: `{validation.schema({
              myTextField: { label: 'My Text Field', type: 'string', minLength: 5 },
            })}`,
					}}
				>
					<Form
						initialValues={{
							myTextField: '',
						}}
						onSubmit={(values: object) => console.info(values)}
						validationSchema={validation.schema({
							myTextField: { label: 'My Text Field', max: 2, type: 'string' },
						})}
					>
						<Grid size="row">
							<Text name="myTextField" placeholder="enter text"/>

							<Submit>Submit</Submit>
						</Grid>
					</Form>
				</CodeExample>
			</Grid>

			<Grid gap="small" size="row">
				<Heading size="2xs">Criteria (regex profiles)</Heading>
				<Paragraph size="small">alphanumericExtra = letters, numbers, spaces and hyphens</Paragraph>
				<CodeExample
					replace={{
						onSubmit: '...',
						validationSchema: `{validation.schema({
              myTextField: { label: 'My Text Field', type: 'string', criteria: 'alphanumericExtra' },
            })}`,
					}}
				>
					<Form
						initialValues={{
							myTextField: '',
						}}
						onSubmit={(values: object) => console.info(values)}
						validationSchema={validation.schema({
							myTextField: { criteria: 'alphanumericExtra', label: 'My Text Field', type: 'string' },
						})}
					>
						<Grid size="row">
							<Text name="myTextField" placeholder="enter text"/>

							<Submit>Submit</Submit>
						</Grid>
					</Form>
				</CodeExample>
			</Grid>

			<Grid gap="small" size="row">
				<Heading size="2xs">Must Match</Heading>
				<CodeExample
					replace={{
						onSubmit: '...',
						validationSchema: `{validation.schema({
              myTextField: { label: 'My Text Field', type: 'string', minLength: 5 },
              myTextField2: { label: 'My Text Field', type: 'string', mustMatch: 'myTextField' },
            })}`,
					}}
				>
					<Form
						initialValues={{
							myTextField: '',
						}}
						onSubmit={(values: object) => console.info(values)}
						validationSchema={validation.schema({
							myTextField1: { label: 'My Text Field 1', required: true, type: 'string' },
							myTextField2: { label: 'My Text Field 2', mustMatch: 'myTextField1', type: 'string' },
						})}
					>
						<Grid size="row">
							<Text name="myTextField1" placeholder="enter text"/>
							<Text name="myTextField2" placeholder="enter matching text"/>

							<Submit>Submit</Submit>
						</Grid>
					</Form>
				</CodeExample>
			</Grid>
		</>
	)
}

export default TextPage