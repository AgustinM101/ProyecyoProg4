

import { BannerGym } from "../../components/BannerGym/BannerGym";
import BannerSubscribe from "../../components/BannerSubscribe/BannerSubscribe";
import { Faqs } from "../../components/Faqs/Faqs";
import { Footer } from "../../components/Footer/Footer";
import { GymCarousel } from "../../components/GymCarousel/GymCarousel";
import { HeaderMenu } from "../../components/HeaderMenu/HeaderMenu";
import { HeroSection } from "../../components/HeroSection/HeroSection";
import { Transformations } from "../../components/Transformations/Transformations";
import "./HomePage.css";

export function HomePage() {
	return <>

		<HeaderMenu />
		
		<main>

			<HeroSection />

			<BannerGym />
			
			<GymCarousel />

			<Transformations />

			<BannerSubscribe />

			<Faqs />

		</main>

		<Footer />

	</>;

}
