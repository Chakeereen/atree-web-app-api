'use client'
import { SubmitButton } from "@/components/common/admin/form/Button";
import FormInput from "@/components/common/admin/form/FormInput"
import { createMenuAction } from "../../../../../action/MenuAction";
import ImageInput from "@/components/common/admin/form/ImageInput";
import { FormContainer } from "@/components/common/admin/form/FormContainer";

interface CreateMenuProps {
  onSuccess?: () => void
}

const CreateMenu = ({ onSuccess }: CreateMenuProps) => {
    return (
        <section>
            <h1 className="text-2xl font-semibold mb-8 capitalize">new menu</h1>
            <div className="border p-8 rounded-md max-w-lg">
                <FormContainer 
                    action={createMenuAction} 
                    onSuccess={onSuccess} // ✅ เรียก callback หลังสร้างเมนูสำเร็จ
                    refreshOnSuccess={false} // ไม่ต้อง refresh ในนี้ เพราะเราจะทำใน onSuccess ของ Page
                >
                    <FormInput name="name" label="Menu Name" type="text" />
                    <FormInput name="price" label="Menu Price" type="number" />
                    <FormInput name="typeID" label="Menu Type" type="number" />
                    <ImageInput />
                    <SubmitButton text="create menu" />
                </FormContainer>
            </div>
        </section>
    )
}
export default CreateMenu
