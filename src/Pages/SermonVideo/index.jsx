import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MenuBar from "../../Components/MenuBar";
import DashBoard from "../../Components/DashBoard";
import SideBoard from "../../Components/SideBoard";
import { AiOutlineMenu } from "react-icons/ai";

const SermonVideo = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    id: 0,
    title: "",
    description: "",
    video: { url: "" },
    image: { url: "" },
    downloaded: false,
    speaker: "",
    created_at: new Date(),
  });
  // const da = localStorage.getItem('sermonDownloads');
  // console.log(da);
  const [sermonDownloads, setSermonDownloads] = useState([]);
  function handleAddToDownloads(sermon) {
    // const sermonId = sermon.id;
    const title = sermon.title;
    const description = sermon.description;
    const image = sermon.image;
    // const video = sermon.video;
    const downloaded = sermon.downloaded;
    // const time = sermon.created_at;
    const speaker = sermon.speaker;
    // users
    axios
      .post(
        "https://prophetictvapi.fly.dev/downloads/create",
        {
          // sermon_id: sermonId,
          title: title,
          description: description,
          image: image,
          // video: video,
          downloaded: downloaded,
          // time: time,
          speaker: speaker,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          const newCartItems = [...sermonDownloads, data];
          localStorage.setItem("sermonDownloads", JSON.stringify(newCartItems));
          setSermonDownloads(sermonDownloads);
          // setCartSuccess(true);
          setTimeout(() => {
            // setCartSuccess(false);
          }, 3500);
        } else {
          console.warn(response.data);
          // setCartWarming(true);
          setTimeout(() => {
            // setCartWarming(false);
          }, 3500);
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  }
  useEffect(() => {
    axios
      .get(`https://prophetictvapi.fly.dev/videos/${id}`)
      .then((response) => {
        const sermonData = response.data;
        setData(sermonData);
      })
      .catch((error) => {
        console.log("Error fetching video data:", error);
      });
  }, [id]);

  const { title, video } = data;
  const downloadVideoUrl = (sermon) => {
    return `https://prophetictvapi.fly.dev/videos/${sermon.id}/download`;
  };

  return (
    <div className="lg:flex lg:flex-row lg:space-x-5">
      <DashBoard />
      <div className="w-screen ">
        <div className="sm:w-full h-screen lg:h-0 flex flex-col justify-between">
          <div>
            <div className="bg-purple-700 pt-2 text-white">
              <div className="flex flex-col space-y-10 pl-4 pt-2 pr-10 pb-1">
                <div className="pl-8">
                  <div className="flex row space-x-2 items-center sm:space-x-6 sm:flex sm:row">
                    <AiOutlineMenu className="sm:hidden" />
                    <h5
                      // className="text-3xl font-bold sm:font-medium sm:text-xl sm:border-b-2 sm:border-white-700"
                      className="border-b-2 border-white-700"
                    >
                      Sermon
                    </h5>
                    <h5 className="hidden sm:inline text-3xl sm:font-medium sm:text-xl pl-36">
                      <Link to={"/sermons/downloads"}>Downloads</Link>
                    </h5>
                  </div>
                  <input
                    type="text"
                    className="w-58 border px-1.5 border-black-500 rounded-3xl my-2 text-black sm:hidden"
                    placeholder="Search..."
                  />
                </div>
              </div>
            </div>
            <div className="mb-4 ml-2">
              <div className="flex flex-row space-x-44 mt-2 ml-4">
                <h4>Title:</h4>
              </div>
              <div className="mx-1.5 pt-1.5 px-2 pb-6 rounded-lg">
                <h3 className="text-center">{title}</h3>
                <div className="relative">
                  <iframe
                    // width="600"
                    // height="320"
                    className="w-72 h-52 sm:w-full sm:h-64"
                    // src={`http://localhost:3000/${video.url}`}
                    src={`https://prophetictvapi.fly.dev/${video.url.replace(
                      "autoplay=1",
                      ""
                    )}`}
                    title="Youtube Player"
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
                <div
                  className="flex flex-col space-y-8 mt-5 items-center"
                  onClick={handleAddToDownloads}
                >
                  <h3 className="text-3xl font-extrabold">Download Video</h3>
                  <a
                    href={downloadVideoUrl(data)}
                    // onClick={handleAddToDownloads(data)}
                    className="rounded-full bg-purple-700  px-6 py-1.5 w-36 sm:w-36 text-white flex flex-row space-x-4 sm:text-lg"
                  >
                    <img
                      src="/down.png"
                      style={{
                        maxWidth: "40%",
                        color: "white",
                        marginRight: "0.5rem",
                      }}
                      alt=""
                    />
                    Download
                  </a>
                </div>
              </div>
            </div>
          </div>
          <MenuBar />
        </div>
      </div>
      <SideBoard />
    </div>
  );
};

export default SermonVideo;
