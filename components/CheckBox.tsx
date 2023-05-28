"use client";

import { useEffect, useState } from "react";

interface Props {
  id: number;
  completed: boolean;
  name: string;
  createdAt: Date;
}

// const isTaskCompleted = async (id: number): Promise<boolean> => {
//   const res = await fetch(`/api/task/current/${id}`, { method: "GET" });
//   const data: { completed: boolean } = await res.json();

//   return data.completed;
// };

const editTaskCompleted = async (id: number, isChecked: boolean) => {
  const res = await fetch(`/api/task/edit/`, {
    method: "POST",
    body: JSON.stringify({ completed: isChecked, id: id }),
  });
};

function CheckBox({ id, completed, name, createdAt }: Props) {
  const [isChecked, setIsChecked] = useState(completed);

  // useEffect(() => {
  //   const getData = async () => {
  //     setIsChecked(await isTaskCompleted(id));
  //   };
  //   getData();
  // }, []);

  return (
    <>
      <div className="p-2 gap-8">
        <input
          type="checkbox"
          onChange={() => {
            console.log(id);
            setIsChecked(!isChecked);
            editTaskCompleted(id, !isChecked);
          }}
          checked={isChecked}
          className="w-5 cursor-pointer mr-2"
        />
        <span className={`${isChecked && "line-through"}`}>{name}</span>
      </div>
      <div className="grid justify-end">
        {Intl.DateTimeFormat().format(createdAt)}
      </div>
    </>
  );
}

export default CheckBox;
