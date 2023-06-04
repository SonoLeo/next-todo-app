import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ListEditForm from "@/components/forms/ListEditForm";
import { prisma } from "@/lib/prisma";
import { List } from "@prisma/client";
import { getServerSession } from "next-auth";

interface Props {
  params: { id: string };
}

const getSelectedList = async (id: string): Promise<List> => {
  const session = await getServerSession(authOptions);

  const result = await prisma.list.findFirst({
    where: { id: Number(id), userId: session?.user.id },
  });

  // ! redirect to lists page
  if (!result) {
    throw new Error(`List with ${id} not found`);
  }

  return result;
};

async function page({ params }: Props) {
  return (
    <ListEditForm
      id={Number(params.id)}
      selectedList={await getSelectedList(params.id)}
    />
  );
}

export default page;
