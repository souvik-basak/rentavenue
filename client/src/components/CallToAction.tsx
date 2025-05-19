"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ButtonWrapper from "./SpotlightButton";

type CtaFeature = {
  backgroundImage: string;
  subheading: string;
  heading: string;
  description: string;
  buttonText: string;
  link: string;
};

const features: CtaFeature[] = [
  {
    backgroundImage:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=80",
    subheading: "Ready to move in?",
    heading: "Book Your Dream Rental Today",
    description:
      "Find the perfect space tailored to your needs and secure it instantly with our simple booking process.",
    buttonText: "Explore Listings",
    link: "/signup",
  },
];

const CtaCard: React.FC<CtaFeature> = ({
  backgroundImage,
  subheading,
  heading,
  description,
  // buttonText,
  link,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="relative w-full overflow-hidden rounded-3xl shadow-lg h-[70vh] md:h-[80vh] flex items-center justify-center"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4 md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-2 text-lg md:text-2xl"
        >
          {subheading}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-4 text-3xl font-bold md:text-5xl leading-tight"
        >
          {heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-6 max-w-2xl text-base md:text-xl"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            href={link}
          >
            <ButtonWrapper text="Try for free"/>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

const CtaSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-12 px-4 md:px-16 py-8">
      {features.map((feature, index) => (
        <CtaCard key={index} {...feature} />
      ))}
    </div>
  );
};

export default CtaSection;
