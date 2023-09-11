import MenuBar from "../../Components/MenuBar";
import DashBoard from "../../Components/DashBoard";
import SideBoard from "../../Components/SideBoard";
import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";

const ChurchInvitation = () => {
  const [churches, setChurches] = useState([]);
  const [churchId, setSelectedChurchId] = useState(null);

  const handleEmail = (id) => {
    setSelectedChurchId(id);
  };

  useEffect(() => {
    if (churchId !== null) {
      axios
        .get(`https://prophetictvevent.fly.dev/church/${churchId}`)
        .then((res) => {
          const data = res.data;
          const emails = [
            data.admin.email,
            ...data.members.map((member) => member.email),
          ];

          emails.forEach((email) => {
            const emailData = {
              from: "prophetictvevent@gmail.com",
              to: email,
              subject: "Live Video Streaming Invitation",
              text: `You have been invited for a Live video streaming platform. Join The prophetic Live stream of Room Name: ${window.localStorage.getItem(
                "chatLink"
              )}`,
            };

            axios
              .post(
                "https://api-tv-wesley-waka.vercel.app/send-email",
                emailData
              )
              .then((response) => {
                console.log(`Email sent to ${email}:`, response.data);
              })
              .catch((error) => {
                console.error(`Email sending to ${email} failed:`, error);
              });
          });
        })
        .catch((error) => {
          console.error("Error fetching church data:", error);
        });
    }
  }, [churchId]);

  useEffect(() => {
    axios
      .get("https://prophetictvevent.fly.dev/church/all")
      .then((res) => setChurches(res.data))
      .catch((error) => {
        console.error("Error fetching churches:", error);
      });
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
          <div className="mb-4 mt-4 ml-2 h-full sm:h-0">
            {churches.map((church) => (
              <>
                <div
                  className="flex flex-col sm:flex-row sm:justify-between"
                  key={church.id}
                >
                  <div className="flex flex-row space-x-2 sm:space-x-8">
                    <div className="flex flex-col space-y-2">
                      <h1 className="text-xl font-bold text-slate-700">
                        {church.ministryname}
                      </h1>
                      <img
                        src="/church.png"
                        className="w-16 h-16"
                        alt="Big Church"
                      />
                    </div>
                    <div className="sm:my-10 my-6">
                      <h3 className="text-lg font-extralight text-slate-800">
                        Preacher:
                        <span className="font-semibold text-black">
                          {church.admin.username}
                        </span>
                      </h3>
                      <h3 className="text-lg font-extralight text-slate-800">
                        Location:
                        <span className="font-semibold text-black">
                          {church.ministrylocation}
                        </span>
                      </h3>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => handleEmail(church.id)}
                      className="invite rounded-full bg-purple-700 sm:mt-10 mt-2 mb-20 mx-auto px-2 py-2 w-32 text-white"
                    >
                      Invite
                    </button>
                  </div>
                </div>
              </>
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
