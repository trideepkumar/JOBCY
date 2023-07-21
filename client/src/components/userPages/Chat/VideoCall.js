import * as React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Modal from "react-modal";


function randomID(len) {
  let result = "";
  if (result) return result;
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

function VideoCall({ chatId }) {
   
  const modalStyles = {
    content: {
      width: "70%",
      height: "70%",
      margin: "auto",
    },
  };
  


  const { authState } = useSelector((state) => {
    return state.auth;
  });

  const [videoCallLink, setVideoCallLink] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);


  const roomID = getUrlParams().get("chatId") || randomID(5);
  let myMeeting = async (element) => {
    // generate Kit Token
    const appID = 1751648420;
    const serverSecret = "784c1cc1339b6768d2e128429768ab71";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      randomID(5),
      randomID(5)
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    // const link =
    //   window.location.protocol +
    //   '//' +
    //   window.location.host +
    //   window.location.pathname +
    //   '?roomID=' +
    //   roomID;
    //  setVideoCallLink(link);
    
    // start the call
      zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Personal link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?roomID=" +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    }
    );
  
  };

  const ENDPOINT = "http://localhost:3000";
  let socket;

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", authState);
  }, [chatId])

  useEffect(() => {
    socket.emit("video call", chatId, videoCallLink);
  console.log("videocall link url:"+videoCallLink)
  }, [videoCallLink])

  useEffect(() => {
    setModalIsOpen(true);
  }, []);
  
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };
  

 

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={modalStyles}
      >
        <div className="myCallContainer" ref={myMeeting}>
          <div>{videoCallLink && <div>Video Call URL: {videoCallLink}</div>}</div>
        </div>
      </Modal>
    </>
  );
  
}

export default VideoCall;
