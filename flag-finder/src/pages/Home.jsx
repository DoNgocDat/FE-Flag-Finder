import { useState, useRef, useEffect } from 'react'
import axios from 'axios';
// import './App.css'
// import background from '../images/background_2.jpg'
import { FaImage, FaFlag, FaSearch, FaInfoCircle } from 'react-icons/fa'
import Header from '../components/Header';
import Footer from '../components/Footer';
import FadeInSection from '../components/FadeInSection';

function Home() {
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorImages, setErrorImages] = useState({});
    const [openIndex, setOpenIndex] = useState(null);
    const fileInputRef = useRef(null);
    const resultRef = useRef(null);

    const BASE_URL = 'http://localhost:8000';
    const FALLBACK_IMAGE = 'https://placehold.co/150x150?text=Không+Tìm+Thấy';

    // Xử lý khi chọn file
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
        setImage(file);
        const fileUrl = URL.createObjectURL(file);
        setPreviewUrl(fileUrl);
        }
    };
    
    // Xử lý khi kéo thả file
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };
    
    const handleDragLeave = () => {
        setIsDragging(false);
    };
    
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith('image/')) {
            setImage(file);
            const fileUrl = URL.createObjectURL(file);
            setPreviewUrl(fileUrl);
        }
        }
    };

    // Xử lý dán từ clipboard
    const handlePaste = (e) => {
        const items = e.clipboardData.items;
        
        for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
            const file = items[i].getAsFile();
            setImage(file);
            const fileUrl = URL.createObjectURL(file);
            setPreviewUrl(fileUrl);
            break;
        }
        }
    };
    
    // Khi click vào nút Browse
    const handleBrowseClick = () => {
        fileInputRef.current.click();
    };

    // Xử lý tìm kiếm
    const handleSearch = async() => {
        if (!image) return;

        setIsSearching(true);

        try {
            const formData = new FormData();
            formData.append('file', image);

            const response = await axios.post('http://localhost:8000/search-flag', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            console.log('Phản hồi backend:', response.data);
            setSearchResults(response.data);
            setErrorImages({});
        } catch (error) {
            console.error('Lỗi khi tìm kiếm:', error.response?.data || error.message);
            alert('Đã xảy ra lỗi khi tìm kiếm. Vui lòng thử lại.');
        } finally {
            setIsSearching(false);
        }
        setTimeout(() => {
            // // const mockResults = countryData.map(country => ({
            // // id: country.id,
            // // title: `Quốc gia ${country.name}`,
            // // imageUrl: country.flag,
            // // countryId: country.id
            // // }));

            // setSearchResults(mockResults);
            // setIsSearching(false);

            // Cuộn xuống phần kết quả sau khi render xong
            setTimeout(() => {
                resultRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }, 500);
    };
    
    const handleImageError = (e, imagePath) => {
        console.log('Image error for path:', imagePath);
        setErrorImages((prev) => ({ ...prev, [imagePath]: true }));
        e.target.src = FALLBACK_IMAGE;
    };

    // Xóa hình ảnh đã chọn
    const handleClear = () => {
        setImage(null);
        setPreviewUrl('');
        setSearchResults([]);
        if (fileInputRef.current) {
        fileInputRef.current.value = '';
        }
    };

    // Mở modal và hiển thị thông tin chi tiết của quốc gia
    const handleViewDetails = (countryData) => {
        console.log('Quốc gia được chọn:', countryData);
        setSelectedCountry(countryData);
        setIsModalOpen(true);
    };
    
    // Đóng modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const fieldDescriptions = {
        region: "Khu vực địa lý mà quốc gia thuộc về, ví dụ: Châu Á, Châu Âu, Châu Phi, v.v.",
        population: "Tổng số người sinh sống tại quốc gia này.",
        area: "Tổng diện tích đất liền của quốc gia, tính bằng kilomet vuông.",
        pop_density: "Mật độ dân số tính theo số người trên mỗi km².",
        coastline_ratio: "Tỷ lệ giữa chiều dài bờ biển và diện tích đất liền.",
        net_migration: "Chênh lệch giữa số người nhập cư và xuất cư mỗi năm.",
        infant_mortality: "Tỷ lệ tử vong của trẻ sơ sinh trên 1000 ca sinh sống.",
        gdp_per_capita: "Tổng thu nhập bình quân đầu người theo USD.",
        literacy: "Tỷ lệ biết đọc biết viết của dân số trên 15 tuổi.",
        phones_per_1000: "Số lượng điện thoại cố định trên 1000 dân.",
        arable: "Tỷ lệ đất canh tác dùng để trồng trọt ngắn hạn.",
        crops: "Tỷ lệ đất trồng cây lâu năm.",
        other: "Tỷ lệ đất còn lại không dùng cho nông nghiệp.",
        climate: "Chỉ số mô tả điều kiện khí hậu (1: khô hạn, 2: ôn đới, ...).",
        birthrate: "Tỷ lệ sinh trên mỗi 1000 dân mỗi năm.",
        deathrate: "Tỷ lệ tử vong trên mỗi 1000 dân mỗi năm.",
        agriculture: "Tỷ lệ GDP đóng góp bởi ngành nông nghiệp.",
        industry: "Tỷ lệ GDP đóng góp bởi ngành công nghiệp.",
        service: "Tỷ lệ GDP đóng góp bởi ngành dịch vụ.",
    };

    const fieldLabels = {
        region: "Khu vực",
        population: "Dân số",
        area: "Diện tích (km²)",
        pop_density: "Mật độ dân số (/km²)",
        coastline_ratio: "Tỷ lệ bờ biển",
        net_migration: "Di cư thuần",
        infant_mortality: "Tỷ lệ tử vong trẻ sơ sinh",
        gdp_per_capita: "GDP ($/người)",
        literacy: "Tỷ lệ biết chữ (%)",
        phones_per_1000: "Điện thoại (/1000)",
        arable: "Đất canh tác (%)",
        crops: "Cây trồng (%)",
        other: "Khác (%)",
        climate: "Khí hậu",
        birthrate: "Tỷ lệ sinh",
        deathrate: "Tỷ lệ tử vong",
        agriculture: "Nông nghiệp (%)",
        industry: "Công nghiệp (%)",
        service: "Dịch vụ (%)",
    };


    
    // Thêm event listener cho paste
    useEffect(() => {
        document.addEventListener('paste', handlePaste);
        return () => {
        document.removeEventListener('paste', handlePaste);
        };
    }, []);

    // Xử lý khi nhấn Escape để đóng modal
    useEffect(() => {
        const handleEscKeyPress = (e) => {
        if (e.key === 'Escape' && isModalOpen) {
            setIsModalOpen(false);
        }
        };

        window.addEventListener('keydown', handleEscKeyPress);
        return () => {
            window.removeEventListener('keydown', handleEscKeyPress);
        };
    }, [isModalOpen]);

    // FAQ
    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
        question: "Flag Finder hoạt động như thế nào?",
        answer:
            "Bạn chỉ cần tải lên hình ảnh của lá cờ. Công cụ sẽ phân tích hình ảnh bằng AI để xác định quốc gia và trả về thông tin tương ứng như tên nước, dân số, vị trí địa lý, và nhiều hơn nữa.",
        },
        {
        question: "Tôi có thể tìm kiếm bao nhiêu lần?",
        answer:
            "Flag Finder hoàn toàn miễn phí và không giới hạn số lần sử dụng. Bạn có thể tìm kiếm bao nhiêu lần tùy thích mà không cần đăng ký tài khoản.",
        },
        {
        question: "Công cụ có thể nhận diện tất cả các quốc kỳ không?",
        answer:
            "Flag Finder hỗ trợ nhận diện hầu hết các quốc kỳ hiện nay, kể cả các lá cờ có độ tương đồng cao. Độ chính xác có thể bị ảnh hưởng nếu hình ảnh bị mờ hoặc thiếu chi tiết.",
        },
        {
        question: "Tôi có thể sử dụng Flag Finder trên điện thoại không?",
        answer:
            "Hoàn toàn có thể. Flag Finder được tối ưu cho cả máy tính và thiết bị di động, đảm bảo trải nghiệm mượt mà trên mọi nền tảng.",
        },
        {
        question: "Tôi có cần kết nối Internet để sử dụng Flag Finder không?",
        answer:
            "Có. Vì quá trình phân tích và truy xuất thông tin quốc gia diễn ra trên máy chủ, nên kết nối Internet là bắt buộc để sử dụng công cụ.",
        },
        {
        question: "Flag Finder có lưu trữ hình ảnh tôi tải lên không?",
        answer:
            "Không. Flag Finder không lưu trữ bất kỳ hình ảnh nào từ người dùng. Tất cả hình ảnh được xử lý tạm thời và tự động xóa sau khi nhận diện hoàn tất.",
        },
        {
        question: "Tôi có thể đóng góp cờ hoặc thông tin quốc gia mới không?",
        answer:
            "Rất hoan nghênh! Bạn có thể liên hệ với nhóm phát triển qua trang liên hệ để gửi đề xuất hoặc đóng góp dữ liệu.",
        }
    ];
  
    return (
    <>
    <div className="min-h-screen flex flex-col">
    {/* Header  */}
    <Header />

    {/* Main */}
    <main className="flex flex-grow justify-center items-center min-h-screen m-0 pt-20">
      {/* <div
        className="fixed inset-0 -z-10 bg-center bg-no-repeat bg-fit"
        style={{
          backgroundImage: `url(${background})`,
        //   filter: 'blur(1px)',
        }}
      /> */}

        <div className="max-w-screen-lg mx-auto p-6">
            {/* Chính */}
            <FadeInSection>
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 mb-3">Tìm kiếm hình ảnh cờ quốc gia</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Tải lên hình ảnh quốc kỳ để tìm kiếm thông tin chi tiết về quốc gia đó
                </p>
            </div>

            <div className="max-w-xl bg-white rounded-xl shadow-md overflow-hidden mb-5 mx-auto relative z-10">
                <div className="p-8">
                    {/* Khu vực tải lên hình ảnh */}
                    <div 
                        className={`border-2 border-dashed border-gray-300 rounded-lg 
                        p-8 mb-6 text-center cursor-pointer transition duration-300 
                        ease-in-out hover:border-blue-400 ${isDragging ? 'border-blue-600 bg-blue-50' : ''}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={handleBrowseClick}
                    >
                    <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        onChange={handleFileChange}
                        ref={fileInputRef}
                    />
                    
                    {previewUrl ? (
                        <div className="relative inline-block">
                        <img 
                            src={previewUrl} 
                            alt="Preview" 
                            className="max-h-64 max-w-full rounded-md shadow-md"
                        />
                        <button 
                            className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full cursor-pointer
                                shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500
                                focus:ring-opacity-75 transition-colors duration-200"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleClear();
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            <p className="mt-4 text-gray-600 font-medium">Kéo thả hình ảnh vào đây hoặc nhấn để chọn file</p>
                            <p className="mt-2 text-sm text-gray-500">Hoặc dán ảnh từ bộ nhớ tạm (Ctrl+V)</p>
                        </div>
                    )}
                    </div>

                    {/* Nút tìm kiếm */}
                    <div className="flex justify-center mb-auto">
                    <button 
                        className={`py-2 px-6 rounded-md font-medium text-lg text-white transition-colors duration-200
                        ${image && !isSearching 
                            ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                            : 'bg-gray-400 cursor-not-allowed'}
                        `}
                        onClick={handleSearch}
                        disabled={!image || isSearching}
                    >
                        {isSearching ? (
                        <span className="flex items-center">
                            <svg className="animate-spin mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Đang tìm kiếm...
                        </span>
                        ) : 'Tìm kiếm bằng hình ảnh này'}
                    </button>
                    </div>
                </div>
            </div>

            {/* Hướng dẫn sử dụng */}
            <section className="min-h-[600px] pt-75 -mt-70 max-w-4xl mx-auto bg-gray-100 rounded-xl py-8 px-6 sm:px-12 text-center relative z-0">
            <div className="justify-items-center">
                <h2 className="font-semibold text-4xl mb-1 w-xl">
                Cách sử dụng công cụ tìm kiếm hình ảnh?
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-tight w-xl">
                Thực hiện các bước đơn giản dưới đây để tìm kiếm hình ảnh quốc gia qua ảnh bạn tải lên.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left text-[8px] sm:text-[10px] text-gray-600">
                <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-md text-gray-700 shrink-0">
                <FaImage className="text-blue-600 w-5 h-5" />
                </div>
                <div>
                    <p className="font-semibold text-lg text-gray-900 mb-0.5">
                    Tải ảnh lên:
                    </p>
                    <p className="leading-tight text-sm">
                    Chọn ảnh quốc kỳ từ thiết bị của bạn hoặc kéo và thả ảnh vào khu vực tải lên.
                    </p>
                </div>
                </div>
                <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-md text-gray-700 shrink-0">
                <FaSearch className="text-blue-600 w-5 h-5" />
                </div>
                <div>
                    <p className="font-semibold text-lg text-gray-900 mb-0.5">
                    Phân tích hình ảnh:
                    </p>
                    <p className="leading-tight text-sm">
                    Hệ thống sẽ phân tích lá cờ trong ảnh để xác định quốc gia tương ứng.
                    </p>
                </div>
                </div>
                <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-md text-gray-700 shrink-0">
                <FaFlag className="text-blue-600 w-5 h-5" />
                </div>
                <div>
                    <p className="font-semibold text-lg text-gray-900 mb-0.5">
                    Xem kết quả:
                    </p>
                    <p className="leading-tight text-sm">
                    Kết quả sẽ hiển thị ảnh quốc gia phù hợp nhất trong vài giây.
                    </p>
                </div>
                </div>
            </div>
            </section>
            </FadeInSection>

            {/* Kết quả tìm kiếm */}
            {searchResults.length > 0 && (
            <div className="mt-6 scroll-mt-20" ref={resultRef}>
                <div className="border border-blue-300 bg-blue-50 rounded-xl p-6 shadow-inner">
                <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center flex items-center justify-center gap-2">
                    <FaFlag className="text-blue-600 w-5 h-5" />
                    Kết quả tìm kiếm
                </h2>

                <div className="flex flex-wrap justify-center gap-6">
                    {searchResults.map((result, index) => (
                    <div
                        key={index}
                        className="w-60 border border-gray-200 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300"
                    >
                        <img
                            src={result.image_path ? `${BASE_URL}/${result.image_path}` : FALLBACK_IMAGE}
                            alt={`Cờ ${result.country_name}`}
                            className="w-full h-36 object-cover rounded-t-xl"
                            onError={handleImageError}
                        />

                        <div className="p-4 text-center">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {result.country_name || 'Không xác định'}
                        </h3>
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
                            onClick={() => handleViewDetails(result)}
                        >
                            Xem chi tiết
                        </button>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            </div>
            )}


            {/* Modal Dialog cho thông tin chi tiết quốc gia */}
            {isModalOpen && selectedCountry &&  (
            <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex justify-center items-center z-50" onClick={handleCloseModal}>
                <div className="bg-white rounded-lg w-11/12 max-w-3xl max-h-[90vh] overflow-auto shadow-xl animate-modalAppear" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-800 m-0">Quốc gia {selectedCountry.country_name}</h2>
                    <button className="bg-transparent border-none text-4xl cursor-pointer text-gray-600 hover:text-black transition-colors duration-200" onClick={handleCloseModal}>×</button>
                </div>
                <div className="p-5 flex flex-col md:flex-row gap-10">
                    <div className="flex-none flex justify-center items-start">
                    {selectedCountry.image_path ? (
                        <img src={errorImages[selectedCountry.image_path] ? FALLBACK_IMAGE : `${BASE_URL}/${selectedCountry.image_path}`} alt={`${selectedCountry.country_name}`}
                         className="w-[200px] rounded-lg border-gray-200 shadow-sm object-contain"
                         onError={(e) => handleImageError(e, selectedCountry.image_path)} 
                        />
                        ) : (
                           <img src={FALLBACK_IMAGE} alt="Không có hình ảnh" className="country-flag" />
                        )}
                    </div>
                    <div className="flex-1">
                    {/* <table className="w-full border-collapse">
                        <tbody>
                        <tr className="even:bg-gray-50">
                            <th className="p-2 text-left font-semibold text-gray-600 w-2/5 border-b border-gray-200">Khu vực</th>
                            <td className="p-2 text-left border-b border-gray-200">{selectedCountry.region || 'N/A'}</td>
                        </tr>
                        <tr className="even:bg-gray-50">
                            <th className="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">Dân số</th>
                            <td className="p-2 text-left border-b border-gray-200">{selectedCountry.population ? new Intl.NumberFormat('vi-VN').format(selectedCountry.population) : 'N/A'}</td>
                        </tr>
                        <tr className="even:bg-gray-50">
                            <th className="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">Diện tích (km²)</th>
                            <td className="p-2 text-left border-b border-gray-200">{selectedCountry.area ? new Intl.NumberFormat('vi-VN').format(selectedCountry.area) : 'N/A'}</td>
                        </tr>
                        <tr className="even:bg-gray-50">
                            <th className="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">Mật độ dân số (/sq. mi.)</th>
                            <td className="p-2 text-left border-b border-gray-200">{selectedCountry.pop_density || 'N/A'}</td>
                        </tr>
                        <tr className="even:bg-gray-50">
                            <th className="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">Tỷ lệ bờ biển</th>
                            <td className="p-2 text-left border-b border-gray-200">{selectedCountry.coastline_ratio || 'N/A'}</td>
                        </tr>
                        <tr className="even:bg-gray-50">
                            <th className="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">Di cư thuần</th>
                            <td className="p-2 text-left border-b border-gray-200">{selectedCountry.net_migration || 'N/A'}</td>
                        </tr>
                        <tr className="even:bg-gray-50">
                            <th className="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">Tỷ lệ tử vong trẻ sơ sinh (/1000)</th>
                            <td className="p-2 text-left border-b border-gray-200">{selectedCountry.infant_mortality  || 'N/A'}</td>
                        </tr>
                        <tr className="even:bg-gray-50">
                            <th className="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">GDP ($/người)</th>
                            <td className="p-2 text-left border-b border-gray-200">{selectedCountry.gdp_per_capita ? new Intl.NumberFormat('vi-VN').format(selectedCountry.gdp_per_capita) : 'N/A'}</td>
                        </tr>
                        <tr className="even:bg-gray-50">
                            <th className="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">Tỷ lệ biết chữ (%)</th>
                            <td className="p-2 text-left border-b border-gray-200">{selectedCountry.literacy  || 'N/A'}</td>
                        </tr>
                        <tr className="even:bg-gray-50">
                            <th className="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">Điện thoại (/1000)</th>
                            <td className="p-2 text-left border-b border-gray-200">{selectedCountry.phones_per_1000  || 'N/A'}</td>
                        </tr>
                        <tr className="even:bg-gray-50">
                            <th className="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">Đất canh tác (%)</th>
                            <td className="p-2 text-left border-b border-gray-200">{selectedCountry.arable  || 'N/A'}</td>
                        </tr>
                        <tr className="even:bg-gray-50">
                            <th className="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">Cây trồng (%)</th>
                            <td className="p-2 text-left border-b border-gray-200">{selectedCountry.crops  || 'N/A'}</td>
                        </tr>
                        <tr className="even:bg-gray-50">
                            <th className="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">Khác (%)</th>
                            <td className="p-2 text-left border-b border-gray-200">{selectedCountry.other  || 'N/A'}</td>
                        </tr>
                        <tr className="even:bg-gray-50">
                            <th className="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">Khí hậu</th>
                            <td className="p-2 text-left border-b border-gray-200">{selectedCountry.climate  || 'N/A'}</td>
                        </tr>
                        <tr className="even:bg-gray-50">
                            <th className="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">Tỷ lệ sinh</th>
                            <td className="p-2 text-left border-b border-gray-200">{selectedCountry.birthrate  || 'N/A'}</td>
                        </tr>
                        <tr className="even:bg-gray-50">
                            <th className="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">Tỷ lệ tử vong</th>
                            <td className="p-2 text-left border-b border-gray-200">{selectedCountry.deathrate  || 'N/A'}</td>
                        </tr>
                        <tr className="even:bg-gray-50">
                            <th className="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">Nông nghiệp (%)</th>
                            <td className="p-2 text-left border-b border-gray-200">{selectedCountry.agriculture  || 'N/A'}</td>
                        </tr>
                        <tr className="even:bg-gray-50">
                            <th className="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">Công nghiệp (%)</th>
                            <td className="p-2 text-left border-b border-gray-200">{selectedCountry.industry  || 'N/A'}</td>
                        </tr>
                        <tr className="even:bg-gray-50">
                            <th className="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">Dịch vụ (%)</th>
                            <td className="p-2 text-left border-b border-gray-200">{selectedCountry.service  || 'N/A'}</td>
                        </tr>
                        </tbody>
                    </table> */}
                    <table className="w-full border-collapse">
                    <tbody>
                        {Object.keys(fieldDescriptions).map((key) => (
                        <tr key={key} className="even:bg-gray-50">
                            <th className="p-2 text-left font-semibold text-gray-600 w-3/5 border-b border-gray-200">
                            {fieldLabels[key]}
                            <span className="ml-2 inline-block relative group align-middle">
                                <FaInfoCircle className="text-blue-500 cursor-pointer" />
                                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-white text-gray-800 text-sm 
                                p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50">
                                {fieldDescriptions[key]}
                                </span>
                            </span>
                            </th>
                            <td className="p-2 text-left border-b border-gray-200">
                            {selectedCountry[key] !== undefined && selectedCountry[key] !== null
                                ? ["population", "area", "gdp_per_capita"].includes(key)
                                ? new Intl.NumberFormat('vi-VN').format(selectedCountry[key])
                                : selectedCountry[key]
                                : "N/A"}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>

                    </div>
                </div>
                </div>
            </div>
            )}

            {/* Giới thiệu */}
            <FadeInSection className="py-16 bg-gradient-to-b from-white to-blue-50 rounded-lg">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Giới thiệu về Flag Finder</h2>
                <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
                <p className="text-lg text-gray-700 leading-relaxed">
                    Flag Finder là công cụ nhận diện cờ quốc gia thông minh, sử dụng công nghệ trí tuệ nhân tạo 
                    tiên tiến giúp người dùng nhanh chóng xác định quốc kỳ và tìm hiểu thông tin chi tiết về 
                    quốc gia tương ứng.
                </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                    <p className="text-gray-700 mb-4">
                    Trong thế giới toàn cầu hóa ngày nay, việc nhận biết các quốc kỳ đã trở nên quan trọng hơn 
                    bao giờ hết. Dù bạn là một nhà giáo dục, du khách, người yêu thích địa lý hay đơn giản là 
                    tò mò về các quốc gia trên thế giới, Flag Finder sẽ cung cấp cho bạn trải nghiệm tìm kiếm 
                    dễ dàng và thông tin toàn diện.
                    </p>
                    <p className="text-gray-700">
                    Chỉ với một hình ảnh, hệ thống của chúng tôi có thể nhận diện lá cờ và hiển thị chi tiết về 
                    dân số, kinh tế, địa lý và nhiều thông tin thú vị khác của quốc gia đó. Trải nghiệm học hỏi 
                    chưa bao giờ dễ dàng và thú vị đến thế!
                    </p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Tại sao chọn Flag Finder?</h3>
                    </div>
                    <ul className="space-y-3">
                    <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Độ chính xác cao trong nhận diện lá cờ khác nhau</span>
                    </li>
                    <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Cơ sở dữ liệu toàn diện với thông tin chi tiết về tất cả quốc gia</span>
                    </li>
                    <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Giao diện thân thiện, dễ sử dụng trên mọi thiết bị</span>
                    </li>
                    <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Hoàn toàn miễn phí, không giới hạn số lần tìm kiếm</span>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
            </FadeInSection>

            {/* Tính năng */}
            <FadeInSection className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tính năng nổi bật</h2>
                <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
                <p className="text-lg text-gray-700">
                    Khám phá những tính năng độc đáo giúp Flag Finder trở thành công cụ nhận diện cờ quốc gia 
                    đáng tin cậy nhất hiện nay.
                </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Tính năng 1 */}
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Nhận diện thông minh</h3>
                    <p className="text-gray-700">
                    Công nghệ AI tiên tiến giúp nhận diện chính xác lá cờ ngay cả khi ảnh chụp không hoàn hảo, 
                    bị che khuất một phần hoặc chụp từ các góc độ khác nhau.
                    </p>
                </div>
                
                {/* Tính năng 2 */}
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Thông tin toàn diện</h3>
                    <p className="text-gray-700">
                    Cung cấp dữ liệu chi tiết về mỗi quốc gia bao gồm dân số, GDP, diện tích, 
                    khí hậu và nhiều thông số kinh tế-xã hội khác được cập nhật liên tục.
                    </p>
                </div>
                
                {/* Tính năng 3 */}
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Tìm kiếm nhanh chóng</h3>
                    <p className="text-gray-700">
                    Kết quả tìm kiếm được trả về chỉ trong vài giây với độ chính xác cao giúp 
                    tiết kiệm thời gian và mang lại trải nghiệm người dùng tuyệt vời.
                    </p>
                </div>
                </div>
            </div>
            </FadeInSection>

            {/* Câu hỏi thường gặp */}
            <FadeInSection className="py-16 bg-gradient-to-b from-white to-blue-50 rounded-lg">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Câu hỏi thường gặp</h2>
                <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
                <p className="text-lg text-gray-700">
                    Dưới đây là một số câu hỏi phổ biến mà người dùng thường thắc mắc khi sử dụng Flag Finder.
                </p>
                </div>

                <div className="space-y-4">
                {faqs.map((faq, index) => {
                    const isOpen = openIndex === index;
                    return (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300"
                    >
                        <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full text-left p-5 focus:outline-none flex justify-between items-center"
                        >
                        <span className="text-lg font-semibold text-gray-900">
                            {faq.question}
                        </span>
                        <svg
                            className={`w-5 h-5 text-gray-500 transform transition-transform ${
                            isOpen ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                            />
                        </svg>
                        </button>

                        {/* Animation khi mở câu trả lời */}
                        <div
                        className={`transition-all duration-300 ease-in-out px-5 ${
                            isOpen ? "max-h-[500px] py-4 opacity-100" : "max-h-0 opacity-0"
                        } overflow-hidden text-gray-700 leading-relaxed`}
                        >
                        {faq.answer}
                        </div>
                    </div>
                    );
                })}
                </div>
            </div>
            </FadeInSection>

        </div>
    </main>

    {/* Footer */}
    <Footer />

    </div>

    {/* Thêm animation cho modal */}
    <style jsx>{`
        @keyframes modalAppear {
            from {
            opacity: 0;
            transform: translateY(-20px);
            }
            to {
            opacity: 1;
            transform: translateY(0);
            }
        }
        .animate-modalAppear {
            animation: modalAppear 0.3s ease-out;
        }
        `}
    </style>
    </>    
    );
}

export default Home;