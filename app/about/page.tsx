import React from "react";
import Link from "next/link";

function page() {
  return (
    <div className="flex justify-center items-center p-8 flex-col">
      <h1>About this project!</h1>
      <p>
        Find out more about this project at this{" "}
        <Link
          href="https://github.com/SonoLeo/next-todo-app"
          className="underline text-blue-600"
        >
          link
        </Link>
      </p>
    </div>
  );
}

export default page;
