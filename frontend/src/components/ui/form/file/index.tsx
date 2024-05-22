import { FC } from 'react'

import { sanitizeProps } from '@/helpers/component'

import {
	buildStyles, DefaultBoxSize, defaultBoxSizes, DefaultStyles, Field, FieldCommonProps, FieldCommonPropsPlaceHolder,
	FieldProps, FieldPropsShared, FieldStyles, type StyleElement,
} from '@/components/ui/form/field'
import { Breakpoints, parseUi } from '@/components/ui/ui'

import { FormikFile, FormikFileProps } from './formik_file'
import { HtmlFile, HtmlFileProps } from './html_file'

export type FilePropsCommon =
		{
			boxSize?: Breakpoints<DefaultBoxSize>
		} &
		FieldCommonProps &
		FieldCommonPropsPlaceHolder &
		FieldPropsShared & StyleElement

export type FilePropsShared = FilePropsCommon &
		Omit<FieldProps, 'children' | 'type'>

export type FilePropsFormik =
		{
			type?: 'formik'
		} &
		FilePropsShared & FormikFileProps

export type FilePropsHtml =
		{
			type?: 'html'
		} &
		FilePropsShared & HtmlFileProps

export type FileProps = FilePropsFormik | FilePropsHtml

/**
 * file form field
 * @param props File props
 * @param props.boxSize file box size
 * @param props.children field label
 * @param props.className html class names
 * @param props.hideValidation hide validation message
 * @param props.ignoreStyles ignore styles for file
 * @param props.styleProfile profile for styles
 * @param props.type the file field type
 * @returns the file field
 */
export const File: FC<FileProps> = ({
	boxSize = 'full',
	children,
	className,
	hideValidation = false,
	ignoreStyles,
	styleProfile = 'default',
	type = 'formik',
	...props
}) => {
	const layout: FieldStyles<StyleElement['styleProfile']> = {
		default: 'p-[5px]',
	}

	const styles: FieldStyles<StyleElement['styleProfile']> = {
		default: 'border border-gray-500 rounded-md shadow-sm bg-white',
	}

	const ui = parseUi({
		className: buildStyles<DefaultStyles, StyleElement['styleProfile']>({
			className,
			ignoreStyles,
			styleProfile,
			styles: { layout, styles },
		}),
		name: 'Form.File',
		styles: {
			boxSize: { options: defaultBoxSizes, selected: boxSize },
		},
	})

	return (
		<Field
			boxSize={boxSize} hideValidation={hideValidation} label={children} type={type} {...sanitizeProps(props)}>
			{({ setIsHidden }) => ({
				formik: (<FormikFile {...ui.attributes} boxSize={boxSize} className={ui.className} hideValidation={hideValidation} setIsHidden={setIsHidden} {...sanitizeProps(props) as FormikFileProps} />),
				html: (<HtmlFile {...ui.attributes} boxSize={boxSize} className={ui.className} hideValidation={hideValidation} {...sanitizeProps(props) as HtmlFileProps} />),
			}[type]
			)}
		</Field>
	)
}

File.displayName = 'Form.File'

export default File