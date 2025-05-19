"use client"
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

type ButtonWrapperProps = {
  text: string;
  className?: string;
};

const ButtonWrapper: React.FC<ButtonWrapperProps> = ({
  text,
  className = "",
}) => {
  return (
    <div className="flex min-h-[50px] items-center justify-center px-4">
      <SpotlightButton text={text} className={className} />
    </div>
  );
};

type SpotlightButtonProps = {
  text: string;
  className?: string;
};

const SpotlightButton: React.FC<SpotlightButtonProps> = ({
  text,
  className = "",
}) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { width } = (e.target as HTMLElement)?.getBoundingClientRect();
      const offset = e.offsetX;
      const left = `${(offset / width) * 100}%`;

      spanRef.current?.animate({ left }, { duration: 250, fill: "forwards" });
    };

    const handleMouseLeave = () => {
      spanRef.current?.animate(
        { left: "50%" },
        { duration: 100, fill: "forwards" }
      );
    };

    btnRef.current?.addEventListener("mousemove", handleMouseMove);
    btnRef.current?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      btnRef.current?.removeEventListener("mousemove", handleMouseMove);
      btnRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      ref={btnRef}
      className={`relative cursor-pointer overflow-hidden rounded-full bg-slate-900 px-5 py-3 text-xl font-medium text-white ${className}`}
    >
      <span className="pointer-events-none relative z-10 mix-blend-difference text-xl">
        {text}
      </span>
      <span
        ref={spanRef}
        className="pointer-events-none absolute left-[50%] top-[50%] h-5 w-5 -translate-x-[50%] -translate-y-[50%] rounded-full bg-slate-100 shadow-[0_0_4px_4px_theme(colors.slate.100)]"
      />
    </motion.button>
  );
};

export default ButtonWrapper;
