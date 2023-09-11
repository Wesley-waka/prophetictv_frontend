import { AiOutlineMenu } from "react-icons/ai";
import MenuBar from "../../Components/MenuBar";
import { Link } from "react-router-dom";

const Donation = () => {
  return (
    <div className="flex flex-col justify-between h-full sm:h-screen bg-slate-50 text-black">
      <div className="pl-3 h-full">
        <div className="mt-2 ml-3 mr-6 mb-4 flex row space-x-2 items-center">
          <AiOutlineMenu />
          {/* <h2>Dashboard</h2> */}
          <h5 className=" text-3xl font-bold">Donation</h5>
        </div>
        <div className="flex row space-x-3 justify-between">
          <p className="mt-2 ml-3 w-40 ">
            Support our mission and make a difference - donate to our church
            today and help us continue spreading love, compassion, and hope
            within our community and beyond.
          </p>
          <img className="w-52 h-56" src="/capa-1.svg" alt="" />
        </div>
        <div className="flex flex-col space-y-3 mb-28">
          <Link to={"/seeddonations"}>
            <button className="mt-6 mx-3 bg-purple-700 pt-2 px-4 pb-4 text-slate-200 rounded-lg">
              <h4 className="text-left text-xl font-bold">Seed Donation</h4>
              <p className="text-left">
                Contributions given by inddivividuals to a church or ministry
                with the belief that it will bring blessings,prosperity,rewards
                from God
              </p>
            </button>
          </Link>
          <Link to={"/tithedonations"}>
            <button className="mx-3  bg-purple-700 pt-2 px-4 pb-4 text-slate-200 rounded-lg">
              <h4 className="text-left text-xl font-bold">Tithe Donation</h4>
              <p className="text-left">
                Give 10% of one's income to the church regurarly as an act of
                worship and obedience to God
              </p>
            </button>
          </Link>
        </div>
      </div>
      <div className="lg:hidden">
        <MenuBar />
      </div>
    </div>
  );
};
export default Donation;
