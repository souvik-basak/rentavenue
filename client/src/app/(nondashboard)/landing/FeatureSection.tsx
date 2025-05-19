"use client"
import { DragCards } from '@/components/DragCards'
import { ParallaxFeature } from "@/components/TextParallax";
import React from 'react'

const FeatureSection = () => {
  return (
    <div>
      <DragCards />
      <ParallaxFeature />
    </div>
  );
}

export default FeatureSection