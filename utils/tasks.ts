"use server";

import { prisma } from "@/lib/prisma";

export const editTaskCompleted = async (
  id: number,
  isChecked: boolean
): Promise<void> => {
  "use server";

  prisma.task.update({
    where: { id: Number(id) },
    data: { completed: isChecked },
  });
};

export const isTaskCompleted = async (id: number): Promise<boolean> => {
  const res = await prisma.task.findUnique({
    select: { completed: true },
    where: { id: Number(id) },
  });

  return res?.completed!;
};
