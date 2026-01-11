
import Link from 'next/link'

export default function Section2() {
	return (
		<>

			<div className="about1-section-area sp1">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6">
							<div className="about-imges">
								<div className="img1 reveal image-anime">
									<img src="/assets/img/all-images/about/about-img1.png" alt="ACCP 2026 Conference" />
								</div>
								<div className="row">
									<div className="col-lg-6 col-md-6">
										<div className="space30" />
										<div className="img1 reveal image-anime">
											<img src="/assets/img/all-images/about/about-img2.png" alt="Clinical Pharmacy" />
										</div>
									</div>
									<div className="col-lg-6 col-md-6">
										<div className="space30" />
										<div className="img1 reveal image-anime">
											<img src="/assets/img/all-images/about/about-img3.png" alt="Research Presentation" />
										</div>
									</div>
								</div>
								<div className="about-btnarea">
									<svg xmlns="http://www.w3.org/2000/svg" width={200} height={200} viewBox="0 0 200 200" fill="none" className="keyframe5">
										<path d="M93.8771 2.53621C96.8982 1.28483 98.4087 0.659138 100 0.659138C101.591 0.659138 103.102 1.28483 106.123 2.5362L164.588 26.7531C167.609 28.0045 169.119 28.6302 170.245 29.7554C171.37 30.8806 171.995 32.3912 173.247 35.4123L197.464 93.8771C198.715 96.8982 199.341 98.4087 199.341 100C199.341 101.591 198.715 103.102 197.464 106.123L173.247 164.588C171.995 167.609 171.37 169.119 170.245 170.245C169.119 171.37 167.609 171.995 164.588 173.247L106.123 197.464C103.102 198.715 101.591 199.341 100 199.341C98.4087 199.341 96.8982 198.715 93.8771 197.464L35.4123 173.247C32.3912 171.995 30.8806 171.37 29.7554 170.245C28.6302 169.119 28.0045 167.609 26.7531 164.588L2.53621 106.123C1.28483 103.102 0.659138 101.591 0.659138 100C0.659138 98.4087 1.28483 96.8982 2.5362 93.8771L26.7531 35.4123C28.0045 32.3912 28.6302 30.8806 29.7554 29.7554C30.8806 28.6302 32.3912 28.0045 35.4123 26.7531L93.8771 2.53621Z" fill="#FFBA00" />
									</svg>
									<Link href="/registration">
										<span><i className="fa-solid fa-arrow-right" /></span>
										<br />
										<div className="space12" />
										Register Now
									</Link>
								</div>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="about-header-area heading2">
								<h5 data-aos="fade-left" data-aos-duration={800}>About ACCP 2026</h5>
								<div className="space16" />
								<h2 className="text-anime-style-3">Borderless Pharmacy Practice</h2>
								<div className="space16" />
								<p data-aos="fade-left" data-aos-duration={900}>
									The 25th Asian Conference on Clinical Pharmacy (ACCP 2026) brings together
									pharmacists, researchers, educators, and healthcare professionals from across
									Asia and beyond. Join us in Bangkok for three days of inspiring keynotes,
									cutting-edge research presentations, and networking opportunities.
								</p>
								<div className="space32" />
								<div className="about-auhtor-box" data-aos="fade-left" data-aos-duration={1000}>
									<div className="icons">
										<img src="/assets/img/icons/about-icon1.svg" alt="" />
									</div>
									<div className="text">
										<Link href="/program">8 Scientific Tracks</Link>
										<div className="space12" />
										<p>Clinical Pharmacy, Pharmacology, Pharmacy Education, Pharmaceutics,
											and more research tracks to showcase your work.</p>
									</div>
								</div>
								<div className="space20" />
								<div className="about-auhtor-box" data-aos="fade-left" data-aos-duration={1100}>
									<div className="icons">
										<img src="/assets/img/icons/about-icon2.svg" alt="" />
									</div>
									<div className="text">
										<Link href="/preconference-workshops">Pre-conference Workshops</Link>
										<div className="space12" />
										<p>Hands-on workshops on July 9, 2026 covering the latest practices
											and techniques in clinical pharmacy.</p>
									</div>
								</div>
								<div className="space32" />
								<div className="btn-area1" data-aos="fade-left" data-aos-duration={1200}>
									<Link href="/call-for-abstracts" className="vl-btn1">Submit Your Abstract</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
