// ChurchCard.js
import PropTypes from "prop-types";

const ChurchCard = ({ church, handleEmail }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between">
      <div className="flex flex-row space-x-2 sm:space-x-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-xl font-bold text-slate-700">
            {church.ministryname}
          </h1>
          <img src="/church.png" className="w-16 h-16" alt="Big Church" />
        </div>
        <div className="sm:my-10 my-6">
          <h3 className="text-lg font-extralight text-slate-800">
            Preacher:
            <span className="font-semibold text-black">
              {church.admin.username}
            </span>
          </h3>
          <h3 className="text-lg font-extralight text-slate-800">
            Location:
            <span className="font-semibold text-black">
              {church.ministrylocation}
            </span>
          </h3>
        </div>
      </div>
      <div>
        <button
          onClick={handleEmail(church.id)}
          className="invite rounded-full bg-purple-700 sm:mt-10 mt-2 mb-20 mx-auto px-2 py-2 w-32 text-white"
        >
          Invite
        </button>
        {/* {isInvited ? (
          <button
            // onClick={handleEmail}
            className="invite rounded-full bg-gray-300 sm:mt-10 mt-2 mb-20 mx-auto px-2 py-2 w-32 text-white"
          >
            Sent
          </button>
        ) : (
        <button
            // onClick={handleEmail}
            className="invite rounded-full bg-purple-700 sm:mt-10 mt-2 mb-20 mx-auto px-2 py-2 w-32 text-white"
          >
            Sent
          </button>
        )} */}
      </div>
    </div>
  );
};

ChurchCard.propTypes = {
  church: PropTypes.shape({
    id: PropTypes.number,
    ministryname: PropTypes.string,
    admin: PropTypes.object,
    ministrylocation: PropTypes.string,
    // Add any other properties you have in the church object.
  }).isRequired,
  handleEmail: PropTypes.func,
};

export default ChurchCard;

// ns1.vercel - dns.com;
// ns2.vercel - dns.com;

// ns6615.hostgator.com;
// ns6616.hostgator.com;
