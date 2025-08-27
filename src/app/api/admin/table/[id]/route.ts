import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH: อัปเดตข้อมูลโต๊ะ
export async function PATCH(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });
    }

    const body = await req.json();
    const { locationDetail } = body;

    if (!locationDetail) {
      return NextResponse.json({ success: false, error: "locationDetail is required" }, { status: 400 });
    }

    const updatedTable = await prisma.table.update({
      where: { tableNo: Number(id) },
      data: { locationDetail },
    });

    return NextResponse.json({
      success: true,
      message: "Table updated successfully",
      data: updatedTable,
    });
  } catch (error: any) {
    console.error(error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { success: false, error: "Duplicate entry" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to update Table" },
      { status: 500 }
    );
  }
}

// DELETE: ลบโต๊ะ
export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });
    }

    await prisma.table.delete({
      where: { tableNo: Number(id) },
    });

    return NextResponse.json({
      success: true,
      message: "Table deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to delete Table" },
      { status: 500 }
    );
  }
}
