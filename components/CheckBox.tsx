"use client";

import { useState } from "react";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

interface Props {
  id: number;
  completed: boolean;
  name: string;
  createdAt: Date;
}

const editTaskCompleted = async (id: number, isChecked: boolean) => {
  const res = await fetch(`/api/task/edit/`, {
    method: "POST",
    body: JSON.stringify({ completed: isChecked, id: id }),
  });
};

const handleDelete = async (id: number) => {
  const res = await fetch(`/api/task/delete/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "text/plain" },
  });
};

function CheckBox({ id, completed, name, createdAt }: Props) {
  const [isChecked, setIsChecked] = useState(completed);
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col">
        <div className="flex relative p-4">
          <input
            type="checkbox"
            onChange={() => {
              console.log(id);
              setIsChecked(!isChecked);
              editTaskCompleted(id, !isChecked);
            }}
            checked={isChecked}
            className="w-5 cursor-pointer mr-4"
          />
          <p className={`${isChecked && "line-through"} `}>
            {name} faofhdsaiof hiouasdfhiadsuhfiaduosh fiasdouhfas
            diuohfsadiouhfs
          </p>
          <TrashIcon
            onClick={() => {
              handleDelete(id);
              router.refresh();
            }}
            className="w-6 absolute right-0 top-0 cursor-pointer fill-red-600 hover:fill-red-700 transition-colors duration-300"
          />
        </div>
      </div>
      <div className="flex justify-end py-2">
        <p>{Intl.DateTimeFormat().format(createdAt)}</p>
      </div>
    </>
  );
}

export default CheckBox;
