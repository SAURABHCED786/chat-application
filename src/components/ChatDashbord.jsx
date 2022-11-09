import { Avatar, Icon } from "@shopify/polaris";
import React, { useState } from "react";
import { MdSend } from 'react-icons/md'
import { useDispatch, useSelector } from "react-redux";
// import { POST_DATA, SET_CHAT } from "../../redux/action/actiontype";
import { SmileyHappyMajor } from '@shopify/polaris-icons';
import { MobileVerticalDotsMajor } from '@shopify/polaris-icons';
import { CameraMajor } from '@shopify/polaris-icons';
import { SET_CHAT } from "../redux/action/chatAction";

const ChatDashbord = ({ loginUsrName }) => {
  console.log("loginUsrName", loginUsrName);
  const dispatch = useDispatch()
  const chats = useSelector((state) => state.chats);
  console.log("state", chats);
  const [chatText, setChatText] = useState("")


  function handleSubmit(e) {
    e.preventDefault()
    if (loginUsrName === "" || chatText === "") return;
    const updatedChats = { loginUsrName, message: chatText };
    dispatch({
      type: SET_CHAT,
      payload: updatedChats,
    });
    localStorage.setItem("chats", JSON.stringify([...chats, updatedChats]));
    setChatText("");
  }

  return (
    <div className="chat">
      <div style={{
        width: 270,
        height: 44,
        border: "1px solid gyey",
        borderRadius: "11px 11px 12px 12px",
        display: "flex",
        backgroundColor: "#128C7E",
        justifyContent: "space-between"
      }}>
        <div tyle={{ margin: "20px" }}>
          <Avatar source="https://s3.ap-south-1.amazonaws.com/assets.ynos.in/startup-logos/YNOS340615.png" />
        </div>

        <div style={{ margin: "10px" }}> {loginUsrName}
        </div>
        <div style={{ margin: "10px" }}>
          <Icon
            source={MobileVerticalDotsMajor}
            color="base"
          />
        </div>
      </div>
      <div className="childchat">
        {chats?.map((chat, i) => {
          return (
            <div
              key={i}
              className={`message-box ${chat.loginUsrName === loginUsrName ? "message-sent" : "message-recevie"
                }`}
            >
              <div className="username">{chat.loginUsrName.slice(0, 8)}</div>
              <div className="message-text">{chat.message}</div>
            </div>
          );
        })}
      </div>

      <form className="conversation-compose" onSubmit={handleSubmit}>
        <div className="emoji">
          <Icon
            source={SmileyHappyMajor}
            color="base"
          />
        </div>

        <input
          className="input-msg"
          type="text"
          placeholder="Type a message"
          value={chatText}
          onChange={(e) => setChatText(e.target.value)}
        />

        <div className="photo">
          <Icon
            source={CameraMajor}
            color="base"
          />
        </div>
        <button type="submit" className="sendBtn">
          <MdSend style={{
            color: "white",
            fontSize: "22px",
            marginLeft: "4px"
          }} />
        </button>
      </form>

    </div>
  );
};

export default ChatDashbord;
