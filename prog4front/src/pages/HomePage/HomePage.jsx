
import { Footer } from "../../components/Footer/Footer";
import { GymCarousel } from "../../components/GymCarousel/GymCarousel";
import { HeaderMenu } from "../../components/HeaderMenu/HeaderMenu";
import { HeroSection } from "../../components/HeroSection/HeroSection";

export function HomePage() {
	return <>

		<HeaderMenu />
		<main>
			<HeroSection />
			<GymCarousel />
		</main>
		<Footer />

		</>;



}
