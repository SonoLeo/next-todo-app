"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export function SignInButton() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <Link href={`/dashboard`}>
        <Image
          src={session.user?.image!}
          width={32}
          height={32}
          alt="Your Name"
          className="rounded-full xl:w-10"
        />
      </Link>
    );
  }
  if (status === "loading") {
    return <div>...</div>;
  }

  return (
    <button
      className="hover:bg-blue-700 hover:text-slate-100 text-slate-950 transition-all duration-200 border-none font-bold bg-slate-100 px-4 py-2 rounded-lg"
      onClick={() => signIn()}
    >
      Sign In
    </button>
  );
}

export function SignOutButton() {
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <button
        className="hover:bg-blue-700 hover:text-slate-100 text-slate-950 transition-all duration-200 border-none font-bold bg-slate-100 px-4 py-2 rounded-lg"
        onClick={() => signOut()}
      >
        Log Out
      </button>
    );
  } else return <></>;
}
