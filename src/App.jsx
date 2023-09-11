import { BrowserRouter, Route, Routes } from "react-router-dom";

// import Navbar from './Components/Navbar';

// import HomePage from './Pages/Home';

import PrayerRequest from "./Pages/PrayerRequest";

import PrayerList from "./Pages/PrayerList";

import Donation from "./Pages/Donation";

import SeedDonation from "./Pages/SeedDonation";

import TitheDonation from "./Pages/TitheDonation";

import Sermons from "./Pages/Sermons";

import SermonDetails from "./Pages/SermonDetails";

import SermonVideo from "./Pages/SermonVideo";

import Appointment from "./Pages/Appointment";

import SplashBar from "./Components/SplashBar";

import { useState } from "react";

import Dashboard from "./Pages/Dashboard";

import MemberSignUpPage from "./Pages/MemberSignUpPage";

import MemberLoginPage from "./Pages/MemberLoginPage";

import Landing from "./Pages/Landing";
import MemberHome from "./Pages/MemberHome";
import AdminHome from "./Pages/AdminHome";
import MasterHome from "./Pages/MasterHome";
import AdminLogin from "./Pages/AdminLogin";
import AdminSignUp from "./Pages/AdminSignUp";
import MasterLogin from "./Pages/MasterLogin";
import SermonCreate from "./Pages/SermonCreate";
import ChurchCreate from "./Pages/ChurchCreate";
import SermonDownload from "./Pages/SermonDownloads";
import { useMediaQuery, useTheme } from "@material-ui/core";
import Room from "./Pages/Room/Room";
import LobbyForm from "./Pages/Lobby/lobby";
import ChurchInvitation from "./Pages/ChurchInvitation";

const App = () => {
  const [showHomePage, setShowHomePage] = useState(false);

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down(1024));

  const handleSplashScreenFinish = () => {
    setShowHomePage(true);
  };

  return (
    <BrowserRouter>
      {/* <Navbar /> */}

      <Routes>
        <Route
          path="/"
          element={
            showHomePage ? (
              <Landing />
            ) : isMobile ? (
              <SplashBar onFinish={handleSplashScreenFinish} />
            ) : (
              <Landing />
            )
          }

          // element={<HomePage />}
        />

        <Route path="/landing" element={<Landing />} />
        <Route path="/room" element={<Room />} />
        <Route path="/lobby" element={<LobbyForm />} />
        <Route path="/churchInvitation" element={<ChurchInvitation />} />

        <Route path="/admin/home" element={<AdminHome />} />

        <Route path="/master/home" element={<MasterHome />} />

        <Route path="/master/sign" element={<MasterLogin />} />

        {/* <Route path="/absent" element={<Absent />} /> */}

        <Route path="/leader/sign" element={<AdminSignUp />} />

        <Route path="/leader/login" element={<AdminLogin />} />

        <Route path="/member/home" element={<MemberHome />} />

        <Route path="/member/sign" element={<MemberSignUpPage />} />

        <Route path="/member/login" element={<MemberLoginPage />} />

        <Route path="/prayer" element={<PrayerRequest />} />

        <Route path="/dashboard" element={<Dashboard />} />

        {/* <Route path="/about" element={<About />} /> */}

        {/* <Route path="/contact" element={<Contact />} /> */}

        <Route path="/prayers" element={<PrayerList />} />

        <Route path="/donations" element={<Donation />} />

        <Route path="/seeddonations" element={<SeedDonation />} />

        <Route path="/tithedonations" element={<TitheDonation />} />

        <Route path="/sermons" element={<Sermons />} />

        <Route path="/sermons/form" element={<SermonCreate />} />

        <Route path="/church/form" element={<ChurchCreate />} />

        <Route path="/sermons/downloads" element={<SermonDownload />} />

        <Route path="/sermon_details/:id" element={<SermonDetails />} />

        <Route path="/sermon_video/:id" element={<SermonVideo />} />

        <Route path="/appointment" element={<Appointment />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
