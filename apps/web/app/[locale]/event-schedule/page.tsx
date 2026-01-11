
import Countdown from '@/components/elements/Countdown'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
export default function EventSchedule() {

	return (
		<>

			<Layout headerStyle={1} footerStyle={1}>
				<div>
					<div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg10.png)' }}>
						<div className="container">
							<div className="row">
								<div className="col-lg-6 m-auto">
									<div className="heading1 text-center">
										<h1>Event Schedule</h1>
										<div className="space20" />
										<Link href="/">Home <i className="fa-solid fa-angle-right" /> <span>Event Schedule</span></Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*===== HERO AREA ENDS =======*/}
					{/*===== OTHERS AREA STARTS =======*/}
					<div className="choose-section-area sp2">
						<div className="container">
							<div className="row">
								<div className="col-lg-4 m-auto">
									<div className="heading2 text-center space-margin60">
										<h2>Event Schedule</h2>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-4 col-md-6">
									<div className="choose-widget-boxarea">
										<div className="icons">
											<img src="/assets/img/icons/choose-icons1.svg" alt="" />
										</div>
										<div className="space24" />
										<div className="content-area">
											<Link href="/event-single">Make Ideas Happen</Link>
											<div className="space16" />
											<p>The ACCP 2026 brings together the brightest minds and industry leaders for best of transformative business.</p>
											<div className="space24" />
											<Link href="/event-single" className="readmore">Read More <i className="fa-solid fa-arrow-right" /></Link>
										</div>
									</div>
								</div>
								<div className="col-lg-4 col-md-6">
									<div className="choose-widget-boxarea">
										<div className="icons">
											<img src="/assets/img/icons/choose-icons1.svg" alt="" />
										</div>
										<div className="space24" />
										<div className="content-area">
											<Link href="/event-single">Great Speakers</Link>
											<div className="space16" />
											<p>Whether you're looking to elevate your business strategy, discover the latest industry trends, or connect.</p>
											<div className="space24" />
											<Link href="/event-single" className="readmore">Read More <i className="fa-solid fa-arrow-right" /></Link>
										</div>
									</div>
								</div>
								<div className="col-lg-4 col-md-6">
									<div className="choose-widget-boxarea">
										<div className="icons">
											<img src="/assets/img/icons/choose-icons1.svg" alt="" />
										</div>
										<div className="space24" />
										<div className="content-area">
											<Link href="/event-single">One Day Ticket</Link>
											<div className="space16" />
											<p>We empower businesses to thrive in an ever-evolving marketplace. This conference more than just an event.</p>
											<div className="space24" />
											<Link href="/event-single" className="readmore">Read More <i className="fa-solid fa-arrow-right" /></Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*===== OTHERS AREA ENDS =======*/}
					{/*===== EVENT AREA STARTS =======*/}
					<div className="schedule-section-area sp10">
						<div className="container">
							<div className="row">
								<div className="col-lg-11 m-auto">
									<div className="schedule">
										<table>
											<thead>
												<tr>
													<th>Time</th>
													<th>Friday</th>
													<th>Saturday</th>
													<th>Sunday</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>09:00-10:00 AM</td>
													<td>Business Conferences<br /><span>By Event Organizer</span></td>
													<td>UI/UX Design<br /><span>By Event Organizer</span></td>
													<td>UI/UX Design<br /><span>By Event Organizer</span></td>
												</tr>
												<tr>
													<td>09:00-10:00 AM</td>
													<td>UI/UX Design<br /><span>By Event Organizer</span></td>
													<td>Business Conferences<br /><span>By Event Organizer</span></td>
													<td>Business Conferences<br /><span>By Event Organizer</span></td>
												</tr>
												<tr>
													<td>09:00-10:00 AM</td>
													<td>Business Conferences<br /><span>By Event Organizer</span></td>
													<td>UI/UX Design<br /><span>By Event Organizer</span></td>
													<td>UI/UX Design<br /><span>By Event Organizer</span></td>
												</tr>
												<tr>
													<td>09:00-10:00 AM</td>
													<td>UI/UX Design<br /><span>By Event Organizer</span></td>
													<td>Business Conferences<br /><span>By Event Organizer</span></td>
													<td>Business Conferences<br /><span>By Event Organizer</span></td>
												</tr>
												<tr>
													<td>09:00-10:00 AM</td>
													<td>Business Conferences<br /><span>By Event Organizer</span></td>
													<td>UI/UX Design<br /><span>By Event Organizer</span></td>
													<td>UI/UX Design<br /><span>By Event Organizer</span></td>
												</tr>
											</tbody>
										</table>
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