import { Link } from "react-router-dom";
import MenuBar from "../../Components/MenuBar";
import DashBoard from "../../Components/DashBoard";
import SideBoard from "../../Components/SideBoard";
import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";

const SermonDownload = () => {
  const [sermonDownloads, setSermonDownloads] = useState([]);

  // useEffect(() => {
  //   // Retrieve sermonDownloads from localStorage
  //   // const storedSermonDownloads = localStorage.getItem('sermonDownloads');

  //   // if (storedSermonDownloads) {
  //   // Parse the JSON data from localStorage
  //   const parsedSermonDownloads: SermonDownload[] = JSON.parse(
  //     localStorage.getItem(('sermonDownloads') || 'None');
  //   );

  //   // Update the state with the retrieved data
  //   setSermonDownloads(parsedSermonDownloads);
  //   // }
  // }, []);

  useEffect(() => {
    const parsedSermonDownloads = JSON.parse(
      localStorage.getItem("sermonDownloads") || "[]"
    );

    setSermonDownloads(parsedSermonDownloads);
  }, []);
  // console.log(sermonDownloads[0].speaker);
  const userType = localStorage.getItem("userType");

  return (
    <div className="lg:flex lg:flex-row lg:space-x-5">
      <DashBoard />
      <div className="w-screen flex flex-col h-screen justify-between">
        <div className="lg:w-full">
          <div className="bg-purple-700 pt-2 text-white ">
            <div className="flex column space-y-10 pl-4 pt-2 pr-10 pb-1">
              <div className="pl-8 sm:pl-0">
                <div className=" flex row space-x-2 items-center sm:space-x-4 sm:flex sm:row">
                  <AiOutlineMenu className="sm:hidden" />
                  <div className="sm:pr-10">
                    <Link to={"/sermons"}>
                      <h5 className="hidden sm:inline text-3xl sm:font-medium sm:text-xl ">
                        Sermon
                      </h5>
                    </Link>
                  </div>
                  {userType === "Admin" ? (
                    <div className="hidden sm:pr-10">
                      <Link to="/sermons/form">
                        <h5 className="sm:inline text-3xl sm:font-medium sm:text-xl ">
                          Add Sermon
                        </h5>
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                  <div>
                    <h5 className="text-3xl font-bold sm:font-medium sm:text-xl sm:border-b-2 sm:border-white-700">
                      Downloads
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4 ml-2 h-96 sm:h-0">
            {sermonDownloads ? (
              sermonDownloads.map((serm) =>
                serm.map((sermon) => (
                  <div key={sermon.id} className="mb-1">
                    <Link to={`/sermon_details/${sermon.id}`}>
                      <div className="flex space-x-20 mt-2">
                        <div className="flex space-x-1 pl-6 ">
                          <h4>Admin: </h4>
                          <h3>{sermon.speaker}</h3>
                        </div>
                        {/* <h3>{sermon.created_at.toString()}</h3> */}
                      </div>
                      <div className="mx-2  pt-1.5 px-3 pb-6 rounded-lg">
                        <div className="relative">
                          <img
                            src={`https://prophetictvevent.fly.dev/${sermon.image.url}`}
                            className="rounded-2xl "
                            alt=""
                          />
                          <h4 className="absolute bottom-0 left-0 right-0 py-1 px-2 text-white bg-black bg-opacity-50 rounded-b-2xl">
                            {sermon.title}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              )
            ) : (
              <div className="mb-1">
                <div>Nothing to be seen</div>
                <img src="/nothing.svg" alt="" />
              </div>
            )}
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

export default SermonDownload;
