import "~/styles/globals.css";

import { type Metadata } from "next";
import { useRouter } from "next/navigation";
import ClientLayout from "./clientlayout";
import { getServerAuthSession } from "~/server/auth";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();
  return <ClientLayout session={session} children={children} />;
}
