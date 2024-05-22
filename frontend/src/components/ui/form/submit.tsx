import { useFormikContext } from 'formik'
import { isEmpty, map } from 'lodash'
import { createRef, DetailedHTMLProps, FC, Fragment, type HTMLAttributes, type InputHTMLAttributes, MouseEvent, useMemo, useState } from 'react'

import { sanitizeProps } from '@/helpers/component'
import { useTranslation } from '@/helpers/translation'

import { Grid, Tooltip, TooltipProps } from '@/components/ui'
import { Button, type ButtonProps, type ButtonPropsButton } from '@/components/ui/button'
import type { MergeElement } from '@/components/ui/ui'

import { Errors } from './form/errors'

export type SubmitContainerProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export type SubmitTooltipProps =
		TooltipProps

export type SubmitProps = MergeElement<
	DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
		{
			containerProps?: SubmitContainerProps,
			hideRunning?: boolean
			tooltipPosition?: TooltipProps['position']
			tooltipProps?: SubmitTooltipProps,
		} & Omit<ButtonProps, 'type'>>


/**
 * form submit button
 * @param props Submit props
 * @param props.children the button content
 * @param props.className html class names
 * @param props.containerProps the props for the container Grid
 * @param props.errorMessage show error message text
 * @param props.hideRunning hide running status when button clicked
 * @param props.onClick action to trigger when clicked
 * @param props.tooltipPosition the position of the tooltip relative to the button
 * @param props.tooltipProps the props for the Tooltip
 * @returns the submit buttpn
 */
export const Submit: FC<SubmitProps> = ({
	children,
	className,
	containerProps,
	errorMessage,
	hideRunning,
	onClick,
	tooltipPosition,
	tooltipProps,
	...props
}) => {
	const t = useTranslation({ component: 'ui.form.submit' })
	const { errors, isSubmitting, isValidating, setErrors } = useFormikContext()
	const [isClicked, setIsClicked] = useState<boolean>(false)
	const [hasValidationError, setHasValidationError] = useState<boolean>()

	const numberOfErrors = isClicked ? Object.keys(errors).length : 0
	const disabled = numberOfErrors > 0

	const belowButtonRef = createRef<HTMLAnchorElement>()

	useMemo(() => {
		if (isSubmitting && isValidating && errors) {
			setHasValidationError(true)
		}
	}, [isSubmitting, isValidating])

	useMemo(() => {
		if (isClicked && isSubmitting && !isValidating && (hasValidationError || errorMessage)) {
			setHasValidationError(false)
			belowButtonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
		}
	}, [isClicked, isSubmitting, isValidating, hasValidationError, errorMessage])

	const tooltipErrorMessage = ((isClicked && numberOfErrors > 0) || !isEmpty(errorMessage)) && (
		<>
			{numberOfErrors > 0 && <>{numberOfErrors} {t('fieldsHaveErrors')}</>}
			{numberOfErrors > 0 && !isEmpty(errorMessage) ? <><br/><br/></> : null}
			{!isEmpty(errorMessage) ? map(Array.isArray(errorMessage) ? errorMessage : [errorMessage]) : null}
		</>
	)

	const click = (e: MouseEvent<HTMLButtonElement>) => {
		setErrors({})
		setIsClicked(true)
		onClick && onClick(e)
	}

	return (
		<>
			<Grid gap="xs" size="normal" {...sanitizeProps(containerProps)} data-this="one">
				<Tooltip
					color="danger"
					message={tooltipErrorMessage}
					position={tooltipPosition}
					size="medium"
					width={props.width || 'medium'}
					{...sanitizeProps(tooltipProps, ['key'] as const) as Omit<SubmitTooltipProps, 'message'>}
				>
					<Button
						className={className}
						disabled={disabled}
						isRunning={!hideRunning && isSubmitting}
						onClick={click}
						type="submit"
						uiComponent="Form.Submit"
						{...(sanitizeProps(props, ['type'] as const) as ButtonPropsButton)}
					>
						{children}
					</Button>
				</Tooltip>

				<Errors isClicked={isClicked} message={errorMessage}/>
			</Grid>
			<a className="hidden" ref={belowButtonRef}></a>
		</>
	)
}

Submit.displayName = 'Form.Submit'

export default Submit