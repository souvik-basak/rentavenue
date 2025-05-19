"use client";

import React, { MutableRefObject, useRef, useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

export const DragCards = () => {
  return (
    <section className="relative grid min-h-screen w-full place-content-center overflow-hidden">
      <h2 className="relative z-0 text-6xl font-black text-black/60 md:text-[200px]">
        RENTAVENUE<span className="text-indigo-500">.</span>
      </h2>
      <Cards />
    </section>
  );
};

const Cards = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="absolute inset-0 z-10" ref={containerRef}>
      <Card
        containerRef={containerRef}
        src="/prop_horizontal_1.jpg"
        alt="Example image"
        rotate="6deg"
        top="20%"
        left="20%"
        className="w-36 md:w-72"
      />
      <Card
        containerRef={containerRef}
        src="/prop_vertical_1.jpg"
        alt="Example image"
        rotate="12deg"
        top="45%"
        left="62%"
        className="w-24 md:w-50"
      />
      <Card
        containerRef={containerRef}
        src="/prop_horizontal_2.jpg"
        alt="Example image"
        rotate="-6deg"
        top="60%"
        left="15%"
        className="w-52 md:w-80"
      />
      <Card
        containerRef={containerRef}
        src="/prop_vertical_2.jpg"
        alt="Example image"
        rotate="8deg"
        top="35%"
        left="40%"
        className="w-48 md:w-72"
      />
      <Card
        containerRef={containerRef}
        src="/prop_horizontal_3.jpg"
        alt="Example image"
        rotate="18deg"
        top="20%"
        left="73%"
        className="w-40 md:w-64"
      />
      <Card
        containerRef={containerRef}
        src="/prop_vertical_3.jpg"
        alt="Example image"
        rotate="-3deg"
        top="5%"
        left="60%"
        className="w-24 md:w-48"
      />
    </div>
  );
};

interface Props {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  src: string;
  alt: string;
  top: string;
  left: string;
  rotate: string;
  className?: string;
}

const Card = ({
  containerRef,
  src,
  alt,
  top,
  left,
  rotate,
  className,
}: Props) => {
  const [zIndex, setZIndex] = useState(0);

  const updateZIndex = () => {
    const els = document.querySelectorAll(".drag-elements");

    let maxZIndex = -Infinity;

    els.forEach((el) => {
      const zIndex = parseInt(
        window.getComputedStyle(el).getPropertyValue("z-index")
      );

      if (!isNaN(zIndex) && zIndex > maxZIndex) {
        maxZIndex = zIndex;
      }
    });

    setZIndex(maxZIndex + 1);
  };

  return (
    <motion.img
      onMouseDown={updateZIndex}
      style={{
        top,
        left,
        rotate,
        zIndex,
      }}
      className={twMerge(
        "drag-elements absolute w-48 bg-neutral-200 p-1 pb-4",
        className
      )}
      src={src}
      alt={alt}
      drag
      dragConstraints={containerRef}
      // Uncomment below and remove dragElastic to remove movement after release
        // dragMomentum={false}
      dragElastic={0.65}
    />
  );
};
