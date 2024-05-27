import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    // supabaseのpostテーブルからfindManyですべて取得
    // prismaは中継役
    const allBBSPosts = await prisma.post.findMany();
    // NextResponse -> nextでapiを記述する際のレスポンスを返す関数かと思われる
    return NextResponse.json(allBBSPosts);
}

// route.tsはnextjsで決められた名前
// api/post階層にあるので、http://localhost:3000/api/post に対するGETリクエストが発火

export async function POST(req: Request) {
    const { username, title, content } = await req.json();
    const allBBSPosts = await prisma.post.create({
        data: {
            username,
            title,
            content,
        }
    });
    return NextResponse.json(allBBSPosts);
}