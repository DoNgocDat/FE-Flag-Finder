import { Link } from "react-router-dom";
import { FaHome, FaInfoCircle, FaEnvelope, FaFacebook, FaGithub } from "react-icons/fa";
import logo from "../images/main_logo.png";
import FadeInSection from "./FadeInSection";

function Footer() {
    return (
    <>
        {/* Footer */}
        <FadeInSection>
        <footer className="bg-gray-800 text-white py-8 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">

            {/* Cột 1: Logo + mô tả */}
            <div>
                <Link to="/">
                    <img src={logo} alt="Logo" className="h-20 w-25 object-cover cursor-pointer rounded" />
                </Link>
                <p className="text-lg text-white">
                Flag Finder giúp bạn nhận diện và tìm hiểu quốc kỳ của các quốc gia trên thế giới một cách dễ dàng và chính xác.
                </p>
            </div>
            {/* Cột 2: Menu điều hướng */}
            <div>
                <h3 className="text-white text-lg font-semibold mb-4">Liên kết</h3> 
                <ul className="space-y-2 text-white-400 text-lg">
                    <li className="flex items-center space-x-2">
                        <FaHome />
                        <Link to="/" className="hover:text-gray-300">Trang chủ</Link>
                    </li>
                    <li className="flex items-center space-x-2">
                        <FaInfoCircle />
                        <Link to="/about-us" className="hover:text-gray-300">Giới thiệu</Link>
                    </li>
                    <li className="flex items-center space-x-2">
                        <FaEnvelope />
                        <Link to="/contact" className="hover:text-gray-300">Liên hệ</Link>
                    </li>
                </ul>
            </div>

            {/* Cột 3: Liên hệ */}
            <div>
                <h3 className="text-white text-lg font-semibold mb-4">Tương tác</h3>
                <ul className="space-y-2 text-white text-lg">
                    <li className="flex items-center space-x-2">
                        <FaFacebook />
                        <Link to="#" className="hover:text-gray-300">Facebook</Link>
                    </li>
                    <li className="flex items-center space-x-2">
                        <FaGithub />
                        <Link to="#" className="hover:text-gray-300">Github</Link>
                    </li>
                </ul>
            </div>

            </div>
        </div>
        <div className="mt-5 text-center border-t-1">
            <p className="mt-4 mb-auto text-lg text-white-400 font-semibold">© 2025 Bản quyền thuộc về Flag Finder</p>
        </div>
        </footer>
        </FadeInSection>
    </>
    )
}

export default Footer;