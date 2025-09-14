import Banner from "../../components/Banner/Banner";
import { Faqs } from "../../components/Faqs/Faqs";
import { Footer } from "../../components/Footer/Footer";
import { GymCarousel } from "../../components/GymCarousel/GymCarousel";
import { HeaderMenu } from "../../components/HeaderMenu/HeaderMenu";
import { HeroSection } from "../../components/HeroSection/HeroSection";
import "./HomePage.css";

export function HomePage() {
	return <>

		<HeaderMenu />

		<main>
			<HeroSection />
			<Banner />
			<GymCarousel />
			<Faqs />
		</main>

		<Footer />

	</>;

}
