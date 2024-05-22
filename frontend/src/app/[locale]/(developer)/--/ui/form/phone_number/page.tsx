'use client'

import type { NextPage } from 'next'

import { useTranslation } from '@/helpers/translation'
import type { Empty } from '@/helpers/typescript'

import CodeExample from '@/components/developer/code/code_example'

import { Grid, Heading } from '@/components/ui'
import { Form, PhoneNumber, RadioGroup, Submit, validation } from '@/components/ui/form'

export type PhoneNumberPageProps = Empty

/**
 * phone number form field examples
 * @returns page content
 */
const PhoneNumberPage: NextPage<PhoneNumberPageProps> = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const t = useTranslation({ app: '/--/ui/form/phone_number' })

	return (
		<>
			<Heading size="small">PhoneNumber Field</Heading>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<PhoneNumber name="my_phone_field"/>
					</Grid>
				</Form>
			</CodeExample>


			<Heading className="pt-10" size="xs">Depends: Show / Hide</Heading>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<RadioGroup name="shown" options={{ hide: false, show: true }}>
								Phone Number Field
						</RadioGroup>
						<PhoneNumber depends={{ name: 'shown', value: 'true' }} name="my_phone_field">
								Depends Phone Number
						</PhoneNumber>
					</Grid>
				</Form>
			</CodeExample>

			<Heading className="pt-10" size="xs">Form Validation</Heading>

			<Grid gap="small" size="normal">
				<Heading size="xs">Validate if not empty</Heading>
				<CodeExample
					replace={{
						onSubmit: '...',
						validationSchema: `{validation.schema({
              myPhoneNumber: { label: 'My Phone Field', type: 'phoneNumber' },
            })}`,
					}}
				>
					<Form
						initialValues={{
							myPhoneNumber: '',
						}}
						onSubmit={(values: object) => console.info(values)}
						validationSchema={validation.schema({
							myPhoneNumber: { label: 'My Phone Field', type: 'phoneNumber' },
						})}
					>
						<Grid size="normal">
							<PhoneNumber name="myPhoneNumber"/>

							<Submit>Submit</Submit>
						</Grid>
					</Form>
				</CodeExample>
			</Grid>

			<Grid gap="small" size="normal">
				<Heading size="xs">Required</Heading>
				<CodeExample
					replace={{
						onSubmit: '...',
						validationSchema: `{validation.schema({
              myPhoneNumber: { label: 'My Phone Field', type: 'phoneNumber', required: true },
            })}`,
					}}
				>
					<Form
						initialValues={{
							myPhoneNumber: '',
						}}
						onSubmit={(values: object) => console.info(values)}
						validationSchema={validation.schema({
							myPhoneNumber: { label: 'My Phone Field', required: true, type: 'phoneNumber' },
						})}
					>
						<Grid size="normal">
							<PhoneNumber name="myPhoneNumber"/>

							<Submit>Submit</Submit>
						</Grid>
					</Form>
				</CodeExample>
			</Grid>


		</>
	)
}

export default PhoneNumberPage