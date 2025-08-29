import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // สมมติคุณมีไฟล์ prisma client ที่นี่


export async function GET() {
  try {
    const staffs = await prisma.staff.findMany({
      select: {
        staffID: true,
        staffNo: true,
        name: true,
        surname: true,
        telNo: true,
        email: true,
        image: true,
        fileID: true,
        password: true,
      },
    });
    return NextResponse.json({ success: true, data: staffs });
  } catch (error) {
    console.error("Error fetching staff:", error);
    return NextResponse.json(
      { success: false, error: "เกิดข้อผิดพลาดในการดึงข้อมูล Staff" },
      { status: 500 }
    );
  }
}

// POST: สร้าง Staff
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, surname, telNo, email, password, image, fileID } = body;

    // ตรวจสอบว่าข้อมูลครบหรือไม่
    if (!name || !surname || !telNo || !email || !password) {
      return NextResponse.json(
        { error: "กรุณากรอกข้อมูลให้ครบถ้วน" },
        { status: 400 }
      );
    }

    // เช็คว่า email หรือเบอร์โทรซ้ำหรือไม่
    const existingStaff = await prisma.staff.findFirst({
      where: {
        OR: [{ email }, { telNo }],
      },
    });

    if (existingStaff) {
      return NextResponse.json(
        { error: "อีเมลหรือเบอร์โทรนี้ถูกใช้งานแล้ว" },
        { status: 400 }
      );
    }

    // hash password
   

    // สร้าง staff
    const staff = await prisma.staff.create({
      data: {
        name,
        surname,
        telNo,
        email,
        password,
        image,
        fileID,
      },
      select: {
        staffID: true,
        staffNo: true,
        name: true,
        surname: true,
        telNo: true,
        email: true,
        image: true,
        fileID: true,
        // password ไม่ส่งกลับ
      },
    });

    return NextResponse.json(staff, { status: 201 });
  } catch (error: any) {
    console.error("Error creating staff:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการสร้าง Staff" },
      { status: 500 }
    );
  }
}
