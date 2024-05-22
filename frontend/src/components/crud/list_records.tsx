'use client'

import { useSuspenseQuery } from '@apollo/client'
import type { DocumentNode, OperationVariables, TypedDocumentNode } from '@apollo/client/core'
import type { NoInfer, SuspenseQueryHookOptions } from '@apollo/client/react/types/types'
import * as icons from '@heroicons/react/24/outline'
import { forEach, map, omit, pick, values } from 'lodash'
import { ComponentProps, FC } from 'react'

import { sanitizeProps } from '@/helpers/component'
import { logger } from '@/helpers/logger'
import { useTranslation } from '@/helpers/translation'

import type { ChangePropsOnResult } from '@/components/crud/save_record'

import { Button, Grid, type GridProps, Link } from '@/components/ui'
import { Panel, Table } from '@/components/ui'
import { useFlash } from '@/components/ui/flash'
import { SuspenseLoading, type SuspenseLoadingProps } from '@/components/ui/suspense_loading'
import type { MergeElement } from '@/components/ui/ui'

export type ListRecordsProps<QueryResult, QueryProps extends OperationVariables> = MergeElement<
	GridProps, {
		basePath: string
		changeLabel?: string
		combineKeys: { [key: string]: string[] }
		createLabel?: string
		deleteLabel?: string
		disableCreate?: boolean
		disableDelete?: boolean
		disableUpdate?: boolean
		icon?: FC<ComponentProps<'svg'>> | keyof typeof icons
		messageDeleteFailed?: string
		messageDeleteSuccess?: string
		name: string
		omitKeys: string[]
		onDelete: ({ id }: { id: number | string }) => Promise<ChangePropsOnResult>
		query: DocumentNode | TypedDocumentNode<QueryResult, QueryProps>
		queryOptions?: SuspenseQueryHookOptions<NoInfer<QueryResult>, NoInfer<QueryProps>>
		suspense: Omit<SuspenseLoadingProps, 'children' | 'type'>
		title?: string
	}>

/**
 * list records for a CRUD (Create, Read, Update, Delete) Model
 * @param props ListRecords props
 * @param props.basePath the base app router path
 * @param props.changeLabel change the default label for the list
 * @param props.combineKeys combine keys from the model into a single field
 * @param props.createLabel label for create link
 * @param props.deleteLabel label for delete button
 * @param props.disableCreate hide create functionality
 * @param props.disableDelete hide delete functionality
 * @param props.disableUpdate hide update functionality
 * @param props.icon the @heroicon to use
 * @param props.messageDeleteFailed message when delete fails
 * @param props.messageDeleteSuccess message when delete is successful
 * @param props.name name of model
 * @param props.omitKeys hide keys from model
 * @param props.onDelete trigger on delete event
 * @param props.query GraphQL query to retrieve the model data
 * @param props.queryOptions GraphQL query options for query
 * @param props.suspense props for Suspense
 * @param props.title the title for the list
 * @returns the list of records
 */
export const ListRecords = <QueryResult, QueryProps extends OperationVariables>({
	basePath, changeLabel, combineKeys, createLabel, deleteLabel, disableCreate = false, disableDelete = false, disableUpdate = false, icon,
	messageDeleteFailed, messageDeleteSuccess, name, omitKeys = [], onDelete, query, queryOptions = {},
	suspense, title, ...props
}: ListRecordsProps<QueryResult, QueryProps>) => {
	const t = useTranslation({ component: 'crud.list' })
	const { addMessage } = useFlash()

	const result = useSuspenseQuery<QueryResult, QueryProps>(query, { fetchPolicy: 'no-cache', ...queryOptions })
	let records: { [key: string]: number | string }[] = values(result.data)[0]
	logger.debug(`crud.listRecords.${name}`, name, { records: records?.map((record) => record.id) })

	omitKeys.push('__typename')

	forEach(combineKeys, (combineGroup, newKey) => {
		records = records?.map((record) => {
			const fields = pick(record, combineGroup)
			record[newKey] = values(fields).join(', ') // add combined fields to first field
			return omit(record, combineGroup) // remove all other fields
		})
	})

	if (typeof icon === 'string') {
		icon = icons[icon]
	}

	const deleteRecord = async ({ id }: { id: number | string }) => {
		const action = await onDelete({ id })

		if (action.result) {
			addMessage({ id: 'crud.listRecords.deleteSuccess', message: messageDeleteSuccess || t('successDeleteMessage'), type: 'success' })
			result.refetch()
		} else {
			addMessage({ id: 'crud.listRecords.deleteFailed', message: messageDeleteFailed || t('failedDeleteMessage'), type: 'danger' })
		}
	}

	return (
		<Grid align="end" gap="small" {...sanitizeProps(props)}>
			<Panel.Panel className="w-full">
				<Panel.Head data-testid={`crud.listRecords.${name}.title`} icon={icon}>
					{title}
				</Panel.Head>
				<Panel.Body gap="none">
					<SuspenseLoading type="panel" {...sanitizeProps(suspense)}>
						<Table.Table border="inner">
							<Table.Body data-testid={`crud.listRecords.${name}.rows`}>
								{records?.map((row, index) => (
									<Table.Row data-test-key={row.id} data-test-position={index} data-testid={`crud.listRecords.${name}.row`} key={row.id}>
										{map(row, (cell, key) => !omitKeys.includes(key)
											? (
													<Table.D data-testid={`crud.listRecords.${name}.cell.${key}`} key={key}>{cell}</Table.D>
												)
											: null)}
										<Table.D>
											<Grid align="end">
												<Grid align="end" size="flex" width="fit">
													{!disableUpdate && (
														<Link data-testid={`crud.listRecords.${name}.updateLink`} href={`${basePath}/update/${row.id}`}>
															{changeLabel || t('change')}
														</Link>
													)}
													{!disableDelete && (
														<Button data-testid={`crud.listRecords.${name}.deleteButton`} onClick={() => deleteRecord({ id: row.id })} type="text">
															{deleteLabel || t('delete')}
														</Button>
													)}
												</Grid>
											</Grid>
										</Table.D>
									</Table.Row>
								))}
							</Table.Body>
						</Table.Table>
					</SuspenseLoading>
				</Panel.Body>
			</Panel.Panel>
			{!disableCreate && (
				<Link data-testid={`crud.listRecords.${name}.createLink`} href={`${basePath}/create`}>
					{createLabel || t('create')}
				</Link>
			)}
		</Grid>
	)
}

export default ListRecords