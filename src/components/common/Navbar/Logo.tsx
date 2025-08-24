import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Coffee } from 'lucide-react';

const Logo = () => {
  return (
    <div>
      <Button size={'sm'}>
        <Link href={'/'} className="text-2xl">Atree </Link>
        <Coffee/>
      </Button>
    </div>
  )
}
export default Logo