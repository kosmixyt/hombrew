import { NextRequest } from "next/server";
import { GetCats } from "../../cats/route";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

export async function GET(req: NextRequest) {
  const parsed = new URL(req.url);
  const session = await getServerAuthSession();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  const name = parsed.searchParams.get("name");
  const id = parsed.searchParams.get("id") ?? "";
  const url = parsed.searchParams.get("url") ?? "";
  if (!id || !name || !url) {
    return new Response("Missing id or name", { status: 400 });
  }
  try {
    new URL(url);
  } catch (e) {
    return new Response("Invalid URL", { status: 400 });
  }
  try {
    await db.website.create({
      data: {
        url: url,
        name,
        websiteCategoryId: id,
        userId: session.user.id,
      },
    });
    const domains = await db.website.findMany({
      where: {
        userId: session.user.id,
      },
    });
    return new Response(JSON.stringify(domains));
  } catch (e) {
    return new Response("Error", { status: 500 });
  }
}
