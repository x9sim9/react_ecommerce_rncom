'use client'

import type { NextPage } from 'next'

import { useTranslation } from '@/helpers/translation'
import type { Empty } from '@/helpers/typescript'

import CodeExample from '@/components/developer/code/code_example'

import { Heading, Link, Paragraph } from '@/components/ui'
import { Button, Form, Submit } from '@/components/ui/form'

export type ButtonPageProps = Empty

/**
 * form button example
 * @returns page content
 */
const ButtonPage: NextPage<ButtonPageProps> = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const t = useTranslation({ app: '/--/ui/form/button' })

	return (
		<>
			<Heading size="small">Button Field</Heading>

			<Paragraph size="large">
					Inherits from {'<Button>'} see <Link href="/--/ui/button/">buttons</Link> for attributes
			</Paragraph>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Button>Button</Button>
				</Form>
			</CodeExample>

			<CodeExample>
				<Form initialValues={{}} onSubmit={(values: object) => console.info(values)}>
					<Submit>Submit Button</Submit>
				</Form>
			</CodeExample>

			<Heading className="pt-10" size="xs">Depends: Show / Hide</Heading>


			<Heading className="pt-10" size="xs">Form Validation</Heading>
		</>
	)
}

export default ButtonPage