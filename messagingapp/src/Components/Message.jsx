import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import EncryptRsa from 'encrypt-rsa';

const CryptoJS = require("crypto-js");

export const Message = ({ socket, userName, room }) => {
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    
    const handleSendMessage = async () => {
        if (message !== "") {
          const payload = {
            room: room,
            author: userName,
            message: CryptoJS.AES.encrypt(
              message,
              "hello",
            ).toString(),
            timestamp:
              new Date(Date.now()).getHours() +
              ":" +
              new Date(Date.now()).getMinutes(),
          };
        //   console.log(payload)
          await socket.emit("sendMessage", payload);
          setMessageList((prev) => [...prev, payload]);
          setMessage("");
        }
      };
    
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
    //   console.log(data);
      setMessageList((prev) => [...prev, data]);
    });
  }, [socket]);

    return (
      <>
        <div className="chat-window">
          <div className="chat-header">
            <h2>Live Chat</h2>
          </div>
          <div className="chat-body">
            <ScrollToBottom className="message-container">
              {messageList.map((message, index) => {
                return (
                  <div
                    key={index}
                    className="message"
                    id={userName === message.author ? "you" : "other"}
                  >
                    <div className="message-content">
                      <p>
                        {CryptoJS.AES.decrypt(
                          message.message,
                         "hello"
                        ).toString(CryptoJS.enc.Utf8)}
                            </p>
                            <p>{ message.message}</p>
                    </div>
                    <div className="message-meta">
                      <p>{message.timestamp}</p>
                      <p>{message.author}</p>
                    </div>
                  </div>
                );
              })}
            </ScrollToBottom>
          </div>
          <div className="chat-footer">
            <input
              type="text"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                e.key === "Enter" && handleSendMessage();
              }}
            />

            <button
              variant="contained"
              size="large"
              onClick={handleSendMessage}
            >
              &#9658;
            </button>
          </div>
        </div>
      </>
    );
}


