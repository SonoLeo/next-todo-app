import Image from "next/image";
import tasks from "../public/tasks.svg";

export default function Home() {
  return (
    <main className="flex justify-center items-center p-8 flex-col">
      <h1 className="p-4">
        Welcome to{" "}
        <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-blue-300 to-cyan-700">
          TaskMaster
        </span>
        !
      </h1>
      <p className="p-4">
        Get started by logging in and start creating your lists!
      </p>
      <Image
        src={tasks}
        alt="Tasks image"
        width={500}
        height={500}
        className="m-12"
      />
    </main>
  );
}
