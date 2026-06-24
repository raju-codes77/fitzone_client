import Banners from "@/components/Banners";
import Feature from "@/components/Feature";
import FeaturedClasses from "@/components/FeaturedClasses";
import LatestForums from "@/components/LatestForums";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banners></Banners>
      <FeaturedClasses/>
      <LatestForums/>
      <Feature></Feature>

    </div>
  );
}
