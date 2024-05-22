'use server'

import { notFound } from 'next/navigation'

/**
 * catch all not found url requests and show not found
 * required by next-intl
 */
const CatchAllPage = async () => {
	notFound()
}

export default CatchAllPage