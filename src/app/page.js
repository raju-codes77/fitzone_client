import Banners from "@/components/Banners";
import BecomeTrainerSection from "@/components/BecomeTrainerSection";
import Feature from "@/components/Feature";
import FeaturedClasses from "@/components/FeaturedClasses";
import LatestForums from "@/components/LatestForums";
import Image from "next/image";
import AIFeatureSection from "@/components/AIFeatureSection";

export default function Home() {
  return (
    <div>
      <Banners></Banners>
      <AIFeatureSection />
      <FeaturedClasses/>
      <LatestForums/>
      <BecomeTrainerSection/>
      <Feature></Feature>

    </div>
  );
}
