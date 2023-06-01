import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, listId } = await request.json();

  try {
    const result = await prisma.task.create({
      select: { name: true, listId: true },
      data: { name: name, listId: listId },
    });

    return NextResponse.json({ status: 200, data: result });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
