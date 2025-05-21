import Header from '../components/Header';
import Footer from '../components/Footer';

function AboutUs() {
    return (
    <>
    <div class="min-h-screen flex flex-col">
    {/* Header  */}
    <Header />

    {/* Main */}
    <main class="flex-grow">
        <section class="bg-white py-16">
            <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">Về chúng tôi</h2>

                {/* <div class="w-24 h-1 bg-blue-600 mx-auto mb-6"></div> */}
                <p class="text-lg text-gray-700 leading-relaxed">
                    Flag Finder là một công cụ thông minh được xây dựng nhằm hỗ trợ người dùng trong việc nhận diện quốc kỳ 
                    từ hình ảnh và cung cấp thông tin chi tiết về quốc gia đó. Với công nghệ trí tuệ nhân tạo tiên tiến, chúng tôi mang đến trải nghiệm tìm kiếm hiện đại, nhanh chóng và chính xác.
                </p>
                </div>

                <div class="grid md:grid-cols-2 gap-10 items-center">
                <div>
                    <h3 class="text-2xl font-semibold text-gray-900 mb-4">Sứ mệnh của chúng tôi</h3>
                    <p class="text-gray-700 mb-4">
                    Chúng tôi tin rằng kiến thức địa lý và hiểu biết về các quốc gia là nền tảng quan trọng cho một thế giới kết nối. 
                    Flag Finder ra đời để đơn giản hóa quá trình tra cứu thông tin, đồng thời truyền cảm hứng khám phá đến với mọi người.
                    </p>
                    <p class="text-gray-700">
                    Dù bạn là học sinh, giáo viên, người yêu du lịch hay đơn giản là một người tò mò, Flag Finder luôn là người bạn đồng hành tin cậy giúp bạn tìm hiểu thế giới chỉ qua một tấm hình.
                    </p>
                </div>

                <div class="rounded-xl overflow-hidden shadow-md">
                    <img
                    src="https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1200&q=80"
                    alt="Globe and flags"
                    class="w-full h-72 object-cover"
                    />
                </div>
                </div>
            </div>
        </section>

    </main>

    {/* Footer  */}
    <Footer />
    </div>
    </>
    );
}

export default AboutUs;