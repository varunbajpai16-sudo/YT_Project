import { Outlet } from "react-router-dom";
import Sidebar from "../components/shaped/Sidebar";
import Navbar from "../components/shaped/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { toggleSidebar } from "../features/toggle/toggleslice";

const MainLayout = () => {
  const sidebarOpen = useSelector((state) => state.toggle.showSidebar);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {

      if (window.innerWidth < 900 && sidebarOpen) {
        dispatch(toggleSidebar()); // collapse sidebar
      }

      if (window.innerWidth >= 900 && !sidebarOpen) {
        dispatch(toggleSidebar()); // expand sidebar
      }

    };

    window.addEventListener("resize", handleResize);

    handleResize(); // run on load

    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarOpen, dispatch]);

  return (
    <div className="h-screen flex flex-col bg-black text-white overflow-hidden">

      <Navbar />

      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <div
          className={`h-full transition-all duration-300
          ${sidebarOpen ? "w-[240px]" : "w-[80px]"}`}
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