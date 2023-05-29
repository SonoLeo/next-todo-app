import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { emoji, description, name, userId } = await req.json();

  console.log(emoji, description, name, userId);

  const result = await prisma.list.create({
    data: {
      emoji: emoji,
      description: description,
      name: name,
      userId: userId,
    },
  });

  return NextResponse.json({ status: 200, result: { result } });
}
