import { useState, useRef, useEffect } from 'react'
// import './App.css'
// import background from './images/background.jpg'
import { FaImage, FaFlag, FaSearch } from 'react-icons/fa'
import Header from '../components/Header';
import Footer from '../components/Footer';

function Home() {
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openIndex, setOpenIndex] = useState(null);
    const fileInputRef = useRef(null);

    // Data mẫu về các quốc gia
    const countriesData = [
        {
        id: 1,
        name: "Việt Nam",
        flag: "/api/placeholder/300/200",
        region: "Southeast Asia",
        population: "97,338,579",
        area: "331,210",
        popDensity: "293.9",
        coastline: "0.35",
        netMigration: "-0.3",
        infantMortality: "16.7",
        gdp: "8,397",
        literacy: "94.5",
        phones: "125",
        arable: "20.6",
        crops: "12.1",
        other: "67.3",
        climate: "Tropical",
        birthrate: "15.9",
        deathrate: "5.9",
        agriculture: "15.8",
        industry: "33.8",
        service: "50.4"
        }
    ];

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
    const handleSearch = () => {
        if (!image) return;
        
        setIsSearching(true);
        
        // Giả lập API tìm kiếm
        setTimeout(() => {
        // Kết quả tìm kiếm mẫu với dữ liệu quốc gia thực tế
        const mockResults = countriesData.map(country => ({
            id: country.id,
            title: `${country.name}`,
            imageUrl: country.flag,
            countryId: country.id  // Link đến dữ liệu quốc gia
        }));
        
        setSearchResults(mockResults);
        setIsSearching(false);
        }, 1500);
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
    const handleViewDetails = (countryId) => {
        const country = countriesData.find(c => c.id === countryId);
        if (country) {
        setSelectedCountry(country);
        setIsModalOpen(true);
        }
    };
    
    // Đóng modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
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
    <main class="flex flex-grow justify-center items-center min-h-screen m-0">
      {/* <div
        class="fixed inset-0 -z-10 bg-center bg-no-repeat bg-fit"
        style={{
          backgroundImage: `url(${background})`,
          // filter: 'blur(2px)',
        }}
      />       */}

        <div class="max-w-screen-lg mx-auto p-6">
            <div class="text-center mb-10">
            <h2 class="text-4xl font-bold text-gray-900 mb-3">Tìm kiếm hình ảnh cờ quốc gia</h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                Tải lên hình ảnh quốc kỳ để tìm kiếm thông tin chi tiết về quốc gia đó
            </p>
            </div>

            <div class="max-w-xl bg-white rounded-xl shadow-md overflow-hidden mb-5 mx-auto relative z-100">
            <div class="p-8">
                {/* Khu vực tải lên hình ảnh */}
                <div 
                class={`border-2 border-dashed border-gray-300 rounded-lg 
                p-8 mb-6 text-center cursor-pointer transition duration-300 
                ease-in-out hover:border-blue-400 ${isDragging ? 'border-blue-600 bg-blue-50' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleBrowseClick}
                >
                <input 
                    type="file" 
                    class="hidden" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    ref={fileInputRef}
                />
                
                {previewUrl ? (
                    <div class="relative inline-block">
                    <img 
                        src={previewUrl} 
                        alt="Preview" 
                        class="max-h-64 max-w-full rounded-md shadow-md"
                    />
                    <button 
                        class="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full cursor-pointer
                            shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500
                            focus:ring-opacity-75 transition-colors duration-200"
                        onClick={(e) => {
                        e.stopPropagation();
                        handleClear();
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    </div>
                ) : (
                    <div class="flex flex-col items-center">
                    <svg class="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <p class="mt-4 text-gray-600 font-medium">Kéo thả hình ảnh vào đây hoặc nhấn để chọn file</p>
                    <p class="mt-2 text-sm text-gray-500">Hoặc dán ảnh từ bộ nhớ tạm (Ctrl+V)</p>
                    </div>
                )}
                </div>

                {/* Nút tìm kiếm */}
                <div class="flex justify-center mb-auto">
                <button 
                    class={`py-2 px-6 rounded-md font-medium text-lg text-white transition-colors duration-200
                    ${image && !isSearching 
                        ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                        : 'bg-gray-400 cursor-not-allowed'}
                    `}
                    onClick={handleSearch}
                    disabled={!image || isSearching}
                >
                    {isSearching ? (
                    <span class="flex items-center">
                        <svg class="animate-spin mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Đang tìm kiếm...
                    </span>
                    ) : 'Tìm kiếm bằng hình ảnh này'}
                </button>
                </div>
            </div>
            </div>

            {/* Hướng dẫn sử dụng */}
            <section class="min-h-[600px] pt-75 -mt-70 max-w-4xl mx-auto bg-gray-100 rounded-xl py-8 px-6 sm:px-12 text-center relative z-0">
            <div class="justify-items-center">
                <h2 class="font-semibold text-4xl mb-1 w-xl">
                Cách sử dụng công cụ tìm kiếm hình ảnh?
                </h2>
                <p class="text-lg text-gray-600 mb-6 leading-tight w-xl">
                Thực hiện các bước đơn giản dưới đây để tìm kiếm hình ảnh quốc gia qua ảnh bạn tải lên.
                </p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left text-[8px] sm:text-[10px] text-gray-600">
                <div class="flex items-start space-x-2 sm:space-x-3">
                <div class="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-md text-gray-700 shrink-0">
                <FaImage class="text-gray-600 w-5 h-5" />
                </div>
                <div>
                    <p class="font-semibold text-lg text-gray-900 mb-0.5">
                    Tải ảnh lên:
                    </p>
                    <p class="leading-tight text-sm">
                    Chọn ảnh quốc kỳ từ thiết bị của bạn hoặc kéo và thả ảnh vào khu vực tải lên.
                    </p>
                </div>
                </div>
                <div class="flex items-start space-x-2 sm:space-x-3">
                <div class="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-md text-gray-700 shrink-0">
                <FaSearch class="text-gray-600 w-5 h-5" />
                </div>
                <div>
                    <p class="font-semibold text-lg text-gray-900 mb-0.5">
                    Phân tích hình ảnh:
                    </p>
                    <p class="leading-tight text-sm">
                    Hệ thống sẽ phân tích lá cờ trong ảnh để xác định quốc gia tương ứng.
                    </p>
                </div>
                </div>
                <div class="flex items-start space-x-2 sm:space-x-3">
                <div class="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-md text-gray-700 shrink-0">
                <FaFlag class="text-gray-600 w-5 h-5" />
                </div>
                <div>
                    <p class="font-semibold text-lg text-gray-900 mb-0.5">
                    Xem kết quả:
                    </p>
                    <p class="leading-tight text-sm">
                    Kết quả sẽ hiển thị ảnh quốc gia phù hợp nhất trong vài giây.
                    </p>
                </div>
                </div>
            </div>
            </section>

            {/* Kết quả tìm kiếm */}
            {searchResults.length > 0 && (
            <div class="mt-6">
                <h2 class="text-xl font-semibold mb-4">Kết quả tìm kiếm</h2>
                <div class="flex md:grid-cols-2 gap-4 ">
                {searchResults.map(result => (
                    <div key={result.id} class="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <img src={result.imageUrl} alt={result.title} class="w-full h-40 object-cover" />
                    <div class="p-4">
                        <h3 class="font-medium">{result.title}</h3>
                        <button 
                        class="bg-blue-600 text-white py-1.5 px-3 rounded text-sm mt-2 hover:bg-blue-700 transition duration-200 cursor-pointer"
                        onClick={() => handleViewDetails(result.countryId)}
                        >
                        Xem chi tiết
                        </button>                
                    </div>
                    </div>
                ))}
                </div>
            </div>
            )}

            {/* Modal Dialog cho thông tin chi tiết quốc gia */}
            {isModalOpen && selectedCountry && (
            <div class="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50" onClick={handleCloseModal}>
                <div class="bg-white rounded-lg w-11/12 max-w-3xl max-h-[90vh] overflow-auto shadow-xl animate-modalAppear" onClick={(e) => e.stopPropagation()}>
                <div class="flex justify-between items-center p-4 border-b border-gray-200">
                    <h2 class="text-2xl font-semibold text-gray-800 m-0">{selectedCountry.name}</h2>
                    <button class="bg-transparent border-none text-4xl cursor-pointer text-gray-600 hover:text-black transition-colors duration-200" onClick={handleCloseModal}>×</button>
                </div>
                <div class="p-5 flex flex-col md:flex-row gap-5">
                    <div class="flex-none flex justify-center items-start">
                    <img src={selectedCountry.flag} alt={`Cờ của ${selectedCountry.name}`} class="w-full max-w-xs border border-gray-200 shadow-sm" />
                    </div>
                    <div class="flex-1">
                    <table class="w-full border-collapse">
                        <tbody>
                        <tr class="even:bg-gray-50">
                            <th class="p-2 text-left font-semibold text-gray-600 w-2/5 border-b border-gray-200">Khu vực</th>
                            <td class="p-2 text-left border-b border-gray-200">{selectedCountry.region}</td>
                        </tr>
                        <tr class="even:bg-gray-50">
                            <th class="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">Dân số</th>
                            <td class="p-2 text-left border-b border-gray-200">{selectedCountry.population}</td>
                        </tr>
                        <tr class="even:bg-gray-50">
                            <th class="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">Diện tích (sq. mi.)</th>
                            <td class="p-2 text-left border-b border-gray-200">{selectedCountry.area}</td>
                        </tr>
                        <tr class="even:bg-gray-50">
                            <th class="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">Mật độ dân số (/sq. mi.)</th>
                            <td class="p-2 text-left border-b border-gray-200">{selectedCountry.popDensity}</td>
                        </tr>
                        <tr class="even:bg-gray-50">
                            <th class="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">Tỷ lệ bờ biển</th>
                            <td class="p-2 text-left border-b border-gray-200">{selectedCountry.coastline}</td>
                        </tr>
                        <tr class="even:bg-gray-50">
                            <th class="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">Di cư thuần</th>
                            <td class="p-2 text-left border-b border-gray-200">{selectedCountry.netMigration}</td>
                        </tr>
                        <tr class="even:bg-gray-50">
                            <th class="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">Tỷ lệ tử vong trẻ sơ sinh (/1000)</th>
                            <td class="p-2 text-left border-b border-gray-200">{selectedCountry.infantMortality}</td>
                        </tr>
                        <tr class="even:bg-gray-50">
                            <th class="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">GDP ($/người)</th>
                            <td class="p-2 text-left border-b border-gray-200">{selectedCountry.gdp}</td>
                        </tr>
                        <tr class="even:bg-gray-50">
                            <th class="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">Tỷ lệ biết chữ (%)</th>
                            <td class="p-2 text-left border-b border-gray-200">{selectedCountry.literacy}</td>
                        </tr>
                        <tr class="even:bg-gray-50">
                            <th class="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">Điện thoại (/1000)</th>
                            <td class="p-2 text-left border-b border-gray-200">{selectedCountry.phones}</td>
                        </tr>
                        <tr class="even:bg-gray-50">
                            <th class="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">Đất canh tác (%)</th>
                            <td class="p-2 text-left border-b border-gray-200">{selectedCountry.arable}</td>
                        </tr>
                        <tr class="even:bg-gray-50">
                            <th class="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">Cây trồng (%)</th>
                            <td class="p-2 text-left border-b border-gray-200">{selectedCountry.crops}</td>
                        </tr>
                        <tr class="even:bg-gray-50">
                            <th class="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">Khác (%)</th>
                            <td class="p-2 text-left border-b border-gray-200">{selectedCountry.other}</td>
                        </tr>
                        <tr class="even:bg-gray-50">
                            <th class="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">Khí hậu</th>
                            <td class="p-2 text-left border-b border-gray-200">{selectedCountry.climate}</td>
                        </tr>
                        <tr class="even:bg-gray-50">
                            <th class="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">Tỷ lệ sinh</th>
                            <td class="p-2 text-left border-b border-gray-200">{selectedCountry.birthrate}</td>
                        </tr>
                        <tr class="even:bg-gray-50">
                            <th class="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">Tỷ lệ tử vong</th>
                            <td class="p-2 text-left border-b border-gray-200">{selectedCountry.deathrate}</td>
                        </tr>
                        <tr class="even:bg-gray-50">
                            <th class="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">Nông nghiệp (%)</th>
                            <td class="p-2 text-left border-b border-gray-200">{selectedCountry.agriculture}</td>
                        </tr>
                        <tr class="even:bg-gray-50">
                            <th class="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">Công nghiệp (%)</th>
                            <td class="p-2 text-left border-b border-gray-200">{selectedCountry.industry}</td>
                        </tr>
                        <tr class="even:bg-gray-50">
                            <th class="p-2 text-left font-semibold text-gray-600 border-b border-gray-200">Dịch vụ (%)</th>
                            <td class="p-2 text-left border-b border-gray-200">{selectedCountry.service}</td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
                </div>
            </div>
            )}

            {/* Giới thiệu */}
            <section class="py-16 bg-gradient-to-b from-white to-blue-50 rounded-lg">
            <div class="max-w-4xl mx-auto px-6">
                <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Giới thiệu về Flag Finder</h2>
                <div class="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
                <p class="text-lg text-gray-700 leading-relaxed">
                    Flag Finder là công cụ nhận diện cờ quốc gia thông minh, sử dụng công nghệ trí tuệ nhân tạo 
                    tiên tiến giúp người dùng nhanh chóng xác định quốc kỳ và tìm hiểu thông tin chi tiết về 
                    quốc gia tương ứng.
                </p>
                </div>
                
                <div class="grid md:grid-cols-2 gap-10 items-center">
                <div>
                    <p class="text-gray-700 mb-4">
                    Trong thế giới toàn cầu hóa ngày nay, việc nhận biết các quốc kỳ đã trở nên quan trọng hơn 
                    bao giờ hết. Dù bạn là một nhà giáo dục, du khách, người yêu thích địa lý hay đơn giản là 
                    tò mò về các quốc gia trên thế giới, Flag Finder sẽ cung cấp cho bạn trải nghiệm tìm kiếm 
                    dễ dàng và thông tin toàn diện.
                    </p>
                    <p class="text-gray-700">
                    Chỉ với một hình ảnh, hệ thống của chúng tôi có thể nhận diện lá cờ và hiển thị chi tiết về 
                    dân số, kinh tế, địa lý và nhiều thông tin thú vị khác của quốc gia đó. Trải nghiệm học hỏi 
                    chưa bao giờ dễ dàng và thú vị đến thế!
                    </p>
                </div>
                
                <div class="bg-white p-6 rounded-xl shadow-md">
                    <div class="text-center mb-4">
                    <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">Tại sao chọn Flag Finder?</h3>
                    </div>
                    <ul class="space-y-3">
                    <li class="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span class="text-gray-700">Độ chính xác cao trong nhận diện lá cờ từ nhiều góc độ khác nhau</span>
                    </li>
                    <li class="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span class="text-gray-700">Cơ sở dữ liệu toàn diện với thông tin chi tiết về tất cả quốc gia</span>
                    </li>
                    <li class="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span class="text-gray-700">Giao diện thân thiện, dễ sử dụng trên mọi thiết bị</span>
                    </li>
                    <li class="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span class="text-gray-700">Hoàn toàn miễn phí, không giới hạn số lần tìm kiếm</span>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
            </section>

            {/* Tính năng */}
            <section class="py-16 bg-white">
            <div class="max-w-4xl mx-auto px-6">
                <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tính năng nổi bật</h2>
                <div class="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
                <p class="text-lg text-gray-700">
                    Khám phá những tính năng độc đáo giúp Flag Finder trở thành công cụ nhận diện cờ quốc gia 
                    đáng tin cậy nhất hiện nay.
                </p>
                </div>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Tính năng 1 */}
                <div class="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div class="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-3">Nhận diện thông minh</h3>
                    <p class="text-gray-700">
                    Công nghệ AI tiên tiến giúp nhận diện chính xác lá cờ ngay cả khi ảnh chụp không hoàn hảo, 
                    bị che khuất một phần hoặc chụp từ các góc độ khác nhau.
                    </p>
                </div>
                
                {/* Tính năng 2 */}
                <div class="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div class="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-3">Thông tin toàn diện</h3>
                    <p class="text-gray-700">
                    Cung cấp dữ liệu chi tiết về mỗi quốc gia bao gồm dân số, GDP, diện tích, 
                    khí hậu và nhiều thông số kinh tế-xã hội khác được cập nhật liên tục.
                    </p>
                </div>
                
                {/* Tính năng 3 */}
                <div class="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div class="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-3">Tìm kiếm nhanh chóng</h3>
                    <p class="text-gray-700">
                    Kết quả tìm kiếm được trả về chỉ trong vài giây với độ chính xác cao giúp 
                    tiết kiệm thời gian và mang lại trải nghiệm người dùng tuyệt vời.
                    </p>
                </div>
                </div>
            </div>
            </section>

            {/* Câu hỏi thường gặp */}
            <section class="py-16 bg-gradient-to-b from-white to-blue-50 rounded-lg">
            <div class="max-w-4xl mx-auto px-6">
                <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Câu hỏi thường gặp</h2>
                <div class="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
                <p class="text-lg text-gray-700">
                    Dưới đây là một số câu hỏi phổ biến mà người dùng thường thắc mắc khi sử dụng Flag Finder.
                </p>
                </div>

                <div class="space-y-4">
                {faqs.map((faq, index) => {
                    const isOpen = openIndex === index;
                    return (
                    <div
                        key={index}
                        class="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300"
                    >
                        <button
                        onClick={() => toggleFAQ(index)}
                        class="w-full text-left p-5 focus:outline-none flex justify-between items-center"
                        >
                        <span class="text-lg font-semibold text-gray-900">
                            {faq.question}
                        </span>
                        <svg
                            class={`w-5 h-5 text-gray-500 transform transition-transform ${
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
                        class={`transition-all duration-300 ease-in-out px-5 ${
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
            </section>

        </div>
    </main>

    {/* Footer  */}
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