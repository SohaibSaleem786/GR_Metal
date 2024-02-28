







// ////////////////////// API code through login way 
// import Header from '../../Header/Header';
// import Footer from '../../Footer/Footer';
// import axios from 'axios';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function AddUser() {
//   const [values, setUserData] = useState({
//     FUsrId: '',
//     FUsrPwd: '',
//     FUsrNam: '',
//     FMobNum: '',
//     FEmlAdd: '',
//     FUsrSts: '',
//     FUsrTyp: '',
//     loading: false,
//   });

//   const [alert, setAlert] = useState(null);

//   const handleInputChange = (e) => {
//     setUserData({ ...values, [e.target.name]: e.target.value });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     setUserData((prevState) => ({
//       ...prevState,
//       loading: true,
//     }));

//     try {
//       const response = await fetch(
//         'https://www.crystalsolutions.com.pk/csres/AddUser.php',
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//           body: `
//            FUsrId=${encodeURIComponent(values.FUsrId)}
//           &FUsrPwd=${encodeURIComponent(values.FUsrPwd)}
//           &FUsrNam=${encodeURIComponent(values.FUsrNam)}
//           &FUsrTyp=${encodeURIComponent(values.FUsrSts)}
//           &FUsrSts=${encodeURIComponent(values.FUsrSts)}
//           &FMobNum=${encodeURIComponent(values.FMobNum)}
//           &FEmlAdd=${encodeURIComponent(values.FEmlAdd)}

//           `,
//         }
//       );

//       if (response.ok) {
//         // User data stored successfully
//       } else {
//         // Error storing user data
//         throw new Error('Error storing user data');
//       }
//     } catch (error) {
//       console.error('Error storing user data:', error);
//       setAlert({ type: 'error', message: 'Error storing user data' });
//     } finally {
//       setUserData((prevState) => ({
//         ...prevState,
//         loading: false,
//       }));
//     }
//   };

//   return (
//     <>
//       <div className="col-12" style={{ color: 'black', padding: '20px' }}>
//         {/* ... (existing code remains the same) */}
//         <div
//           className="row"
//           style={{
//             background: 'orange',
//             height: '40px',
//             textAlign: 'left',
//             borderBottom: '3px solid red',
//             borderTop: '3px solid red',
//           }}
//         >
//           <h3>Utilities {'>'} User Management {'>'} Add User</h3>
//         </div>
//         <br />
//         <div
//           className="row"
//           style={{
//             marginLeft: '15px',
//             marginRight: '15px',
//             backgroundColor: '#FFD580',
//             color: 'black',
//             border: '10px solid orange',
//           }}
//         >
//           <div className="col-md-12">
//             <form
//               className="form"
//               style={{
//                 width: '100%',
//                 maxWidth: '720px',
//                 margin: '0 auto',
//                 fontSize: '11px',
//                 fontWeight: 'bold',
//                 textAlign: 'right',
//                 marginRight:'30%'
//               }}
//             >
//               <div className="form-group">
//                 <div className="row">
//                   <div className="col-md-3" style={{ marginBottom: '30px' }}>
//                     <label htmlFor="code">Id:</label>
//                   </div>
//                   <div className="col-md-9">
//                     <input
//                       type="text"
//                       id="code"
//                       placeholder="Id"
//                       className="form-control"
//                       maxLength={3}
//                     />
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-md-3" style={{ marginBottom: '30px' }}>
//                     <label htmlFor="code">User Id:</label>
//                   </div>
//                   <div className="col-md-9">
//                     <input
//                       type="text"
//                       id="code"
//                       placeholder="User Id"
//                       name="FUsrId"
//                       className="form-control"
//                       value={values.FUsrId}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-md-3" style={{ marginBottom: '30px' }}>
//                     <label htmlFor="userId">Name:</label>
//                   </div>
//                   <div className="col-md-9">
//                     <input
//                       type="text"
//                       name="FUsrNam"
//                       value={values.FUsrNam}
//                       onChange={handleInputChange}
//                       className="form-control"
//                       placeholder="User Name"
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-md-3" style={{ marginBottom: '30px' }}>
//                     <label htmlFor="password">Password:</label>
//                   </div>
//                   <div className="col-md-9">
//                     <input
//                       type="password"
//                       name="FUsrPwd"
//                       value={values.FUsrPwd}
//                       onChange={handleInputChange}
//                       className="form-control"
//                       placeholder="Password"
//                       required
//                     />
//                   </div>
//                 </div>
//                 {/* <div className="row">
//                   <div className="col-md-3" style={{ marginBottom: '30px' }}>
//                     <label htmlFor="type">Type:</label>
//                   </div>
//                   <div className="col-md-9">
//                     <select id="type" className="form-control">
//                       <option value="">Admin</option>
//                       <option value="type1">User</option>
//                       <option value="type1">Guest</option>
//                     </select>
//                   </div>
//                 </div> */}

//                   <div className="row">
//                   <div className="col-md-3" style={{ marginBottom: '30px' }}>
//                     <label htmlFor="required">Type :</label>
//                   </div>
//                   <div className="col-md-9">
//                     <select
//                       name="FUsrTyp"
//                       value={values.FUsrTyp}
//                       onChange={handleInputChange}
//                       className="form-control"
//                     >
//                       <option value="Admin">Admin</option>
//                       <option value="User">User</option>
//                       <option value="Guest">Guest</option>
//                     </select>
//                   </div>
//                 </div>


//                 {/* <div className="row">
//                   <div className="col-md-3" style={{ marginBottom: '30px' }}>
//                     <label htmlFor="status">Status:</label>
//                   </div>
//                   <div className="col-md-9">
//                     <select id="status" className="form-control">
//                       <option value="">Active</option>
//                       <option value="type1">Suspended</option>
//                       <option value="type1">Not Active</option>
//                     </select>
//                   </div>
//                   </div> */}

//                   <div className="row">
//                   <div className="col-md-3" style={{ marginBottom: '30px' }}>
//                     <label htmlFor="required">Status:</label>
//                   </div>
//                   <div className="col-md-9">
//                     <select
//                       name="FCtgStss"
//                       value={values.FCtgStss}
//                       onChange={handleInputChange}
//                       className="form-control"
//                     >
//                       <option value="">Select Status</option>
//                       <option value="Yes">Yes</option>
//                       <option value="No">No</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="col-md-3" style={{ marginBottom: '30px' }}>
//                     <label htmlFor="mobile">Mobile#:</label>
//                   </div>
//                   <div className="col-md-9">
//                     <input
//                       type="text"
//                       name="FMobNum"
//                       value={values.FMobNum}
//                       onChange={handleInputChange}
//                       className="form-control"
//                       placeholder="Mobile Number"
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-md-3" style={{ marginBottom: '30px' }}>
//                     <label htmlFor="email">Email Address:</label>
//                   </div>
//                   <div className="col-md-9">
//                     <input
//                       type="text"
//                       name="FEmlAdd"
//                       value={values.FEmlAdd}
//                       onChange={handleInputChange}
//                       className="form-control"
//                       placeholder="Email Address"
//                       required
//                     />
//                     <div className="invalid-feedback">
//                       Please enter a valid email address.
//                     </div>
//                   </div>
//                 </div>
//                 <div style={{ marginRight: '150px' }}>
//                   <button
//                     className="btn btn-primary"
//                     style={{
//                       backgroundColor: 'orange',
//                       color: 'black',
//                       width: '180px',
//                     }}
//                     onClick={handleFormSubmit}
//                   >
//                     SUBMIT
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//         <br />
//         {/* <Footer /> */}
//       </div>
//     </>
//   );
// }

// export default AddUser;


























