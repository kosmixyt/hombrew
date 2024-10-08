"use client";
import { Prisma, Website } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { Modal } from "~/components/modal";
import { SelectDomain } from "~/components/selectDomain";

export function PasswordDisplay({
  login,
  pass,
  url,
}: {
  login: string[];
  pass: string[];
  url: string;
}) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const dm = new URL(url);
  const copy = (e: React.MouseEvent<HTMLInputElement>) => {
    navigator.clipboard.writeText(e.currentTarget.value);
    toast.success("Copié");
  };
  return (
    <div
      onClick={() => setOpen(!open)}
      className="w-5/12 cursor-pointer select-none rounded-lg bg-slate-900 pl-4"
    >
      <div className="flex items-center gap-4">
        <img
          src={`https://www.google.com/s2/favicons?domain=${dm.hostname}&sz=48`}
        />
        <a
          target="_blank"
          onClick={(e) => e.stopPropagation()}
          href={url}
          className="capitalize underline"
        >
          youtube.com
        </a>
      </div>
      {open && (
        <div className={`z-20 mb-4 flex justify-center gap-2 bg-slate-900`}>
          <div>
            <div>Username :</div>
            <input
              className="rounded-lg border-2 border-white bg-transparent p-1 font-light text-white outline-none"
              value={login[0]}
              onClick={(e) => copy(e)}
            />
          </div>
          <div>
            <div>Password :</div>
            <input
              className="rounded-lg border-2 border-white bg-transparent p-1 font-light text-white outline-none"
              value={pass[0]}
              type="password"
              onClick={(e) => copy(e)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function AddButton(props: {
  websites: Prisma.WebsiteGetPayload<{ include: { WebsiteCategory: true } }>[];
}) {
  const router = useRouter();
  const [domainId, setDomainId] = React.useState<number>(0);
  const [open, setOpen] = React.useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      className="mt-4 cursor-pointer select-none rounded-lg bg-slate-900 p-4 pl-4 text-center text-2xl font-bold"
    >
      {open &&
        createPortal(
          <span className="text-white" onClick={(e) => e.stopPropagation()}>
            <Modal className="rounded-lg">
              <div className="flex w-4/6 max-w-80 justify-center rounded-lg bg-slate-950">
                <div className="p-4">
                  <div className="text-xl font-semibold">
                    Nouveau Mots de Passe
                  </div>
                  <SelectDomain
                    onselect={(e) => setDomainId(e)}
                    domains={props.websites}
                  />
                  <div>
                    <input
                      className="mt-4 rounded-lg border-2 border-white bg-transparent p-2 text-xl text-white outline-none"
                      placeholder="Username"
                    />
                  </div>
                  <div>
                    <input
                      className="mt-4 rounded-lg border-2 border-white bg-transparent p-2 text-xl text-white outline-none"
                      placeholder="Password"
                    />
                  </div>
                  <div className="mt-4 flex gap-1">
                    <button
                      onClick={() => setOpen(false)}
                      className="w-full rounded-lg border-2 border-white bg-slate-950 p-2 text-xl font-semibold"
                    >
                      Ajouter
                    </button>
                    <button
                      onClick={() => setOpen(false)}
                      className="w-full rounded-lg border-2 border-white bg-slate-950 p-2 text-xl font-semibold"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          </span>,
          document.body,
        )}
      Ajouter un mot de passe
    </div>
  );
}
