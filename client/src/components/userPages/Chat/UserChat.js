import { Grid, Box } from "@mui/material";
import React, { useState } from "react";
import FriendsList from "./FriendsList";
import ChatBox from "./ChatBox";
import Appbar from '../../Appbar/Appbar'


function Chat() {

  const [oppstId ,setOppstId] = useState('')


  const handleClickEvent = (oppstId)=>{
    console.log("hi",oppstId)
    setOppstId(oppstId)
  }

  return (
    <div>
      <Appbar/>
      <Grid sx={{display:'flex'}}>
        <Box lg={4} sx={{height:'80vh',border:'0.5px solid grey' ,marginLeft:'5%',marginTop:'6%',width:'20%',borderRadius:'3% 0% 0% 3%'}}>
          <FriendsList handleClickEvent={handleClickEvent} />
        </Box>
        <Box lg={8} sx={{height:'80vh',border:'0.5px solid grey',marginRight:'5%',marginTop:'6%',width:'50%',borderRadius:'0% 3% 3% 0%'}}>
          <ChatBox  oppstId={oppstId}/>
        </Box>
      </Grid>
    </div>
  );
}

export default Chat;
