import axios from "axios";
import { useState } from "react";
import MenuBar from "../../Components/MenuBar";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import DashBoard from "../../Components/DashBoard";
import SideBoard from "../../Components/SideBoard";
// import Absent from "../Absent";

const PrayerRequest = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(
        "https://prophetictvevent.fly.dev/prayers/create",
        {
          username: username,
          email: email,
          title: title,
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

  const token = localStorage.getItem("token");
  return (
    <>
      {token ? (
        <div className="h-full lg:flex lg:flex-row lg:space-x-5 bg-slate-50 text-black">
          {/* lg screens dashboard */}
          <DashBoard />

          {/* lg screens dashboard */}
          <div className="w-screen h-screen  bg-slate-50 text-black">
            <div className="sm:w-full h-full flex flex-col justify-between">
              <div className="h-full">
                <div className="bg-purple-700 pt-2 text-white ">
                  <div className="flex row space-x-2 ml-8 items-center">
                    <AiOutlineMenu className="sm:hidden" />
                    <h2>Prayer Request</h2>
                  </div>
                  <div className="flex row space-x-20 pl-10 pt-2 pr-10 w-30 pb-1">
                    <div>
                      <h6 className="border-b-2 border-white-700">Form</h6>
                    </div>
                    <div>
                      <Link to={"/prayers"}>Prayers</Link>
                    </div>
                    <div className="hidden sm:block">
                      <Link to={"/appointment"}>Appointment</Link>
                    </div>
                  </div>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col px-8 pt-1"
                >
                  <label htmlFor="name" className="pb-1">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="py-1 pl-2 mb-2 border border-black-500 rounded-lg"
                    placeholder="Name..."
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <label htmlFor="email" className="pb-1">
                    Email:
                  </label>
                  <input
                    type="text"
                    className="py-1 pl-2 mb-2 border border-black-500 rounded-lg"
                    placeholder="Your Email..."
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="prayerRequest" className="pb-1">
                    Prayer Request:
                  </label>
                  <textarea
                    id="prayerRequest"
                    cols="6"
                    rows="5"
                    onChange={(e) => setTitle(e.target.value)}
                    className="py-1 pl-2 mb-2 border border-black-500 rounded-lg"
                    placeholder="Enter your prayer request"
                  />
                  <button className="rounded-full bg-purple-700 mt-6 mb-20 mx-auto px-2 w-20 text-white">
                    Submit
                  </button>
                </form>
              </div>
              <div className="lg:hidden">
                <MenuBar />
              </div>
            </div>
          </div>
          {/* lg screens dashboard */}

          <SideBoard />
          {/* lg screens dashboard */}
        </div>
      ) : (
        // <Absent />
        <div>not here</div>
      )}
    </>
  );
};

export default PrayerRequest;
