import { Avatar } from "@material-ui/core";
import React from "react";
import "./styles.css";

function Message({ timestamp, user, message }) {
  return (
    <div className="message">
      <Avatar src={user.avatar} />
      <h4>
        {user.displayName}
        <span className="message__timestamp">
          {new Date(timestamp?.toDate()).toUTCString()}
        </span>
      </h4>
      <p>{message}</p>
    </div>
  );
}

export default Message;
