// import React from "react";
// import {
//   MDBCol,
//   MDBContainer,
//   MDBRow,
//   MDBCard,
//   MDBCardText,
//   MDBCardBody,
//   MDBCardImage,
//   MDBBtn,
//   MDBBreadcrumb,
//   MDBBreadcrumbItem,
//   MDBProgress,
//   MDBProgressBar,
//   MDBIcon,
//   MDBListGroup,
//   MDBListGroupItem,
// } from "mdb-react-ui-kit";

// function UserProfile() {
//   return (
//     <section style={{ backgroundColor: "#ffffff", paddingTop: "50px" }}>
//       <MDBContainer className="py-5">
//         <MDBRow>
//           <MDBCol>
//             <MDBCard
//               className="mb-4"
//               style={{
//                 border: "2px solid #ff6e14",
//                 width: "200px",
//                 margin: "auto",
//                 padding: "10px",
//                 borderRadius: "10px",
//               }}
//             >
//               <MDBCardBody className="text-center">
//                 <MDBCardImage
//                   src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
//                   alt="avatar"
//                   className="rounded-circle"
//                   style={{ width: "150px" }}
//                   fluid
//                 />
//                 <p className="text-muted mb-1">Full Stack Developer</p>
//                 <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
//                 <div className="d-flex justify-content-center mb-2">
//                   <MDBBtn
//                     size="lg"
//                     style={{
//                       backgroundColor: "#ff6e14",
//                       marginRight: "10px",
//                       transition: "background-color 0.3s",
//                       border: "none",
//                       borderRadius: "10px",
//                       color: "#ffffff",
//                     }}
//                     hoverStyle={{ backgroundColor: "#ff4e00" }}
//                   >
//                     Follows
//                   </MDBBtn>
//                   <MDBBtn
//                     outline
//                     className="ms-1"
//                     style={{
//                       backgroundColor: "#ff6e14",
//                       marginRight: "10px",
//                       transition: "background-color 0.3s",
//                       border: "none",
//                       borderRadius: "10px",
//                       color: "#ffffff",
//                     }}
//                     hoverStyle={{ backgroundColor: "#ff4e00" }}
//                   >
//                     Freiends
//                   </MDBBtn>
//                 </div>
//               </MDBCardBody>
//             </MDBCard>
//             <MDBCard
//         className="mb-4 mb-lg-0"
//         style={{
//           border: '2px solid #ff6e14',
//           width: '100%',
//           maxWidth: '1200px',
//           margin: 'auto',
//           padding: '10px',
//           borderRadius: '10px',
//           marginTop:'10px'
//         }}
//       >
//         <MDBCardBody className="p-0">
//           <div className="d-flex justify-content-between align-items-center p-3">
//             <span className="text-warning">https://mdbootstrap.com</span>
//           </div>
//           <div className="d-flex justify-content-between align-items-center p-3">
//             <span style={{ color: '#333333' }}>mdbootstrap</span>
//           </div>
//           <div className="d-flex justify-content-between align-items-center p-3">
//             <span style={{ color: '#55acee' }}>@mdbootstrap</span>
//           </div>
//           <div className="d-flex justify-content-between align-items-center p-3">
//             <span style={{ color: '#ac2bac' }}>mdbootstrap</span>
//           </div>
//           <div className="d-flex justify-content-between align-items-center p-3">
//             <span style={{ color: '#3b5998' }}>mdbootstrap</span>
//           </div>
//         </MDBCardBody>
//         </MDBCard>
//           </MDBCol>
//           <MDBCol lg="8">
//             <MDBCard className="mb-4">
//               <MDBCardBody>
//                 <MDBRow>
//                   <MDBCol sm="3">
//                     <MDBCardText>Full Name</MDBCardText>
//                   </MDBCol>
//                   <MDBCol sm="9">
//                     <MDBCardText className="text-muted">
//                       Johnatan Smith
//                     </MDBCardText>
//                   </MDBCol>
//                 </MDBRow>
//                 <hr />
//                 <MDBRow>
//                   <MDBCol sm="3">
//                     <MDBCardText>Email</MDBCardText>
//                   </MDBCol>
//                   <MDBCol sm="9">
//                     <MDBCardText className="text-muted">
//                       example@example.com
//                     </MDBCardText>
//                   </MDBCol>
//                 </MDBRow>
//                 <hr />
//                 <MDBRow>
//                   <MDBCol sm="3">
//                     <MDBCardText>Phone</MDBCardText>
//                   </MDBCol>
//                   <MDBCol sm="9">
//                     <MDBCardText className="text-muted">
//                       (097) 234-5678
//                     </MDBCardText>
//                   </MDBCol>
//                 </MDBRow>
//                 <hr />
//                 <MDBRow>
//                   <MDBCol sm="3">
//                     <MDBCardText>Mobile</MDBCardText>
//                   </MDBCol>
//                   <MDBCol sm="9">
//                     <MDBCardText className="text-muted">
//                       (098) 765-4321
//                     </MDBCardText>
//                   </MDBCol>
//                 </MDBRow>
//                 <hr />
//                 <MDBRow>
//                   <MDBCol sm="3">
//                     <MDBCardText>Address</MDBCardText>
//                   </MDBCol>
//                   <MDBCol sm="9">
//                     <MDBCardText className="text-muted">
//                       Bay Area, San Francisco, CA
//                     </MDBCardText>
//                   </MDBCol>
//                 </MDBRow>
//               </MDBCardBody>
//             </MDBCard>

