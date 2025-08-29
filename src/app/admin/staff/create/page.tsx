'use client'
import { SubmitButton } from "@/components/common/admin/form/Button";
import FormInput from "@/components/common/admin/form/FormInput"
import ImageInput from "@/components/common/admin/form/ImageInput";
import { FormContainer } from "@/components/common/admin/form/FormContainer";
import { MenuCategoryInput } from "@/components/common/admin/form/MenuCategoryInput";
import { createStaffAction } from "../../../../../action/admin/StaffAction";


interface CreateStaffProps {
  onSuccess?: () => void
}

const CreateStaff = ({ onSuccess }: CreateStaffProps) => {
    return (
        <section>
            <h1 className="text-2xl font-semibold mb-8 capitalize">new menu</h1>
            <div className="border p-8 rounded-md max-w-lg">
                <FormContainer 
                    action={createStaffAction} 
                    onSuccess={onSuccess} // ✅ เรียก callback หลังสร้างเมนูสำเร็จ
                    refreshOnSuccess={false} // ไม่ต้อง refresh ในนี้ เพราะเราจะทำใน onSuccess ของ Page
                >
                    <FormInput name="email" label="Email" type="email" />
                    <FormInput name="password" label="Password" type="password" />
                    <FormInput name="confirmPassword" label="Confirm Password" type="password" />
                    <FormInput name="name" label="Name" type="text" />
                    <FormInput name="surname" label="Surname" type="text" />
                    <FormInput name="telNo" label="เบอร์โทร" type="text" />
                    <ImageInput />
                    <SubmitButton text="create menu" />
                </FormContainer>
            </div>
        </section>
    )
}
export default CreateStaff
