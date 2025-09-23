import React, { MouseEventHandler, useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  TbSmartHome,
  TbUsers,
  TbApps,
  TbSearch,
  TbMenu2,
  TbBell,
  TbSun,
  TbMoon,
  TbTags,
  TbMicrophone2,
  TbMessageReport,
  TbArchive,
  TbMessages,
} from "react-icons/tb";
import { Auth } from "aws-amplify";
import { useClickAway } from "react-use";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { getAvatarText } from "@/utils";
import SettingModal from "../ui/modals/SettingModal";
import AdminsModal from "../ui/modals/AdminsModal";
import HospitalsModal from "../ui/modals/HospitalsModal";

function Header() {
  const ref = useRef(null);
  const itemRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const [showMenu, toggleMenu] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const currentUser = useAuth();

  useClickAway(ref, () => {
    toggleMenu(false);
  });

  useClickAway(itemRef, () => {
    setShowItems(false);
  });

  const onToggleMenu = () => {
    setShowItems(false);
    toggleMenu(!showMenu);
  };

  const signOut: MouseEventHandler<HTMLAnchorElement> = async (e) => {
    e.preventDefault();

    try {
      await Auth.signOut();
      router.push("/auth/login");
    } catch (e) {
      console.log(e);
    }
  };

  const toggleDarkTheme = () => {
    document.querySelector("html")?.classList.toggle("dark");
  };

  const openHamburgerMenu = () => {
    toggleMenu(false);
    setShowItems(!showItems);
  };

  return (
    <>
      <nav className="border-gray-200 bg-gray-700 px-2.5 py-2.5 shadow-sm dark:bg-slate-800 sm:px-4 block print:hidden navbar">
        <div
          ref={itemRef}
          className="container mx-0 flex max-w-full flex-wrap items-center lg:mx-auto"
        >
          <div className="flex items-center">
            <Link href="/" className="flex items-center outline-none">
              <Image
                src="/assets/logo-default.svg"
                alt=""
                className=""
                width={100}
                height={28}
              />
            </Link>
          </div>

          <div
            className={`order-2 w-full items-center justify-between md:order-1 md:ml-5 md:flex md:w-auto ${showItems ? "" : "hidden"
              }`}
          >
            <ul className="font-body mt-4 flex flex-col font-medium md:mt-0 md:flex-row md:text-sm md:font-medium space-x-0 md:space-x-4 lg:space-x-6 xl:space-x-8 navbar">
              {/* <li className={"dropdown" + (pathname === '/' ? ' active' : '')}>
								<Link
									href="/dashboard"
									className="flex w-full items-center border-b border-gray-800 py-2 px-3 font-medium md:border-0 md:p-0"
								>
									<TbSmartHome className="text-lg mr-1" /> Dashboard
								</Link>
							</li>
							<li className={"dropdown" + (pathname === '/users' ? ' active' : '')}>
								<Link
									href="/users"
									className="dropdown-toggle flex w-full items-center border-b border-gray-800 py-2 px-3 font-medium md:border-0 md:p-0"
								>
									<TbUsers className="text-lg mr-1" /> Users
								</Link>
							</li> */}
              <li className={"dropdown" + (pathname === "/" ? " active" : "")}>
                <Link
                  href="/"
                  className="dropdown-toggle flex w-full items-center border-b border-gray-800 py-2 px-3 font-medium md:border-0 md:p-0"
                >
                  <TbArchive className="text-lg mr-1" /> User Posts
                </Link>
              </li>
              <li
                className={
                  "dropdown" + (pathname === "/questions" ? " active" : "")
                }
              >
                <Link
                  href="/questions"
                  className="dropdown-toggle flex w-full items-center border-b border-gray-800 py-2 px-3 font-medium md:border-0 md:p-0"
                >
                  <TbMessages className="text-lg mr-1" /> QA Exchange
                </Link>
              </li>
              <li
                className={
                  "dropdown" + (pathname?.startsWith("/rooms") ? " active" : "")
                }
              >
                <Link
                  href="/rooms"
                  className="dropdown-toggle flex w-full items-center border-b border-gray-800 py-2 px-3 font-medium md:border-0 md:p-0"
                >
                  <TbApps className="text-lg mr-1" /> Rooms
                </Link>
              </li>
              <li
                className={
                  "dropdown" + (pathname?.startsWith("/tags") ? " active" : "")
                }
              >
                <Link
                  href="/tags"
                  className="dropdown-toggle flex w-full items-center border-b border-gray-800 py-2 px-3 font-medium md:border-0 md:p-0"
                >
                  <TbTags className="text-lg mr-1" /> Tags
                </Link>
              </li>
              <li
                className={
                  "dropdown" + (pathname === "/announcements" ? " active" : "")
                }
              >
                <Link
                  href="/announcements"
                  className="dropdown-toggle flex w-full items-center border-b border-gray-800 py-2 px-3 font-medium md:border-0 md:p-0"
                >
                  <TbMicrophone2 className="text-lg mr-1" /> Announcement
                </Link>
              </li>
              <li
                className={
                  "dropdown" + (pathname === "/my-posts" ? " active" : "")
                }
              >
                <Link
                  href="/my-posts"
                  className="dropdown-toggle flex w-full items-center border-b border-gray-800 py-2 px-3 font-medium md:border-0 md:p-0"
                >
                  <TbArchive className="text-lg mr-1" /> My Posts
                </Link>
              </li>
              {/* <li
                className={
                  'dropdown' +
                  (pathname?.startsWith('/myposts') ? ' active' : '')
                }
              >
                <Link
                  href="/records"
                  className="flex items-center w-full px-3 py-2 font-medium border-b border-gray-800 dropdown-toggle md:border-0 md:p-0"
                >
                  <TbArchive className="mr-1 text-lg" /> Records
                </Link>
              </li> */}
              {/* <li className={"dropdown" + ( pathname === '/suggestions' ? ' active' : '' )}>
							<Link
								href="/suggestions"
								className="dropdown-toggle flex w-full items-center border-b border-gray-800 py-2 px-3 font-medium md:border-0 md:p-0"
							>
								<TbMessageReport className="text-lg mr-1" /> Suggestions
							</Link>
						</li> */}
            </ul>
          </div>
          <div className="order-1 ml-auto flex items-center md:order-2">
            <div className="relative mr-2 hidden lg:mr-4 lg:block">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <TbSearch className="text-gray-400 z-10" />
              </div>
              <input
                type="text"
                id="email-adress-icon"
                className="block w-full rounded-lg border border-gray-700 bg-gray-900 p-2 pl-10 text-gray-300 outline-none focus:border-gray-700 focus:ring-gray-700 dark:bg-slate-800 sm:text-sm"
                placeholder="Search..."
              />
            </div>
            <div className="mr-2 lg:mr-4">
              <button
                className="flex rounded-full md:mr-0 relative"
                onClick={toggleDarkTheme}
              >
                <TbSun className="dark:hidden text-2xl text-slate-400" />
                <TbMoon className="hidden dark:inline-block text-2xl text-slate-400" />
              </button>
            </div>
            <div className="mr-2 lg:mr-4 dropdown relative">
              <button
                type="button"
                className="dropdown-toggle flex rounded-full md:mr-0"
              >
                <TbBell className="text-2xl text-gray-400" />
              </button>

              <div className="dropdown-menu dropdown-menu-right z-50 my-1 hidden w-64 list-none divide-y h-52 divide-gray-100 rounded border-slate-700 md:border-white text-base shadow dark:divide-gray-600 bg-white dark:bg-slate-800"></div>
            </div>
            <div className="mr-2 lg:mr-0 dropdown relative">
              <button
                onClick={onToggleMenu}
                type="button"
                className="dropdown-toggle flex items-center rounded-full text-sm focus:bg-none focus:ring-0 dark:focus:ring-0 md:mr-0"
              >
                <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <span className="font-medium text-gray-600 dark:text-gray-300 uppercase">
                    {getAvatarText(
                      currentUser?.attributes?.preferred_username as string
                    )}
                  </span>
                </div>
                <span className="ml-2 hidden text-left xl:block">
                  <span className="block font-medium text-gray-400">
                    {currentUser?.attributes?.preferred_username}
                  </span>
                  <span className="-mt-1 block text-sm font-medium text-gray-500">
                    Admin
                  </span>
                </span>
              </button>

              <div
                ref={ref}
                className={
                  "dropdown-menu dropdown-menu-right z-50 my-1 list-none divide-y divide-gray-100 rounded border-slate-700 md:border-white text-base shadow dark:divide-gray-600 bg-white dark:bg-slate-800" +
                  (showMenu ? "" : " hidden")
                }
              >
                <div className="py-3 px-4">
                  <span className="block text-sm font-medium text-gray-900 dark:text-white">
                    {currentUser?.attributes?.preferred_username}
                  </span>
                  <span className="block truncate text-sm font-normal text-gray-500 dark:text-gray-400">
                    {currentUser?.attributes.email}
                  </span>
                </div>
                <ul className="py-1">
                  <li>
                    <Link
                      href="/dashboard"
                      className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-900/20 dark:hover:text-white"
                    >
                      Dashboard
                    </Link>
                  </li>
                  {currentUser?.attributes["custom:isSuperAdmin"] == "true" && (
                    <li>
                      <AdminsModal onToggleMenu={onToggleMenu} />{" "}
                    </li>
                  )}
                  {currentUser?.attributes["custom:isSuperAdmin"] == "true" && (
                    <li>
                      <HospitalsModal onToggleMenu={onToggleMenu} />
                    </li>
                  )}
                  <li>
                    <Link
                      href="/users"
                      className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-900/20 dark:hover:text-white"
                    >
                      Users
                    </Link>
                  </li>
                  <li>
                    <SettingModal onToggleMenu={onToggleMenu} />
                  </li>
                  <li>
                    <a
                      onClick={signOut}
                      href="#"
                      className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-900/20 dark:hover:text-white"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <button
              type="button"
              className="ml-1 inline-flex items-center rounded-lg text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-0 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
              onClick={openHamburgerMenu}
            >
              <span className="sr-only">Open main menu</span>
              <TbMenu2 className="h-6 w-6 text-lg leading-6" />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
