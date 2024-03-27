import toast, { Toaster } from 'react-hot-toast'
import { Link, useNavigate } from "react-router-dom";
import {useState} from 'react';

const DashBoard = () => {
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");
  const userName = localStorage.getItem("userName");
  const [logOut,setLogOut] = useState(false);

  const handleClick = () => {
    setLogOut(true)
    toast.success('You have been successfully logged out!');
    localStorage.clear();
    setTimeout(() => navigate('/'), 3000);
  };
  // const handleClick = () => localStorage.removeItem('token');
  return (
    <div>
      {/* lg screens dashboard */}
      <div className="hidden lg:block bg-purple-700 w-64 h-full pt-8 px-6 pb-4 text-white">
        <div>
          <div className="flex flex-row">
            <img src="/lum.png" className="w-10 h-10" alt="user" />
            <div className="pl-4 pt-2">
              <div>{userType}</div>
              <div className="font-extralight">Welcome,{userName}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-3 mt-4 ">
          <Link to={"/prayer"}>
            <div className="flex flex-row space-x-3 mt-3 cursor-pointer">
              <img className="w-10 h-10" src="/Dashboard/praying.png" alt="" />
              <h6 className="mt-4">Prayers Request</h6>
            </div>
          </Link>
          <Link to={"/seeddonations"}>
            <div className="flex flex-row space-x-5 mt-1 cursor-pointer">
              <img className="w-8 h-12" src="/Dashboard/donation.png" alt="" />
              <h6 className="mt-6">Donation</h6>
            </div>
          </Link>
          <Link to={"/sermons/downloads"}>
            <div className="flex flex-row space-x-5 mt-3 cursor-pointer">
              <img
                className="w-8 h-8 mt-4"
                src="/Dashboard/downloading.png"
                alt=""
              />
              <h6 className="mt-6">Downloads</h6>
            </div>
          </Link>
          <Link to={"/appointment"}>
            <div className="flex flex-row space-x-5 mt-3 cursor-pointer">
              <img
                className="w-8 h-10 mt-3"
                src="/Dashboard/appointment.png"
                alt=""
              />
              <h6 className="mt-6">Appointment</h6>
            </div>
          </Link>
        </div>

        <div className="bg-purple-800 rounded-2xl px-2 cursor-pointer">
          {/* <div className="flex flex-row space-x-1 mt-5 py-2 ">
            <img
              src="/Dashboard/group.png"
              className="w-11 h-12 mt-2"
              alt="participants"
            />
            <div className="flex flex-col space-y-1">
              <h4 className="font-bold cursor-pointer">Participants</h4>
              <p>All Participants who are in live streaming</p>
            </div>
          </div> */}
        </div>
        <Link to={"/lobby"}>
          <div className="bg-purple-800 rounded-2xl px-2 cursor-pointer">
            <div className="flex flex-row space-x-1 mt-5 py-2">
              <img
                src="/Dashboard/livestreaming.png"
                className="w-11 h-12 mt-2"
                alt="participants"
              />
              <div className="flex flex-col space-y-1">
                <h4 className="font-bold cursor-pointer">
                  Live Video Streaming
                </h4>
                <p>All Participants who are in live streaming</p>
              </div>
            </div>
          </div>
        </Link>
        <Link to={"/sermons"}>
          <div className="bg-purple-800 rounded-2xl px-2 cursor-pointer">
            <div className="flex flex-row space-x-1 mt-5 py-2">
              <img
                src="/Dashboard/speech.png"
                className="w-11 h-12 mt-2"
                alt="participants"
              />
              <div className="flex flex-col space-y-1">
                <h4 className="font-bold ">Sermons</h4>
                <p>All Participants who are in live streaming</p>
              </div>
            </div>
          </div>
        </Link>

        {userType === "master" ? (
          <Link to={"/church/form"}>
            <div className="bg-purple-800 rounded-2xl px-2 cursor-pointer">
              <div className="flex flex-row space-x-1 mt-5 py-2">
                <img
                  src="/church.png"
                  className="w-11 h-12 mt-2"
                  alt="participants"
                />
                <div className="flex flex-col space-y-1">
                  <h4 className="font-bold ">Church</h4>
                  <p>All Participants who are in live streaming</p>
                </div>
              </div>
            </div>
          </Link>
        ) : (
          ""
        )}
        <div onClick={handleClick}>
          <div className="bg-purple-800 rounded-2xl px-2 cursor-pointer">
            <div className="flex flex-row space-x-1 mt-5 py-2">
              <img
                src="/log-out.png"
                className="w-11 h-12 mt-2"
                alt="participants"
              />
              <div className="flex flex-col space-y-1">
                <h4 className="font-bold ">Log Out</h4>
                <p>All Participants who are in live streaming</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {logOut && <Toaster/>}
      {/* lg screens dashboard */}
    </div>
  );
};

export default DashBoard;
