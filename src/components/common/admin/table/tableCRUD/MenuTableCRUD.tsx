"use client";

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
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import MenuActions from "./MenuActions";
import { deleteMenuAction } from "../../../../../../action/MenuAction";
import { Menu } from "../../../../../../utils/type";
import Modal from "@/components/common/Modal";
import { EditMenu } from "./edit/EditMenu";


export default function MenuTableCRUD() {
    const [menus, setMenus] = useState<Menu[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingMenu, setEditingMenu] = useState<Menu | null>(null);

    // Fetch เมนู
    const fetchMenus = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:3000/api/admin/menu", {
                cache: "no-store",
            });
            if (!res.ok) throw new Error("Failed to fetch menus");
            const data = await res.json();
            setMenus(data);
        } catch (error) {
            console.error("Error fetching menus:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMenus();
    }, []);

    // Delete
    const handleDelete = async (menuID: number, image?: string) => {
        const confirmed = confirm("Are you sure you want to delete this menu?");
        if (!confirmed) return;

        const result = await deleteMenuAction(menuID, image);
        alert(result.message);

        if (result.success) {
            setMenus((prev) => prev.filter((menu) => menu.menuID !== menuID));
        }
    };

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
            <Card className="shadow-lg rounded-2xl">
                <CardContent>
                    <h2 className="text-xl font-semibold mb-4">📋 รายการเมนู</h2>
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
                                        {menu.isAvailable ? (
                                            <Badge className="bg-green-500">พร้อมขาย</Badge>
                                        ) : (
                                            <Badge variant="destructive">หมด</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>{menu.typeID}</TableCell>
                                    <TableCell className="text-right">
                                        <MenuActions
                                            menu={menu}
                                            onEdit={(menu) => setEditingMenu(menu)} // เปิด Modal
                                            onDelete={(id) => handleDelete(id, menu.fileID)}
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
                        fetchMenus();
                    }} // ปิด Modal
                >
                    <EditMenu menu={editingMenu} />
                </Modal>
            )}
        </>
    );
}
