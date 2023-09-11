import { useState } from "react";
import MenuBar from "../../Components/MenuBar";
import axios from "axios";
import DashBoard from "../../Components/DashBoard";
import SideBoard from "../../Components/SideBoard";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";

const SermonCreate = () => {
  const [sermonTitle, setSermonTitle] = useState("");
  const [sermonSpeaker, setSermonSpeaker] = useState("");
  const [sermonDescription, setSermonDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedVideo(event.target.files[0]);
    }
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", sermonTitle);
      formData.append("speaker", sermonSpeaker);
      formData.append("description", sermonDescription);

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      if (selectedVideo) {
        formData.append("video", selectedVideo);
      }

      const response = await axios.post(
        "https://prophetictvapi.fly.dev/videos",
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        }
      );

      if (response.status === 200) {
        console.log("Sermon created");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <div className="h-full lg:flex lg:flex-row lg:space-x-5 bg-slate-50 text-black">
      <DashBoard />

      <div className="w-screen flex flex-col justify-between h-full bg-slate-50 text-black">
        <div className="sm:w-full">
          <div className="bg-purple-700 pt-2 text-white ">
            <div className="flex sm:hidden row space-x-6 ml-8 items-center py-2">
              <div className="flex flex-row space-x-1 items-center">
                <AiOutlineMenu className="sm:hidden" />
                <h2 className="text-xl font-bold">Add Sermon</h2>
              </div>
              <div>
                <Link to={"/sermons"} className="text-xl font-normal">
                  Sermons
                </Link>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="flex row space-x-20 pl-10 pt-2 pr-10 w-30 pb-1 ">
                <div>
                  <Link to={"/sermons"}>
                    <h5 className=" sm:inline text-3xl sm:font-medium sm:text-xl ">
                      Sermon
                    </h5>
                  </Link>
                </div>
                <div>
                  <h5 className="border-b-2 border-white-700 sm:font-medium sm:text-xl">
                    Add Sermon
                  </h5>
                </div>
                <div>
                  <Link to={"/sermons/downloads"}>
                    <h5 className=" sm:inline text-3xl sm:font-medium sm:text-xl ">
                      Downloads
                    </h5>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <form
            className="flex flex-col mx-6 space-y-3 mt-2 mb-16 "
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div>
              <label htmlFor="fullName">Sermon Title:</label>
              <div className="flex  flex-row space-x-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={sermonTitle}
                  onChange={(e) => setSermonTitle(e.target.value)}
                  className="pt-1 pr-6 pb-1 pl-2 border border-black-500 rounded-lg w-72 sm:w-full"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email">Sermon Speaker:</label>
              <div className="flex  flex-row space-x-2">
                <input
                  type="text"
                  placeholder="Email"
                  value={sermonSpeaker}
                  onChange={(e) => setSermonSpeaker(e.target.value)}
                  className="pt-1 pr-6 pb-1 pl-2 border border-black-500 rounded-lg w-72 sm:w-full"
                />
              </div>
            </div>
            <div>
              <label htmlFor="phoneNumber">Sermon Description:</label>
              <div className="flex  flex-row space-x-2">
                {/* <input
                  type="text"
                  placeholder="Phone number"
                  value={sermonDescription}
                  onChange={(e) => setSermonDescription(e.target.value)}
                  className="pt-1 pr-6 pb-1 pl-2 border border-black-500 rounded-lg w-72 sm:w-full"
                /> */}
                <textarea
                  name=""
                  id=""
                  cols="10"
                  rows="10"
                  value={sermonDescription}
                  onChange={(e) => setSermonDescription(e.target.value)}
                  className="border border-black-500 pt-1 pr-3 pb-1 pl-2 rounded-lg sm:w-full"
                  placeholder="Description..."
                ></textarea>
              </div>
            </div>
            <div>
              <label htmlFor="appointment">Sermon Poster:</label>
              <div className="flex  flex-row space-x-2">
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleImageChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
            <div>
              <label htmlFor="appointment">Sermon Video:</label>
              <div className="flex  flex-row space-x-2">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>

            <button className="rounded-full bg-purple-700 mt-6 mb-20 mx-auto px-1 py-1.5 w-32 text-white sm:mt-12">
              Submit
            </button>
          </form>
        </div>
        <div className="lg:hidden">
          <MenuBar />
        </div>
      </div>
      <SideBoard />
    </div>
  );
};

export default SermonCreate;
