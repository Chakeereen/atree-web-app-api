"use client";

import { useLogoutAdmin } from "@/utils/admin";
import { LogOut } from "lucide-react";

export default function Logout() {
    const logoutAdmin = useLogoutAdmin();

    return (
        <button onClick={logoutAdmin}>
            <LogOut size={20}/>
        </button>
    );
}