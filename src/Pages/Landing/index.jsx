import styled from "styled-components";
import { Link } from "react-router-dom";
import { useMediaQuery, useTheme } from "@material-ui/core";

const mountains = styled.div`
  background-image: "none";
`;

const circles = styled.div`
  background-image: url("/group-10.svg");
`;

// const Background = window.innerWidth >= 1200 ? mountains : circles;
const Landing = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1024));
  const Background = isMobile ? circles : mountains;

  return (
    <Background className="h-full lg:flex lg:flex-row lg:space-x-2 lg:h-screen bg-slate-50 text-black">
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
          <h1 className="text-white font-extrabold text-center text-3xl ">
            Prophetic Tv
          </h1>
        </div>
      </div>

      {/* sm screens */}
      <div className="px-9 py-4 flex flex-col h-full space-y-1 text-left text-3xl lg:hidden ">
        <h1 className=" text-center pt-4 mt-2 text-white text-3xl lg:hidden">
          Prophetic Tv
        </h1>
        <img
          src="/logo.svg"
          className="w-13 h-13 pt-8 pb-16 lg:w-36 lg:h-40 "
          alt=""
        />
        <div className="text-3xl text-center text-white font-extralight">
          SELECT ROLE
        </div>
        <div className="flex flex-col-reverse space-y-3">
          <Link
            to={"/master/sign"}
            className="mx-3 h-26 space-x-12 mt-3 flex flex-row md:justify-between bg-purple-700 pt-2 px-4 pb-4 text-slate-200 rounded-lg"
          >
            <h4 className="text-left w-40 font-semibold">Master Admin</h4>
            <img src="/sudo.png" className="w-20 " alt="" />
            {/* <p className="text-left">List of all sermons with Details</p> */}
          </Link>

          <Link
            to={"/leader/sign"}
            className="mx-3 flex space-x-12 flex-row bg-purple-700 md:justify-between pt-2 px-4 pb-4 text-slate-200 rounded-lg"
          >
            <h4 className="text-left w-40 font-semibold">Church Leader</h4>
            <img src="/leader.png" className="w-20 " alt="" />
            {/* <p className="text-left">List of all sermons with Details</p> */}
          </Link>

          <Link
            to={"/member/sign"}
            className="mx-3 flex space-x-12 flex-row md:justify-between bg-purple-700 pt-2 px-4 pb-4 text-slate-200 rounded-lg"
          >
            <h4 className=" text-left w-40 font-semibold">Church Member</h4>

            <img src="/member.png" className=" w-20 " alt="" />
            {/* <p className="text-left">List of all sermons with Details</p> */}
          </Link>
        </div>
      </div>
      {/* sm screens */}
      <div className="hidden lg:block lg:my-40 px-6 ">
        <div className=" mb-2 text-center text-lg font-bold">SELECT ROLE</div>
        <div className="sm:flex sm:flex-row sm:space-x-2">
          <Link
            to={"/member/sign"}
            className="mx-3 align-middle bg-purple-700 pt-2 px-4 pb-4 text-slate-200 rounded-lg"
          >
            <img src="/member.png" className=" w-20 mx-auto" alt="" />
            <h4 className="text-left font-semibold text-xl">Church Member</h4>
            <p className="text-left">List of all sermons with Details</p>
          </Link>
          <Link
            to={"/leader/sign"}
            className="mx-3  bg-purple-700 pt-2 px-4 pb-4 text-slate-200 rounded-lg"
          >
            <img src="/leader.png" className="mx-auto w-20 " alt="" />
            <h4 className="text-left font-extrabold text-xl">Church Leader</h4>
            <p className="text-left">List of all sermons with Details</p>
          </Link>
          <Link
            to={"/master/sign"}
            className="mx-3  bg-purple-700 pt-2 px-4 pb-4 text-slate-200 rounded-lg"
          >
            <img src="/sudo.png" className="mx-auto w-20 " alt="" />
            <h4 className="text-left font-extrabold text-xl">Master Admin</h4>
            <p className="text-left">List of all sermons with Details</p>
          </Link>
        </div>
      </div>
    </Background>
  );
};

export default Landing;
