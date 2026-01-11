
import Countdown from '@/components/elements/Countdown'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
export default function SpeakersSingle() {

	return (
		<>

			<Layout headerStyle={1} footerStyle={1}>
				<div>
					<div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg7.png)' }}>
						<div className="container">
							<div className="row">
								<div className="col-lg-6 m-auto">
									<div className="heading1 text-center">
										<h1>speakers Details</h1>
										<div className="space20" />
										<Link href="/">Home <i className="fa-solid fa-angle-right" /> <span>Speakers Details</span></Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*===== HERO AREA ENDS =======*/}
					{/*===== TEAM AREA STARTS =======*/}
					<div className="team-details-section-area sp1">
						<div className="container">
							<div className="row">
								<div className="col-lg-10 m-auto">
									<div className="speakers-details-box">
										<div className="row align-items-center">
											<div className="col-lg-5">
												<div className="our-team-boxarea">
													<div className="team-widget-area">
														<img src="/assets/img/elements/elements25.png" alt="" className="elements21" />
														<img src="/assets/img/elements/elements26.png" alt="" className="elements22" />
														<div className="img1">
															<img src="/assets/img/all-images/team/team-img12.png" alt="" className="team-img4" />
														</div>
													</div>
													<div className="content-area">
														<Link href="/#">Adresy Ineasta</Link>
														<div className="space16" />
														<p>UI/UX Designer</p>
														<div className="space24" />
														<ul>
															<li>
																<Link href="/#" className="icon1"><i className="fa-brands fa-facebook-f" /></Link>
															</li>
															<li>
																<Link href="/#" className="icon2"><i className="fa-brands fa-linkedin-in" /></Link>
															</li>
															<li>
																<Link href="/#" className="icon3"><i className="fa-brands fa-instagram" /></Link>
															</li>
															<li>
																<Link href="/#" className="icon4"><i className="fa-brands fa-pinterest-p" /></Link>
															</li>
														</ul>
													</div>
												</div>
											</div>
											<div className="col-lg-7">
												<div className="speakesr-details-content heading2">
													<h2>Personal Information</h2>
													<div className="space16" />
													<p>Kireon Pollardy is a renowned business strategist and thought leader with over 15 years of experience in guiding companies through transformational growth. As and expert in innovation an leadership, Kireon has worked with global brands, helping them navigate the complexities</p>
													<div className="space32" />
													<div className="row">
														<div className="col-lg-5">
															<div className="details-content">
																<h4>Date Of Birth:</h4>
																<div className="space12" />
																<Link href="/#">September 10,1980</Link>
																<div className="space32" />
																<h4>Mobile Number:</h4>
																<div className="space12" />
																<Link href="/tel:+(123)4567890">+(123) 456 7890</Link>
																<div className="space32" />
																<h4>Date Of Birth:</h4>
																<div className="space12" />
																<Link href="/#">PO Box 16122 Collins Street West Victoria 8007 Newyork</Link>
															</div>
														</div>
														<div className="col-lg-7">
															<div className="heading2">
																<h3>Personal Information</h3>
																<div className="space16" />
																<p>His passion for fostering creativity and driving strategic change has made him a sought-after speaker at top business conferences around the world. At ACCP 2026, Kireon will share his the unique insights on future-proofing best businesses, offering practical strategies to help organizations stay agile and on competitive in a rapidly changing meet environment knowledge and real-world.</p>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="event-team-area sp10">
						<div className="container">
							<div className="row">
								<div className="col-lg-6 m-auto">
									<div className="heading2 text-center space-margin60">
										<h2>Event History Kireon Pollardy</h2>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-12 m-auto">
									<div className="event-widget-area">
										<div className="row">
											<div className="col-lg-10 m-auto">
												<div className="event2-boxarea box1">
													<h1 className="active">01</h1>
													<div className="row align-items-center">
														<div className="col-lg-5">
															<div className="img1">
																<img src="/assets/img/all-images/event/event-img4.png" alt="" />
															</div>
														</div>
														<div className="col-lg-1" />
														<div className="col-lg-6">
															<div className="content-area">
																<ul>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/clock1.svg" alt="" />10.00 AM -12.00 PM <span> | </span></Link>
																	</li>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />26/C Asana, New York </Link>
																	</li>
																</ul>
																<div className="space20" />
																<Link href="/event-single" className="head">Elevate User Experience Expertise</Link>
																<div className="space24" />
																<div className="author-area">
																	<div className="autho-name-area">
																		<div className="img1">
																			<img src="/assets/img/all-images/testimonials/testimonial-img1.png" alt="" />
																		</div>
																		<div className="text">
																			<Link href="/speakers-single">Alex Roberton</Link>
																			<div className="space8" />
																			<p>UI/UX Designer</p>
																		</div>
																	</div>
																	<div className="autho-name-area" style={{ padding: '0 0 0 12px', border: 'none' }}>
																		<div className="img1">
																			<img src="/assets/img/all-images/testimonials/testimonial-img2.png" alt="" />
																		</div>
																		<div className="text">
																			<Link href="/speakers-single">Alexys Archer</Link>
																			<div className="space8" />
																			<p>WP Developer</p>
																		</div>
																	</div>
																</div>
																<div className="space24" />
																<div className="btn-area1">
																	<Link href="/pricing-plan" className="vl-btn1"><span className="demo">purchase ticket Now</span></Link>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="space48" />
										<div className="row">
											<div className="col-lg-10 m-auto">
												<div className="event2-boxarea box1">
													<h1 className="active">02</h1>
													<div className="row align-items-center">
														<div className="col-lg-7">
															<div className="content-area">
																<ul>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/clock1.svg" alt="" />10.00 AM -12.00 PM <span> | </span></Link>
																	</li>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />26/C Asana, New York </Link>
																	</li>
																</ul>
																<div className="space20" />
																<Link href="/event-single" className="head">Elevate User Experience Expertise</Link>
																<div className="space24" />
																<div className="author-area">
																	<div className="autho-name-area">
																		<div className="img1">
																			<img src="/assets/img/all-images/testimonials/testimonial-img1.png" alt="" />
																		</div>
																		<div className="text">
																			<Link href="/speakers-single">Alex Roberton</Link>
																			<div className="space8" />
																			<p>UI/UX Designer</p>
																		</div>
																	</div>
																	<div className="autho-name-area" style={{ padding: '0 0 0 12px', border: 'none' }}>
																		<div className="img1">
																			<img src="/assets/img/all-images/testimonials/testimonial-img2.png" alt="" />
																		</div>
																		<div className="text">
																			<Link href="/speakers-single">Alexys Archer</Link>
																			<div className="space8" />
																			<p>WP Developer</p>
																		</div>
																	</div>
																</div>
																<div className="space24" />
																<div className="btn-area1">
																	<Link href="/pricing-plan" className="vl-btn1"><span className="demo">purchase ticket Now</span></Link>
																</div>
															</div>
															<div className="space30 d-lg-none d-block" />
														</div>
														<div className="col-lg-5">
															<div className="img1">
																<img src="/assets/img/all-images/event/event-img5.png" alt="" />
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="space30" />
										<div className="row">
											<div className="col-lg-10 m-auto">
												<div className="event2-boxarea box1">
													<h1 className="active">03</h1>
													<div className="row align-items-center">
														<div className="col-lg-5">
															<div className="img1">
																<img src="/assets/img/all-images/event/event-img6.png" alt="" />
															</div>
														</div>
														<div className="col-lg-1" />
														<div className="col-lg-6">
															<div className="content-area">
																<ul>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/clock1.svg" alt="" />10.00 AM -12.00 PM <span> | </span></Link>
																	</li>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />26/C Asana, New York </Link>
																	</li>
																</ul>
																<div className="space20" />
																<Link href="/event-single" className="head">Elevate User Experience Expertise</Link>
																<div className="space24" />
																<div className="author-area">
																	<div className="autho-name-area">
																		<div className="img1">
																			<img src="/assets/img/all-images/testimonials/testimonial-img1.png" alt="" />
																		</div>
																		<div className="text">
																			<Link href="/speakers-single">Alex Roberton</Link>
																			<div className="space8" />
																			<p>UI/UX Designer</p>
																		</div>
																	</div>
																	<div className="autho-name-area" style={{ padding: '0 0 0 12px', border: 'none' }}>
																		<div className="img1">
																			<img src="/assets/img/all-images/testimonials/testimonial-img2.png" alt="" />
																		</div>
																		<div className="text">
																			<Link href="/speakers-single">Alexys Archer</Link>
																			<div className="space8" />
																			<p>WP Developer</p>
																		</div>
																	</div>
																</div>
																<div className="space24" />
																<div className="btn-area1">
																	<Link href="/pricing-plan" className="vl-btn1"><span className="demo">purchase ticket Now</span></Link>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*===== TEAM AREA ENDS =======*/}
					{/*===== CTA AREA ENDS =======*/}
				</div>

			</Layout>
		</>
	)
}