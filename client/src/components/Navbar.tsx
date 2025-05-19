"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Menu, MessageCircle, Plus, Search, X } from "lucide-react";
import ButtonWrapper from "./SpotlightButton";
import { useGetAuthUserQuery } from "@/state/api";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "aws-amplify/auth";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage } from "./ui/avatar";
import { SidebarTrigger } from "./ui/sidebar";

const navLinks = [
  { href: "/explore", label: "Explore" },
  { href: "/map", label: "Map" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

type PositionType = {
  left: number;
  width: number;
  opacity: number;
};

const Navbar = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();

  const isDashboardPage =
    pathname.includes("/managers") || pathname.includes("/tenants");
  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  const [position, setPosition] = useState<PositionType>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky top-0 z-[130] h-20 w-full bg-white backdrop-blur-sm transition-all duration-200 ease-in-out">
      <div className="mx-auto grid h-full max-w-[1438px] grid-cols-3 items-center px-6">
        {/* Left: Nav Links (Desktop) */}
        <div className="hidden xl:flex items-center">
          {isDashboardPage && authUser ? (
            <Button
              variant="ghost"
              className="md:ml-4 text-primary-700!  hover:text-black! text-lg! transition-all! duration-200! ease-in-out! cursor-pointer bg-none! outline-none!"
              onClick={() =>
                router.push(
                  authUser.userRole?.toLowerCase() === "manager"
                    ? "/managers/newproperty"
                    : "/search"
                )
              }
            >
              {authUser.userRole?.toLowerCase() === "manager" ? (
                <>
                  <Plus className="h-6! w-6!" />
                  <span className="hidden md:block">Add New Property</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span className="hidden md:block ">Search Properties</span>
                </>
              )}
            </Button>
          ) : (
            <SlideNav
              navLinks={navLinks}
              setPosition={setPosition}
              position={position}
            />
          )}
        </div>

        {/* Center: Logo */}
          {isDashboardPage && (
            <div className="md:hidden mr-4">
              <SidebarTrigger />
            </div>
          )}
        <div className="flex justify-center items-center">
          <Link href="/">
            <Image
              alt="logo"
              src="/logo.svg"
              className="w-48 sm:w-64 md:w-72 lg:w-60 xl:w-72"
              width={300}
              height={100}
            />
          </Link>
        </div>

        {/* Right: Desktop Auth Buttons */}
        <div className="hidden xl:flex items-center justify-end gap-[26px]">
          {authUser ? (
            <>
              <div className="p-2 rounded-full hover:bg-black/10 cursor-pointer transition-all duration-200 ease-in-out">
                <div className="relative hidden md:block">
                  <MessageCircle className="w-6 h-6 text-black-800" />
                  <span className="absolute top-0 right-0 flex h-2 w-2 items-center justify-center rounded-full bg-red-700" />
                </div>
              </div>
              <div className="p-2 rounded-full hover:bg-black/10 cursor-pointer transition-all duration-200 ease-in-out">
                <div className="relative hidden md:block">
                  <Bell className="w-6 h-6 text-black-800" />
                  <span className="absolute top-0 right-0 flex h-2 w-2 items-center justify-center rounded-full bg-red-700" />
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 cursor-pointer bg-black/10 p-2 rounded-full hover:bg-black/20 transition-all duration-200 ease-in-out">
                    <Avatar>
                      <AvatarImage
                        src={authUser.userInfo?.image || "/default-avatar.png"}
                        alt="Profile"
                      />
                    </Avatar>
                    <p className="text-primary-800 hidden md:block text-base font-medium">
                      Hi, {authUser.userInfo?.name || "User"}
                    </p>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white shadow-lg rounded-md p-2 relative z-[200] right-6 top-2 cursor-pointer">
                  <DropdownMenuItem
                    className="text-xl font-medium text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-md cursor-pointer"
                    onClick={() =>
                      router.push(
                        authUser.userRole?.toLowerCase() === "manager"
                          ? "/managers/properties"
                          : "/tenants/favorites",
                        { scroll: false }
                      )
                    }
                  >
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="font-medium text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-md cursor-pointer text-xl"
                    onClick={() =>
                      router.push(
                        `${authUser.userRole?.toLowerCase()}s/settings`,
                        { scroll: false }
                      )
                    }
                  >
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-1" />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="font-medium text-red-800 hover:bg-red-100 px-4 py-2 rounded-md text-xl cursor-pointer"
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="font-medium transition-opacity duration-200 ease-in-out hover:opacity-100 opacity-85 text-xl"
              >
                Sign in
              </Link>
              <Link href="/signup">
                <ButtonWrapper text="Try for free" />
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Hamburger Moved Outside */}
      <div className="flex xl:hidden justify-end items-center p-2 absolute right-4 top-4 z-[140]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 relative w-10 h-10 flex items-center justify-center"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 40 }}
                className="absolute"
              >
                <X size={32} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 40 }}
                className="absolute"
              >
                <Menu size={32} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="xl:hidden text-3xl absolute top-[60px] left-0 w-full bg-white/98 shadow-md p-6 flex flex-col gap-6 z-[129] h-auto pb-6"
          >
            {authUser ? (
              <>
                <div className="text-4xl text-center font-medium text-primary-800 px-2">
                  Hi, {authUser.userInfo?.name || "User"}
                </div>
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    className="text-3xl font-medium border-b-2 border-black/90 hover:border-primary-700 transition-all duration-200 ease-in-out hover:text-primary-700"
                  >
                    <Link href={link.href} onClick={() => setIsOpen(false)}>
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  className="text-3xl font-medium border-b-2 border-black/90 hover:border-primary-700 transition-all duration-200 ease-in-out hover:text-primary-700"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  <Link
                    href={
                      authUser.userRole?.toLowerCase() === "manager"
                        ? "/managers/properties"
                        : "/tenants/favorites"
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                </motion.div>

                <motion.div
                  className="text-3xl font-medium border-b-2 border-black/90 hover:border-primary-700 transition-all duration-200 ease-in-out hover:text-primary-700"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  <Link
                    href={`/${authUser.userRole?.toLowerCase()}s/settings`}
                    onClick={() => setIsOpen(false)}
                  >
                    Settings
                  </Link>
                </motion.div>
              </>
            ) : (
              navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  className="text-3xl font-medium border-b-2 border-black/90 hover:border-primary-700 transition-all duration-200 ease-in-out hover:text-primary-700"
                >
                  <Link href={link.href} onClick={() => setIsOpen(false)}>
                    {link.label}
                  </Link>
                </motion.div>
              ))
            )}

            {!authUser ? (
              <div className="mt-4 flex flex-col gap-2 pb-4">
                <Link
                  href="/signin"
                  className="font-medium text-3xl flex justify-center items-center transition-opacity duration-200 ease-in-out hover:opacity-100 opacity-85"
                  onClick={() => setIsOpen(false)}
                >
                  Sign in
                </Link>
                <Link href="/signup" onClick={() => setIsOpen(false)}>
                  <ButtonWrapper text="Try for free" />
                </Link>
              </div>
            ) : (
              <div className="mt-4">
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="w-full font-medium text-3xl text-center text-red-600 hover:text-red-800 transition-all cursor-pointer hover:bg-red-100 rounded-full px-1 py-1"
                >
                  Sign Out
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

type SlideNavProps = {
  navLinks: { href: string; label: string }[];
  setPosition: React.Dispatch<React.SetStateAction<PositionType>>;
  position: PositionType;
};

const SlideNav: React.FC<SlideNavProps> = ({
  navLinks,
  setPosition,
  position,
}) => {
  return (
    <ul
      onMouseLeave={() => setPosition((prev) => ({ ...prev, opacity: 0 }))}
      className="relative flex bg-white/90 p-1 rounded-full"
    >
      {navLinks.map((link) => (
        <NavItem key={link.href} link={link} setPosition={setPosition} />
      ))}
      <Cursor position={position} />
    </ul>
  );
};

type NavItemProps = {
  link: { href: string; label: string };
  setPosition: React.Dispatch<React.SetStateAction<PositionType>>;
};

const NavItem: React.FC<NavItemProps> = ({ link, setPosition }) => {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 capitalize text-white mix-blend-difference md:mx-5 md:py-3 md:text-base"
    >
      <Link href={link.href}>
        <span className="relative z-10 text-xl">{link.label}</span>
      </Link>
    </li>
  );
};

type CursorProps = {
  position: PositionType;
};

const Cursor: React.FC<CursorProps> = ({ position }) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-8 rounded-full bg-black md:h-12 text-center"
    />
  );
};

export default Navbar;
