// ChurchCard.js
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const ChurchCard = ({ church }) => {
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
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between">
      <div className="flex flex-row space-x-2 sm:space-x-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-xl font-bold text-slate-700">
            {church.ministryname}
          </h1>
          <img src="/church.png" className="w-16 h-16" alt="Big Church" />
        </div>
        <div className="sm:my-10 my-6">
          <h3 className="text-lg font-extralight text-slate-800">
            Preacher:
            <span className="font-semibold text-black">{church.admin}</span>
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
        {isInvited ? (
          <button
            onClick={handleEmail(church.id)}
            className="invite rounded-full bg-purple-700 sm:mt-10 mt-2 mb-20 mx-auto px-2 py-2 w-32 text-white"
          >
            Invite
          </button>
        ) : (
          <button
            onClick={handleEmail}
            className="invite rounded-full bg-gray-300 sm:mt-10 mt-2 mb-20 mx-auto px-2 py-2 w-32 text-white"
          >
            Sent
          </button>
        )}
      </div>
    </div>
  );
};

ChurchCard.propTypes = {
  church: PropTypes.shape({
    id: PropTypes.number,
    ministryname: PropTypes.string,
    admin: PropTypes.string,
    ministrylocation: PropTypes.string,
    // Add any other properties you have in the church object.
  }).isRequired,
};

export default ChurchCard;
