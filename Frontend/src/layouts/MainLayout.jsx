import { Outlet } from "react-router-dom";
import Sidebar from "../components/shaped/Sidebar";
import Navbar from "../components/shaped/Navbar";
const MainLayout = () => {
  return (
    <div className="h-screen flex flex-col bg-black text-white overflow-hidden">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar */}
        <div className="w-[20%] h-full">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default MainLayout;