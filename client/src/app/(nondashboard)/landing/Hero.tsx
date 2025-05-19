"use client";
import DrawCircleText from "@/components/DrawCircleText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import React, { useState } from "react";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="px-4"
    >
      <DrawCircleText />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        className="text-[22px] sm:text-[24px] opacity-90 text-center font-light leading-9 max-w-2xl mx-auto pt-6"
      >
        One destination to find your next perfect rental home.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
        className="relative mx-auto px-24 md:px-0 my-6 flex w-full max-w-[605px] flex-col md:flex-row md:border-1 rounded-full items-stretch md:h-16 bg-white gap-3 md:gap-0"
      >
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by city, neighborhood or address"
          className="h-14 md:h-full w-full rounded-full border-0 bg-white text-xl md:text-lg font-normal placeholder:text-slate-400 focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-400"
        />

        <Button
          onClick={() => console.log("Searching for:", searchQuery)}
          className="h-14 md:h-full md:rounded-full bg-slate-800 text-white hover:bg-slate-900 rounded-full"
        >
          <div className="inline-flex items-center justify-center gap-3 text-base md:text-lg px-4 h-full w-full md:w-auto">
            <Search className="h-6 w-6" />
            <span className="font-medium text-xl">Search</span>
          </div>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
