'use client'

import type { NextPage } from 'next'

import { now, toStringDate } from '@/helpers/date'
import { useTranslation } from '@/helpers/translation'
import type { Empty } from '@/helpers/typescript'

import CodeExample from '@/components/developer/code/code_example'

import { Grid, Heading, List, Paragraph } from '@/components/ui'
import { Date, Form, RadioGroup, Submit, validation } from '@/components/ui/form'

export type DatePageProps = Empty

/**
 * date form field examples
 * @returns page content
 */
const DatePage: NextPage<DatePageProps> = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const t = useTranslation({ app: '/--/ui/form/date' })

	return (
		<>
			<Heading size="small">Date Field</Heading>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<Date name="myDateField">My Date Field</Date>
					</Grid>
				</Form>
			</CodeExample>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<Date format="datetime" name="myDateField">
								My Date & Time Field
						</Date>
					</Grid>
				</Form>
			</CodeExample>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<Date helpTextBelow="Dates up tp now" maxDate={toStringDate(now())} name="myDateField">
								Max Date
						</Date>
					</Grid>
				</Form>
			</CodeExample>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<Date helpTextBelow="Dates from now forward" minDate={toStringDate(now())} name="myDateField">
								Min Date
						</Date>
					</Grid>
				</Form>
			</CodeExample>

			<Paragraph>
				<b>maxDate</b> and <b>minDate</b> can be a:
				<List>
					<ul>Date()</ul>
					<ul>DateStamp()</ul>
					<ul>&quot;01/01/2021&quot; (string)</ul>
				</List>
			</Paragraph>


			<Heading className="pt-10" size="xs">Depends: Show / Hide</Heading>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<RadioGroup name="shown" options={{ hide: false, show: true }}>
								Date Field
						</RadioGroup>
						<Date depends={{ name: 'shown', value: 'true' }} name="myDateField">
								My Date Field
						</Date>
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
              myDateField: { label: 'My Date Field', type: 'date', required: true },
            })}`,
					}}
				>
					<Form
						initialValues={{
							myDateField: undefined,
						}}
						onSubmit={(values: object) => console.info(values)}
						validationSchema={validation.schema({
							myDateField: { label: 'My Date Field', required: true, type: 'date' },
						})}
					>
						<Grid size="normal">
							<Date helpTextBelow="field is required" name="myDateField"/>

							<Submit>Submit</Submit>
						</Grid>
					</Form>
				</CodeExample>
			</Grid>

			<Grid gap="small" size="normal">
				<Heading size="2xs">Min</Heading>
				<CodeExample
					replace={{
						onSubmit: '...',
						validationSchema: `{validation.schema({
              myDateFieldMin: { label: 'My Date Field', type: 'date', min: '01/08/2022' },
            })}`,
					}}
				>
					<Form
						enableReinitialize
						initialValues={{
							myDateFieldMin: '01/01/2022',
						}}
						onSubmit={(values: object) => console.info(values)}
						validationSchema={validation.schema({
							myDateFieldMin: { label: 'My Date Field', min: '01/08/2022', type: 'date' },
						})}
					>
						<Grid size="normal">
							<Date helpTextAbove="minimum 01/08/2022" name="myDateFieldMin"/>

							<Submit>Submit</Submit>
						</Grid>
					</Form>
				</CodeExample>
			</Grid>

			<Grid gap="small" size="normal">
				<Heading size="2xs">Max</Heading>
				<CodeExample
					replace={{
						onSubmit: '...',
						validationSchema: `{validation.schema({
              myDateFieldMax: { label: 'My Date Field', type: 'date', max: '01/08/2022' },
            })}`,
					}}
				>
					<Form
						enableReinitialize
						initialValues={{
							myDateFieldMax: '01/12/2022',
						}}
						onSubmit={(values: object) => console.info(values)}
						validationSchema={validation.schema({
							myDateFieldMax: { label: 'My Date Field', max: '01/08/2022', type: 'date' },
						})}
					>
						<Grid size="normal">
							<Date helpTextAbove="maximum 01/08/2022" name="myDateFieldMax"/>

							<Submit>Submit</Submit>
						</Grid>
					</Form>
				</CodeExample>
			</Grid>
		</>
	)
}

export default DatePage