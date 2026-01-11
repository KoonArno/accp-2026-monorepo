'use client'
import Link from "next/link"
import { Speaker } from '@/data/speakersData'

export default function SpeakerCard({ speaker }: { speaker: Speaker }) {
    return (
        <div className="our-team-boxarea">
            <div className="team-widget-area">
                <img src="/assets/img/elements/elements25.png" alt="" className="elements21" />
                <img src="/assets/img/elements/elements26.png" alt="" className="elements22" />
                <div className="img1">
                    <img src={speaker.image} alt={speaker.name} className="team-img4" />
                    <div className="share">
                        <Link href="#"><img src="/assets/img/icons/share1.svg" alt="" /></Link>
                    </div>
                    <ul>
                        {speaker.socials.facebook && (
                            <li><Link href={speaker.socials.facebook} className="icon1"><i className="fa-brands fa-facebook-f" /></Link></li>
                        )}
                        {speaker.socials.linkedin && (
                            <li><Link href={speaker.socials.linkedin} className="icon2"><i className="fa-brands fa-linkedin-in" /></Link></li>
                        )}
                        {speaker.socials.instagram && (
                            <li><Link href={speaker.socials.instagram} className="icon3"><i className="fa-brands fa-instagram" /></Link></li>
                        )}
                        {speaker.socials.pinterest && (
                            <li><Link href={speaker.socials.pinterest} className="icon4"><i className="fa-brands fa-pinterest-p" /></Link></li>
                        )}
                    </ul>
                </div>
            </div>
            <div className="space28" />
            <div className="content-area">
                <Link href={`/speakers/${speaker.id}`}>{speaker.name}</Link>
                <div className="space16" />
                <p>{speaker.position}</p>
            </div>
        </div>
    )
}
