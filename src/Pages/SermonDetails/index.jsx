import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import Sermons from "../Sermons";
import MenuBar from "../../Components/MenuBar";
import DashBoard from "../../Components/DashBoard";
import SideBoard from "../../Components/SideBoard";
import { AiOutlineMenu } from "react-icons/ai";

const SermonDetails = () => {
  const { id } = useParams();
  const [Url, setImageUrl] = useState("");
  const [data, setData] = useState({
    title: "",
    description: "",
    speaker: "",
    video: "",
    downloaded: false,
    image: { url: "" },
    admin_id: 0,
    created_at: new Date(),
  });

  useEffect(() => {
    axios
      .get(`https://prophetictvevent.fly.dev/videos/${id}`)
      .then((res) => {
        setData(res.data);
        setImageUrl(res.data.image.url);
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  console.log(Url);
  const { title, speaker, description } = data;
  return (
    <div className="lg:flex lg:flex-row lg:space-x-5">
      <DashBoard />

      <div className="w-screen ">
        <div className="sm:w-full flex flex-col justify-between h-screen">
          <div>
            <div className="bg-purple-700 pt-2 text-white ">
              <div className="flex column space-y-10 pl-4 pt-2 pr-10 pb-1">
                {/* <div className="flex row "><h6 className="">Humb</h6></div> */}
                <div className="pl-8">
                  <div className=" flex row space-x-2 items-center sm:space-x-6 sm:flex sm:row">
                    <AiOutlineMenu className="sm:hidden" />
                    {/* <h2>Dashboard</h2> */}
                    <h5 className=" text-3xl font-bold sm:font-medium sm:text-xl sm:border-b-2 sm:border-white-700">
                      Sermon
                    </h5>
                    <Link to={"/sermons/downloads"}>
                      <h5 className="hidden sm:inline text-3xl sm:font-medium sm:text-xl pl-36">
                        Downloads
                      </h5>
                    </Link>
                  </div>
                  <input
                    type="text"
                    className="w-58 border px-1.5  border-black-500 rounded-3xl my-2 text-black sm:hidden"
                    placeholder="Search..."
                  />
                </div>
              </div>
            </div>
            <div className="mb-4 ml-2">
              <div className="flex row space-x-48 mt-2 ml-4">
                <h4>Title:</h4>
                {/* <h4>{created_at.toString()}</h4> */}
              </div>
              <div className="mx-1.5  pt-1.5 px-2 pb-6 rounded-lg">
                <h3 className="text-center">{title}</h3>
                <div className="relative">
                  <Link to={`/sermon_video/${id}`}>
                    <img
                      src={`http://127.0.0.1:3000/${Url}`}
                      className="rounded-2xl"
                      alt=""
                    />
                  </Link>
                  <h4 className="absolute bottom-0 left-0 right-0 py-1 px-2 text-white bg-black bg-opacity-50 rounded-b-2xl">
                    Preacher: {speaker}
                  </h4>
                </div>
              </div>
            </div>
            <div className="mb-24 ml-4 ">
              <p className="pb-2 text-gray-700 pr-3">{description}</p>
            </div>
          </div>
          <div className="lg:hidden">
            <MenuBar />
          </div>
        </div>
      </div>
      {/* lg screens dashboard */}

      <SideBoard />
      {/* lg screens dashboard */}
    </div>
  );
};

export default SermonDetails;
