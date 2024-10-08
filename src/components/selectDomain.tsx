import { Prisma, Website, WebsiteCategory } from "@prisma/client";
import { useState } from "react";
import { Modal } from "./modal";

export function SelectDomain(props: {
  domains: Prisma.WebsiteGetPayload<{ include: { WebsiteCategory: true } }>[];
  onselect: (id: number) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-2 flex items-center gap-2">
      <select
        onChange={(e) => props.onselect(parseInt(e.target.value))}
        className="h-8 w-full rounded-lg border-2 border-white bg-transparent text-center"
      >
        {props.domains.map((i) => (
          <option key={i.id} value={i.id}>
            {i.url}
          </option>
        ))}
        <option value={0}>-- Select Domain --</option>
      </select>
      <div>
        <button
          onClick={() => setOpen(true)}
          className="flex h-8 w-12 items-center justify-center rounded-lg border-2 border-white bg-slate-950 p-1 text-center text-xl font-semibold"
        >
          <span>+</span>
        </button>
      </div>
      {open && (
        <Modal zindex={40}>
          <div className="w-4/6 max-w-80 justify-center rounded-lg bg-slate-950">
            <div className="p-4 text-xl">New Domain</div>
            <div className="m-4">
              <SelectCategory
                cats={props.domains
                  .map((e) => e.WebsiteCategory)
                  .flat()
                  .filter((e) => e != null)}
              />
            </div>
            <input
              className="m-4 rounded-lg border-2 border-white bg-transparent p-2 text-xl text-white outline-none"
              placeholder="Domain"
            />
            <div className="m-4 flex">
              <button
                onClick={() => setOpen(false)}
                className="w-full rounded-lg border-2 border-white bg-slate-950 p-2 text-xl font-semibold"
              >
                Add
              </button>
              <button
                onClick={() => setOpen(false)}
                className="w-full rounded-lg border-2 border-white bg-slate-950 p-2 text-xl font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export function SelectCategory(props: { cats: WebsiteCategory[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-2 flex items-center gap-2">
      <select className="h-8 w-full rounded-lg border-2 border-white bg-transparent text-center">
        {props.cats.map((i) => (
          <option key={i.id} value={i.id}>
            {i.name}
          </option>
        ))}
        <option value={0}>-- Select Category --</option>
      </select>
      <div>
        <button
          onClick={() => setOpen(true)}
          className="flex h-8 w-12 items-center justify-center rounded-lg border-2 border-white bg-slate-950 p-1 text-center text-xl font-semibold"
        >
          <span>+</span>
        </button>
      </div>
      {open && (
        <Modal zindex={40}>
          <div className="w-4/6 max-w-80 justify-center rounded-lg bg-slate-950">
            <div className="p-4 text-xl">New Category</div>
            <input
              className="m-4 rounded-lg border-2 border-white bg-transparent p-2 text-xl text-white outline-none"
              placeholder="Category"
            />
            <div className="m-4 flex">
              <button
                onClick={() => setOpen(false)}
                className="w-full rounded-lg border-2 border-white bg-slate-950 p-2 text-xl font-semibold"
              >
                Add
              </button>
              <button
                onClick={() => setOpen(false)}
                className="w-full rounded-lg border-2 border-white bg-slate-950 p-2 text-xl font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
