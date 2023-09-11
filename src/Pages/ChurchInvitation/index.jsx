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
  const [churchId, setSelectedChurchId] = useState();

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/church/${churchId}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);

        const emails = [
          data.admin.email,
          ...data.members.map((member) => member.email),
        ];

        emails.forEach((email) => {
          const emailData = {
            from: "prophetictvevent@gmail.com",
            to: email,
            subject: "Live Video Streaming Invitation",
            text: `You have been invited for a Live video streaming platform. Click the link to be redirected: ${window.location.href}`,
          };

          fetch("http://localhost:8081/send-email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(emailData),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((dat) => {
              console.log(`Email sent to ${email}:`, dat);
            })
            .catch((error) => {
              console.error(`Email sending to ${email} failed:`, error);
            });
        });
      });
  }, [churchId]);
  console.log(churchId);

  const handleEmail = (id) => {
    setIsInvited(!isInvited);
    setSelectedChurchId(id);
  };

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
          <div className="mb-4 mt-4 ml-2 h-full sm:h-0">
            {churches.map((church) => (
              <ChurchCard key={church.id} church={church} handleEmail={handleEmail} />
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
