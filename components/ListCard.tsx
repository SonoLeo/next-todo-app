import Link from "next/link";

interface Props {
  task: {
    id: number;
    emoji: string | null;
    name: string;
    description: string | null;
    createdAt: Date;
  }[];
}
function ListCard({ task }: Props) {
  return (
    <>
      {task.map((t, i) => {
        return (
          <Link
            key={i}
            className="hover:rounded-2xl transition-all duration-300 bg-slate-400/50 flex flex-col h-fit md:w-fit p-8 rounded-lg cursor-pointer shadow-md"
            href={`/tasks/${t.id}`}
          >
            <h1 className="font-bold text-xl">
              {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
            </h1>
            <div className="flex gap-2">
              <div>{t.emoji}</div>
              <div>{t.description}</div>
            </div>
            <div className="text-xs flex justify-end pt-3">
              {Intl.DateTimeFormat("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              }).format(t.createdAt)}
            </div>
          </Link>
        );
      })}
    </>
  );
}

export default ListCard;
