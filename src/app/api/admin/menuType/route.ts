import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma"; // แนะนำให้มี prisma.ts ใน lib/

// 🟡 GET: ดึงข้อมูล MenuType ทั้งหมด พร้อมเมนู
export async function GET() {
  try {
    const types = await prisma.menuType.findMany({
     orderBy: {
        typeID: 'asc'
     }
    });

    return NextResponse.json(types);
  } catch (error) {
    console.error("GET /menutype error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// 🟡 POST: เพิ่ม MenuType ใหม่
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const newType = await prisma.menuType.create({
      data: { name },
    });

    return NextResponse.json(newType);
  } catch (error) {
    console.error("POST /menutype error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
