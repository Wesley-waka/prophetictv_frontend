import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import DashBoard from "../../Components/DashBoard";
import SideBoard from "../../Components/SideBoard";
import MenuBar from "../../Components/MenuBar";

const Sermons = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Changed the type to string
  const [clear, setClear] = useState("cleared");
  useEffect(() => {
    axios
      .get(`https://prophetictvapi.fly.dev/videos`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [clear]);

  const handleSearch = (e) => {
    const filteredData = data.filter((sermon) => {
      return sermon.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearchQuery(e.target.value); // Set the search query
    setData(filteredData);
    setClear("cleared");
  };

  const handleClear = () => {
    setSearchQuery("");
    setClear("");
  };

  const userType = localStorage.getItem("userType");

  return (
    <div className="h-full lg:flex lg:flex-row lg:space-x-5 bg-slate-50 text-black">
      <DashBoard />

      <div className="w-screen h-screen  flex flex-col justify-between bg-slate-50 text-black">
        <div className="sm:w-full h-96 sm:h-0">
          <div className="bg-purple-700 pt-2 text-white ">
            <div className="flex column space-y-10 pl-4 pt-2 pr-10 pb-1">
              <div className="sm:pl-0">
                <div className=" flex row space-x-8 items-center sm:space-x-4 sm:flex sm:row">
                  <div className="sm:pr-10 flex flex-row items-center">
                    <AiOutlineMenu className="sm:hidden" />
                    <h5 className="text-lg font-bold sm:font-medium sm:text-xl sm:border-b-2 sm:border-white-700">
                      Sermon
                    </h5>
                  </div>
                  {userType === "Admin" ? (
                    <div className="sm:pr-10">
                      <Link to="/sermons/form">
                        <h5 className="sm:inline  text-lg sm:font-medium sm:text-xl ">
                          Add Sermon
                        </h5>
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                  <div>
                    <Link to={"/sermons/downloads"}>
                      <h5 className="hidden sm:inline text-3xl sm:font-medium sm:text-xl ">
                        Downloads
                      </h5>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-1 flex-col flex sm:flex-row sm:mt-4 space-y-2 mx-2">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              className="w-13 p-3 h-6 mt-2 sm:mx-auto  sm:w-96 border sm:px-2 sm:py-0.5 border-black-500 rounded-3xl sm:my-2 text-black sm:block "
              placeholder="Search..."
            />
            <button
              className="w-13 bg-purple-700 px-2 text-white sm:w-56 h-10 rounded-2xl ml-1"
              // style={{ right: '34rem', top: '3.8rem', color: 'white' }}
              onClick={handleClear}
            >
              Clear Search
            </button>
          </div>
          {data.map((sermon) => (
            <div key={sermon.id} className="mb-1">
              <Link to={`/sermon_details/${sermon.id}`}>
                <div className="flex space-x-20 mt-2">
                  <div className="flex space-x-1 pl-6 ">
                    <h4>Admin: </h4>
                    <h3>{sermon.speaker}</h3>
                  </div>
                </div>
                <div className="mx-2  pt-1.5 px-3 pb-6 rounded-lg">
                  <div className="relative">
                    <img
                      src={`http://127.0.0.1:3000/${sermon.image.url}`}
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
          ))}
        </div>
        <div className="lg:hidden">
          <MenuBar />
        </div>
      </div>

      <SideBoard />
    </div>
  );
};

export default Sermons;
