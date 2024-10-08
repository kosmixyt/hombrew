import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

export async function GET(req : NextRequest): Promise<NextResponse> {
    const session = await getServerAuthSession();
    console.log(session)
    const passs = await db.password.findMany({
        where: {
            userId: session?.user.id,
        },
    });
    return new NextResponse(JSON.stringify(passs));
}