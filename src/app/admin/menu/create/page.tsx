'use client'
import { SubmitButton } from "@/components/common/admin/Form/Button";
import FormInput from "@/components/common/admin/Form/FormInput"
import ImageInput from "@/components/common/admin/Form/ImageInput";
import { FormContainer } from "@/components/common/admin/Form/FormContainer";
import { MenuCategoryInput } from "@/components/common/admin/Form/MenuCategoryInput";
import { createMenuAction } from "@/action/admin/MenuAction";


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
                    <MenuCategoryInput />
                    <ImageInput />
                    <SubmitButton text="create menu" />
                </FormContainer>
            </div>
        </section>
    )
}
export default CreateMenu
