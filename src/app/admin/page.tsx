"use client"; // บังคับให้ component นี้เป็น client-side

import MenuTable from "@/components/common/admin/Table/MenuTable";


const Page = () => {
 
  return (
    <div className="container mx-auto p-6">
      <MenuTable />
    </div>
  );
};

export default Page;
