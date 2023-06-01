"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

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
      className="hover:bg-blue-700 hover:text-slate-100 text-slate-950 transition-all duration-200 border-none font-bold bg-slate-100 md:px-4 p-2 rounded-lg"
      onClick={() => signIn()}
    >
      <span className="md:inline hidden">Sign In</span>
      <ArrowLeftOnRectangleIcon className="md:hidden w-8" />
    </button>
  );
}

export function SignOutButton() {
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <button
        className="hover:bg-blue-700 hover:text-slate-100 text-slate-950 transition-all duration-200 border-none font-bold bg-slate-100 md:px-4 p-2 rounded-lg"
        onClick={() => signOut()}
      >
        <span className="md:inline hidden">Log Out</span>
        <ArrowRightOnRectangleIcon className="md:hidden w-8" />
      </button>
    );
  } else return <></>;
}

export function TaskDeleteButton({ id }: { id: number }) {
  const handleDelete = async () => {
    const res = await fetch(`/api/task/delete/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    return res;
  };

  const router = useRouter();

  return (
    <div>
      <TrashIcon
        onClick={() => {
          handleDelete();
          router.refresh();
        }}
        className="w-6 absolute right-0 top-0 cursor-pointer fill-red-600 hover:fill-red-700 transition-colors duration-300"
      />
    </div>
  );
}

export function ListDeleteButton({ id }: { id: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch(`/api/list/delete/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    return res;
  };

  return (
    <>
      <TrashIcon
        onClick={() => {
          handleDelete();
          router.refresh();
        }}
        className="w-6 z-100 cursor-pointer fill-red-600 hover:fill-red-700 transition-colors duration-300"
      />
    </>
  );
}
