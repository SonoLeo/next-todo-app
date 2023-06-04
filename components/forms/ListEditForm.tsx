"use client";

import { List } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import EmojiPicker from "../client/EmojiPicker";

interface Props {
  id: number;
  selectedList: List;
}

interface ListParams {
  name: string;
  description: string;
  emoji: string;
}

function ListEditForm({ id, selectedList }: Props) {
  const session = useSession();
  const [list, setList] = useState<ListParams>(selectedList as ListParams);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    console.log(selectedList);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setList((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //   const handleSend = (e: React.Event)

  return (
    <form className="w-full h-5/6 flex  justify-center items-center">
      <div className="flex flex-col items-center p-8 w-3/4 h-3/4 md:w-2/4 border-slate-800 border-2 shadow-lg rounded-md bg-slate-400/20">
        <h1 className="text-2xl font-bold">List {id}</h1>
        <div className="flex flex-row relative items-center p-4 gap-2">
          <h2>Emoji:</h2>
          <EmojiPicker
            list={list}
            setList={setList}
            pickerPositionClass="top-12"
          />
        </div>
        <div className="flex flex-row items-center p-4 gap-2">
          <h2>Name:</h2>
          <input
            type="text"
            name="name"
            value={list.name}
            className="w-full outline-none rounded-lg bg-slate-300 text-black p-2"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="flex flex-row items-center p-4 gap-2">
          <h2>Description:</h2>
          <input
            type="text"
            name="description"
            value={list.description}
            className="w-full outline-none rounded-lg bg-slate-300 text-black p-2"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="flex flex-row p-4 gap-2">
          <input
            type="button"
            value="Save And Exit"
            className="bg-blue-700 font-bold text-white px-4 py-2 rounded-md"
          />
          <input
            type="button"
            value="Apply"
            className="bg-white border-2 border-blue-700 font-bold text-blue-700 px-4 py-2 rounded-md"
            onClick={(e) => {
              e.preventDefault();
              // * make fetch to server which edits the list
              console.log(list);
            }}
          />
        </div>
      </div>
    </form>
  );
}

export default ListEditForm;
