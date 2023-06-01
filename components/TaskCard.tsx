"use client";

import { useState } from "react";
import { TaskDeleteButton } from "./buttons";
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
            className="w-3 cursor-pointer mr-4"
          />
          <p className={`${isChecked && "line-through"} `}>{name}</p>
          <TaskDeleteButton id={id} />
        </div>
      </div>
      <div className="flex justify-end py-2">
        <p>{Intl.DateTimeFormat().format(createdAt)}</p>
      </div>
    </>
  );
}

export default CheckBox;
