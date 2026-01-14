'use client'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function AddClassBody() {
	const pathname = usePathname()

	useEffect(() => {
		const bodyElement = document.querySelector('body')

		if (bodyElement) {
			bodyElement.classList.remove(
				'homepage1-body',
				'homepage2-body',
				'homepage3-body',
				'homepage4-body',
				'homepage5-body',
				'homepage6-body',
				'homepage7-body',
				'homepage8-body',
				'homepage9-body',
				'homepage10-body'
			)

			const classMap: { [key: string]: string } = {
				'/index2': 'homepage2-body',
				'/index3': 'homepage3-body',
				'/index4': 'homepage4-body',
				'/index5': 'homepage5-body',
				'/index6': 'homepage6-body',
				'/index7': 'homepage7-body',
				'/index8': 'homepage8-body',
				'/index9': 'homepage9-body',
				'/index10': 'homepage10-body',
			}

			const className = classMap[pathname || ''] || 'homepage1-body'
			bodyElement.classList.add(className)
		}

		setTimeout(() => {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth',
			})
		}, 0)
	}, [pathname])

	return null
}
