'use client'

import { SubmitButton } from "@/components/common/admin/Form/Button";
import FormInput from "@/components/common/admin/Form/FormInput";
import ImageInput from "@/components/common/admin/Form/ImageInput";
import { FormContainer } from "@/components/common/admin/Form/FormContainer";
import { createAdminAction } from "@/action/admin/LoginAction";



interface CreateAdminProps {
  onSuccess?: () => void;
}

const CreateAdmin = ({ onSuccess }: CreateAdminProps) => {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">Create Admin User</h1>
      <div className="border p-8 rounded-md max-w-lg bg-white shadow-md">
        <FormContainer
          action={createAdminAction}
          onSuccess={onSuccess}
          refreshOnSuccess={false}
        >
          <FormInput name="email" label="Email" type="email" />
          <FormInput name="password" label="Password" type="password" />
          <FormInput name="confirmPassword" label="Confirm Password" type="password" />
          <FormInput name="name" label="Name" type="text" />
          <FormInput name="surname" label="Surname" type="text" />
          <ImageInput />
          <SubmitButton text="Create Admin" />
        </FormContainer>
      </div>
    </section>
  );
};

export default CreateAdmin;
