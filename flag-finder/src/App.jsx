import { useState, useRef, useEffect } from 'react'
import './App.css'

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
    },
    {
      id: 2,
      name: "United States",
      flag: "/api/placeholder/300/200",
      region: "North America",
      population: "331,002,651",
      area: "9,833,517",
      popDensity: "33.6",
      coastline: "0.12",
      netMigration: "3.0",
      infantMortality: "5.8",
      gdp: "65,297",
      literacy: "99.0",
      phones: "987",
      arable: "16.8",
      crops: "0.3",
      other: "82.9",
      climate: "Mostly temperate",
      birthrate: "12.4",
      deathrate: "8.2",
      agriculture: "0.9",
      industry: "18.9",
      service: "80.2"
    },
    {
      id: 3,
      name: "Japan",
      flag: "/api/placeholder/300/200",
      region: "East Asia",
      population: "126,476,461",
      area: "377,915",
      popDensity: "334.7",
      coastline: "0.88",
      netMigration: "0.0",
      infantMortality: "2.0",
      gdp: "40,247",
      literacy: "99.0",
      phones: "461",
      arable: "11.7",
      crops: "0.9",
      other: "87.4",
      climate: "Varies from tropical to temperate",
      birthrate: "7.3",
      deathrate: "9.8",
      agriculture: "1.1",
      industry: "30.1",
      service: "68.8"
    },
    {
      id: 4,
      name: "Brazil",
      flag: "/api/placeholder/300/200",
      region: "South America",
      population: "212,559,417",
      area: "8,515,767",
      popDensity: "24.9",
      coastline: "0.04",
      netMigration: "0.0",
      infantMortality: "16.9",
      gdp: "8,717",
      literacy: "93.2",
      phones: "198",
      arable: "6.6",
      crops: "0.8",
      other: "92.6",
      climate: "Mostly tropical",
      birthrate: "14.1",
      deathrate: "6.7",
      agriculture: "5.2",
      industry: "21.0",
      service: "73.8"
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
        title: `Cờ quốc gia ${country.name}`,
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
    <div className="image-search-container">
      <div className="header">
        <h1>Tìm kiếm hình ảnh cờ quốc gia</h1>
        <p>Tải lên một hình ảnh quốc kỳ để tìm kiếm</p>
      </div>
      
      {/* Khu vực tải lên hình ảnh */}
      <div 
        className={`upload-area ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
      >
        <input 
          type="file" 
          className="file-input" 
          accept="image/*" 
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        
        {previewUrl ? (
          <div className="preview-container">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="preview-image"
            />
            <button 
              className="clear-button"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="clear-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="upload-placeholder">
            <svg className="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <p className="upload-text">Kéo thả hình ảnh vào đây hoặc nhấn để chọn file</p>
            <p className="upload-hint">Hoặc dán ảnh từ bộ nhớ tạm (Ctrl+V)</p>
          </div>
        )}
      </div>
      
      {/* Nút tìm kiếm */}
      <div className="search-button-container">
        <button 
          className={`search-button ${image ? 'active' : 'disabled'}`}
          onClick={handleSearch}
          disabled={!image || isSearching}
        >
          {isSearching ? (
            <span className="loading-text">
              <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang tìm kiếm...
            </span>
          ) : 'Tìm kiếm bằng hình ảnh này'}
        </button>
      </div>
      
      {/* Kết quả tìm kiếm */}
      {searchResults.length > 0 && (
        <div className="results-container">
          <h2 className="results-title">Kết quả tìm kiếm</h2>
          <div className="results-grid">
            {searchResults.map(result => (
              <div key={result.id} className="result-card">
                <img src={result.imageUrl} alt={result.title} className="result-image" />
                <div className="result-info">
                  <h3 className="result-title">{result.title}</h3>
                  <button 
                    className="result-link"
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
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedCountry.name}</h2>
              <button className="modal-close" onClick={handleCloseModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="country-image-container">
                <img src={selectedCountry.flag} alt={`Cờ của ${selectedCountry.name}`} className="country-flag" />
              </div>
              <div className="country-details">
                <table className="country-info-table">
                  <tbody>
                    <tr>
                      <th>Khu vực</th>
                      <td>{selectedCountry.region}</td>
                    </tr>
                    <tr>
                      <th>Dân số</th>
                      <td>{selectedCountry.population}</td>
                    </tr>
                    <tr>
                      <th>Diện tích (sq. mi.)</th>
                      <td>{selectedCountry.area}</td>
                    </tr>
                    <tr>
                      <th>Mật độ dân số (/sq. mi.)</th>
                      <td>{selectedCountry.popDensity}</td>
                    </tr>
                    <tr>
                      <th>Tỷ lệ bờ biển</th>
                      <td>{selectedCountry.coastline}</td>
                    </tr>
                    <tr>
                      <th>Di cư thuần</th>
                      <td>{selectedCountry.netMigration}</td>
                    </tr>
                    <tr>
                      <th>Tỷ lệ tử vong trẻ sơ sinh (/1000)</th>
                      <td>{selectedCountry.infantMortality}</td>
                    </tr>
                    <tr>
                      <th>GDP ($/người)</th>
                      <td>{selectedCountry.gdp}</td>
                    </tr>
                    <tr>
                      <th>Tỷ lệ biết chữ (%)</th>
                      <td>{selectedCountry.literacy}</td>
                    </tr>
                    <tr>
                      <th>Điện thoại (/1000)</th>
                      <td>{selectedCountry.phones}</td>
                    </tr>
                    <tr>
                      <th>Đất canh tác (%)</th>
                      <td>{selectedCountry.arable}</td>
                    </tr>
                    <tr>
                      <th>Cây trồng (%)</th>
                      <td>{selectedCountry.crops}</td>
                    </tr>
                    <tr>
                      <th>Khác (%)</th>
                      <td>{selectedCountry.other}</td>
                    </tr>
                    <tr>
                      <th>Khí hậu</th>
                      <td>{selectedCountry.climate}</td>
                    </tr>
                    <tr>
                      <th>Tỷ lệ sinh</th>
                      <td>{selectedCountry.birthrate}</td>
                    </tr>
                    <tr>
                      <th>Tỷ lệ tử vong</th>
                      <td>{selectedCountry.deathrate}</td>
                    </tr>
                    <tr>
                      <th>Nông nghiệp (%)</th>
                      <td>{selectedCountry.agriculture}</td>
                    </tr>
                    <tr>
                      <th>Công nghiệp (%)</th>
                      <td>{selectedCountry.industry}</td>
                    </tr>
                    <tr>
                      <th>Dịch vụ (%)</th>
                      <td>{selectedCountry.service}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
    </>
  )
}

export default App
