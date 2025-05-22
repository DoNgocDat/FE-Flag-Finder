import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Contact from './pages/Contact'

function App() {
  const location = useLocation(); 

  useEffect(() => {
    // Scroll lên đầu mỗi khi pathname thay đổi
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return ( 
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </>
  )
}

export default App
