import axios from "axios";
import { useEffect, useState } from "react";
import MenuBar from "../../Components/MenuBar";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import DashBoard from "../../Components/DashBoard";
import SideBoard from "../../Components/SideBoard";

const PrayerList = () => {
  const [prayers, setPrayers] = useState([]);

  useEffect(() => {
    axios
      .get("https://prophetictvapi.fly.dev/prayers") // Assuming the URL is correct
      .then((response) => {
        setPrayers(response.data); // Extract and set the data
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  console.log(prayers);
  return (
    <div className="h-full lg:flex lg:flex-row lg:space-x-2 bg-slate-50 text-black">
      <DashBoard />

      <div className="w-screen h-screen flex flex-col justify-between bg-slate-50">
        <div className="sm:w-full">
          <div className="bg-purple-700 pt-2 text-white ">
            <div className="flex row space-x-2 ml-8 items-center">
              <AiOutlineMenu className="sm:hidden" />
              <h2>Prayers</h2>
            </div>
            <div className="flex row space-x-20 pl-10 pt-2 pr-10 w-30 pb-1">
              <Link to={"/prayer"}>Form</Link>
              <div>
                <Link to={"/prayers"}>
                  <h6 className="border-b-2 border-white-700">Prayers</h6>
                </Link>
              </div>
              <div className="hidden sm:block">
                <Link to={"/appointment"}>Appointment</Link>
              </div>
            </div>
          </div>
          <div className="mb-1 h-screen lg:h-0">
            {prayers.map((prayer) => (
              <div className="mb-1" key={prayer.id}>
                <div className="flex space-x-20 mt-2">
                  <div className="flex space-x-2 px-3 ">
                    <h4>{prayer.username}: </h4>
                    {/* <h4>{prayer.title}: </h4> */}
                    {/* <h3>{prayer.created_at}</h3> */}
                  </div>
                  {/* <h3>23-07-2023</h3> */}
                </div>
                <div className="mx-2 bg-slate-300 pt-1.5 px-3 pb-6 rounded-lg">
                  <p className=" w-15">{prayer.title}</p>
                </div>
              </div>
            ))}
            {/* <div className="mb-1">
              <div className="flex space-x-18 mt-2">
                <div className="flex space-x-2 px-3 ">
                  <h4>Admin: </h4>
                  <h3>07:30Am</h3>
                </div>
                <h3>23-07-2023</h3>
              </div>
              <div className="mx-2 bg-slate-300 pt-1.5 px-3 pb-6 rounded-lg">
                <p className=" w-15">
                  Lorem Ipsum is simply dummy text of the printing and types
                  etting industry.
                </p>
              </div>
            </div> */}
          </div>
        </div>
        <MenuBar />
      </div>

      <SideBoard />
    </div>
  );
};

export default PrayerList;
