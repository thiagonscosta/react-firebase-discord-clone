import React, { useEffect, useState } from "react";
import "./styles.css";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import ChatHeader from "../ChatHeader";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";

import Message from "../Message";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { selectChannelId, selectChannelName } from "../../features/appSlice";

import db from "../../firebase";
import firebase from "firebase";

function Chat() {
  const [inpuntMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [channelId]);

  const submitMessage = (e) => {
    e.preventDefault();

    db.collection("channels").doc(channelId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: inpuntMessage,
      user: user,
    });

    setInputMessage("");
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />

      <div className="chat__messages">
        {messages.map((message) => (
          <Message
            key={message.timestamp}
            timestamp={message.timestamp}
            message={message.message}
            user={user}
          />
        ))}
      </div>

      <div className="chat__input">
        <AddCircleIcon fontSize="large" />

        <form onSubmit={submitMessage}>
          <input
            placeholder={`Message #TestChannel`}
            value={inpuntMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={!channelId}
          />
          <button type="submit" className="chat__inputButton">
            Send Message
          </button>
        </form>

        <div className="chat__InputIcons">
          <CardGiftcardIcon fontSize="large" />
          <GifIcon fontSize="large" />
          <EmojiEmotionsIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
