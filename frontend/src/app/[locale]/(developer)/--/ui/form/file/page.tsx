'use client'

import type { NextPage } from 'next'

import { useTranslation } from '@/helpers/translation'
import type { Empty } from '@/helpers/typescript'

import CodeExample from '@/components/developer/code/code_example'

import { Grid, Heading } from '@/components/ui'
import { File, Form, RadioGroup } from '@/components/ui/form'

export type FilePagePageProps = Empty

/**
 * file form field examples
 * @returns page content
 */
const FilePage: NextPage<FilePagePageProps> = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const t = useTranslation({ app: '/--/ui/form/file' })

	return (
		<>
			<Heading size="small">File Field</Heading>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Grid size="normal">
						<File helpTextAbove="This is a help text above" name="my_file_field"/>
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
						<File depends={{ name: 'shown', value: 'true' }} helpTextAbove="This is a help text above" name="my_file_field"/>
					</Grid>
				</Form>
			</CodeExample>

			<Heading className="pt-10" size="xs">Form Validation</Heading>
		</>
	)
}

export default FilePage