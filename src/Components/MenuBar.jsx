import { Link } from "react-router-dom";

const MenuBar = () => {
  return (
    <div>
      <div className="lg:hidden border-t-2 bg-slate-50 ">
        {/* <img className="" src="/Vector.svg" alt="" /> */}
        <div className=" ml-5 pb-3 rounded-full p-2 flex row space-x-6  justify-between items-center">
          <div className="h-18 w-14">
            <Link to={"/prayer"}>
              <img
                className="h-18 w-16 md:h-14 md:w-16"
                src="/group.svg"
                alt=""
              />
            </Link>
          </div>
          <div className="h-18 w-16 flex column mr-4">
            <Link to={"/donations"}>
              <img
                className="h-18 w-16 md:h-14 md:w-16"
                src="/group1.svg"
                alt=""
              />
            </Link>
          </div>
          <div className="h-18 w-16 flex column mr-4">
            <Link to={"/dashboard"}>
              <img
                className="h-18 w-18 md:h-14 md:w-16"
                src="/home1.png"
                alt=""
              />
            </Link>
          </div>
          <div className="ml-2">
            <Link to={"/sermons/downloads"}>
              <img
                className="h-18 w-16 md:h-14 md:w-16"
                src="/group2.svg"
                alt=""
              />
            </Link>
          </div>

          <div>
            <Link to={"/appointment"}>
              <img
                className="h-18 w-16 md:h-14 md:w-16"
                src="/group3.svg"
                alt=""
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
