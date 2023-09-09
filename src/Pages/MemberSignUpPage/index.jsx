import axios from "axios";
import { useState, useEffect } from "react";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const mountains = styled.div`
  background-image: "none";
`;

const circles = styled.div`
  background-image: url("/group-10.svg");
`;

const MemberSignUpPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1024));
  const Background = isMobile ? circles : mountains;
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const [churches, setChurches] = useState([]);
  const [church_id, setChurchId] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://prophetictvevent.fly.dev/member/signup",
        {
          username: username,
          email: email,
          password: password,
          ministry_id: church_id,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200 || response.status === 201) {
        const person = response.data;
        console.log(person.id);
        localStorage.setItem("token", person.jwt);
        localStorage.setItem("userType", "member");
        navigate("/member/login");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  useEffect(() => {
    axios
      .get("https://prophetictvevent.fly.dev/church/all")
      .then((res) => setChurches(res.data));
  }, []);
  console.log(churches);

  return (
    <Background className="h-full lg:flex lg:flex-row lg:space-x-2 lg:h-screen bg-slate-50">
      <div
        style={{
          backgroundImage: "url('/group-10.svg')",
        }}
        className="hidden lg:block lg:w-2/4 "
      >
        <div className="lg:flex lg:flex-col lg:space-y-2 ">
          <img
            src="/logo.svg"
            className="w-18 p-16 lg:w-84 lg:h-80 lg:pt-2"
            alt=""
          />
          {/* <img src="/logo.svg" className="w-18 h-24 sm:w-36 sm:h-40 " alt="" /> */}
          <h1 className="text-white font-extrabold text-center text-3xl ">
            Prophetic Tv
          </h1>
        </div>
      </div>

      {/* sm screens */}
      <div className="px-9 py-4 flex flex-col space-y-1 text-left text-3xl lg:hidden">
        <h1 className=" text-center pt-4 mt-2 text-white text-3xl lg:hidden">
          Prophetic Tv
        </h1>
        {/* <img
          src="/logo.svg"
          className="w-13 h-13 pt-8 pb-16 sm:w-36 sm:h-40 "
          alt=""
        /> */}
        <img src="/logo.svg" className="w-18 h-24 lg:w-36 lg:h-40 " alt="" />

        <div className="mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-purple-200 flex flex-col px-8 mt-24 pb-12 w-80 rounded-lg"
          >
            <input
              className="p-2 my-6 rounded-lg"
              type="text"
              value={username}
              placeholder="user name"
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              className="p-2 my-6 rounded-lg"
              type="text"
              value={email}
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* church entry */}
            <select
              value={church_id}
              className="p-2 my-6 rounded-lg"
              onChange={(e) => setChurchId(e.target.value)}
            >
              <option hidden>Select Church</option>
              {churches.map((practitioner) => {
                const department = practitioner.ministryname;
                const firstName = practitioner.ministrylocation;
                const practitionerId = practitioner.id;
                return (
                  <option key={practitionerId} value={practitionerId}>
                    {firstName} {department}
                  </option>
                );
              })}
            </select>
            {/* church entry */}

            <input
              className="p-2 my-6 rounded-lg"
              type="text"
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <label className="flex row space-x-2">
              <input
                type="checkbox"
                checked={rememberMe}
                className="pr-2"
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label>
            {/* {errors} */}
            <button className="rounded-full bg-white py-3 px-6 mt-10">
              Register
            </button>
          </form>
        </div>
      </div>
      {/* sm screens */}

      <div className="hidden lg:block ">
        <div className="flex flex-col space-y-4">
          <div className="flex row space-x-20 pl-10 pt-2 my-6 ml-8 pr-10 w-30 pb-1 ">
            <div>
              <Link to={"/"}>
                <img src="/left-arrow.png" className="w-8" alt="" />
              </Link>
            </div>
            <div>
              <h6 className="border-b-2 border-purple-700 font-bold">
                Member Registration
              </h6>
            </div>
            <div>
              <Link to={"/member/login"}>Member Login</Link>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-purple-200 flex flex-col my-auto px-8  ml-32 pb-12 w-80 rounded-lg"
          >
            <input
              className="p-2 my-6 rounded-lg"
              type="text"
              value={username}
              placeholder="user name"
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              className="p-2 my-6 rounded-lg"
              type="text"
              value={email}
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* church entry */}
            <select
              value={church_id}
              className="p-2 my-6 rounded-lg"
              onChange={(e) => setChurchId(e.target.value)}
            >
              <option hidden>Select Doctor</option>
              {churches.map((practitioner) => {
                const department = practitioner.ministryname;
                const firstName = practitioner.ministrylocation;
                const practitionerId = practitioner.id;

                return (
                  <option key={practitionerId} value={practitionerId}>
                    {firstName} {department}
                  </option>
                );
              })}
            </select>
            {/* church entry */}
            <input
              className="p-2 my-6 rounded-lg"
              type="text"
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <label className="flex row space-x-2">
              <input
                type="checkbox"
                checked={rememberMe}
                className="pr-2"
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label>
            {/* {errors} */}
            <button className="rounded-full bg-white py-3 px-6 mt-10">
              Register
            </button>
            <h6 className="text-xl mt-4">
              I have an Account?
              <span className="lg:hidden text-sky-600">
                <Link to={"/leader/login"}>Sign in</Link>
              </span>
            </h6>
          </form>
        </div>
      </div>
    </Background>
  );
};

export default MemberSignUpPage;
