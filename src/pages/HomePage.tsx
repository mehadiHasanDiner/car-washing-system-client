import FeaturedService from "../components/ui/homePage/Featured/FeaturedService";
import HeroSection from "../components/ui/homePage/HeroSection/HeroSection";
import ReviewSection from "../components/ui/homePage/ReviewSection/ReviewSection";

const HomePage = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <FeaturedService></FeaturedService>
      <ReviewSection></ReviewSection>
    </div>
  );
};

export default HomePage;
