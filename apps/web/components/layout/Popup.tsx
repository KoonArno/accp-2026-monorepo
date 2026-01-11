'use client'
import { useEffect, useState } from 'react'

export default function Popup() {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		// Check if popup has already been shown in this session
		const hasSeenPopup = sessionStorage.getItem('accp_popup_shown')

		if (!hasSeenPopup) {
			// Show popup after a short delay
			const timer = setTimeout(() => {
				setIsVisible(true)
				// Mark popup as shown in session storage
				sessionStorage.setItem('accp_popup_shown', 'true')
			}, 500)

			return () => clearTimeout(timer)
		}
	}, [])

	const closePopup = () => {
		setIsVisible(false)
	}

	if (!isVisible) return null

	return (
		<>
			<div
				id="popup"
				className="popup-overlay"
				style={{
					display: 'flex',
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					backgroundColor: 'rgba(0, 0, 0, 0.9)',
					justifyContent: 'center',
					alignItems: 'center',
					zIndex: 9999
				}}
				onClick={closePopup}
			>
				<div
					className="popup-content"
					style={{
						position: 'relative',
						maxWidth: '95%',
						maxHeight: '95%',
						backgroundColor: 'transparent',
						borderRadius: '0',
						overflow: 'visible'
					}}
					onClick={(e) => e.stopPropagation()}
				>

					<div style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					}}>
						<img
							src="/assets/img/memorial-popup.png"
							alt="In Remembrance"
							style={{
								width: 'auto',
								height: 'auto',
								maxWidth: '900px',
								maxHeight: '85vh',
								display: 'block',
								boxShadow: '0 5px 25px rgba(0,0,0,0.2)'
							}}
						/>
					</div>
				</div>
			</div>
		</>
	)
}
