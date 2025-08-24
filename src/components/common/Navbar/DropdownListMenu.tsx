import { AlignLeft } from "lucide-react"
import { CircleUserRound } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { links } from "../../../../utils/links";



const DropdownListMenu = () => {
    return (


        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'outline'}>
                    <AlignLeft />
                    <CircleUserRound />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="my-3" />
                {
                    links.map((item, index) => {
                        return <DropdownMenuItem asChild key={index}>
                            <Link href={item.href}>{item.label}</Link>
                        </DropdownMenuItem>
                    })
                }


            </DropdownMenuContent>
        </DropdownMenu>

    );
}
export default DropdownListMenu