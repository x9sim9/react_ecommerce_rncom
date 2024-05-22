import { Inter } from 'next/font/google'
import { FC, ReactNode } from 'react'

const inter = Inter({
	preload: true,
	subsets: ['latin'],
	variable: '--font-inter',
})

export type HtmlProps = {
	children: ReactNode
	locale: string,
}

/**
 * The top level html tags for the page including fonts
 * @param props Html props
 * @param props.children children
 * @param props.locale the current locale (next-intl)
 * @returns the html
 */
export const Html: FC<HtmlProps> = async ({ children, locale }) => (
	<html className={`${inter.variable} font-sans`} lang={locale}>
		<body>
			{children}
		</body>
	</html>
)

export default Html