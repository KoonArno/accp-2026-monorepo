'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
const ModalVideo = dynamic(() => import('react-modal-video') as any, { ssr: false }) as any;
import "@/node_modules/react-modal-video/css/modal-video.css"
import Countdown from '@/components/elements/Countdown'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
export default function BlogSingle() {

	const [isOpen, setOpen] = useState(false)
	return (
		<>

			<Layout headerStyle={1} footerStyle={1}>
				<div>
					<div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg14.png)' }}>
						<div className="container">
							<div className="row">
								<div className="col-lg-6 m-auto">
									<div className="heading1 text-center">
										<h1>Blog Details</h1>
										<div className="space20" />
										<Link href="/">Home <i className="fa-solid fa-angle-right" /> <span>Blog Details</span></Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*===== HERO AREA ENDS =======*/}
					{/*===== BLOG AREA STARTS =======*/}
					<div className="blog-details-section sp8">
						<div className="container">
							<div className="row">
								<div className="col-lg-8">
									<div className="blog-deatils-content heading2">
										<div className="img1">
											<img src="/assets/img/all-images/blog/blog-img7.png" alt="" />
										</div>
										<div className="space32" />
										<ul>
											<li>
												<Link href="/#"><img src="/assets/img/icons/calender1.svg" alt="" />26 Jan 2025 <span> | </span></Link>
											</li>
											<li>
												<Link href="/#"><img src="/assets/img/icons/user1.svg" alt="" />Gisselle <span> | </span></Link>
											</li>
											<li>
												<Link href="/#"><img src="/assets/img/icons/comments1.svg" alt="" />2 Comments</Link>
											</li>
										</ul>
										<div className="space18" />
										<h2>Step Into the Future of Clinical Pharmacy with ACCP</h2>
										<div className="space16" />
										<p>At ACCP 2026, you'll join an exclusive gathering of business leaders and innovators shaping the future their industries. This one-day conference offers dynamic sessions on leadership, technology, and strategy to help you stay ahead in today's competitive market. Whether you're looking to unlock new opportunities or build lasting ACCP partnerships, ACCP 2026 is where you need to be.</p>
										<div className="space48" />
										<div className="row">
											<div className="col-lg-6 col-md-6">
												<div className="img1 image-anime">
													<img src="/assets/img/all-images/blog/blog-img8.png" alt="" />
												</div>
											</div>
											<div className="col-lg-6 col-md-6">
												<div className="space30 d-md-none d-block" />
												<div className="img1 image-anime">
													<img src="/assets/img/all-images/blog/blog-img9.png" alt="" />
												</div>
											</div>
										</div>
										<div className="space32" />
										<h3>ACCP 2026: Your Gateway to Professional Growth</h3>
										<div className="space16" />
										<p>Fuel an your professional growth with actionable insights from world-class experts at ACCP 2026. This premier event brings together forward-thinking professionals to explore the latest trends, technologies, and strategies for success. From keynote speeches to interactive workshops, ACCP 2026 provides you with the tools you need.</p>
										<div className="space16" />
										<p>"Join us at ACCP 2026, where innovation meets opportunity. This conference is the ultimate destination for business leaders seeking to push the boundaries of an what's possible. With sessions on disruptive technologies, leadership trends, and market strategies, you'll walk away with the knowledge and connections to lead.</p>
										<div className="space48" />
										<div className="video-btn-area">
											<div className="img1">
												<img src="/assets/img/all-images/blog/blog-img10.png" alt="" />
											</div>
											<div className="play">
												<a onClick={() => setOpen(true)} className="popup-youtube"><i className="fa-solid fa-play" /></a>
											</div>
										</div>
										<div className="space32" />
										<h3>Reimagine Pharmacy Possibilities with ACCP</h3>
										<div className="space16" />
										<p>"ACCP 2026 is the ultimate destination for professionals eager to stay ahead in the evolving business landscape. This event brings together to innovators, meetup industry leaders, and experts to explore the future of business strategy technology.</p>
										<div className="space32" />
										<div className="tags-social-area">
											<div className="tags">
												<h4>Tags:</h4>
												<ul>
													<li><Link href="/#">#Conferences</Link></li>
													<li><Link href="/#" className="m-0">#Meetup</Link></li>
												</ul>
											</div>
											<div className="social">
												<h4>Social:</h4>
												<ul>
													<li>
														<Link href="/#"><i className="fa-brands fa-facebook-f" /></Link>
													</li>
													<li>
														<Link href="/#"><i className="fa-brands fa-instagram" /></Link>
													</li>
													<li>
														<Link href="/#" className="m-0"><i className="fa-brands fa-youtube" /></Link>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-4">
									<div className="space30 d-lg-none d-block" />
									<div className="blog-auhtor-details">
										<div className="search-area">
											<h3>Search</h3>
											<div className="space24" />
											<form>
												<input type="text" placeholder="Search..." />
												<button type="submit"><i className="fa-solid fa-magnifying-glass" /></button>
											</form>
										</div>
										<div className="space32" />
										<div className="blog-categories">
											<h3>Blog Category</h3>
											<div className="space12" />
											<ul>
												<li>
													<Link href="/#">Business Innovation <span><i className="fa-solid fa-angle-right" /></span></Link>
												</li>
												<li>
													<Link href="/#">Leadership &amp; Strategy <span><i className="fa-solid fa-angle-right" /></span></Link>
												</li>
												<li>
													<Link href="/#">Networking &amp; Collaboration <span><i className="fa-solid fa-angle-right" /></span></Link>
												</li>
												<li>
													<Link href="/#">Entrepreneurship Startups <span><i className="fa-solid fa-angle-right" /></span></Link>
												</li>
												<li>
													<Link href="/#">Marketing &amp; Branding <span><i className="fa-solid fa-angle-right" /></span></Link>
												</li>
												<li>
													<Link href="/#">Event Highlights &amp; Recaps <span><i className="fa-solid fa-angle-right" /></span></Link>
												</li>
											</ul>
										</div>
										<div className="space32" />
										<div className="tags-area">
											<h3>Popular Hastag</h3>
											<div className="space12" />
											<ul>
												<li><Link href="/#">#Conferences</Link></li>
												<li><Link href="/#">#Meetup</Link></li>
												<li><Link href="/#">#Event</Link></li>
											</ul>
											<ul>
												<li><Link href="/#">#ACCP2026</Link></li>
												<li><Link href="/#">#DigitalTransformation</Link></li>
											</ul>
											<ul>
												<li><Link href="/#">#BusinessLeadership</Link></li>
												<li><Link href="/#">#IndustryTrends</Link></li>
											</ul>
										</div>
										<div className="space32" />
										<div className="author-images-area">
											<h3>Popular Author</h3>
											<div className="space12" />
											<ul>
												<li><img src="/assets/img/all-images/blog/blog-img11.png" alt="" /></li>
												<li><img src="/assets/img/all-images/blog/blog-img12.png" alt="" /></li>
												<li><img src="/assets/img/all-images/blog/blog-img13.png" alt="" /></li>
												<li><img src="/assets/img/all-images/blog/blog-img14.png" alt="" /></li>
											</ul>
											<ul>
												<li><img src="/assets/img/all-images/blog/blog-img15.png" alt="" /></li>
												<li><img src="/assets/img/all-images/blog/blog-img16.png" alt="" /></li>
												<li><img src="/assets/img/all-images/blog/blog-img17.png" alt="" /></li>
												<li><img src="/assets/img/all-images/blog/blog-img18.png" alt="" /></li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*===== BLOG AREA ENDS =======*/}
					{/*===== BLOG AREA STARTS =======*/}
					<div className="bloginner-section-area sp1">
						<div className="container">
							<div className="row">
								<div className="col-lg-5 m-auto">
									<div className="heading2 text-center space-margin60">
										<h2>Read More Blogs</h2>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-duration={800}>
									<div className="blog4-boxarea">
										<div className="img1">
											<img src="/assets/img/all-images/memory/memory-img7.png" alt="" />
										</div>
										<div className="content-area">
											<ul>
												<li>
													<Link href="/#"><img src="/assets/img/icons/calender1.svg" alt="" />26 Jan 2025 <span> | </span></Link>
												</li>
												<li>
													<Link href="/#"><img src="/assets/img/icons/user1.svg" alt="" />Beverly</Link>
												</li>
											</ul>
											<div className="space20" />
											<Link href="/blog-single">ACCP 2026: Unlock the Future of Clinical Pharmacy</Link>
											<div className="space24" />
											<Link href="/blog-single" className="readmore">read more <i className="fa-solid fa-arrow-right" /></Link>
											<div className="arrow">
												<Link href="/blog-single"><i className="fa-solid fa-arrow-right" /></Link>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-duration={1000}>
									<div className="blog4-boxarea">
										<div className="img1">
											<img src="/assets/img/all-images/memory/memory-img8.png" alt="" />
										</div>
										<div className="content-area">
											<ul>
												<li>
													<Link href="/#"><img src="/assets/img/icons/calender1.svg" alt="" />26 Jan 2025 <span> | </span></Link>
												</li>
												<li>
													<Link href="/#"><img src="/assets/img/icons/user1.svg" alt="" />Gisselle</Link>
												</li>
											</ul>
											<div className="space20" />
											<Link href="/blog-single">Where Vision Meetup Connect: ACCP 2026</Link>
											<div className="space24" />
											<Link href="/blog-single" className="readmore">read more <i className="fa-solid fa-arrow-right" /></Link>
											<div className="arrow">
												<Link href="/blog-single"><i className="fa-solid fa-arrow-right" /></Link>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-duration={1200}>
									<div className="blog4-boxarea">
										<div className="img1">
											<img src="/assets/img/all-images/memory/memory-img9.png" alt="" />
										</div>
										<div className="content-area">
											<ul>
												<li>
													<Link href="/#"><img src="/assets/img/icons/calender1.svg" alt="" />26 Jan 2025 <span> | </span></Link>
												</li>
												<li>
													<Link href="/#"><img src="/assets/img/icons/user1.svg" alt="" />Mertie</Link>
												</li>
											</ul>
											<div className="space20" />
											<Link href="/blog-single">Fuel Your Professional Growth at ACCP 2026</Link>
											<div className="space24" />
											<Link href="/blog-single" className="readmore">read more <i className="fa-solid fa-arrow-right" /></Link>
											<div className="arrow">
												<Link href="/blog-single"><i className="fa-solid fa-arrow-right" /></Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*===== BLOG AREA ENDS =======*/}
					{/*===== CTA AREA ENDS =======*/}
				</div>
				{/* @ts-ignore */}
				<ModalVideo channel='youtube' isOpen={isOpen} videoId="JXMWOmuR1hU" onClose={() => setOpen(false)} />
			</Layout>
		</>
	)
}