import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SubmitButton } from "./Button";


type FormInputProps = {
    name: string;
    type: string;
    label?: string;
    defaultValue?: string;
    placeholder?: string;
}


const FormInput = (props: FormInputProps) => {
    const { name, type, label, defaultValue, placeholder } = props;
    
    return (
        <div className="mb-3">
            <Label htmlFor={name}> {label} </Label>
            <Input name={name}
                type={type}
                defaultValue={defaultValue}
                placeholder={`${label}...`}
            />
        </div>
        
    )
}
export default FormInput