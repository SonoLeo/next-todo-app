import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ListCard from "@/components/ListCard";
import { Metadata } from "next";

// TODO: display data on the page using a ListCard component

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

  console.log(data);

  return (
    <div className="flex items-center justify-center">
      <div className="grid grid-rows-1 w-full md:w-8/12 md:flex md:justify-around p-4 gap-3">
        {data.length ? (
          <ListCard task={data} />
        ) : (
          <div>No lists found. Get started by adding a list.</div>
        )}
      </div>
    </div>
  );
}

export default page;
