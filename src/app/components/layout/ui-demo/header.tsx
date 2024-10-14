"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
// import { NavigationMenuDemo } from "./navigation-menu-demo";
import InputDemo from "./input-searh-demo";
import { useEffect, useState } from "react";
// import '../../../index.css'
// import { House, Mail, Menu, Package, ShoppingBag, User, X } from "lucide-react";
import { ChevronLeft, House, LogIn, Menu, X } from "lucide-react";
import UserMenu from "./user-menu-demo";
import { UseGlobal } from "@/app/contexts/globalContext/globalContext";
import { UserAuth } from "@/app/contexts/authContext/authContext";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const { showLogo, setShowLogoBar } = UseGlobal();
  const { user } = UserAuth();
  const [position, setPosition] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);
  setShowLogoBar(visible);
  useEffect(() => {
    const handleScroll = () => {
      const moving = window.scrollY;

      setVisible(position > moving);
      setPosition(moving);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const cls = visible ? "visiblee" : "hiddenn";

  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className={`bg-white sticky z-40  top-0 px-4  border-b ${cls}`}>
      <header
        className={`px-0  flex h-20 w-full shrink-0 items-center md:px-0 justify-between  bg-white transition-all duration-300 ease-in-out container`}
      >
        {/* <div className={`fixed left-0 right-0 border-b top-20 `} /> */}
        <Sheet>
          {pathname.slice(0, 6) === "/promo" ? (
            <div className="flex lg:hidden">
              <Button
                onClick={() => router.back()}
                variant="outline"
                size="icon"
                className={`!px-2  ${showLogo ? "mr-5" : "mr-0"}`}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              {!showLogo && (
                <Link
                  href="#"
                  className={`   items-center gap-2 font-semibold flex mx-5 `}
                >
                  <div className="flex w-28 gap-2">
                    {/* <img
                          src={logo}
                          alt="Galdino logo"
                          className="w-56 user-select-none pointer-events-none "
                        /> */}
                           <Image width={16} height={16} alt="CoyPromo Logo" className="rounded-full border"  src="/logo.svg"/>
                    <span className="">CoyPromo</span>
                  </div>
                  <span className="sr-only">CoyPromo</span>
                </Link>
              )}
            </div>
          ) : (
            <SheetTrigger asChild>
              <div className={`flex items-center justify-center lg:hidden `}>
                <Button
                  variant="outline"
                  size="icon"
                  className={`!px-2  ${showLogo ? "mr-5" : "mr-0"}`}
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>

                {!showLogo && (
                  <Link
                    href="#"
                    className={` hidde lg:flex items-center gap-2 font-semibold flex mx-5 `}
                  >
                    <div className="flex w-28 gap-2 items-center">
                      {/* <img
                      src={logo}
                      alt="Galdino logo"
                      className="w-56 user-select-none pointer-events-none "
                    /> */}
                     <Image width={16} height={16} alt="CoyPromo Logo" className="rounded-full border w-8 h-8"  src="/logo.svg"/>
                     <span className="font-bold">CoyPromo</span>
                    </div>
                    <span className="sr-only">CoyPromo</span>
                  </Link>
                )}
              </div>
            </SheetTrigger>
          )}
          <SheetContent
            side="left"
            className="bg-white dark:bg-gray-950 z-[999]"
          >
            <div className="flex h-full max-h-screen flex-col">
              <div className="flex h-20 items-center justify-between border-b px-3">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-semibold"
                >
                  {/* <img
                    src={logo}
                    alt="Galdino logo"
                    className="w-36 user-select-none pointer-events-none "
                  /> */}
                   <Image width={16} height={16} alt="CoyPromo Logo" className="rounded-full border w-10 h-10"  src="/logo.svg"/>
                   <span className="font-bold">CoyPromo</span>
                  <span className="sr-only">CoyPromo</span>
                </Link>
                <SheetClose
                  asChild
                  className="absolute top-4 right-4 bg-white z-50"
                >
                  <Button variant="outline" size="icon" className="bg-white">
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </SheetClose>
              </div>
              <nav className="flex-1 overflow-auto py-6">
                <div className="grid gap-4 px-0">
                  <Link
                    href="/"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 hover:bg-gray-200"
                  >
                    <House className="h-5 w-5" />
                    Home
                  </Link>
                  {!user && (
                    <Link
                      href="/login"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 hover:bg-gray-200"
                    >
                      <LogIn className="h-5 w-5" />
                      Login
                    </Link>
                  )}
                  {/* <Link
                    to="#"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 hover:bg-gray-200"
                  >
                    <User className="h-5 w-5" />
                    About
                  </Link>
                  <Link
                    to="#"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 hover:bg-gray-200"
                  >
                    <Package className="h-5 w-5" />
                    Products
                  </Link>
                  <Link
                    to="#"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 hover:bg-gray-200"
                  >
                    <Mail className="h-5 w-5" />
                    Contact
                  </Link> */}
                </div>
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        {/* TELAS MAIORES - HEADER */}

        <Link
          href="/"
          className={`items-center gap-2 font-semibold hidden lg:flex group transition-all duration-200`}
        >
          {/* <img
            src={logo}
            alt="Galdino logo"
            className="w-36 user-select-none pointer-events-none hidden lg:flex"
          /> */}
          <Image width={16} height={16} alt="CoyPromo Logo" className="rounded-full border w-10 h-10"  src="/logo.svg"/>
          <span className="font-bold">CoyPromo</span>
          <span className="sr-only">CoyPromo</span>
        </Link>
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="!w-full">
            {/* <Link
              to="#"
              className="mr-6 hidden lg:flex  "
            >
                        <img src={logo} alt="" className="w-40" />

            </Link> */}

            {/* Categorias */}
            {/* <NavigationMenuDemo /> */}

            {/* <NavigationMenuLink asChild>
              <Link
                to="#"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              >
                Homee
              </Link>
            </NavigationMenuLink>

            <NavigationMenuLink asChild>
              <Link
                to="#"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              >
                About
              </Link>
            </NavigationMenuLink>
             */}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="inline-flex w-full justify-end  ">
          {/* <div className="flex w-[50%] justify-end "> */}

          <InputDemo />
          {user && <UserMenu />}
        </div>
        {/* </div> */}
      </header>
    </header>
  );
}
