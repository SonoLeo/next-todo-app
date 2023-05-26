import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

// TODO: display data on the page using a ListCard component

async function page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const data = await prisma.list.findMany({
    where: { userId: session?.user.id },
  });

  console.log(data);

  return <div>{JSON.stringify(data)}</div>;
}

export default page;
