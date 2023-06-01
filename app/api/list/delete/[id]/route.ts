import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
  params: { id: number };
}

export async function DELETE(req: Request, { params }: Params) {
  const id = params.id;

  try {
    const result = await prisma.list.delete({
      select: { id: true },
      where: { id: Number(id) },
    });

    return NextResponse.json({ status: 200, data: { id } });
  } catch (error) {
    return NextResponse.json({ status: 200, data: "" });
  }
}
