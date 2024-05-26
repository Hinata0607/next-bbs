import prisma from "@/lib/prismaClient";
import { NextResponse } from "next/server";

// URLに含まれるパラメータのためstring型
export async function GET(req: Request, { params }: { params: { bbsId: string } }) {
    const bbsId = params.bbsId;
    // findUniqueメソッドで一件取得(条件はwhere句)
    const bbsDetailData = await prisma.post.findUnique({where: {
        id: parseInt(bbsId),
    }});
    return NextResponse.json(bbsDetailData);
}