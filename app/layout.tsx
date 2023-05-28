import "./globals.css";
import { Roboto } from "next/font/google";
import AuthProvider from "../components/AuthProvider";
import NavBar from "@/components/NavBar";

const roboto = Roboto({
  weight: ["900", "100", "300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "TaskMaster",
  description: "Your task tracker application",
  visualViewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={`${roboto.className} h-screen bg-gradient-to-l from-cyan-100 via-sky-100 to-blue-100`}
        >
          <NavBar />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
