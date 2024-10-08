import { headers } from "next/headers";
import WhoisPage from "./whoisdisplay";

export default function (a: any, b: any) {
  const head = headers();
  const ip = head.get("x-forwarded-for");
  return <WhoisPage ip={ip ?? "0.0.0.0"} />;
}
