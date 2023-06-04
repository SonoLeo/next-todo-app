"use client";

import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useState } from "react";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/20/solid";

interface ListParams {
  name: string;
  description: string;
  emoji: string;
}

interface Props {
  list: ListParams;
  setList: React.Dispatch<React.SetStateAction<ListParams>>;
  pickerPositionClass?: string;
}

function EmojiPicker({ list, setList, pickerPositionClass }: Props) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  return (
    <>
      <div className="relative">
        <input
          type="text"
          name="emoji"
          className="w-14 rounded-lg bg-slate-300 p-2"
          placeholder="😀"
          value={list?.emoji!}
          readOnly
        />
        <button
          className="absolute right-0 top-0 bottom-0"
          onClick={(e) => {
            e.preventDefault();
            setShowEmojiPicker(!showEmojiPicker);
          }}
        >
          <MagnifyingGlassCircleIcon className="w-6" />
        </button>
        <div
          className={`${
            !showEmojiPicker && "hidden"
          } absolute ${pickerPositionClass}`}
        >
          <Picker
            data={data}
            onEmojiSelect={(emoji: { native: string }, event: Event) => {
              setList((prev) => ({ ...prev, emoji: emoji.native }));
            }}
            onClickOutside={() => {
              if (showEmojiPicker) setShowEmojiPicker(false);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default EmojiPicker;
