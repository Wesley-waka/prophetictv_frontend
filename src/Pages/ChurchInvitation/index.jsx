import MenuBar from "../../Components/MenuBar";
import DashBoard from "../../Components/DashBoard";
import SideBoard from "../../Components/SideBoard";
import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";
import ChurchCard from "../ChurchCard";

const ChurchInvitation = () => {
  const [churches, setChurches] = useState([]);
  const [isInvited, setIsInvited] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/church/all")
      .then((res) => setChurches(res.data));
  }, []);

  return (
    <div className="lg:flex lg:flex-row lg:space-x-5 bg-slate-50 text-black h-full">
      <DashBoard />
      <div className="w-screen flex flex-col h-screen justify-between bg-slate-50 text-black">
        <div className="lg:w-full">
          <div className="bg-purple-700 pt-2 text-white ">
            <div className="flex column space-y-10 pl-4 pt-2 pr-10 pb-1">
              <div className="pl-8 sm:pl-0">
                <div className=" flex row space-x-2 items-center sm:space-x-4 sm:flex sm:row">
                  <AiOutlineMenu className="lg:hidden" />
                  <div>
                    <h5 className="text-3xl font-bold lg:font-medium lg:text-xl lg:border-b-2 lg:border-white-700">
                      Church Invitation
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4 mt-4 ml-2 h-96 sm:h-0">
            {churches.map((church) => (
              <ChurchCard key={church.id} church={church} />
            ))}
          </div>
        </div>
        <div className="lg:hidden">
          <MenuBar />
        </div>
      </div>
      <SideBoard />
    </div>
  );
};

export default ChurchInvitation;
