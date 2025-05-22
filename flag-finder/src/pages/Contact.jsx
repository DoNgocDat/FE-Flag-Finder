import { useState } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import FadeInSection from '../components/FadeInSection';

function Contact() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        // Gửi form bằng fetch
        fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
            Accept: "application/json",
        },
        }).then((response) => {
        if (response.ok) {
            setSubmitted(true);
            form.reset(); // xóa nội dung đã nhập
        } else {
            alert("Có lỗi xảy ra, vui lòng thử lại sau.");
        }
        });
    };

    return (
    <>
    <div className="min-h-screen flex flex-col">
    {/* Header  */}
    <Header />

    {/* Main */}
    <main className="flex-grow">
        <FadeInSection className="bg-white py-16">     
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Liên hệ với chúng tôi</h2>
            <p className="text-gray-600 text-lg">
                Nếu bạn có bất kỳ thắc mắc hoặc góp ý, hãy gửi cho chúng tôi qua biểu mẫu dưới đây.
            </p>
            </div>

            {submitted ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg text-center font-medium">
                Cảm ơn bạn! Chúng tôi đã nhận được liên hệ của bạn.
            </div>
            ) : (
            <form
                onSubmit={handleSubmit}
                action="https://formspree.io/f/xrbqvzon"
                method="POST"
                className="bg-gray-50 p-8 rounded-xl shadow-md space-y-6"
            >
                <div>
                <label className="block text-gray-700 font-medium mb-1">Họ và tên</label>
                <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                </div>

                <div>
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                </div>

                <div>
                <label className="block text-gray-700 font-medium mb-1">Nội dung</label>
                <textarea
                    name="message"
                    rows="5"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
                </div>

                <div className="text-center">
                <button
                    type="submit"
                    className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                >
                    Gửi liên hệ
                </button>
                </div>
            </form>
            )}
        </div>
        </FadeInSection>

    </main>

    {/* Footer */}
    <Footer />
    </div>
    </>
    );
}

export default Contact;