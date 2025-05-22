import { Link } from "react-router-dom";
import logo from "../images/main_logo.png";

function Header() {
    return (
    <>
        {/* Header */}
        <header class="bg-white border-b border-gray-200 shadow-sm">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center py-3 relative">
                    <div class="flex items-center">
                        <Link to="/">
                            <img src={logo} alt="Logo" className="h-12 w-12 object-cover cursor-pointer rounded" />
                        </Link>                    
                        <span class="ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">BETA</span>
                    </div>
                    <nav class="absolute left-1/2 -translate-x-1/2 flex space-x-10">
                        <Link to="/" class="text-lg text-gray-500 hover:text-gray-900 font-semibold">Trang chủ</Link>
                        <Link to="/about-us" class="text-lg text-gray-500 hover:text-gray-900 font-semibold">Về chúng tôi</Link>
                        <Link to="/contact" class="text-lg text-gray-500 hover:text-gray-900 font-semibold">Liên hệ</Link>
                    </nav>

                </div>
            </div>
        </header>
    </>
    )
}

export default Header;