'use server'

import type { ReactNode } from 'react'

import { Grid, GridSpan, Heading, Link } from '@/components/ui'

/**
 * layout for form examples section
 * @param props Layout props
 * @param props.children children
 * @returns the layout
 */
const Layout = async ({ children }: { children: ReactNode }) => (
	<Grid size={12} verticalAlign="top">
		<GridSpan size={10}>
			<Grid gap="xl" verticalAlign="top">
				<Heading>Form Components</Heading>
				{children}
			</Grid>
		</GridSpan>
		<GridSpan size={2}>
			<Grid gap="small" verticalAlign="top">
				<Heading size="small">Form Fields</Heading>
				<Link href="/--/ui/form/boolean" size="large">Boolean</Link>
				<Link href="/--/ui/form/button" size="large">Button</Link>
				<Link href="/--/ui/form/checkbox" size="large">Checkbox</Link>
				<Link href="/--/ui/form/checkbox_group" size="large">Checkbox Group</Link>
				<Link href="/--/ui/form/date" size="large">Date</Link>
				<Link href="/--/ui/form/file" size="large">File</Link>
				<Link href="/--/ui/form/phone_number" size="large">PhoneNumber</Link>
				<Link href="/--/ui/form/radio_group" size="large">Radio Group</Link>
				<Link href="/--/ui/form/select" size="large">Select</Link>
				<Link href="/--/ui/form/text" size="large">Text</Link>
				<Link href="/--/ui/form/textarea" size="large">Textarea</Link>
			</Grid>
		</GridSpan>
	</Grid>
)

export default Layout