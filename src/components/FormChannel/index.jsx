import React, { useState } from "react";
import "./styles.css";

import db from "../../firebase";

function FormChannel({ setProps }) {
  const [channelName, setChannelName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (channelName) {
      db.collection("channels").add({
        channelName: channelName,
      });
      setChannelName("");
    }
  };

  return (
    <form className="formChannel" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="channel name"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
      />
      <div className="buttons">
        <button type="button" onClick={() => setProps(false)}>
          Cancel
        </button>
        <button disabled={!channelName} type="submit">
          Create channel
        </button>
      </div>
    </form>
  );
}

export default FormChannel;
