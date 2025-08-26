This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.




npm install prisma --save-dev
npm install @prisma/client




npx shadcn@latest init
npx shadcn@latest add button

npm install next-themes

///// MenuTableCRUD
'use client';

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { deleteMenuAction, getMenuAll, updateMenuAvailability } from "../../../../../../action/MenuAction";
import { Menu } from "../../../../../../utils/type";
import Modal from "@/components/common/Modal";
import { EditMenu } from "./edit/EditMenu";
import CreateMenu from "@/app/admin/menu/create/page";
import ToggleSwitch from "../../switch/ToggleSwitch";
import { toast } from "sonner";
import { ConfirmModal } from "./ConfirmDeleteModal";
import { Button } from "@/components/ui/button";

export default function MenuTableCRUD() {
    const [menus, setMenus] = useState<Menu[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingMenu, setEditingMenu] = useState<Menu | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // ฟังก์ชัน fetch menus
    const fetchMenus = async () => {
        setLoading(true);
        const result = await getMenuAll();
        if (result.success) {
            setMenus(result.data);
        } else {
            console.error(result.error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchMenus();
    }, []);

    //Delete

    if (loading) {
        return (
            <div className="flex items-center justify-center p-10">
                <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
                <span className="ml-2">กำลังโหลด...</span>
            </div>
        );
    }

    return (
        <>
            {/* ตารางเมนู */}
            <Card className="shadow-lg rounded-2xl">
                <CardContent>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">📋 รายการเมนู</h2>
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            เพิ่มข้อมูล
                        </button>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ภาพ</TableHead>
                                <TableHead>ชื่อเมนู</TableHead>
                                <TableHead>ราคา</TableHead>
                                <TableHead>สถานะ</TableHead>
                                <TableHead>ประเภท</TableHead>
                                <TableHead className="text-right">การจัดการ</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {menus.map((menu) => (
                                <TableRow key={menu.menuID}>
                                    <TableCell>
                                        <img
                                            src={menu.image}
                                            alt={menu.name}
                                            className="h-12 w-12 object-cover rounded-md"
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">{menu.name}</TableCell>
                                    <TableCell>{menu.price.toFixed(2)} ฿</TableCell>
                                    <TableCell>
                                        {/* Toggle Switch สำหรับเปลี่ยน isAvailable */}
                                        <ToggleSwitch
                                            isOn={menu.isAvailable}
                                            label={menu.isAvailable ? "พร้อมขาย" : "หมด"}
                                            onToggle={async (newState) => {
                                                const res = await updateMenuAvailability(menu.menuID, newState);
                                                if (res.success) {
                                                    setMenus((prev) =>
                                                        prev.map((m) =>
                                                            m.menuID === menu.menuID ? { ...m, isAvailable: newState } : m
                                                        )
                                                    );
                                                } else {
                                                    alert(res.message);
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>{menu.typeID}</TableCell>
                                    <TableCell className="text-right">

                                        {/* แก้ไขเมนู */}
                                        <Button
                                            className="ml-2 text-blue-600 hover:underline"
                                            onClick={() => setEditingMenu(menu)}
                                        >
                                            Edit
                                        </Button>

                                        <ConfirmModal
                                            title="ลบเมนู"
                                            description={`คุณแน่ใจไหมว่าต้องการลบ "${menu.name}"?`}
                                            onConfirm={async () => {
                                                try {
                                                    const result = await deleteMenuAction(menu.menuID, menu.fileID)
                                                    if (result.success) {
                                                        toast.success(result.message)
                                                        fetchMenus()
                                                    } else {
                                                        toast.error(result.message)
                                                    }
                                                } catch (err) {
                                                    toast.error("เกิดข้อผิดพลาด")
                                                }
                                            }}
                                            trigger={<Button className="text-red-600 hover:underline ">Delete</Button>}
                                        />

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Modal สำหรับ Edit */}
            {editingMenu && (
                <Modal
                    isOpen={true}
                    onClose={() => {
                        setEditingMenu(null);
                        // fetchMenus(); // รีเฟรชเมนูหลังปิด modal
                    }}
                >
                    <EditMenu
                        menu={editingMenu}
                        onSuccess={() => {
                            setEditingMenu(null);
                            fetchMenus(); // รีเฟรชเมนูหลังแก้ไขสำเร็จ
                        }}
                    />
                </Modal>
            )}

            {/* Modal สำหรับ Create */}
            {isCreateModalOpen && (
                <Modal
                    isOpen={true}
                    onClose={() => {
                        setIsCreateModalOpen(false);
                        // fetchMenus(); // รีเฟรชเมนูหลังปิด modal
                    }}
                >
                    <h2 className="text-xl font-semibold mb-4">เพิ่มข้อมูลเมนู</h2>
                    <p className="text-gray-600 mb-4">
                        คุณสามารถสร้างเมนูใหม่ได้ที่นี่
                    </p>
                    <CreateMenu
                        onSuccess={() => {
                            setIsCreateModalOpen(false); // ปิด modal
                            fetchMenus();                // รีเฟรชเมนูใหม่
                        }}
                    />
                </Modal>
            )}
        </>
    );
}
//// confirmDeleteModal
'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface ConfirmModalProps {
  title?: string
  description?: string
  onConfirm: () => void
  trigger: React.ReactNode
}

export const ConfirmModal = ({ title = "Are you sure?", description, onConfirm, trigger }: ConfirmModalProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleConfirm = () => {
    onConfirm()
    setIsOpen(false)
  }

  return (
    <>
      <span onClick={() => setIsOpen(true)}>{trigger}</span>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          {description && <p className="my-2 text-sm text-gray-600">{description}</p>}
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleConfirm}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}


