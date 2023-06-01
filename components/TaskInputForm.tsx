"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const handleClick = async (
  name: string,
  listId: number,
  e: React.MouseEvent<HTMLInputElement, MouseEvent>
) => {
  e.preventDefault();

  if (!name) {
    //! handle error with component
    return;
  }

  const res = await fetch("/api/task/insert", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ name: name, listId: listId }),
  });

  if (!res.ok) {
    //! handle error
  }

  //! handle success
};

function TaskInputForm({ listId }: { listId: number }) {
  const router = useRouter();
  const [name, setName] = useState("");

  return (
    <form className="flex fixed gap-2 bottom-0 left-0 w-full p-2 items-center justify-center">
      <input
        type="text"
        name="name"
        onChange={(e) => setName(e.target.value)}
        placeholder="The name of the task you want to add..."
        className="w-full md:w-1/4 rounded-lg bg-slate-300 p-2 outline-none"
      />
      <input
        type="button"
        value="Submit"
        onClick={(e) => {
          handleClick(name, listId, e);
          router.refresh();
        }}
        className="py-2 px-4 bg-blue-700 text-slate-200 hover:bg-blue-800 cursor-pointer rounded-lg transition-colors duration-200"
      />
    </form>
  );
}

export default TaskInputForm;
