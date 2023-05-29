import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
  params: { id: number };
}

export async function DELETE(request: Request, { params }: Params) {
  const { id } = params;

  const data = await prisma.task.findFirst({
    select: { id: true },
    where: { id: Number(id) },
  });

  if (!data) {
    return NextResponse.json({ status: 200, result: "" });
  }

  const result = await prisma.task.delete({
    select: { id: true },
    where: { id: Number(id) },
  });

  return NextResponse.json({ status: 200, result: { result } });
}
