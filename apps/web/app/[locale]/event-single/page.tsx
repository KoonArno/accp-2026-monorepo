'use client'
import Countdown from '@/components/elements/Countdown'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from "react"
export default function EventSingle() {
	const [isTab, setIsTab] = useState(1)
	const handleTab = (i: number) => {
		setIsTab(i)
	}
	return (
		<>

			<Layout headerStyle={1} footerStyle={1}>
				<div>
					<div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg9.png)' }}>
						<div className="container">
							<div className="row">
								<div className="col-lg-6 m-auto">
									<div className="heading1 text-center">
										<h1>Event single</h1>
										<div className="space20" />
										<Link href="/">Home <i className="fa-solid fa-angle-right" /> <span>Event single</span></Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*===== HERO AREA ENDS =======*/}
					{/*===== EVENT AREA STARTS =======*/}
					<div className="event-sidepage-section-area sp8">
						<div className="container">
							<div className="row">
								<div className="col-lg-7">
									<div className="event-side-images">
										<div className="img1">
											<img src="/assets/img/all-images/event/event-img8.png" alt="" />
										</div>
										<div className="space32" />
										<h3>Elevate User Experience Expertise</h3>
										<div className="space16" />
										<p>In today's digital landscape, exceptional user experience (UX) is the key to creating products and services that truly resonate with people. At ACCP 2026, dive deep into the world of UX with expert-led sessions that explore and cutting-edge techniques, research-driven insights, and innovative tools.</p>
										<div className="space40" />
										<h4>Event Speakers</h4>
										<div className="row">
											<div className="col-lg-4 col-md-6">
												<div className="our-team-boxarea">
													<div className="team-widget-area">
														<img src="/assets/img/elements/elements25.png" alt="" className="elements21" />
														<img src="/assets/img/elements/elements26.png" alt="" className="elements22" />
														<div className="img1">
															<img src="/assets/img/all-images/team/team-img12.png" alt="" className="team-img4" />
															<div className="share">
																<Link href="/#"><img src="/assets/img/icons/share1.svg" alt="" /></Link>
															</div>
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
													<div className="space28" />
													<div className="content-area">
														<Link href="/speakers-single">Alex Robertson</Link>
														<div className="space16" />
														<p>UI/UX Designer</p>
													</div>
												</div>
											</div>
											<div className="col-lg-4 col-md-6">
												<div className="our-team-boxarea">
													<div className="team-widget-area">
														<img src="/assets/img/elements/elements25.png" alt="" className="elements21" />
														<img src="/assets/img/elements/elements26.png" alt="" className="elements22" />
														<div className="img1">
															<img src="/assets/img/all-images/team/team-img13.png" alt="" className="team-img4" />
															<div className="share">
																<Link href="/#"><img src="/assets/img/icons/share1.svg" alt="" /></Link>
															</div>
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
													<div className="space28" />
													<div className="content-area">
														<Link href="/speakers-single">Alexy Sammony</Link>
														<div className="space16" />
														<p>UI/UX Designer</p>
													</div>
												</div>
											</div>
											<div className="col-lg-4 col-md-6">
												<div className="our-team-boxarea">
													<div className="team-widget-area">
														<img src="/assets/img/elements/elements25.png" alt="" className="elements21" />
														<img src="/assets/img/elements/elements26.png" alt="" className="elements22" />
														<div className="img1">
															<img src="/assets/img/all-images/team/team-img14.png" alt="" className="team-img4" />
															<div className="share">
																<Link href="/#"><img src="/assets/img/icons/share1.svg" alt="" /></Link>
															</div>
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
													<div className="space28" />
													<div className="content-area">
														<Link href="/speakers-single">Kireon Pollardy</Link>
														<div className="space16" />
														<p>UI/UX Designer</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-5">
									<div className="shedule-listarea">
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
										<div className="space30" />
										<div className="mapouter">
											<div className="gmap_canvas">
												<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4506257.120552435!2d88.67021924228865!3d21.954385721237916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1704088968016!5m2!1sen!2sbd" width={600} height={450} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="event-single-section-area sp1">
						<div className="container">
							<div className="row">
								<div className="col-lg-6 m-auto">
									<div className="event2-header heading2 text-center">
										<h2 className="text-anime-style-3">View More Event</h2>
									</div>
								</div>
								<div className="space32" />
							</div>
							<div className="row">
								<div className="col-lg-12" data-aos="fade-up" data-aos-duration={1000}>
									<div className="tabs-button space-margin60">
										<ul className="nav nav-pills" id="pills-tab" role="tablist">
											<li className="nav-item" onClick={() => handleTab(1)}>
												<button className={isTab == 1 ? "nav-link active" : "nav-link"} id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
													<span className="calender"><img src="/assets/img/icons/calender2.svg" alt="" /></span>
													<span className="pl-8">
														<span className="day">Day One</span>
														<span className="date">July 9, 2026</span>
													</span>
												</button>
											</li>
											<li className="nav-item" onClick={() => handleTab(2)}>
												<button className={isTab == 2 ? "nav-link active" : "nav-link"} id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
													<span className="calender"><img src="/assets/img/icons/calender2.svg" alt="" /></span>
													<span className="pl-8">
														<span className="day">Day Two</span>
														<span className="date">July 10, 2026</span>
													</span>
												</button>
											</li>
											<li className="nav-item" onClick={() => handleTab(3)}>
												<button className={isTab == 3 ? "nav-link m-0 active" : "nav-link m-0"} id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">
													<span className="calender"><img src="/assets/img/icons/calender2.svg" alt="" /> </span>
													<span className="pl-8">
														<span className="day">Day Three</span>
														<span className="date">July 11, 2026</span>
													</span>
												</button>
											</li>
										</ul>
									</div>
									<div className="tab-content" id="pills-tabContent">
										<div className={isTab == 1 ? "tab-pane fade show active" : "tab-pane fade"} id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex={0}>
											<div className="event-widget-area">
												<div className="row">
													<div className="col-lg-1" />
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
																				<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />Centara Grand, Bangkok</Link>
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
													<div className="col-lg-1" />
													<div className="col-lg-10 m-auto">
														<div className="event2-boxarea box1">
															<h1 className="active">02</h1>
															<div className="row align-items-center">
																<div className="col-lg-6">
																	<div className="content-area">
																		<ul>
																			<li>
																				<Link href="/#"><img src="/assets/img/icons/clock1.svg" alt="" />10.00 AM -12.00 PM <span> | </span></Link>
																			</li>
																			<li>
																				<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />Centara Grand, Bangkok</Link>
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
													<div className="col-lg-1" />
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
																				<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />Centara Grand, Bangkok</Link>
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
										<div className={isTab == 2 ? "tab-pane fade show active" : "tab-pane fade"} id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex={0}>
											<div className="event-widget-area">
												<div className="row">
													<div className="col-lg-1" />
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
																				<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />Centara Grand, Bangkok</Link>
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
													<div className="col-lg-1" />
													<div className="col-lg-10 m-auto">
														<div className="event2-boxarea box1">
															<h1 className="active">02</h1>
															<div className="row align-items-center">
																<div className="col-lg-6">
																	<div className="content-area">
																		<ul>
																			<li>
																				<Link href="/#"><img src="/assets/img/icons/clock1.svg" alt="" />10.00 AM -12.00 PM <span> | </span></Link>
																			</li>
																			<li>
																				<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />Centara Grand, Bangkok</Link>
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
													<div className="col-lg-1" />
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
																				<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />Centara Grand, Bangkok</Link>
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
										<div className={isTab == 3 ? "tab-pane fade show active" : "tab-pane fade"} id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabIndex={0}>
											<div className="event-widget-area">
												<div className="row">
													<div className="col-lg-1" />
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
																				<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />Centara Grand, Bangkok</Link>
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
													<div className="col-lg-1" />
													<div className="col-lg-10 m-auto">
														<div className="event2-boxarea box1">
															<h1 className="active">02</h1>
															<div className="row align-items-center">
																<div className="col-lg-6">
																	<div className="content-area">
																		<ul>
																			<li>
																				<Link href="/#"><img src="/assets/img/icons/clock1.svg" alt="" />10.00 AM -12.00 PM <span> | </span></Link>
																			</li>
																			<li>
																				<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />Centara Grand, Bangkok</Link>
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
													<div className="col-lg-1" />
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
																				<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />Centara Grand, Bangkok</Link>
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
						</div>
					</div>
					{/*===== EVENT AREA ENDS =======*/}
					{/*===== CTA AREA ENDS =======*/}
				</div>

			</Layout>
		</>
	)
}