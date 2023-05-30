"use client";

import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/20/solid";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

interface InputForm {
  emoji: string;
  name: string;
  description: string;
}

const handleClick = async (
  e: React.MouseEvent<HTMLInputElement, MouseEvent>,
  inputForm: InputForm,
  session: Session
) => {
  e.preventDefault();

  if (!inputForm.name || !inputForm.emoji || !inputForm.description)
    return alert("Something");

  const res = await fetch("/api/list/insert", {
    method: "POST",
    body: JSON.stringify({ ...inputForm, userId: session.user.id }),
  });
};

function ListInputForm() {
  const router = useRouter();
  const { data: session } = useSession();

  const [inputForm, setInputForm] = useState<InputForm>({
    name: "",
    description: "",
    emoji: "",
  });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form className="flex fixed gap-2 bottom-0 mx-auto p-2 justify-center w-full items-center">
      <div className="relative">
        <input
          type="text"
          name="emoji"
          className="w-14 rounded-lg bg-slate-300 p-2"
          placeholder="😀"
          value={inputForm.emoji}
          readOnly
        />
        <button
          className="absolute top-0 bottom-0 right-0"
          onClick={(e) => {
            e.preventDefault();
            setShowEmojiPicker(!showEmojiPicker);
          }}
        >
          <MagnifyingGlassCircleIcon className="w-6" />
        </button>
        <div className={`${!showEmojiPicker && "hidden"} fixed bottom-14`}>
          <Picker
            data={data}
            onEmojiSelect={(emoji: string, event: Event) => {
              setInputForm((prev) => ({ ...prev, emoji: emoji.native }));
            }}
            onClickOutside={() => {
              if (showEmojiPicker) setShowEmojiPicker(false);
            }}
          />
        </div>
      </div>
      <input
        type="text"
        name="name"
        placeholder="Name..."
        className="w-2/4 md:w-1/4 outline-none rounded-lg bg-slate-300 p-2"
        onChange={(e) => handleChange(e)}
      />
      <input
        type="text"
        name="description"
        placeholder="Description..."
        className="w-2/4 md:w-1/4 outline-none rounded-lg bg-slate-300 text-black  p-2"
        onChange={(e) => handleChange(e)}
      />
      <input
        type="submit"
        value="Submit"
        onClick={(e) => {
          handleClick(e, inputForm, session!);
          router.refresh();
        }}
        className="rounded-lg bg-blue-700 text-gray-200 py-2 px-4 hover:bg-blue-900 transition-colors duration-200 cursor-pointer"
      />
    </form>
  );
}

export default ListInputForm;
