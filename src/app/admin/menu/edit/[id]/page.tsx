import { EditMenu } from "@/components/common/admin/table/tableCRUD/edit/EditMenu";


async function getMenu (id: string) {
  const res = await fetch(`http://localhost:3000/api/admin/menu/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch menu");
  return res.json();
}


export default async function EditMenuPage({ params }: { params: { id: string } }) {
  // ✅ await params ก่อนใช้งาน
  const { id } = await Promise.resolve(params);

  const menu = await getMenu(id); // ดึงข้อมูลเมนูจาก API

  if (!menu?.success) {
    return <div>Menu not found</div>;
  }

  return <EditMenu menu={menu.data} />;
}