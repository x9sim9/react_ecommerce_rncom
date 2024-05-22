'use client'

import { FC } from 'react'

import type { Empty } from '@/helpers/typescript'

export type NotReadyProps = Empty

import { newtonsCradle } from 'ldrs'
typeof window !== 'undefined' && newtonsCradle.register()

/**
 * full page loading animation when not ready
 * @returns the animation
 */
export const NotReady: FC<NotReadyProps> = () => (
	<div className="fixed left-0 top-0 z-10 h-screen w-screen backdrop-blur-sm">
		<div className="fixed left-0 top-0 z-20 h-screen w-screen bg-gray-100/80">
			<div className="absolute left-1/2 top-1/2 z-30 mx-auto ms-[-75px] mt-[-45px]">
				<l-newtons-cradle color="gray" size="150" speed="1.4"></l-newtons-cradle>
			</div>
		</div>
	</div>
)

export default NotReady