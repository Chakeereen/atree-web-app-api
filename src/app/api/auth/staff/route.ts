import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  console.log("Login attempt:", email, password);

  const user = await prisma.staff.findUnique({ where: { email } });
  if (!user) 
    return NextResponse.json({ message: "Invalid email" }, { status: 401 });

  const isValid = await bcrypt.compare(password, user.password);
  console.log("Password valid:", isValid);
  if (!isValid) 
    return NextResponse.json({ message: "Invalid password" }, { status: 401 });

  // สร้าง JWT
  const token = jwt.sign(
    { userId: user.staffID, role: user.role, name: user.name },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  // ส่ง token และ user object กลับ
  return NextResponse.json({
    token,
    user: {
      id: user.staffID,
      email: user.email,
      role: user.role,
      name: user.name
    }
  });
}
