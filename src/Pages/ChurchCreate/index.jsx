import axios from "axios";
import { useState } from "react";
import MenuBar from "../../Components/MenuBar";
import { AiOutlineMenu } from "react-icons/ai";
import DashBoard from "../../Components/DashBoard";
import SideBoard from "../../Components/SideBoard";

const PrayerRequest = () => {
  const [churchName, setChurchName] = useState("");
  const [churchLocation, setChurchLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(
        "https://prophetictvapi.fly.dev/church/create",
        {
          name: churchName,
          location: churchLocation,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("submitted");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };
  return (
    <div className="h-full sm:flex sm:flex-row sm:space-x-5 bg-slate-50 text-black">
      {/* lg screens dashboard */}
      <DashBoard />

      {/* lg screens dashboard */}
      <div className="w-screen bg-slate-50 text-black ">
        <div className="sm:w-full">
          <div className="bg-purple-700 pt-2 text-white sm:pt-8 sm:pb-4 ">
            <div className="flex row space-x-2 ml-8 items-center">
              <AiOutlineMenu className="sm:hidden" />
              <h2>Add Church</h2>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col px-8 pt-1 sm:pt-8 sm:space-y-10 h-screen"
          >
            <div>
              <label htmlFor="name" className="pb-1 mr-14">
                Church Name:
              </label>
              <input
                type="text"
                value={churchName}
                className="py-1 pl-2 mb-2 border border-black-500 rounded-lg"
                placeholder="Name..."
                onChange={(e) => setChurchName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="pb-1 mr-12">
                Church Location:
              </label>
              <input
                type="text"
                value={churchLocation}
                className="py-1 pl-2 mb-2 border border-black-500 rounded-lg"
                placeholder="Your Email..."
                onChange={(e) => setChurchLocation(e.target.value)}
              />
            </div>

            <button className="rounded-full bg-purple-700 mt-6 mb-20 mx-auto px-1 py-1.5 w-32 text-white sm:mt-12">
              Submit
            </button>
          </form>
          <MenuBar />
        </div>
      </div>
      {/* lg screens dashboard */}

      <SideBoard />
      {/* lg screens dashboard */}
    </div>
  );
};

export default PrayerRequest;
