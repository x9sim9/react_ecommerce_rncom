'use client'

export const getCookies = typeof window !== 'undefined'
	? Object.fromEntries(document.cookie.split('; ').map((x) => x.split('=')))
	: {}