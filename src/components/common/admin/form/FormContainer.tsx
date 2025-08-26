'use client'

import { useEffect } from "react"
import { toast } from "sonner"
import { useActionState } from "react"
import { useRouter } from "next/navigation"

const initialState = {
  message: '',
  success: false
}

type ActionFunction = (
  prevState: any,
  formData: FormData
) => Promise<{ message: string; success: boolean }>

interface FormContainerProps {
  action: ActionFunction
  children: React.ReactNode
  onSuccess?: () => void
  refreshOnSuccess?: boolean
}

export const FormContainer = ({ action, children, onSuccess, refreshOnSuccess }: FormContainerProps) => {
   
  const [state, formAction] = useActionState(action, initialState)
  const router = useRouter()

  useEffect(() => {
    if (state.message) {
      if(!state.success) {
        toast.error(state.message)
      }
      toast.success(state.message)

      // if (state.success && refreshOnSuccess) {
      //   router.refresh() // 🔥 รีเฟรชหน้าอัตโนมัติ
      // }

      onSuccess?.()
    }
  }, [state.message, state.success, onSuccess, refreshOnSuccess, router])

  return (
    <form action={formAction}>
      {children}
    </form>
  )
}
