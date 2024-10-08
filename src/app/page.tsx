"use server";
import App from "next/app";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import { AppDisplay } from "./landingClient";
import { db } from "~/server/db";

export default async function HomePage() {
  const session = await getServerAuthSession();
  const cats = await db.websiteCategory.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      Websites: true,
    },
  });
  return (
    <div className="min-h-screen w-full bg-slate-800">
      {cats.map((cat) => (
        <div className="ml-4 pt-8">
          <div className="pb-2 text-2xl font-bold text-white">
            {cat.name} :{" "}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {cat.Websites.map((w) => (
              <AppDisplay name={w.name} id={w.id} domain={w.url} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
