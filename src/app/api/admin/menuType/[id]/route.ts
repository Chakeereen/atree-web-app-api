import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

// GET /api/admin/menutype/:id (ดึงข้อมูล MenuType เดียว)

// GET /api/admin/menutype/[id]
export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });
    }

    const menuType = await prisma.menuType.findUnique({
      where: { typeID: Number(id) },
    });

    if (!menuType) {
      return NextResponse.json({ success: false, error: "MenuType not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: menuType });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to fetch MenuType" }, { status: 500 });
  }
}

// PATCH /api/admin/menutype/[id]
export async function PATCH(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });
    }
   
    const body = await req.json();
    const { name } = body;
    

    if (!name) {
      return NextResponse.json({ success: false, error: "Name is required" }, { status: 400 });
    }

    const updatedMenuType = await prisma.menuType.update({
      where: { typeID: Number(id) },
      data: { name },
    });

    return NextResponse.json({ success: true, message: "MenuType updated successfully", data: updatedMenuType });
  } catch (error: any) {
    console.error(error);

    if (error.code === "P2002") {
      return NextResponse.json({ success: false, error: "MenuType name must be unique" }, { status: 400 });
    }

    return NextResponse.json({ success: false, error: "Failed to update MenuType" }, { status: 500 });
  }
}

// DELETE /api/admin/menutype/[id]
export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });
    }

    await prisma.menuType.delete({ where: { typeID: Number(id) } });

    return NextResponse.json({ success: true, message: "MenuType deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to delete MenuType" }, { status: 500 });
  }
}