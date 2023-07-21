// import React, { useState } from 'react';
// import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
// import { AccountCircle } from '@mui/icons-material';
// import { useSelector } from 'react-redux';

// const OrgBar = () => {

//     const {authState} = useSelector(state=>state.organisationauth)

//       console.log("hello"+authState.orgName)

//   const [orgLog, setOrgLog] = useState(false);
//   const organizationName = authState.orgName;

//   setOrgLog(authState)

//   // console.log(orgLog)

//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Typography variant="h6" sx={{ flexGrow: 1 }}>
//           JOBCY
//         </Typography>
//         {orgLog ? (
//           <Typography variant="subtitle1">
//             Hello {organizationName}
//           </Typography>
//         ) : (
//           <>
//             <IconButton color="inherit" aria-label="user">
//               <AccountCircle />
//             </IconButton>
//             <Typography variant="subtitle1">User login</Typography>
//           </>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default OrgBar;
