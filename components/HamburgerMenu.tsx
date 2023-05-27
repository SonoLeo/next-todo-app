"use client";

import { useState } from "react";

interface Props {
  children: React.ReactElement[];
}

function HamburgerMenu({ children }: Props) {
  let [hamburgerClicked, setHamburgerClicked] = useState(false);

  return (
    <div className="space-y-8">
      <div
        className="space-y-1 md:hidden p-4"
        onClick={() => setHamburgerClicked(!hamburgerClicked)}
      >
        <div className="w-8 bg-gray-300 h-1 rounded-md mx-auto"></div>
        <div className="w-8 bg-gray-300 h-1 rounded-md mx-auto"></div>
        <div className="w-8 bg-gray-300 h-1 rounded-md mx-auto"></div>
      </div>
      <div
        className={`${
          !hamburgerClicked && "hidden"
        } md:flex text-center self-center`}
      >
        <div className="space-x-4 flex md:flex-row flex-col gap-3">
          {children}
        </div>
      </div>
    </div>
  );
}

export default HamburgerMenu;
