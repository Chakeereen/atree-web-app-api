'use server'

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const baseUrl = process.env.API_URL as string;


export const createAdminAction = async (prevState: any, formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const name = formData.get("name") as string;
    const surname = formData.get("surname") as string;
    const file = formData.get("image") as File | null;

    if (!email || !password || !confirmPassword) {
      return { success: false, message: "กรุณากรอกข้อมูลให้ครบ" };
    }

    if (password !== confirmPassword) {
      return { success: false, message: "Password ไม่ตรงกัน" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // เก็บรูป (ถ้าไม่มีรูปใช้ default)
    let imageUrl = "/profile.jpg"; // default
    let fileId = "";

    if (file && file.size > 0) {
      const uploadForm = new FormData();
      uploadForm.append("file", file);

      const uploadRes = await fetch(`${baseUrl}/api/admin/staff/image`, {
        method: "POST",
        body: uploadForm,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) {
        return { success: false, message: uploadData.error || "Image upload failed" };
      }

      imageUrl = uploadData.url;
      fileId = uploadData.fileId;
    }

    await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        name,
        surname,
        image: imageUrl,
        fileID: fileId,
        role: "admin",
      },
    });

    return { success: true, message: "สร้าง Admin สำเร็จ" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "ไม่สามารถสร้าง Admin ได้" };
  }
};

