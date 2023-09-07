const SideBoard = () => {
  return (
    <div>
      {/* lg screens dashboar */}
      <div className="hidden lg:block bg-purple-700 w-max h-full pt-8 px-6 pb-4 text-white">
        <h2 className="text-lg font-bold">Chatting:</h2>
        <div className="flex flex-col space-y-4 mt-4">
          <div className="bg-purple-800 px-4 py-4 flex flex-col space-y-4 rounded-md">
            {/* users */}
            {/* <div className="flex flex-row space-x-3">
              <img
                src="/user.png"
                className="rounded-full h-8 w-8 mt-2"
                alt=""
              />
              <div className="flex flex-col">
                <h3>Username</h3>
                <h3>Hi,I Hope You are well</h3>
              </div>
              <h4>9:20a.m</h4>
            </div>

            <div className="flex flex-row space-x-3">
              <img
                src="/user.png"
                className="rounded-full h-8 w-8 mt-2"
                alt=""
              />
              <div className="flex flex-col">
                <h3>Username</h3>
                <h3>Hi,I Hope You are well</h3>
              </div>
              <h4>9:20a.m</h4>
            </div>

            <div className="flex flex-row space-x-3">
              <img
                src="/user.png"
                className="rounded-full h-8 w-8 mt-2"
                alt=""
              />
              <div className="flex flex-col">
                <h3>Username</h3>
                <h3>Hi,I Hope You are well</h3>
              </div>
              <h4>9:20a.m</h4>
            </div>

            <div className="flex flex-row space-x-3">
              <img
                src="/user.png"
                className="rounded-full h-8 w-8 mt-2"
                alt=""
              />
              <div className="flex flex-col">
                <h3>Username</h3>
                <h3>Hi,I Hope You are well</h3>
              </div>
              <h4>9:20a.m</h4>
            </div> */}
            <img src="/comment.png" className="w-14 h-14 mx-auto" alt="" />
            <h4 className="font-extrabold w-40 text-center mx-auto">
              Join a Live Video Streaming to begin chatting
            </h4>

            <div className="bg-gray-300 w-64 h-8 py-1 px-2 rounded-full text-black text-md">
              <h4>Type your Message here...</h4>
            </div>
          </div>
          <div className="mt-4 flex flex-col space-y-4  bg-purple-800 rounded-md text-center w-72 px-6 py-12">
            <div className="cursor-pointer mb-6 bg-gray-300 w-16 h-16 ml-24 px-0.5 pt-3 rounded-full text-black text-2xl">
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
