'use client'
import { SubmitButton } from "@/components/common/admin/form/Button";
import FormInput from "@/components/common/admin/form/FormInput"
import { FormContainer } from "@/components/common/admin/form/FormContainer";
import { createTableNoAction } from "../../../../../action/admin/TableNoAction";


interface CreateMenuTypeProps {
  onSuccess?: () => void
}

const CreateTableNo = ({ onSuccess }: CreateMenuTypeProps) => {
    return (
        <section>
            <h1 className="text-2xl font-semibold mb-8 capitalize">new menu</h1>
            <div className="border p-8 rounded-md max-w-lg">
                <FormContainer 
                    action={createTableNoAction} 
                    onSuccess={onSuccess} // ✅ เรียก callback หลังสร้างเมนูสำเร็จ
                    refreshOnSuccess={false} // ไม่ต้อง refresh ในนี้ เพราะเราจะทำใน onSuccess ของ Page
                >
                    <FormInput name="locationDetail" label="location Detail" type="text" />
                    <SubmitButton text="create menu" />
                </FormContainer>
            </div>
        </section>
    )
}
export default CreateTableNo
