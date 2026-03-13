import { Outlet } from "react-router-dom";
import Sidebar from "../components/shaped/Sidebar";
import Navbar from "../components/shaped/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { closeSidebar } from "../features/toggle/toggleslice";

const MainLayout = () => {
  const sidebarOpen = useSelector((state) => state.toggle.showSidebar);
  const dispatch = useDispatch();

  useEffect(() => {

    const handleResize = () => {

      // Only auto close on small screens
      if (window.innerWidth < 900) {
        dispatch(closeSidebar());
      }

    };

    handleResize(); // run on load

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);

  }, [dispatch]);

  return (
    <div className="h-screen flex flex-col bg-black text-white overflow-hidden">

      <Navbar />

      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ${
            sidebarOpen ? "w-[240px]" : "w-[80px]"
          }`}
        >
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