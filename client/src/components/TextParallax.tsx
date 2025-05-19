"use client"

import React, {useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const IMG_PADDING = 12;

interface ParallaxCardProps {
  imgUrl: string;
  subheading: string;
  heading: string;
  description: string;
  moreInfo: string;
  link: string;
  buttonText: string;
}

const ParallaxCard = ({
  imgUrl,
  subheading,
  heading,
  description,
  moreInfo,
  link,
  buttonText
}: ParallaxCardProps) => {
  return (
    <div style={{ paddingLeft: IMG_PADDING, paddingRight: IMG_PADDING }}>
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
        <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
          {description}
        </h2>
        <div className="col-span-1 md:col-span-8">
          <p className="mb-4 text-xl text-neutral-600 md:text-2xl">{moreInfo}</p>
          <Link href={link}>
            <button className="w-full rounded-full bg-neutral-800 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-900 md:w-fit cursor-pointer">
              {buttonText} <ArrowUpRight className="inline" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const StickyImage = ({ imgUrl }: { imgUrl: string }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div className="absolute inset-0 bg-neutral-950/70" style={{ opacity }} />
    </motion.div>
  );
};

const OverlayCopy = ({
  subheading,
  heading,
}: {
  subheading: string;
  heading: string;
}) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{ y, opacity }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">{subheading}</p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
    </motion.div>
  );
};

export const ParallaxFeature = () => {
  const cardData: ParallaxCardProps[] = [
    {
      imgUrl:
        "/image-1.jpg",
      subheading: "Discover Properties",
      heading: "Find Homes That Match Your Lifestyle",
      description:
        "Explore a wide range of rental listings tailored to your budget, preferred location, and living style — all in one place.",
      moreInfo:
        "From cozy apartments to spacious villas, filter your search by price, locality, furnishing, and more to find the perfect space that feels like home.",
      link: "/rentals",
      buttonText: "Start Exploring",
    },
    {
      imgUrl:
        "/image-2.jpg",
      subheading: "Verified Listings",
      heading: "No Surprises, Only Trusted Homes",
      description:
        "Browse listings with confidence. Every property is verified for authenticity to ensure a smooth and transparent renting experience.",
      moreInfo:
        "We eliminate the guesswork with real photos, accurate owner details, and verified property documents, so you know what to expect before visiting.",
      link: "/verified",
      buttonText: "View Verified Properties",
    },
    {
      imgUrl:
        "/image-3.jpg",
      subheading: "Book Instantly",
      heading: "Reserve Your Rental Hassle-Free",
      description:
        "Found the perfect place? Lock it in before someone else does! Book your rental online in just a few clicks.",
      moreInfo:
        "Our seamless booking process lets you reserve your chosen property, pay securely, and receive instant confirmation — all from the comfort of your home.",
      link: "/book-now",
      buttonText: "Book Your Rental",
    },
  ];

  return (
    <div className="bg-white">
      {cardData.map((item, index) => (
        <ParallaxCard
          key={index}
          imgUrl={item.imgUrl}
          subheading={item.subheading}
          heading={item.heading}
          description={item.description}
          moreInfo={item.moreInfo}
          link={item.link}
          buttonText={item.buttonText}
        />
      ))}
    </div>
  );
};
