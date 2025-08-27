import TableNoCRUD from "@/components/common/admin/Table/TableNoCRUD.tsx/TableNoCRUD"

const Table = () => {
  return (
     <div className="container mx-auto p-6">
          {/* ตารางเมนู */}
          <div className="mb-2">
            <TableNoCRUD />
          </div>
        </div>
  )
}
export default Table