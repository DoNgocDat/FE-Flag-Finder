import { useState } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';

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
    <div class="min-h-screen flex flex-col">
    {/* Header  */}
    <Header />

    {/* Main */}
    <main class="flex-grow">
        <section class="py-16 bg-white">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-10">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Liên hệ với chúng tôi</h2>
            <p class="text-gray-600 text-lg">
                Nếu bạn có bất kỳ thắc mắc hoặc góp ý, hãy gửi cho chúng tôi qua biểu mẫu dưới đây.
            </p>
            </div>

            {submitted ? (
            <div class="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg text-center font-medium">
                Cảm ơn bạn! Chúng tôi đã nhận được liên hệ của bạn.
            </div>
            ) : (
            <form
                onSubmit={handleSubmit}
                action="https://formspree.io/f/xrbqvzon"
                method="POST"
                class="bg-gray-50 p-8 rounded-xl shadow-md space-y-6"
            >
                <div>
                <label class="block text-gray-700 font-medium mb-1">Họ và tên</label>
                <input
                    type="text"
                    name="name"
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                </div>

                <div>
                <label class="block text-gray-700 font-medium mb-1">Email</label>
                <input
                    type="email"
                    name="email"
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                </div>

                <div>
                <label class="block text-gray-700 font-medium mb-1">Nội dung</label>
                <textarea
                    name="message"
                    rows="5"
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
                </div>

                <div class="text-center">
                <button
                    type="submit"
                    class="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                >
                    Gửi liên hệ
                </button>
                </div>
            </form>
            )}
        </div>
        </section>

    </main>

    {/* Footer */}
    <Footer />
    </div>
    </>
    );
}

export default Contact;