import { useEffect, useRef, useState } from "react";
import "./room.css";
import "./mai.css";
import "./lobby.css";
import { expandVideoFrame, hideDisplayFrame } from "./room";
import AgoraRTM from "agora-rtm-sdk";
import AgoraRTC from "agora-rtc-sdk-ng";
import { Link, useNavigate } from "react-router-dom";
const Room = () => {
  const Navigate = useNavigate();
  let activeChatContainer = false;
  let activeMemberContainer = false;
  let userIdInDisplayFrame = null;
  const APP_ID = "8849a7746c69490aa6f64d1741b7d0f2";

  let uid = sessionStorage.getItem("uid");
  if (!uid) {
    uid = String(Math.floor(Math.random() * 10000));
    sessionStorage.setItem("uid", uid);
  }

  let token =
    "007eJxTYBDQSRZheMi9KLaj3Sd34fr9Ir+vtvSdWFSivyEpKbXmrIcCg5lRmnmSoUWSkbmJkUmagaVlaqq5sVGySbK5sUFqapLxcRmx1IZARoYt3dasjAyMDCxADOIzgUlmMMkCJjkYSlKLS+ITCwoYGACNdiIo";
  let client;

  let rtmClient;
  let channel;

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let roomId = urlParams.get("room");

  if (!roomId) {
    roomId = "main";
  }

  let displayName = sessionStorage.getItem("display_name");
  if (!displayName) {
    // window.location = "lobby";
    Navigate("/lobby");
  }

  localStorage.setItem("chatLink", urlParams.get("room"));

  let localTracks = [];
  let remoteUsers = {};
  let displayFrame = document.getElementById("stream__box");
  let videoFrames = document.getElementsByClassName("video__container");
  // let userIdInDisplayFrame = null;
  let localScreenTracks;
  let sharingScreen = false;

  let getMembers = async () => {
    let members = await channel.getMembers();
    updateMemberTotal(members);
    for (let i = 0; members.length > i; i++) {
      addMemberToDom(members[i]);
    }
  };
  const chatContainer = document.getElementById("messages__container");
  const memberContainer = document.getElementById("members__container");

  const messagesContainerRef = useRef();
  useEffect(() => {
    joinRoomInit();
    getMembers();
  }, []);
  let joinRoomInit = async () => {
    rtmClient = await AgoraRTM.createInstance(APP_ID);
    await rtmClient.login({ uid, token });

    await rtmClient.addOrUpdateLocalUserAttributes({ name: displayName });

    channel = await rtmClient.createChannel(roomId);
    await channel.join();

    channel.on("MemberJoined", handleMemberJoined);
    channel.on("MemberLeft", handleMemberLeft);
    channel.on("ChannelMessage", handleChannelMessage);

    getMembers();
    addBotMessageToDom(`Welcome to the room ${displayName}! 👋`);

    client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    await client.join(APP_ID, roomId, token, uid);

    client.on("user-published", handleUserPublished);
    client.on("user-left", handleUserLeft);
  };
  // rooom .js
  // toggl member
  const toggleMemberContainer = () => {
    if (activeMemberContainer) {
      document.getElementById("members__container").style.display = "none";
    } else {
      document.getElementById("members__container").style.display = "block";
    }

    activeMemberContainer = !activeMemberContainer;
  };

  // toggle chat
  const toggleChatContainer = () => {
    if (activeChatContainer) {
      document.getElementById("messages__container").style.display = "none";
    } else {
      document.getElementById("messages__container").style.display = "block";
    }

    activeChatContainer = !activeChatContainer;
  };
  // expand vid frame

  //end

  let joinStream = async () => {
    document.getElementById("join-btn").style.display = "none";
    document.getElementsByClassName("stream__actions")[0].style.display =
      "flex";

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks(
      {},
      {
        encoderConfig: {
          width: { min: 640, ideal: 1920, max: 1920 },
          height: { min: 480, ideal: 1080, max: 1080 },
        },
      }
    );

    let player = `<div class="video__container" id="user-container-${uid}">
                    <div class="video-player" id="user-${uid}"></div>
                 </div>`;

    document
      .getElementById("streams__container")
      .insertAdjacentHTML("beforeend", player);
    document
      .getElementById(`user-container-${uid}`)
      .addEventListener("click", expandVideoFrame);

    localTracks[1].play(`user-${uid}`);
    await client.publish([localTracks[0], localTracks[1]]);
  };

  let switchToCamera = async () => {
    let player = `<div class="video__container" id="user-container-${uid}">
                    <div class="video-player" id="user-${uid}"></div>
                 </div>`;
    displayFrame.insertAdjacentHTML("beforeend", player);

    await localTracks[0].setMuted(true);
    await localTracks[1].setMuted(true);

    document.getElementById("mic-btn").classList.remove("active");
    document.getElementById("screen-btn").classList.remove("active");

    localTracks[1].play(`user-${uid}`);
    await client.publish([localTracks[1]]);
  };

  let handleUserPublished = async (user, mediaType) => {
    remoteUsers[user.uid] = user;

    await client.subscribe(user, mediaType);

    let player = document.getElementById(`user-container-${user.uid}`);
    if (player === null) {
      player = `<div class="video__container" id="user-container-${user.uid}">
                <div class="video-player" id="user-${user.uid}"></div>
            </div>`;

      document
        .getElementById("streams__container")
        .insertAdjacentHTML("beforeend", player);
      document
        .getElementById(`user-container-${user.uid}`)
        .addEventListener("click", expandVideoFrame);
    }

    if (displayFrame.style.display) {
      let videoFrame = document.getElementById(`user-container-${user.uid}`);
      videoFrame.style.height = "100px";
      videoFrame.style.width = "100px";
    }

    if (mediaType === "video") {
      user.videoTrack.play(`user-${user.uid}`);
    }

    if (mediaType === "audio") {
      user.audioTrack.play();
    }
  };

  let handleUserLeft = async (user) => {
    delete remoteUsers[user.uid];
    let item = document.getElementById(`user-container-${user.uid}`);
    if (item) {
      item.remove();
    }

    if (userIdInDisplayFrame === `user-container-${user.uid}`) {
      displayFrame.style.display = null;

      let videoFrames = document.getElementsByClassName("video__container");

      for (let i = 0; videoFrames.length > i; i++) {
        videoFrames[i].style.height = "300px";
        videoFrames[i].style.width = "300px";
      }
    }
  };

  let toggleMic = async (e) => {
    let button = e.currentTarget;

    if (localTracks[0].muted) {
      await localTracks[0].setMuted(false);
      button.classList.add("active");
    } else {
      await localTracks[0].setMuted(true);
      button.classList.remove("active");
    }
  };

  let toggleCamera = async (e) => {
    let button = e.currentTarget;

    if (localTracks[1].muted) {
      await localTracks[1].setMuted(false);
      button.classList.add("active");
    } else {
      await localTracks[1].setMuted(true);
      button.classList.remove("active");
    }
  };

  let toggleScreen = async (e) => {
    let screenButton = e.currentTarget;
    let cameraButton = document.getElementById("camera-btn");

    if (!sharingScreen) {
      sharingScreen = true;

      screenButton.classList.add("active");
      cameraButton.classList.remove("active");
      cameraButton.style.display = "none";

      localScreenTracks = await AgoraRTC.createScreenVideoTrack();

      document.getElementById(`user-container-${uid}`).remove();
      displayFrame.style.display = "block";

      let player = `<div class="video__container" id="user-container-${uid}">
                <div class="video-player" id="user-${uid}"></div>
            </div>`;

      displayFrame.insertAdjacentHTML("beforeend", player);
      document
        .getElementById(`user-container-${uid}`)
        .addEventListener("click", expandVideoFrame);

      userIdInDisplayFrame = `user-container-${uid}`;
      localScreenTracks.play(`user-${uid}`);

      await client.unpublish([localTracks[1]]);
      await client.publish([localScreenTracks]);

      let videoFrames = document.getElementsByClassName("video__container");
      for (let i = 0; videoFrames.length > i; i++) {
        if (videoFrames[i].id != userIdInDisplayFrame) {
          videoFrames[i].style.height = "100px";
          videoFrames[i].style.width = "100px";
        }
      }
    } else {
      sharingScreen = false;
      cameraButton.style.display = "block";
      document.getElementById(`user-container-${uid}`).remove();
      await client.unpublish([localScreenTracks]);
      switchToCamera();
    }
  };

  let leaveStream = async (e) => {
    e.preventDefault();

    document.getElementById("join-btn").style.display = "block";
    document.getElementsByClassName("stream__actions")[0].style.display =
      "none";

    for (let i = 0; localTracks.length > i; i++) {
      localTracks[i].stop();
      localTracks[i].close();
    }

    // window.location = "lobby";
    Navigate("/lobby");
    await client.unpublish([localTracks[0], localTracks[1]]);

    if (localScreenTracks) {
      await client.unpublish([localScreenTracks]);
    }

    document.getElementById(`user-container-${uid}`).remove();

    if (userIdInDisplayFrame === `user-container-${uid}`) {
      displayFrame.style.display = null;

      for (let i = 0; videoFrames.length > i; i++) {
        videoFrames[i].style.height = "300px";
        videoFrames[i].style.width = "300px";
      }
    }

    channel.sendMessage({
      text: JSON.stringify({ type: "user_left", uid: uid }),
    });
  };

  // room-rtm
  let handleMemberJoined = async (MemberId) => {
    console.log("A new member has joined the room:", MemberId);
    addMemberToDom(MemberId);

    let members = await channel.getMembers();
    updateMemberTotal(members);

    let { name } = await rtmClient.getUserAttributesByKeys(MemberId, ["name"]);
    addBotMessageToDom(`Welcome to the room ${name}! 👋`);
  };

  let addMemberToDom = async (MemberId) => {
    let { name } = await rtmClient.getUserAttributesByKeys(MemberId, ["name"]);

    let membersWrapper = document.getElementById("member__list");
    let memberItem = `<div class="member__wrapper" id="member__${MemberId}__wrapper">
                        <span class="green__icon"></span>
                        <p class="member_name">${name}</p>
                    </div>`;

    membersWrapper.insertAdjacentHTML("beforeend", memberItem);
  };

  let updateMemberTotal = async (members) => {
    let total = document.getElementById("members__count");
    total.innerText = members.length;
  };

  let handleMemberLeft = async (MemberId) => {
    removeMemberFromDom(MemberId);

    let members = await channel.getMembers();
    updateMemberTotal(members);
  };

  let removeMemberFromDom = async (MemberId) => {
    let memberWrapper = document.getElementById(`member__${MemberId}__wrapper`);
    let name =
      memberWrapper.getElementsByClassName("member_name")[0].textContent;
    addBotMessageToDom(`${name} has left the room.`);

    memberWrapper.remove();
  };

  // let getMembers = async () => {
  //   let members = await channel.getMembers();
  //   updateMemberTotal(members);
  //   for (let i = 0; members.length > i; i++) {
  //     addMemberToDom(members[i]);
  //   }
  // };

  let handleChannelMessage = async (messageData, MemberId) => {
    console.log("A new message was received");
    let data = JSON.parse(messageData.text);

    if (data.type === "chat") {
      addMessageToDom(data.displayName, data.message);
    }

    if (data.type === "user_left") {
      document.getElementById(`user-container-${data.uid}`).remove();

      if (userIdInDisplayFrame === `user-container-${uid}`) {
        displayFrame.style.display = null;

        for (let i = 0; videoFrames.length > i; i++) {
          videoFrames[i].style.height = "300px";
          videoFrames[i].style.width = "300px";
        }
      }
    }
  };

  let sendMessage = async (e) => {
    e.preventDefault();

    let message = e.target.message.value;
    channel.sendMessage({
      text: JSON.stringify({
        type: "chat",
        message: message,
        displayName: displayName,
      }),
    });
    addMessageToDom(displayName, message);
    e.target.reset();
  };

  let addMessageToDom = (name, message) => {
    let messagesWrapper = document.getElementById("messages");

    let newMessage = `<div class="message__wrapper">
                        <div class="message__body">
                            <strong class="message__author">${name}</strong>
                            <p class="message__text">${message}</p>
                        </div>
                    </div>`;

    messagesWrapper.insertAdjacentHTML("beforeend", newMessage);

    let lastMessage = document.querySelector(
      "#messages .message__wrapper:last-child"
    );
    if (lastMessage) {
      lastMessage.scrollIntoView();
    }
  };

  let addBotMessageToDom = (botMessage) => {
    let messagesWrapper = document.getElementById("messages");

    let newMessage = `<div class="message__wrapper">
                        <div class="message__body__bot">
                            <strong class="message__author__bot">🤖 Prophetic Bot</strong>
                            <p class="message__text__bot">${botMessage}</p>
                        </div>
                    </div>`;

    messagesWrapper.insertAdjacentHTML("beforeend", newMessage);

    let lastMessage = document.querySelector(
      "#messages .message__wrapper:last-child"
    );
    if (lastMessage) {
      lastMessage.scrollIntoView();
    }
  };

  let leaveChannel = async () => {
    await channel.leave();
    await rtmClient.logout();
  };

  window.addEventListener("beforeunload", leaveChannel);

  return (
    <div className="body_room">
      <header id="nav">
        <div className="nav--list">
          <button id="members__button" onClick={toggleMemberContainer}>
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
            >
              <path
                d="M24 18v1h-24v-1h24zm0-6v1h-24v-1h24zm0-6v1h-24v-1h24z"
                fill="#ede0e0"
              ></path>
              <path d="M24 19h-24v-1h24v1zm0-6h-24v-1h24v1zm0-6h-24v-1h24v1z"></path>
            </svg>
          </button>
          <Link to={"/lobby"}>
            <h3 id="logo">
              <img src="./fav.png" alt="Site Logo" />
              <span>Prophetic Tv</span>
            </h3>
          </Link>
        </div>

        <div id="nav__links">
          <button id="chat__button" onClick={toggleChatContainer}>
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              fill="#ede0e0"
              clipRule="evenodd"
            >
              <path d="M24 20h-3v4l-5.333-4h-7.667v-4h2v2h6.333l2.667 2v-2h3v-8.001h-2v-2h4v12.001zm-15.667-6l-5.333 4v-4h-3v-14.001l18 .001v14h-9.667zm-6.333-2h3v2l2.667-2h8.333v-10l-14-.001v10.001z"></path>
            </svg>
          </button>
          <Link to={"/churchinvitation"}>Invite Church</Link>
          <a className="nav__link" id="create__room__btn" href="lobby">
            Create Room
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#ede0e0"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"></path>
            </svg>
          </a>
        </div>
      </header>

      <main className="container">
        <div id="room__container">
          <section id="members__container">
            <div id="members__header">
              <p>Participants</p>
              <strong id="members__count">0</strong>
            </div>
            <div id="member__list"></div>
          </section>

          <section id="stream__container">
            <div id="stream__box"></div>
            <div id="streams__container"></div>
            <div className="stream__actions">
              <button id="camera-btn" className="active" onClick={toggleCamera}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 4h-3v-1h3v1zm10.93 0l.812 1.219c.743 1.115 1.987 1.781 3.328 1.781h1.93v13h-20v-13h3.93c1.341 0 2.585-.666 3.328-1.781l.812-1.219h5.86zm1.07-2h-8l-1.406 2.109c-.371.557-.995.891-1.664.891h-5.93v17h24v-17h-3.93c-.669 0-1.293-.334-1.664-.891l-1.406-2.109zm-11 8c0-.552-.447-1-1-1s-1 .448-1 1 .447 1 1 1 1-.448 1-1zm7 0c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5z"></path>
                </svg>
              </button>
              <button id="mic-btn" className="active" onClick={toggleMic}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2c1.103 0 2 .897 2 2v7c0 1.103-.897 2-2 2s-2-.897-2-2v-7c0-1.103.897-2 2-2zm0-2c-2.209 0-4 1.791-4 4v7c0 2.209 1.791 4 4 4s4-1.791 4-4v-7c0-2.209-1.791-4-4-4zm8 9v2c0 4.418-3.582 8-8 8s-8-3.582-8-8v-2h2v2c0 3.309 2.691 6 6 6s6-2.691 6-6v-2h2zm-7 13v-2h-2v2h-4v2h10v-2h-4z"></path>
                </svg>
              </button>
              <button id="screen-btn" onClick={toggleScreen}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M0 1v17h24v-17h-24zm22 15h-20v-13h20v13zm-6.599 4l2.599 3h-12l2.599-3h6.802z"></path>
                </svg>
              </button>
              <button
                id="leave-btn"
                onClick={leaveStream}
                style={{ backgroundColor: "#FF5050" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 10v-5l8 7-8 7v-5h-8v-4h8zm-16-8v20h14v-2h-12v-16h12v-2h-14z"></path>
                </svg>
              </button>
            </div>
            <button id="join-btn" onClick={joinStream}>
              Join Stream
            </button>
          </section>

          <section id="messages__container" onClick={toggleChatContainer}>
            <div id="messages" ref={messagesContainerRef}></div>
            <form id="message__form" onSubmit={sendMessage}>
              <input
                type="text"
                name="message"
                placeholder="Send a message...."
              />
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Room;
