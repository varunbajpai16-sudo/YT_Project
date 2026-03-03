import { Outlet } from "react-router-dom";
import Navbar from "../components/shaped/Navbar";
const ChannelLayout = () => {
  return <div>
    <Navbar/>
    <Outlet/>
  </div>;
};

export default ChannelLayout;
