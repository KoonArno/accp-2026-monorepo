
import Link from 'next/link'

export default function Section8() {
	return (
		<>

			<div className="blog1-section-area sp2">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 m-auto">
							<div className="blog-header text-center heading2 space-margin60">
								<h5 data-aos="fade-left" data-aos-duration={900}>News &amp; updates</h5>
								<div className="space16" />
								<h2 className="text-anime-style-3">Balancing Profit &amp; Purpose</h2>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-duration={800}>
							<div className="blog1-auhtor-boxarea">
								<div className="img1 image-anime">
									<img src="/assets/img/all-images/blog/blog-img1.png" alt="" />
								</div>
								<div className="content-area">
									<ul>
										<li>
											<Link href="/#"><img src="/assets/img/icons/calender1.svg" alt="" />26 January 2025</Link>
										</li>
									</ul>
									<div className="space20" />
									<Link href="/blog-single">Save soil, save world Projects in 2020</Link>
									<div className="space24" />
									<div className="btn-area1">
										<Link href="/blog-single" className="vl-btn2">Read More</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-duration={1000}>
							<div className="blog1-auhtor-boxarea">
								<div className="img1 image-anime">
									<img src="/assets/img/all-images/blog/blog-img2.png" alt="" />
								</div>
								<div className="content-area">
									<ul>
										<li>
											<Link href="/#"><img src="/assets/img/icons/calender1.svg" alt="" />26 January 2025</Link>
										</li>
									</ul>
									<div className="space20" />
									<Link href="/blog-single">Civil Litigation paper’s Of Conference</Link>
									<div className="space24" />
									<div className="btn-area1">
										<Link href="/blog-single" className="vl-btn2">Read More</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-duration={1200}>
							<div className="blog1-auhtor-boxarea">
								<div className="img1 image-anime">
									<img src="/assets/img/all-images/blog/blog-img3.png" alt="" />
								</div>
								<div className="content-area">
									<ul>
										<li>
											<Link href="/#"><img src="/assets/img/icons/calender1.svg" alt="" />26 January 2025</Link>
										</li>
									</ul>
									<div className="space20" />
									<Link href="/blog-single">Greetings and Opening Event of health</Link>
									<div className="space24" />
									<div className="btn-area1">
										<Link href="/blog-single" className="vl-btn2">Read More</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
