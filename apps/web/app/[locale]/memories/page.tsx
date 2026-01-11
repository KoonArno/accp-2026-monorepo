
import Countdown from '@/components/elements/Countdown'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
export default function Memories() {

	return (
		<>

			<Layout headerStyle={1} footerStyle={1}>
				<div>
					<div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg11.png)' }}>
						<div className="container">
							<div className="row">
								<div className="col-lg-6 m-auto">
									<div className="heading1 text-center">
										<h1>Recent Memories</h1>
										<div className="space20" />
										<Link href="/">Home <i className="fa-solid fa-angle-right" /> <span>Recent Memories</span></Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*===== HERO AREA ENDS =======*/}
					{/*===== MEMORY AREA STARTS =======*/}
					<div className="memory-inner-section-area sp1">
						<div className="container">
							<div className="row">
								<div className="col-lg-4 col-md-6">
									<div className="memory3-boxarea">
										<div className="img1">
											<img src="/assets/img/all-images/memory/memory-img4.png" alt="" />
										</div>
										<div className="content-area">
											<p>Event 2024</p>
											<div className="space12" />
											<Link href="/event-single">Freelancer Meetup</Link>
											<div className="plus">
												<Link href="/event-single"><i className="fa-solid fa-plus" /></Link>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-4 col-md-6">
									<div className="memory3-boxarea">
										<div className="img1">
											<img src="/assets/img/all-images/memory/memory-img5.png" alt="" />
										</div>
										<div className="content-area">
											<p>Event 2024</p>
											<div className="space12" />
											<Link href="/event-single">Freelancer Meetup</Link>
											<div className="plus">
												<Link href="/event-single"><i className="fa-solid fa-plus" /></Link>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-4 col-md-6">
									<div className="memory3-boxarea">
										<div className="img1">
											<img src="/assets/img/all-images/memory/memory-img6.png" alt="" />
										</div>
										<div className="content-area">
											<p>Event 2024</p>
											<div className="space12" />
											<Link href="/event-single">Freelancer Meetup</Link>
											<div className="plus">
												<Link href="/event-single"><i className="fa-solid fa-plus" /></Link>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-4 col-md-6">
									<div className="memory3-boxarea">
										<div className="img1">
											<img src="/assets/img/all-images/memory/memory-img7.png" alt="" />
										</div>
										<div className="content-area">
											<p>Event 2024</p>
											<div className="space12" />
											<Link href="/event-single">Freelancer Meetup</Link>
											<div className="plus">
												<Link href="/event-single"><i className="fa-solid fa-plus" /></Link>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-4 col-md-6">
									<div className="memory3-boxarea">
										<div className="img1">
											<img src="/assets/img/all-images/memory/memory-img8.png" alt="" />
										</div>
										<div className="content-area">
											<p>Event 2024</p>
											<div className="space12" />
											<Link href="/event-single">Freelancer Meetup</Link>
											<div className="plus">
												<Link href="/event-single"><i className="fa-solid fa-plus" /></Link>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-4 col-md-6">
									<div className="memory3-boxarea">
										<div className="img1">
											<img src="/assets/img/all-images/memory/memory-img9.png" alt="" />
										</div>
										<div className="content-area">
											<p>Event 2024</p>
											<div className="space12" />
											<Link href="/event-single">Freelancer Meetup</Link>
											<div className="plus">
												<Link href="/event-single"><i className="fa-solid fa-plus" /></Link>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-4 col-md-6">
									<div className="memory3-boxarea">
										<div className="img1">
											<img src="/assets/img/all-images/memory/memory-img10.png" alt="" />
										</div>
										<div className="content-area">
											<p>Event 2024</p>
											<div className="space12" />
											<Link href="/event-single">Freelancer Meetup</Link>
											<div className="plus">
												<Link href="/event-single"><i className="fa-solid fa-plus" /></Link>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-4 col-md-6">
									<div className="memory3-boxarea">
										<div className="img1">
											<img src="/assets/img/all-images/memory/memory-img11.png" alt="" />
										</div>
										<div className="content-area">
											<p>Event 2024</p>
											<div className="space12" />
											<Link href="/event-single">Freelancer Meetup</Link>
											<div className="plus">
												<Link href="/event-single"><i className="fa-solid fa-plus" /></Link>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-4 col-md-6">
									<div className="memory3-boxarea">
										<div className="img1">
											<img src="/assets/img/all-images/memory/memory-img12.png" alt="" />
										</div>
										<div className="content-area">
											<p>Event 2024</p>
											<div className="space12" />
											<Link href="/event-single">Freelancer Meetup</Link>
											<div className="plus">
												<Link href="/event-single"><i className="fa-solid fa-plus" /></Link>
											</div>
										</div>
									</div>
								</div>
								<div className="space30" />
								<div className="pagination-area">
									<nav aria-label="Page navigation example">
										<ul className="pagination">
											<li className="page-item">
												<Link className="page-link" href="/#" aria-label="Previous">
													<i className="fa-solid fa-angle-left" />
												</Link>
											</li>
											<li className="page-item"><Link className="page-link active" href="/#">1</Link></li>
											<li className="page-item"><Link className="page-link" href="/#">2</Link></li>
											<li className="page-item"><Link className="page-link" href="/#">...</Link></li>
											<li className="page-item"><Link className="page-link" href="/#">12</Link></li>
											<li className="page-item">
												<Link className="page-link" href="/#" aria-label="Next">
													<i className="fa-solid fa-angle-right" />
												</Link>
											</li>
										</ul>
									</nav>
								</div>
							</div>
						</div>
					</div>
					{/*===== MEMORY AREA ENDS =======*/}
					{/*===== CTA AREA ENDS =======*/}
				</div>

			</Layout>
		</>
	)
}