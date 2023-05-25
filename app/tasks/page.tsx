import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

interface Props {
  id: string;
}

async function page() {
  const session = await getServerSession(authOptions);
  return <div>{session?.user.id}</div>;
}

export default page;
