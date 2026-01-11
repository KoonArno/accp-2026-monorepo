'use client'
import Countdown from '@/components/elements/Countdown'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useAuth } from '@/context/AuthContext'
import { useRouter } from '@/i18n/routing'
import { useLocale } from 'next-intl'
import { useEffect } from 'react'

export default function PricingPlan() {
	const { isAuthenticated } = useAuth()
	const router = useRouter()
	const locale = useLocale()

	useEffect(() => {
		if (!isAuthenticated) {
			router.push(`/${locale}/login`)
		}
	}, [isAuthenticated, router, locale])

	if (!isAuthenticated) {
		return null
	}

	return (
		<>

			<Layout headerStyle={1} footerStyle={1}>
				<div>
					<div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg16.png)' }}>
						<div className="container">
							<div className="row">
								<div className="col-lg-9 m-auto">
									<div className="heading1 text-center">
										<h1>Registration Fees (USD)</h1>
										<div className="space20" />
										<Link href={`/${locale}`}>Home <i className="fa-solid fa-angle-right" /> <span>Registration Fees</span></Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*===== HERO AREA ENDS =======*/}
					{/*===== PRICING AREA STARTS =======*/}
					<div className="pricing-lan-section-area sp1">
						<div className="container">
							<div className="row">
								<div className="col-lg-5 m-auto">
									<div className="heading2 text-center space-margin60">
										<h5>registration fees</h5>
										<div className="space18" />
										<h2>Select Your Package</h2>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-4 col-md-6">
									<div className="pricing-boxarea">
										<h5>Student (Undergraduate)</h5>
										<div className="space20" />
										<h2>$250 <span>Early Bird</span></h2>
										<div className="space8" />
										<p style={{ fontSize: '14px', color: '#999', marginBottom: '15px' }}>
											<s>$270</s>
										</p>
										<ul>
											<li><img src="/assets/img/icons/check2.svg" alt="" />Full Conference Access</li>
											<li><img src="/assets/img/icons/check2.svg" alt="" />Conference Materials</li>
											<li><img src="/assets/img/icons/check2.svg" alt="" />Coffee Breaks & Lunch</li>
											<li><img src="/assets/img/icons/check2.svg" alt="" />Certificate Of Attendance</li>
											<li><img src="/assets/img/icons/check2.svg" alt="" />Valid Student ID Required</li>
										</ul>
										<div className="space28" />
										<div className="btn-area1">
											<Link href={`/${locale}/checkout?package=student`} className="vl-btn1">Register Now</Link>
										</div>
									</div>
								</div>
								<div className="col-lg-4 col-md-6">
									<div className="pricing-boxarea" style={{ border: '3px solid #FFBA00', position: 'relative' }}>
										<div style={{
											position: 'absolute',
											top: '-15px',
											left: '50%',
											transform: 'translateX(-50%)',
											background: '#FFBA00',
											color: '#fff',
											padding: '5px 15px',
											borderRadius: '20px',
											fontSize: '12px',
											fontWeight: 'bold'
										}}>
											FEATURED
										</div>
										<h5>Professional & Academician</h5>
										<div className="space20" />
										<h2>$385 <span>Early Bird</span></h2>
										<div className="space8" />
										<p style={{ fontSize: '14px', color: '#999', marginBottom: '15px' }}>
											<s>$400</s>
										</p>
										<ul>
											<li><img src="/assets/img/icons/check2.svg" alt="" />Full Conference Access</li>
											<li><img src="/assets/img/icons/check2.svg" alt="" />Conference Materials</li>
											<li><img src="/assets/img/icons/check2.svg" alt="" />Coffee Breaks & Lunch</li>
											<li><img src="/assets/img/icons/check2.svg" alt="" />Certificate Of Attendance</li>
											<li><img src="/assets/img/icons/check2.svg" alt="" />Networking Events</li>
										</ul>
										<div className="space28" />
										<div className="btn-area1">
											<Link href={`/${locale}/checkout?package=professional`} className="vl-btn1">Register Now</Link>
										</div>
									</div>
								</div>
								<div className="col-lg-4 col-md-6">
									<div className="pricing-boxarea">
										<h5>Add-Ons</h5>
										<div className="space20" />
										<div style={{ marginBottom: '20px' }}>
											<h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '5px' }}>Workshop: $70</h4>
											<p style={{ fontSize: '13px', color: '#666', margin: '0' }}>Early Bird</p>
											<p style={{ fontSize: '13px', color: '#666', marginBottom: '10px' }}>per workshop topic</p>
											<ul style={{ marginBottom: '20px' }}>
												<li><img src="/assets/img/icons/check2.svg" alt="" />Pre-Conference Workshop</li>
												<li><img src="/assets/img/icons/check2.svg" alt="" />9 July 2026</li>
												<li><img src="/assets/img/icons/check2.svg" alt="" />Hands-On Training</li>
											</ul>
										</div>
										<div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
											<h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '5px' }}>Gala Dinner: $75</h4>
											<ul>
												<li><img src="/assets/img/icons/check2.svg" alt="" />Networking Dinner</li>
												<li><img src="/assets/img/icons/check2.svg" alt="" />Entertainment</li>
											</ul>
										</div>
										<div className="space28" />
										<div className="btn-area1">
											<Link href={`/${locale}/checkout?package=professional`} className="vl-btn1">Add to Registration</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*===== PRICING AREA ENDS =======*/}
					{/*===== CTA AREA ENDS =======*/}
				</div>

			</Layout>
		</>
	)
}