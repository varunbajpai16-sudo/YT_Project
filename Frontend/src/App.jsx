import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";
import AuthLayout from "../src/layouts/AuthLayout";
import { Toaster } from "react-hot-toast";
import RegisterPage from "./pages/RegistrationPage";
import ChannelLayout from "../src/layouts/ChannelLayout";
import ChannelPage from "../src/pages/ChannelPage";
import ShortsPage from "./pages/SortsPage";
import WatchPage from "../src/pages/WatchPage";
import Watchlayout from "../src/layouts/Watchlayout";
function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sorts" element={<ShortsPage />} />
        </Route>

        <Route element={<ChannelLayout />}>
          <Route path="/channel" element={<ChannelPage />} />
        </Route>

        <Route element={<Watchlayout/>}>
          <Route path="/watch" element={<WatchPage/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
