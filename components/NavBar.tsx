import React from "react";
import Link from "next/link";
import { SignInButton, SignOutButton } from "./buttons";

function NavBar() {
  return (
    <nav className="flex h-16 text-xl justify-around items-center p-8 bg-slate-800 text-slate-100 w-full">
      <div>
        <Link
          className="font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-slate-200 to-slate-400"
          href="/"
        >
          TaskMaster
        </Link>
      </div>
      <div className="flex gap-8">
        <Link href="/tasks/">🗒️Your Tasks</Link>
        <Link href="/tasks/">⭐Favorites</Link>
        <Link href="/about/">ℹ️ About</Link>
      </div>
      <div className="flex items-center gap-3">
        <SignInButton />
        <SignOutButton />
      </div>
    </nav>
  );
}

export default NavBar;
