import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/Notfound'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Navbar>

          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>

            {/*404 Page*/}
            <Route path="*" element={<Notfound/>}/>
          </Routes>
        </Navbar>
      </Router>
    </>
  )
}

export default App
