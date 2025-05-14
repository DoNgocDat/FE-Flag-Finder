import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const fileInputRef = useRef(null);

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
      // Kết quả tìm kiếm mẫu
      const mockResults = [
        { id: 1, title: 'Kết quả hình ảnh 1', imageUrl: '/api/placeholder/300/200' },
        { id: 2, title: 'Kết quả hình ảnh 2', imageUrl: '/api/placeholder/300/200' },
        { id: 3, title: 'Kết quả hình ảnh 3', imageUrl: '/api/placeholder/300/200' },
        { id: 4, title: 'Kết quả hình ảnh 4', imageUrl: '/api/placeholder/300/200' },
      ];
      
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
  
  // Thêm event listener cho paste
  useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, []);


  return ( 
    <>
    <div className="image-search-container">
      <div className="header">
        <h1>Tìm kiếm hình ảnh quốc gia</h1>
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
                  <a href="#" className="result-link">Xem chi tiết</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    </>
  )
}

export default App
