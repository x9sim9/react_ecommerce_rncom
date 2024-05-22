'use client'

import Error from 'next/error'

/**
 * NextJS default not found page
 * @returns page content
 */
export const NotFound = () => (
	<html lang="en">
		<body>
			<Error statusCode={404}/>
		</body>
	</html>
)

export default NotFound