import MenuBar from "../../Components/MenuBar";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
const Dashboard = () => {
  return (
    <div className="flex flex-col justify-between h-full bg-slate-50 text-black">
      <div>
        <div className="mt-2 ml-5  mb-4 text-3xl font-bold flex row space-x-36 md:justify-between">
          <div className="flex row">
            <AiOutlineMenu />
            <h3>Dashboard</h3>
          </div>
          <img src="/group4.svg" alt="username" className="rounded-full  h-9" />
        </div>
        <div className="mx-5 mt-8">
          <div className="flex flex-col space-y-3 mb-28">
            <Link
              to={"/lobby"}
              className="mx-3  bg-purple-700 pt-2 px-4 pb-4 text-slate-200 rounded-lg"
            >
              <h4 className="text-left font-extrabold">Live Video</h4>
              <p className="text-left">
                Make your live Streaming with audience, start chats and share
                documents with them.
              </p>
            </Link>
            <Link
              to={"/lobby"}
              className="mx-3  bg-purple-700 pt-2 px-4 pb-4 text-slate-200 rounded-lg"
            >
              <h4 className="text-left font-extrabold">Join Videos</h4>
              <p className="text-left">
                Join live Streaming with audience, start chats and share
                documents with them.
              </p>
            </Link>
            <Link
              to={"/sermons"}
              className="mx-3  bg-purple-700 pt-2 px-4 pb-4 text-slate-200 rounded-lg"
            >
              <h4 className="text-left font-extrabold">Sermon Updates</h4>
              <p className="text-left">List of all sermons with Details</p>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <MenuBar />
      </div>
    </div>
  );
};

export default Dashboard;
