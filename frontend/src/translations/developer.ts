import { colors, elements, numbers, sizes } from './miscellaneous'

export const developerPages = {
	'/--': {
		breadcrumbTitle: 'Developer',
		description: 'This section contains useful tool for developers, when the project is built this folder is excluded',
		menu: {
			uiComponents: 'UI Components',
			uiDocs: 'Docs',
		},
		pageTitle: 'Developer',
		title: 'Developer',
		urlName: '',
	},
	'/--/ui': {
		breadcrumbTitle: 'UI Components',
		description: 'The UI Components library is a set of react components built with tailwind',
		menu: {
			breakpoints: 'Breakpoints',
			button: 'Button',
			currency: 'Currency',
			developer: 'Developer',
			form: 'Form',
			grid: 'Grid & GridSpan',
			heading: 'Heading',
			link: 'Link',
			list: 'List',
			uiHome: 'UI Home',
		},
		pageTitle: 'UI Components',
		title: 'UI Components',
		urlName: 'ui',
	},
	'/--/ui/breakpoints': {
		breadcrumbTitle: 'Breakpoints',
		description: 'Many attributes of the UI components support breakpoints',
		dummy: {
			...numbers,
			...elements,
		},
		headingButtonsWithBreakpoints: 'Buttons, with Breakpoints',
		headingGridSpanWithBreakpoints: 'GridSpan, with Breakpoints',
		headingGridWithBreakpoints: 'Grid, with Breakpoints',
		headingUnderstandingBreakpoints: 'Understanding Breakpoints',
		pageTitle: 'Breakpoints',
		paragraphSixBreakpoints: 'The six breakpoints are',
		paragraphUseManyBreakpoints: 'Components can use breakpoints on many different attributes',
		title: 'Breakpoints',
		urlName: 'breakpoints',
	},
	'/--/ui/button': {
		breadcrumbTitle: 'Button',
		color: {
			...colors,
		},
		dummy: {
			...elements,
		},
		headingColors: 'Colours',
		headingSizes: 'Sizes',
		headingTypes: 'Types',
		pageTitle: 'Button',
		size: {
			...sizes,
		},
		title: 'Button',
		urlName: 'button',
	},
	'/--/ui/currency': {
		breadcrumbTitle: 'Currency',
		description: 'Will convert any value into the currency currency and formatting for the set region',
		headingComponents: 'Components',
		pageTitle: 'Currency',
		title: 'Currency',
		urlName: 'currency',
	},
	'/--/ui/form': {
		breadcrumbTitle: 'Forms',
		pageTitle: 'Forms',
		urlName: 'form',
	},
	'/--/ui/form/boolean': {
		breadcrumbTitle: 'Booleans',
		pageTitle: 'Booleans',
		urlName: 'boolean',
	},
	'/--/ui/form/button': {
		breadcrumbTitle: 'Buttons',
		pageTitle: 'Buttons',
		urlName: 'button',
	},
	'/--/ui/form/checkbox': {
		breadcrumbTitle: 'Checkboxes',
		pageTitle: 'Checkboxes',
		urlName: 'checkbox',
	},
	'/--/ui/form/checkbox_group': {
		breadcrumbTitle: 'Checkbox Groups',
		pageTitle: 'Checkbox Groups',
		urlName: 'checkbox_group',
	},
	'/--/ui/form/date': {
		breadcrumbTitle: 'Dates',
		pageTitle: 'Dates',
		urlName: 'date',
	},
	'/--/ui/form/file': {
		breadcrumbTitle: 'Files',
		pageTitle: 'Files',
		urlName: 'file',
	},
	'/--/ui/form/phone_number': {
		breadcrumbTitle: 'Phone Numbers',
		pageTitle: 'Phone Numbers',
		urlName: 'phone_number',
	},
	'/--/ui/form/radio_group': {
		breadcrumbTitle: 'Radio Groups',
		pageTitle: 'Radio Groups',
		urlName: 'radio_group',
	},
	'/--/ui/form/select': {
		breadcrumbTitle: 'Select',
		pageTitle: 'Select',
		urlName: 'select',
	},
	'/--/ui/form/text': {
		breadcrumbTitle: 'Text',
		pageTitle: 'Text',
		urlName: 'text',
	},
	'/--/ui/form/textarea': {
		breadcrumbTitle: 'Textarea',
		pageTitle: 'Textarea',
		urlName: 'textarea',
	},
	'/--/ui/grid': {
		breadcrumbTitle: 'Grid',
		description: 'Manages aligning group and spacing elements throughout the project',
		dummy: {
			...elements,
			...numbers,
		},
		headingBottom: 'Bottom',
		headingCols: 'Cols',
		headingComponents: 'Components',
		headingFourColumns: 'Four Columns',
		headingGridSpan: 'GridSpan',
		headingGspd: 'Gap',
		headingMiddle: 'Middle',
		headingRow: 'Row',
		headingSixColumns: 'Six Columns',
		headingSixColWithSpan: 'Six Column, with Span',
		headingSmall: 'Small',
		headingTop: 'Top',
		headingTwelveColumns: 'Twelve Columns',
		headingTwoColumns: 'Two Columns',
		headingUnderstandingBreakpoints: 'Understanding Breakpoints',
		headingVerticalAlign: 'Vertical Align',
		headingWithGrid: 'with Grid',
		headingWithGridSpan: 'with GridSpan',
		pageTitle: 'Grid',
		paragraphCanBeDefinedAsBreakpoints: 'All of the below properties can be defined differently at each breakpoint',
		paragraphSixBreakpoints: 'The six breakpoints are',
		size: {
			...sizes,
		},
		title: 'Grid',
		urlName: 'grids',
	},
	'/--/ui/heading': {
		breadcrumbTitle: 'Heading',
		description: 'For titles and headings of all different sixes',
		headingExtraSmall: 'Extra Small Heading',
		headingLarge: 'Large Heading',
		headingMedium: 'Medium Heading',
		headingSmall: 'Small Heading',
		headinxlg: 'XL Heading',
		pageTitle: 'Heading',
		title: 'Heading',
		urlName: 'heading',
	},
	'/--/ui/list': {
		breadcrumbTitle: 'Heading',
		description: 'Creating Ordered and Unordered lists',
		dummy: {
			...numbers,
		},
		pageTitle: 'Heading',
		title: 'List',
		urlName: 'heading',
	},
	'/--/ui/page': {
		breadcrumbTitle: 'Heading',
		color: {
			...colors,
		},
		description: 'Hyperlinks and Buttons for Navigation and Events',
		dummy: {
			...elements,
		},
		headingActive: 'Active',
		headingColors: 'Colors',
		headingDefault: 'Default',
		headingProps: 'Props',
		linkClickHere: 'Click Here',
		linkCurrentlyActive: 'Currently Active',
		linkCurrentPage: 'Current Page',
		linkNotCurrentPage: 'Not Current Page',
		pageTitle: 'Heading',
		title: 'Link',
		urlName: 'heading',
	},
}

//   \{\/\*[a-zA-Z0-9 ]+\*\/}