import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import HostAuction from './pages/HostAuction'
import AuctionDetail from './pages/AuctionDetail'
import Navbar from './components/Navbar'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/host" element={<HostAuction />} />
        <Route path="/auction/:id" element={<AuctionDetail />} />
      </Routes>
    </div>
  )
}

export default App