//             <MDBRow>
//               <MDBCol md="6">
//                 <MDBCard className="mb-4 mb-md-0">
//                   <MDBCardBody>
//                     <MDBCardText className="mb-4">
//                       <span className="text-primary font-italic me-1">
//                         assigment
//                       </span>{" "}
//                       Project Status
//                     </MDBCardText>
//                     <MDBCardText
//                       className="mb-1"
//                       style={{ fontSize: ".77rem" }}
//                     >
//                       Web Design
//                     </MDBCardText>
//                     <MDBProgress className="rounded">
//                       <MDBProgressBar width={80} valuemin={0} valuemax={100} />
//                     </MDBProgress>

//                     <MDBCardText
//                       className="mt-4 mb-1"
//                       style={{ fontSize: ".77rem" }}
//                     >
//                       Website Markup
//                     </MDBCardText>
//                     <MDBProgress className="rounded">
//                       <MDBProgressBar width={72} valuemin={0} valuemax={100} />
//                     </MDBProgress>

//                     <MDBCardText
//                       className="mt-4 mb-1"
//                       style={{ fontSize: ".77rem" }}
//                     >
//                       One Page
//                     </MDBCardText>
//                     <MDBProgress className="rounded">
//                       <MDBProgressBar width={89} valuemin={0} valuemax={100} />
//                     </MDBProgress>

//                     <MDBCardText
//                       className="mt-4 mb-1"
//                       style={{ fontSize: ".77rem" }}
//                     >
//                       Mobile Template
//                     </MDBCardText>
//                     <MDBProgress className="rounded">
//                       <MDBProgressBar width={55} valuemin={0} valuemax={100} />
//                     </MDBProgress>

//                     <MDBCardText
//                       className="mt-4 mb-1"
//                       style={{ fontSize: ".77rem" }}
//                     >
//                       Backend API
//                     </MDBCardText>
//                     <MDBProgress className="rounded">
//                       <MDBProgressBar width={66} valuemin={0} valuemax={100} />
//                     </MDBProgress>
//                   </MDBCardBody>
//                 </MDBCard>
//               </MDBCol>

//               <MDBCol md="6">
//                 <MDBCard className="mb-4 mb-md-0">
//                   <MDBCardBody>
//                     <MDBCardText className="mb-4">
//                       <span className="text-primary font-italic me-1">
//                         assigment
//                       </span>{" "}
//                       Project Status
//                     </MDBCardText>
//                     <MDBCardText
//                       className="mb-1"
//                       style={{ fontSize: ".77rem" }}
//                     >
//                       Web Design
//                     </MDBCardText>
//                     <MDBProgress className="rounded">
//                       <MDBProgressBar width={80} valuemin={0} valuemax={100} />
//                     </MDBProgress>

//                     <MDBCardText
//                       className="mt-4 mb-1"
//                       style={{ fontSize: ".77rem" }}
//                     >
//                       Website Markup
//                     </MDBCardText>
//                     <MDBProgress className="rounded">
//                       <MDBProgressBar width={72} valuemin={0} valuemax={100} />
//                     </MDBProgress>

//                     <MDBCardText
//                       className="mt-4 mb-1"
//                       style={{ fontSize: ".77rem" }}
//                     >
//                       One Page
//                     </MDBCardText>
//                     <MDBProgress className="rounded">
//                       <MDBProgressBar width={89} valuemin={0} valuemax={100} />
//                     </MDBProgress>

//                     <MDBCardText
//                       className="mt-4 mb-1"
//                       style={{ fontSize: ".77rem" }}
//                     >
//                       Mobile Template
//                     </MDBCardText>
//                     <MDBProgress className="rounded">
//                       <MDBProgressBar width={55} valuemin={0} valuemax={100} />
//                     </MDBProgress>

//                     <MDBCardText
//                       className="mt-4 mb-1"
//                       style={{ fontSize: ".77rem" }}
//                     >
//                       Backend API
//                     </MDBCardText>
//                     <MDBProgress className="rounded">
//                       <MDBProgressBar width={66} valuemin={0} valuemax={100} />
//                     </MDBProgress>
//                   </MDBCardBody>
//                 </MDBCard>
//               </MDBCol>
//             </MDBRow>
//           </MDBCol>
//         </MDBRow>
//       </MDBContainer>
//     </section>
//   );
// }

// export default UserProfile;
