"use server";
import { Prisma } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { AddButton, PasswordDisplay } from "./passworddisplay";
import { db } from "~/server/db";

export default async function Password(props: {}) {
  const websites = await db.website.findMany({
    include: {
      Password: true,
    },
  });
  return (
    <div className="h-screen w-full justify-center bg-slate-800 text-white">
      <div className="pt-20 text-center text-4xl font-semibold">
        Gestionnaire de mots de passe
      </div>
      <AddButton websites={websites} />
      <div className="mt-20 flex flex-wrap items-center justify-center gap-4 overflow-auto">
        {websites.map((i) => (
          <PasswordDisplay
            url={i.url}
            login={i.Password.map((i) => i.username)}
            pass={i.Password.map((i) => i.password)}
          />
        ))}
        <div></div>
      </div>
    </div>
  );
}
