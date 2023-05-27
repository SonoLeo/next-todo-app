import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ListCard from "@/components/ListCard";

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

  return data.map((list, i) => {
    return (
      <ListCard
        key={i}
        name={list.name}
        description={list.description}
        emoji={list.emoji}
        date={list.createdAt}
      />
    );
  });
}

export default page;
