'use client'
import React, { useEffect, useRef } from "react"

interface CircleTextProps {
	text: string
}

const CircleText: React.FC<CircleTextProps> = ({ text }) => {
	const circleRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (circleRef.current) {
			const elements = circleRef.current.querySelectorAll<HTMLSpanElement>("span")
			elements.forEach((element, i) => {
				element.style.transform = `rotate(${i * 17}deg)`
			})
		}
	}, [text])

	const children = text.split("").map((char, i) =>
		React.createElement(
			"span",
			{ key: i },
			char === " " ? "\u00A0" : char
		)
	)

	return React.createElement(
		"div",
		{ className: "circle rotateme", ref: circleRef },
		children
	)
}

export default CircleText
