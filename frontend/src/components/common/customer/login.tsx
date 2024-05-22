'use client'

import { LockClosedIcon } from '@heroicons/react/24/outline'
import { FC, useEffect } from 'react'

import { sanitizeProps } from '@/helpers/component'
import { useTranslation } from '@/helpers/translation'
import { useRouter } from '@/navigation'

import { LoginProps as LoginPropsCustomer, useCustomer } from '@/components/common/customer/use_customer'
import NotReady from '@/components/common/not_ready'

import { Form, Grid } from '@/components/ui'
import { useFlash } from '@/components/ui/flash'
import { Body, Head, Panel, type PanelProps } from '@/components/ui/panel'

export type LoginProps = PanelProps

/**
 * authenticate user
 * @param props the props for Panel
 * @returns the authentication screen
 */
export const Login: FC<LoginProps> = ({ ...props }) => {
	const t = useTranslation({ component: 'common.customer.login' })

	const { customer, errors, isReady, login, resetErrors } = useCustomer()
	const { replace } = useRouter()
	const { addMessage } = useFlash()

	useEffect(() => {
		if (isReady && customer?.isAuthenticated) {
			replace('/account')
		}
	}, [isReady, customer])

	if (!isReady || customer?.isAuthenticated) {
		return <NotReady />
	}

	type LoginFormValues = LoginPropsCustomer

	const submit: Form.OnSubmit<LoginFormValues> = async (values, _) => {
		const result = await login({ emailAddress: values.emailAddress, password: values.password })

		if (result.result) {
			addMessage({ id: 'common.customer.login.loginSuccess', message: t('loginSuccess'), redirect: true, type: 'success' })
			return
		}
		addMessage({ id: 'common.customer.login.loginFailed', message: (result.showError && result.errors?.join('\n')) || t('loginFailed'), type: 'danger' })
	}

	return (
		<Panel {...sanitizeProps(props)}>
			<Head icon={LockClosedIcon}>
				{t('title')}
			</Head>
			<Body>
				<Form.Form<LoginFormValues> initialValues={{
					emailAddress: '',
					password: '',
				}} onSubmit={submit} validationSchema={Form.validation.schema<LoginFormValues>({
					emailAddress: { criteria: 'emailAddress', label: 'Email Address', required: true, type: 'string' },
					password: { criteria: process.env.NEXT_PUBLIC_SECuRE_PASSWORD === 'false' ? undefined : 'password', label: 'Password', required: true, type: 'string' },
				})}>
					{({ touched }) => (
						<Grid>
							<Form.Text data-testid="common.customer.login.emailAddress" name="emailAddress" onKeyUp={() => resetErrors()}>{t('emailAddress')}</Form.Text>
							<Form.Password data-testid="common.customer.Login.password" name="password" onKeyUp={() => resetErrors()}>{t('password')}</Form.Password>
							{touched
								? errors.map((error, key) => (
									<Form.Error key={error.message || key}>{error.showError ? error.message : t('loginError')}</Form.Error>
								))
								: null}
							<Form.Submit data-testid="common.customer.loginButton" size="xl" width="full">{t('loginAction')}</Form.Submit>
						</Grid>
					)}
				</Form.Form>
			</Body>
		</Panel>
	)
}

export default Login