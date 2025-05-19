"use client";
import CtaSection from "@/components/CallToAction";
import Footer from "@/components/FooterSection"
import FeatureSection from "./FeatureSection";
import Hero from "./Hero";

const Landing = () => {
  return <div>
    <Hero/>
    <FeatureSection/>
    <CtaSection/>
    <Footer/>
  </div>;
};

export default Landing;
