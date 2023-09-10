import { useState, useEffect } from "react";
import "../Room/lobby.css";
import "../Room/mai.css";
import { Link, useNavigate } from "react-router-dom";
function LobbyForm() {
  const [displayName, setDisplayName] = useState("");
  const [roomName, setRoomName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const storedDisplayName = sessionStorage.getItem("display_name");
    if (storedDisplayName) {
      setDisplayName(storedDisplayName);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    sessionStorage.setItem("display_name", displayName);

    let inviteCode = roomName;
    if (!inviteCode) {
      inviteCode = String(Math.floor(Math.random() * 10000));
    }

    navigate(`/room?room=${inviteCode}`);
  };

  return (
    <div className="body_room bg-gray-900">
      <header id="nav">
        <div className="nav--list">
          <a href="lobby">
            <h3 id="logo">
              <img src="./fav.png" alt="Site Logo" />
              <span>Prophetic Tv</span>
            </h3>
          </a>
        </div>

        <div id="nav__links">
          <Link className="nav__link" to={"/prayer"}>
            Home
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#ede0e0"
              viewBox="0 0 24 24"
            >
              <path d="M20 7.093v-5.093h-3v2.093l3 3zm4 5.907l-12-12-12 12h3v10h7v-5h4v5h7v-10h3zm-5 8h-3v-5h-8v5h-3v-10.26l7-6.912 7 6.99v10.182z" />
            </svg>
          </Link>
          <Link className="nav__link" id="create__room__btn" to={"/lobby"}>
            Create Room
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#ede0e0"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" />
            </svg>
          </Link>
        </div>
      </header>

      <main id="room__lobby__container">
        <div id="form__container">
          <div id="form__container__header">
            <p>👋 Create or Join Room</p>
          </div>

          <form id="lobby__form" onSubmit={handleSubmit}>
            <div className="form__field__wrapper">
              <label>Your Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Enter your display name..."
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>

            <div className="form__field__wrapper">
              <label>Room Name</label>
              <input
                type="text"
                name="room"
                placeholder="Enter room name..."
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
            </div>

            <div className="form__field__wrapper">
              <button type="submit">
                Go to Room
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default LobbyForm;
