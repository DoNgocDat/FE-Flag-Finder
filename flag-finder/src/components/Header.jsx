import { Link } from "react-router-dom";
import logo from "../images/main_logo.png";

function Header() {
    return (
    <>
        {/* Header */}
        <header className="fixed top-0 left-0 w-full z-50 bg-gray-800 border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-3 relative">
                    <div className="flex items-center">
                        <Link to="/">
                            <img src={logo} alt="Logo" className="h-12 w-15 object-cover cursor-pointer rounded" />
                        </Link>                    
                        <span className="ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">BETA</span>
                    </div>
                    <nav className="absolute left-1/2 -translate-x-1/2 flex space-x-20">
                        <Link to="/" className="text-xl text-white hover:text-gray-300 font-semibold">Trang chủ</Link>
                        <Link to="/about-us" className="text-xl text-white hover:text-gray-300 font-semibold">Về chúng tôi</Link>
                        <Link to="/contact" className="text-xl text-white hover:text-gray-300 font-semibold">Liên hệ</Link>
                    </nav>

                </div>
            </div>
        </header>
    </>
    )
}

export default Header;