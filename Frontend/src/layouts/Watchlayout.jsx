import Navbar from "../components/shaped/Navbar";
import { Outlet } from "react-router-dom";

export default function Watchlayout(){
    return(
    <div className="flex flex-col">
        <Navbar/>
        <div >
            <Outlet/>
        </div>
    </div>
    )

}