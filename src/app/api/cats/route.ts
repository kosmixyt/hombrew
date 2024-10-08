import { NextRequest } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

export async function GET(req: NextRequest) {
  const session = await getServerAuthSession();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  return new Response(JSON.stringify(await GetCats(session.user.id)));
}

export async function GetCats(userId: string) {
  const cats = await db.websiteCategory.findMany({
    where: {
      userId,
    },
  });
  return cats;
}
