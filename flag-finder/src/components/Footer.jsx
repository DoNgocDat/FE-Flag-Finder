import { Link } from "react-router-dom";
import logo from "../images/main_logo.png";
import FadeInSection from "./FadeInSection";

function Footer() {
    return (
    <>
        {/* Footer */}
        <FadeInSection>
        <footer class="bg-gray-800 text-white py-8 mt-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">

            {/* Cột 1: Logo + mô tả */}
            <div>
                <Link to="/">
                    <img src={logo} alt="Logo" className="h-20 w-25 object-cover cursor-pointer rounded" />
                </Link>
                <p class="text-lg text-gray-400">
                Flag Finder giúp bạn nhận diện và tìm hiểu quốc kỳ của các quốc gia trên thế giới một cách dễ dàng và chính xác.
                </p>
            </div>
            {/* Cột 2: Menu điều hướng */}
            <div>
                <h3 class="text-white text-lg font-semibold mb-4">Liên kết</h3>
                <ul class="space-y-2 text-gray-400 text-lg">
                    <li><Link to="/" class="hover:text-white">Trang chủ</Link></li>
                    <li><Link to="/about-us" class="hover:text-white">Giới thiệu</Link></li>
                    <li><Link to="/contact" class="hover:text-white">Liên hệ</Link></li>
                </ul>
            </div>

            {/* Cột 3: Liên hệ */}
            <div>
                <h3 class="text-white text-lg font-semibold mb-4">Tương tác</h3>
                <ul class="space-y-2 text-gray-400 text-lg">
                    <li><Link to="#" class="hover:text-white">Facebook</Link></li>
                    <li><Link to="#" class="hover:text-white">Github</Link></li>
                </ul>
            </div>

            </div>
        </div>
        <div class="mt-5 text-center border-t-1">
            <p class="mt-4 mb-auto text-lg text-white-400 font-semibold">© 2025 Bản quyền thuộc về Flag Finder</p>
        </div>
        </footer>
        </FadeInSection>
    </>
    )
}

export default Footer;