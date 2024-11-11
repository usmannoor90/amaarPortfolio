"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconMenu2, IconX } from "@tabler/icons-react";

const FloatingNav = ({
  navItems,
  className,
  logoUrl,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
  logoUrl?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        setVisible(scrollDirection === "up");
      }
    }
  });

  const navVariants = {
    hidden: {
      y: -100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  const linkVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
        variants={navVariants}
        className={cn(
          "flex max-w-fit fixed top-4 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black/80 bg-white/80 backdrop-blur-md shadow-lg z-[5000] pr-4 pl-4 py-2 items-center justify-between space-x-4",
          className
        )}
      >
        {/* Logo Section */}
        {logoUrl && (
          <motion.img
            src={logoUrl}
            alt="Logo"
            className="h-8 w-8"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* Desktop Navigation */}
        <div className="flex items-center space-x-6">
          {navItems.map((navItem, idx) => (
            <motion.div
              key={`link-${idx}`}
              variants={linkVariants}
              whileHover="hover"
            >
              <Link
                href={navItem.link}
                className={cn(
                  "relative group flex items-center md:space-x-1",
                  "text-neutral-400 ",
                  pathname === navItem.link && "!text-white "
                )}
              >
                {navItem.icon && (
                  <span className="text-lg">{navItem.icon}</span>
                )}
                <span className="text-sm font-medium md:block hidden   ">
                  {navItem.name}
                </span>

                {/* Animated underline */}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300 ",
                    pathname === navItem.link && "w-full"
                  )}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingNav;
