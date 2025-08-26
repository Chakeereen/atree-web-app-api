import MenuTypeTableCRUD from "@/components/common/admin/Table/MenuTypeCRUD/MenuTypeTableCRUD"

const MenuType = () => {
  return (
    <div className="container mx-auto p-6">
          {/* ตารางเมนู */}
          <div className="mb-2">
            <MenuTypeTableCRUD />
          </div>
        </div>
  )
}
export default MenuType