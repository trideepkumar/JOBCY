import React from "react";
import "./videCallNotification.css";

function VideoCallNotification({ callerName }) {
  return (
    <div className="blink">
      <span className="caller-name">Incoming call from {callerName}</span>
    </div>
  );
}

export default VideoCallNotification;
