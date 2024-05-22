import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		fontSize: {
			'2xs': '0.7rem',
			xs: '0.8rem',
			sm: '0.9rem',
			md: '1rem',
			base: '1rem',
			lg: '1.1rem',
			xl: '1.2rem',
			'2xl': '1.3rem',
			'3xl': '1.5rem',
			'4xl': '2rem',
			'5xl': '3rem',
		},
		screens: {
			xs: '576px',
			// => @media (max-width: 576px) { ... }
			sm: '576px',
			// => @media (min-width: 576px) { ... }
			md: '768px',
			// => @media (min-width: 768px) { ... }
			lg: '992px',
			// => @media (min-width: 992px) { ... }
			xl: '1200px',
			// => @media (min-width: 1200px) { ... }
			'2xl': '1400px',
			// => @media (min-width: 1400px) { ... }
		},
		extend: {
			fontFamily: {
				sans: ['var(--font-inter)'],
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
}
export default config
