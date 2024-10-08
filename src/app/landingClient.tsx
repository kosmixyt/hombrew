"use client";
export function AppDisplay(props: {
  domain: string;
  id: string;
  name: string;
}) {
  const url = new URL(props.domain);
  console.log(url.host);
  return (
    <div
      onClick={(e) => window.open(props.domain, "_blank")}
      className="max-w-72 cursor-pointer rounded-lg bg-slate-900 text-white"
    >
      <div className="flex items-center justify-center gap-2 p-4">
        <div>
          <img
            src={`https://www.google.com/s2/favicons?domain=${url.host}&sz=64`}
            className="rounded-lg"
          />
        </div>
        <div>
          <div className="text-xl font-bold capitalize text-white underline">
            {props.name}
          </div>
        </div>
      </div>
    </div>
  );
}
