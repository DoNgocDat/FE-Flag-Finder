import { useState, useRef, useEffect } from 'react'
// import './App.css'
// import background from './images/background.jpg'
import logo from './images/main_logo.png'
import { FaImage, FaFlag, FaSearch, FaSun, FaMoon } from 'react-icons/fa'

function App() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  return ( 
    <>
    {/* Header */}
      <header class="bg-white border-b border-gray-200 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-3">
            <div class="flex items-center">
              <div class='h-12 w-12' style={{backgroundImage: `url(${logo})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
              <span class="ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">BETA</span>
            </div>
            {/* <nav className="flex space-x-8">
              <a href="#" className="text-gray-500 hover:text-gray-900">Trang chủ</a>
              <a href="#" className="text-gray-500 hover:text-gray-900">Giới thiệu</a>
              <a href="#" className="text-gray-500 hover:text-gray-900">Liên hệ</a>
            </nav> */}

            {/* <div class="flex items-center space-x-3">
              <button aria-label="Toggle dark mode" class="text-gray-600 hover:text-gray-900 focus:outline-none">
                <FaSun class="h-5 w-5" />
              </button>
              <button aria-label="Toggle dark mode off" class="text-gray-400 hover:text-gray-900 focus:outline-none">
                <FaMoon class="h-5 w-5" />
              </button>
            </div> */}

          </div>
        </div>
      </header>

    {/* Main */}
    <main class="flex justify-center items-center min-h-screen m-0">
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
              <FaImage className="text-gray-600 w-5 h-5" />
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
              <FaSearch className="text-gray-600 w-5 h-5" />
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
              <FaFlag className="text-gray-600 w-5 h-5" />
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
      </div>
    </main>

    {/* Footer */}
    <footer class="bg-gray-800 text-white py-8 mt-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-4 md:mb-0">
            <div class="flex justify-left">
              <div class='h-20 w-25' style={{backgroundImage: `url(${logo})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
              {/* <span className="ml-2 text-xl font-bold">Tìm kiếm cờ quốc gia</span> */}
            </div>
          </div>
          {/* <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white">Điều khoản sử dụng</a>
            <a href="#" className="text-gray-400 hover:text-white">Chính sách bảo mật</a>
            <a href="#" className="text-gray-400 hover:text-white">Trợ giúp</a>
          </div> */}
        </div>
      </div>
      <div class="mt-5 text-center border-t-1">
        <p class="mt-4 mb-auto text-sm text-white-400 font-semibold">© 2025 Bản quyền thuộc về Flag Finder</p>
      </div>
    </footer>

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
    `}</style>

    </>
  )
}

export default App
