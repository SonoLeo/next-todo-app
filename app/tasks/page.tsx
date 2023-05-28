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
      <div className="w-8/12 flex flex-col md:flex-row gap-6 p-4 h-screen">
        <ListCard task={data} />
      </div>
    </div>
  );
}

export default page;
