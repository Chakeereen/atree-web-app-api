'use client'
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { RotateCcw } from 'lucide-react';


type btnSize = "default" | "lg" | "sm";

type SubmitButtonProps = {
    className?: string;
    size?: btnSize;
    text?: string;
};

export const SubmitButton = ({ className, size, text }: SubmitButtonProps) => {

    const { pending } = useFormStatus()
    return <Button
        disabled={pending}
        className={`${className} capitalize`}
        size={size}
        type="submit"
    >   {
            pending
                ? <RotateCcw className="animate-spin" />
                : <p>{text}</p>
        }
    </Button>

}