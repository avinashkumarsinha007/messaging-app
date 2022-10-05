import React, { useState } from "react";
import io from "socket.io-client";
import {Message } from "./Message";

const socket = io.connect("http://localhost:3001");

export const Home = () => {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join", { userName, room });
      setShowChat(true);
    }
  };

  return (
    <div className="joinChatContainer">
      {!showChat ? (
        <>
          <h3>Chat Me</h3>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room ID"
            onChange={(e) => setRoom(e.target.value)}
          />
          <br />
          <br />
          <button onClick={joinRoom}>Join</button>
        </>
      ) : (
        <Message socket={socket} userName={userName} room={room} />
      )}
    </div>
  );
};