import { Darkmode } from "./DarkMode"
import DropdownListMenu from "./DropdownListMenu"
import Logo from "./Logo"

const Navbar = () => {
    return (
        <nav
          className="w-full transition-colors duration-300"
          style={{ backgroundColor: "#a8e6cf" }} // สีเขียวอ่อน
        >
            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between py-8 gap-4 px-5 w-full"
              style={{ color: "#1f2937" }} // ตัวอักษรสีเข้มเพื่อให้เห็นชัด
            >
                <Logo />

                <div className="flex gap-4">
                    <Darkmode />
                    <DropdownListMenu />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
