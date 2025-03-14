import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
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
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/host" element={<HostAuction />} />
        <Route path="/auction/:id" element={<AuctionDetail />} />
      </Routes>
    </div>
  )
}

export default App
