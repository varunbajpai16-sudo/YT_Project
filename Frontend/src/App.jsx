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
import ChannelContent from "./pages/ChannelContentPage";
import FeedbackLayout from "../src/layouts/FeedbackLayout";
import SendFeedback from "./pages/SendFeedbackPage";
import SettingsPage from "./pages/SettingPage";
function App() {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#181818",
            color: "#fff",
          },
        }}
      />
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
          <Route path="/channelcontent" element={<ChannelContent />} />
        </Route>

        <Route element={<Watchlayout />}>
          <Route path="/watch" element={<WatchPage />} />
        </Route>

        <Route element={<FeedbackLayout />}>
          <Route path="/feedback" element={<SendFeedback />} />
        </Route>

        <Route path="/setting" element={<SettingsPage />} />
      </Routes>
    </>
  );
}

export default App;
