"use client";

import { SubmitButton } from "@/components/common/admin/form/Button";

import FormInput from "@/components/common/admin/form/FormInput";
import ImageInput from "@/components/common/admin/form/ImageInput";
import { Staff } from "../../../../../../../utils/type";
import { editMenuAction } from "../../../../../../../action/admin/MenuAction";
import { FormContainer } from "../../../form/FormContainer";
import { useRouter } from "next/navigation";
import { MenuCategoryInput } from "../../../form/MenuCategoryInput";


interface EditStaffProps {
    staff: Staff;
    onSuccess?: () => void; // optional callback หลังแก้ไขเสร็จ
}

export const EditStaff = ({ staff, onSuccess }: EditStaffProps) => {
    const router = useRouter();


    return (
        <section>
            <h1 className="text-2xl font-semibold mb-8 capitalize">edit staff</h1>
            <div className="border p-8 rounded-md max-w-lg">
                <FormContainer
                    action={editMenuAction}
                    onSuccess={() => {
                        onSuccess?.();
                        // ปิด modal หรือ callback อื่น ๆ
                    }}
                >
                    <input type="hidden" name="staffID" value={staff.staffID ?? ""} />
                    <FormInput name="email" label="email" type="email" defaultValue={staff.email} />
                    <FormInput name="password" label="Password" type="text" defaultValue={staff.password} />
                    <FormInput name="confirmPassword" label="Confirm Password" type="text" />
                    <FormInput name="name" label="Name" type="text" defaultValue={staff.surname.toString() ?? ""} />
                    <FormInput name="surname" label="Surname" type="text" defaultValue={staff.surname.toString() ?? ""} />
                    <FormInput name="telNo" label="เบอร์โทร" type="text" defaultValue={staff.telNo}/>
                    <input type="hidden" name="oldFileID" value={staff.fileID} />
                    <input type="hidden" name="oldImage" value={staff.image} />
                    <ImageInput />
                    <SubmitButton text="update menu" />
                </FormContainer>
            </div>
        </section>
    );
};
