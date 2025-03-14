import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import HostAuction from './pages/HostAuction'
import AuctionDetail from './pages/AuctionDetail'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      {/* Background covering full scrollable area */}
      <div className="fixed top-0 left-0 w-full min-h-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] z-[-2]"></div>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/host" element={<HostAuction />} />
        <Route path="/auction/:id" element={<AuctionDetail />} />
      </Routes>
    </div>
  );
}


export default App
