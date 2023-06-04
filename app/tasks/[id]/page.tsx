import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TaskCard from "@/components/TaskCard";
import TaskInputForm from "@/components/forms/TaskInputForm";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// TODO: Add StarButton component and InputForm component at the bottom of the page

interface Props {
  params: { id: string };
}

interface List {
  id: number;
  userId: string;
  emoji: string | null;
  name: string;
  description: string | null;
  createdAt: Date;
}

interface Task {
  tasks: {
    id: number;
    name: string;
    completed: boolean;
    createdAt: Date;
  }[];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const taskData = await getCurrentTasks(params.id);

  return { title: `${taskData?.name} Tasks` };
}

async function getCurrentTasks(id: string): Promise<(List & Task) | null> {
  const idNum = Number(id);
  console.log(idNum);

  const result = await prisma.list.findUnique({
    include: {
      tasks: {
        select: { id: true, name: true, completed: true, createdAt: true },
        orderBy: { id: "asc" },
      },
    },
    where: { id: idNum },
  });

  return result;
}

async function page({ params }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const data = await getCurrentTasks(params.id);

  return (
    <div className="md:w-8/12 md:flex md:flex-col md:mx-auto p-8 mb-8 gap-3">
      {!data ? (
        redirect("/lists")
      ) : data?.tasks.length ? (
        data?.tasks.map((task, i) => (
          <div
            key={i}
            className="grid rounded-lg grid-flow-row mx-auto my-2 p-8 w-full md:w-[450px] h-fit bg-slate-400/50"
          >
            <TaskCard
              id={task.id}
              completed={task.completed}
              name={task.name}
              createdAt={task.createdAt}
            />
          </div>
        ))
      ) : (
        <div>No tasks found. Get started by adding a task!</div>
      )}
      <TaskInputForm listId={Number(params.id)} />
    </div>
  );
}

export default page;
