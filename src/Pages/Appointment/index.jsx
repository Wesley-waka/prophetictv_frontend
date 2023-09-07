import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import MenuBar from "../../Components/MenuBar";
import axios from "axios";
import DashBoard from "../../Components/DashBoard";
import SideBoard from "../../Components/SideBoard";
import { Link } from "react-router-dom";

const Appointment = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [appointmentReason, setAppointmentReason] = useState("");
  const [schedule, setSchedule] = useState(false);

  const handleScheduleChange = (value) => {
    setSchedule(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(
        "https://prophetictvevent.fly.dev/appointments/create",
        {
          fullname: fullName,
          email: email,
          phone_number: phoneNumber,
          reschedule: schedule,
          title: appointmentReason,
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
          console.log("appointment scheduled");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  return (
    <div className="flex flex-col justify-between lg:flex lg:flex-row lg:space-x-5">
      <DashBoard />

      <div className="w-screen h-screen lg:h-0 flex flex-col justify-between">
        <div className="lg:w-full ">
          <div className="bg-purple-700 pt-2 text-white ">
            <div className="flex row space-x-2 ml-8 py-4 lg:py-0 items-center">
              <AiOutlineMenu className="lg:hidden" />
              <h2 className="text-2xl font-bold lg:text-lg lg:font-medium">
                Appointment
              </h2>
            </div>
            <div className="hidden lg:block">
              <div className="flex row space-x-20 pl-10 pt-2 pr-10 w-30 pb-1 ">
                <div>
                  <Link to={"/prayer"}>Form</Link>
                </div>
                <div>
                  <Link to={"/prayers"}>Prayers</Link>
                </div>
                <div>
                  <h6 className="border-b-2 border-white-700">Appointment</h6>
                </div>
              </div>
            </div>
          </div>
          <form
            className="flex flex-col mx-6 space-y-3 mt-2 mb-16 "
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="fullName">Full Name:</label>
              <div className="flex  flex-row space-x-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pt-1 pr-6 pb-1 pl-2 border border-black-500 rounded-lg w-full"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <div className="flex  flex-row space-x-2">
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pt-1 pr-6 pb-1 pl-2 border border-black-500 rounded-lg w-full"
                />
              </div>
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone Number:</label>
              <div className="flex  flex-row space-x-2">
                <input
                  type="text"
                  placeholder="Phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="pt-1 pr-6 pb-1 pl-2 border border-black-500 rounded-lg w-full"
                />
              </div>
            </div>
            <div>
              <label htmlFor="appointment">Reason For Appointment:</label>
              <div className="flex  flex-row space-x-2">
                <textarea
                  name="appointment"
                  value={appointmentReason}
                  onChange={(e) => setAppointmentReason(e.target.value)}
                  className=" pt-1 pr-4 pb-1 pl-2 border border-black-500 rounded-lg w-full"
                  id="appointment"
                  placeholder="Reason..."
                  cols={20}
                  rows={6}
                ></textarea>
              </div>
            </div>
            <label htmlFor="schedule">
              Would you agree to reschedule the appointment, if needed?
            </label>
            <div className="mx-auto flex row space-x-20">
              <div className="flex row space-x-1">
                <input
                  type="radio"
                  checked={schedule}
                  onChange={() => handleScheduleChange(true)}
                />
                <h4>yes</h4>
              </div>
              <div className="flex row space-x-1">
                <input
                  type="radio"
                  checked={!schedule}
                  onChange={() => handleScheduleChange(false)}
                />
                <h4>no</h4>
              </div>
            </div>
            <button className="rounded-full bg-purple-700 mt-6 mb-20 mx-auto px-1 py-1.5 w-32 text-white">
              Submit
            </button>
          </form>
        </div>
        <div className="lg:hidden">
          <MenuBar />
        </div>
      </div>
      <SideBoard />
    </div>
  );
};

export default Appointment;
