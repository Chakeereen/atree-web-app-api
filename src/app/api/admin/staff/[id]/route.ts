import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/staff/[id]
export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split("/").pop();
        if (!id) {
            return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });
        }

        const staff = await prisma.staff.findUnique({
            where: { staffID: id },
        });

        if (!staff) {
            return NextResponse.json({ success: false, error: "Staff not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: staff });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Failed to fetch staff" }, { status: 500 });
    }
}

// PATCH /api/admin/staff/[id]
export async function PATCH(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split("/").pop();
        if (!id) return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });

        const body = await req.json();
        const { name, surname, telNo, email, password, image, fileID } = body;

        const updatedStaff = await prisma.staff.update({
            where: { staffID: id },
            data: {
                ...(name !== undefined && { name }),
                ...(surname !== undefined && { surname }),
                ...(telNo !== undefined && { telNo }),
                ...(email !== undefined && { email }),
                ...(password !== undefined && { password }), // ควร hash ก่อนใช้จริง
                ...(image !== undefined && { image }),
                ...(fileID !== undefined && { fileID }),
            },
        });

        return NextResponse.json({ success: true, message: "Staff updated successfully", data: updatedStaff });
    } catch (error: any) {
        console.error(error);

        // Prisma unique constraint error
        if (error.code === "P2002") {
            return NextResponse.json({ success: false, error: "Email or TelNo must be unique" }, { status: 400 });
        }

        return NextResponse.json({ success: false, error: "Failed to update staff" }, { status: 500 });
    }
}

// DELETE /api/admin/staff/[id]
export async function DELETE(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split("/").pop();
        if (!id) return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });

        await prisma.staff.delete({ where: { staffID: id } });

        return NextResponse.json({ success: true, message: "Staff deleted successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Failed to delete staff" }, { status: 500 });
    }
}
