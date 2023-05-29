import React from "react";
import Link from "next/link";
import { SignInButton, SignOutButton } from "./buttons";
import HamburgerMenu from "./HamburgerMenu";
import { HomeIcon } from "@heroicons/react/24/solid";

function NavBar() {
  return (
    <div className="z-50 sticky top-0 inline-flex text-xl justify-between items-start md:items-center p-8 bg-slate-800 text-slate-100 w-full">
      <div>
        <Link href="/">
          <span className="hidden md:inline font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-slate-200 to-slate-400">
            TaskMaster
          </span>
          <HomeIcon className="md:hidden w-10" />
        </Link>
      </div>
      <HamburgerMenu>
        <Link href="/lists/">🗒️Your Tasks</Link>
        <Link href="/tasks/favorites">⭐Favorites</Link>
        <Link href="/about/">ℹ️About</Link>
      </HamburgerMenu>
      <div className="flex items-center gap-3">
        <SignInButton />
        <SignOutButton />
      </div>
    </div>
  );
}

export default NavBar;
