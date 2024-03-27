import { useNavigate } from "react-router-dom";

const SideBoard = () => {
  const navigate = useNavigate();
  const churchInvite = () => {
    if (localStorage.getItem("chatLink")) {
      navigate("/churchinvitation");
    } else {
      console.log("join a live event to invite other church members");
    }
  };
  return (
    <div>
      {/* lg screens dashboar */}
      <div className="hidden lg:block bg-purple-700 w-max h-full pt-8 px-6 pb-4 text-white">
        <h2 className="text-lg font-bold">Chatting:</h2>
        <div className="flex flex-col space-y-4 mt-4">
          <div className="bg-purple-800 px-4 py-4 flex flex-col space-y-4 rounded-md">
            <img src="/comment.png" className="w-14 h-14 mx-auto" alt="" />
            <h4 className="font-extrabold w-40 text-center mx-auto">
              Join a Live Video Streaming to begin chatting
            </h4>

            <div className="bg-gray-300 w-64 h-8 py-1 px-2 rounded-full text-black text-md">
              <h4>Type your Message here...</h4>
            </div>
          </div>
          <div className="hidden mt-4  flex-col space-y-4  bg-purple-800 rounded-md text-center w-72 px-6 py-12">
            <div
              className="cursor-pointer mb-6 bg-gray-300 w-16 h-16 ml-24 px-0.5 pt-3 rounded-full text-black text-2xl"
              onClick={churchInvite}
            >
              +{" "}
              {/* <div className="cursor-pointer rounded-sm bg-gray-300">+</div> */}
            </div>
            <h3 className="font-bold">Partnership with other Churches</h3>
            <h4>
              Invites other Churches to minister in live streaming with
              audience.
            </h4>
          </div>
        </div>
      </div>
      {/* lg screens dashboard */}
    </div>
  );
};

export default SideBoard;
