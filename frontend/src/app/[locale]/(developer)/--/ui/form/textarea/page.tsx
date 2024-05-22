'use client'

import type { NextPage } from 'next'

import { useTranslation } from '@/helpers/translation'
import type { Empty } from '@/helpers/typescript'

import CodeExample from '@/components/developer/code/code_example'

import { Grid, Heading } from '@/components/ui'
import { Form, RadioGroup, Submit, Textarea, validation } from '@/components/ui/form'

export type TextAreaPageProps = Empty

/**
 * textarea form field examples
 * @returns page content
 */
const TextAreaPage: NextPage<TextAreaPageProps> = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const t = useTranslation({ app: '/--/ui/form/textarea' })

	return (
		<>
			<Heading size="small">Textarea Field</Heading>

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

			<Heading className="pt-10" size="xs">Depends: Show / Hide</Heading>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<RadioGroup name="shown" options={{ hide: false, show: true }}>
								Text Field
						</RadioGroup>
						<Textarea depends={{ name: 'shown', value: 'true' }} name="myTextField" placeholder="enter text">
								Depends Date Field
						</Textarea>
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
              myTextareaField: { label: 'My Textarea Field', type: 'string', required: true },
            })}`,
					}}
				>
					<Form
						initialValues={{
							myTextareaField: '',
						}}
						onSubmit={(values: object) => console.info(values)}
						validationSchema={validation.schema({
							myTextareaField: { label: 'My Textarea Field', required: true, type: 'string' },
						})}
					>
						<Grid size="normal">
							<Textarea name="myTextareaField" placeholder="enter text"/>

							<Submit>Submit</Submit>
						</Grid>
					</Form>
				</CodeExample>
			</Grid>

		</>
	)
}

export default TextAreaPage