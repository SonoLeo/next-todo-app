import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { completed, id } = await req.json();

  const res = await prisma.task.update({
    select: { completed: true },
    where: { id: id },
    data: { completed: completed },
  });

  console.log(res);
  console.log(completed + " " + id);

  return NextResponse.json("task updated");
}
