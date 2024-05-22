import { useFormikContext } from 'formik'
import { isEmpty, map } from 'lodash'
import { FC, ReactNode } from 'react'

import { useTranslation } from '@/helpers/translation'

import { Error } from '@/components/ui/form/error'

export type ErrorProps = {
	isClicked?: boolean; message?: ReactNode | ReactNode[]
}

/**
 * form errors
 * @param props Errors props
 * @param props.isClicked if forms clicked
 * @param props.message error message
 * @returns error messages
 */
export const Errors: FC<ErrorProps> = ({ isClicked, message }) => {
	const t = useTranslation({ component: 'ui.form.errors' })

	const formik = useFormikContext()

	isClicked = isClicked === undefined ? true : isClicked

	const numberOfErrors = formik && isClicked ? Object.keys(formik.errors).length : 0

	return (
		<>
			{numberOfErrors > 0 && (
				<Error>{`${numberOfErrors} ${t('fieldsHaveErrorsTryAgain')}.`}</Error>
			)}
			{!isEmpty(message)
				? map(Array.isArray(message) ? message : [message], (error) => (
					<Error>{message}</Error>
				))
				: null}
		</>
	)
}

export default Errors
