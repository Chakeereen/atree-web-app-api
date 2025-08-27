"use client";

import { SubmitButton } from "@/components/common/admin/form/Button";

import FormInput from "@/components/common/admin/form/FormInput";
import { TableNo } from "../../../../../../../utils/type";
import { FormContainer } from "../../../form/FormContainer";
import { editTableNoAction } from "../../../../../../../action/admin/TableNoAction";

interface EditTableNoProps {
  tableNo: TableNo;
  onSuccess?: () => void; // optional callback หลังแก้ไขเสร็จ
}

export const EditTableNo = ({ tableNo, onSuccess }: EditTableNoProps) => {

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">edit menu</h1>
      <div className="border p-8 rounded-md max-w-lg">
        <FormContainer
          action={editTableNoAction}
          onSuccess={() => {
            onSuccess?.();
              // ปิด modal หรือ callback อื่น ๆ
          }}
        >
          <input type="hidden" name="tableNo" value={tableNo.tableNo ?? ""} />
          <FormInput name="locationDetail" label="Menu Type Name" type="text" defaultValue={tableNo.locationDetail} />       
          <SubmitButton text="update menuType" />
        </FormContainer>
      </div>
    </section>
  );
};
