import { NextRequest } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { GetCats } from "../route";

export async function GET(req: NextRequest) {
  const session = await getServerAuthSession();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  const parsed = new URL(req.url);
  const name = parsed.searchParams.get("name");
  if (!name) {
    return new Response("Missing name", { status: 400 });
  }
  await db.websiteCategory.create({
    data: {
      name,
      userId: session.user.id,
    },
  });
  return new Response(JSON.stringify(await GetCats(session.user.id)));
}
