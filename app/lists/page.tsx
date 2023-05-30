import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ListCard from "@/components/ListCard";
import { Metadata } from "next";
import ListInputForm from "@/components/ListInputForm";

export const metadata: Metadata = {};

async function page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const data = await prisma.list.findMany({
    where: { userId: session?.user.id },
  });

  metadata.title = `${session.user.name}'s tasks`;

  return (
    <>
      <div className="flex justify-center h-fit">
        <div className="grid w-full md:w-8/12 md:flex md:flex-wrap p-4 gap-3">
          {data.length ? (
            <ListCard task={data} />
          ) : (
            <div>No lists found. Get started by adding a list.</div>
          )}
        </div>
      </div>
      <ListInputForm />
    </>
  );
}

export default page;
