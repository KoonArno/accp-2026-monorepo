import Layout from "@/components/layout/Layout"
import HeroSection from '@/components/sections/home1/HeroSection';
import WelcomeSection from '@/components/sections/home1/WelcomeSection';
import SpeakersSection from '@/components/sections/home1/SpeakersSection';
import MemoriesSection from '@/components/sections/home1/MemoriesSection';
import MapSection from '@/components/sections/home1/MapSection';
import CtaSection from '@/components/sections/home1/CtaSection';
import MemorialPopup from '@/components/elements/MemorialPopup';
import '@/styles/home-responsive.css';


export default function Home() {
    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <HeroSection />
                <WelcomeSection />
                <SpeakersSection />
                <MemoriesSection />
                <MapSection />
                <CtaSection />
                <MemorialPopup />
            </Layout>
        </>
    )
}

