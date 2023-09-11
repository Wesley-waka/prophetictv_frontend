import axios from "axios";
import { useState } from "react";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const mountains = styled.div`
  background-image: "none";
`;

const circles = styled.div`
  background-image: url("/group-10.svg");
`;

const AdminLogin = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1024));
  const Background = isMobile ? circles : mountains;
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://prophetictvevent.fly.dev/admin/login",
        {
          username: username,
          email: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200 || response.status === 201) {
        const person = response.data;
        console.log(person.id);
        localStorage.setItem("token", person.jwt);
        localStorage.setItem("userName", person.admin.username);
        localStorage.setItem("userType", "Admin");
        if (isMobile) {
          navigate("/dashboard");
        } else {
          navigate("/prayer");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <Background className="h-full sm:h-screen  lg:flex lg:flex-row lg:space-x-2  bg-slate-50">
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
            <input
              className="p-2 my-6 rounded-lg"
              type="password"
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
              Login
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
              <Link to={"/leader/sign"}>Admin Registration</Link>
            </div>
            <div>
              <h6 className="border-b-2 border-purple-700 font-bold">
                Admin Login
              </h6>
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
            <input
              className="p-2 my-6 rounded-lg"
              type="password"
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
              Login
            </button>
          </form>
        </div>
      </div>
    </Background>
  );
};

export default AdminLogin;
