

// import { useParams } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import Header from "../../../MainComponent/Header/Header";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import Alert from "@mui/material/Alert";
// import PathHead from "../../../MainComponent/PathHead/PathHead";
// import { useTheme } from "../../../../ThemeContext";

// function Update_Item() {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [alertData, setAlertData] = useState(null);

//   const [previewImage1, setPreviewImage] = useState('');
//   const [previewImage2, setPreviewImage2] = useState('');
//   const [previewImage3, setPreviewImage3] = useState('');
//   const [selectedCategoryId, setSelectedCategoryId] = useState("");
//   const { secondaryColor } = useTheme();

//   const imageurl = 'https://www.crystalsolutions.com.pk/csres/itemimage/';
//   const [data, setData] = useState([]);
//   const { primaryColor } = useTheme();

//   const [user, setUser] = useState({
   
//     id :'',
//     titmdsc:'',
//     dull:'',
//     h23_lh23:'',
//     shara_brown:'',
//     black_multi :'',
//     wood_coat:'',
//     tctgcod:'',
//   });

//   useEffect(() => {
//     fetch(
//       `https://www.crystalsolutions.com.pk/grmetal/get_item.php?id=${id}`
//     )
//       .then((response) => response.json())
//       .then((apiData) => {
//         const user = apiData.find((item) => item.id === id);
//         setUser(user);
//         // setPreviewImage(user.TItmPic ? imageurl + user.TItmPic : '');
  

//       })
//       .catch((error) => console.error(error));
//   }, [id]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUser((prevUser) => ({
//       ...prevUser,
//       [name]: value,
//     }));
//   };

  
//   const [values, setValues] = useState({
//     itmIdd: "",
//     itemDscc: "",
//     itemStss: "",
//     purRatee: "",
//     saleRatee: "",
//     categoryIdd: "",
//     typee: "",
//     pic : '',
//     loading: false,
//   });

//   const [selectedStatus, setSelectedStatus] = useState("");

//   const [alert, setAlert] = useState(null);
//   const [selectedImage1, setSelectedImage1] = useState(null);
// //   const [selectedImage2, setSelectedImage2] = useState(null);
// //   const [selectedImage3, setSelectedImage3] = useState(null);

//   function handleImageChange1(event) {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedImage1(file);
//       const imgElement = document.getElementById("pic-preview");
//       if (imgElement) {
//         imgElement.src = URL.createObjectURL(file);
//       }
//     }
//   }


//   const UserId = 33;
//   useEffect(() => {
//     // Retrieve user data from local storage
//     const userData = JSON.parse(localStorage.getItem("user"));

//     if (userData) {
//       // setUsers(userData);
//       console.log(userData);
//       console.log("user id is", userData.tusrid);
//     } else {
//       // Handle cases when user data is not available
//       console.error("User data not available in local storage.");
//     }
//   }, []);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "https://www.crystalsolutions.com.pk/grmetal/get_category.php"
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         const apiData = await response.json();
//         setData(apiData);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();


//     return () => {
//     };
//   }, []);

//   const handleSubmit = (event) => {
//     event.preventDefault();
  
//     const FSinUsr = 33; // Your user ID logic here
  
//     const requestBody = new FormData();
//     requestBody.append("itmId", user.TItmId);
//     requestBody.append("itemDsc", user.TItmDsc);
//     requestBody.append("itemSts", user.TItmSts);
//     requestBody.append("purRate", user.TPurRat);
//     requestBody.append("saleRate", user.TSalRat);
//     requestBody.append("categoryId", selectedCategoryId);
//     requestBody.append("type", user.TitmTyp);
 
//     requestBody.append("pic", selectedImage1);

    
//     // if (selectedImage1) {
//     //   requestBody.append("pic", selectedImage1);
//     // }
  
//     // if (selectedImage1) {
//     //   requestBody.append("pic1", selectedImage1, selectedImage1.name);
//     // }
//     // if (selectedImage2) {
//     //   requestBody.append("pic2", selectedImage2, selectedImage2.name);
//     // }
//     // if (selectedImage3) {
//     //   requestBody.append("pic3", selectedImage3, selectedImage3.name);
//     // }

//     axios
//       .post(
//         `https://www.crystalsolutions.com.pk/csres/update_item.php?id=${id}`,
//         requestBody
//       )
//       .then((response) => {
//         if (response.data.error === 200) {
//           setAlertData({
//             type: "success",
//             message: `${response.data.message}`,
//           });
//           setTimeout(() => {
//             setAlertData(null);
//             navigate("/GetCategory");
//           }, 3000);
          
//         } else {
//           console.log(response.data.message);

//           setAlertData({
//             type: "error",
//             message: `${response.data.message}`,
//           });
//           setTimeout(() => {
//             setAlertData(null);
//           }, 2000);
//         }
//       })
//       .catch((error) => {
//         // Handle errors
//         console.error("Error:", error);
//       });
//   };
  

  
//   useEffect(() => {
//     if (selectedImage1) {
//       document.getElementById("pic-preview").src = URL.createObjectURL(selectedImage1);
//     }
//   }, [selectedImage1]);


//   return (
//     <>
//      <div
//         style={{
//           position: "relative",
//           width: "100%",
//           height: "100vh",
//           overflow: "hidden",
//         }}
//       >
//         {alertData && (
//           <Alert
//             severity={alertData.type}
//             style={{
//               position: "fixed",
//               top: 0,
//               left: 0,
//               width: "30%",
//               marginLeft: "35%", 
//               zIndex: 1000,
//               textAlign: "center", 
//             }}
//           >
//             {alertData.message}
//           </Alert>
//         )}
//       <div className="col-12" style={{ color: secondaryColor}}>
//         <Header />
        
//         <PathHead pageName="File > Item Maintenance > Update Item" />

//         <div
//           className="row"
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             padding: "5px",
//             backgroundColor: "#f5f5f5",
//             minHeight: "100vh",
//           }}
//         >
//           <div
//             className="col-md-12"
//             style={{
//               backgroundColor: "#fff",
//               borderRadius: "10px",
//               boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//               padding: "10px",
//               width: "100%",
//               maxWidth: "620px",
//               margin: "20px 0",
//             }}
//           >
//             <form
//               onSubmit={handleSubmit}
//               style={{ textAlign: "right",fontSize:'12px',fontWeight:'bold'}}
//             >
//               <div className="form-group" >
//                 <div className="row">
//                 <div className="col-md-2" >
//                     <label htmlFor="code">Id :</label>
//                   </div>
//                   <div className="col-md-2">
//                     <input
//                       type="text"
//                       id="code"
//                       placeholder=" Id"
//                       className="form-control"
//                       name="id"
//                       value={user.id}
//                       onChange={handleInputChange}
//                       style={{height:'20px', width:'70px', marginLeft: "-3%" }}
//                       disabled
//                     />
//                   </div>

                  

                  
//                 </div>
//                 <div className="row">
// <div className="col-md-2" >
//                     <label htmlFor="code">Description :</label>
//                   </div>
//                   <div className="col-md-6">
//                     <input
//                       type="text"
//                       id="code"
//                       placeholder="Description"
//                       className="form-control"
//                       name="titmdsc"
//                       value={user.titmdsc}
//                       style={{height:'20px', width:'350px', marginLeft: "-2%" }}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-md-2" >
//                     <label htmlFor="code">Dull :</label>
//                   </div>
//                   <div className="col-md-4">
//                     <input
//                       type="text"
//                       id="code"
//                       placeholder="Dull"
//                       className="form-control"
//                       name="dull"
//                       value={user.dull}
//                       style={{height:'20px', width:'90px', marginLeft: "-3%" ,textAlign:'right' }}
//                       onChange={handleInputChange}
//                     />
//                   </div>

                  
//                 </div>
//                 <div className="row">
//                 <div className="col-md-2" >
//                     <label htmlFor="code">H23_lh23 :</label>
//                   </div>
//                   <div className="col-md-4">
//                     <input
//                       type="text"
//                       id="code"
//                       placeholder="h23_lh23"
//                       className="form-control"
//                       name="h23_lh23"
//                       value={user.h23_lh23}
//                       style={{height:'20px', width:'90px', marginLeft: "-3%" ,textAlign:'right' }}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                 </div>
//                 <div className="row">


                 
// <div className="col-md-2" >
//   <label htmlFor="type">Category :</label>
// </div>
// <div className="col-md-4">
//   <select
//     name="tctgcod"
//     value={user.TCtgId}
//     style={{height:'27px',fontSize:'11px', width:'220px', marginLeft: "-3%"  }}
//     onChange={(e) => {
//       setSelectedCategoryId(e.target.value);
//       setUser((prevUser) => ({
//         ...prevUser,
//         TCtgId: e.target.value,
//       }));
//     }}
//     id="categoryIdd"
//     className="form-control"
//   >
//     {data.map((item) => (
//       <option
//         key={item.tctgid}
//         value={item.tctgid}
//       >
//         {item.tctgdsc}
//       </option>
//     ))}
//   </select>
// </div>




                  
//                 </div>
//               <div className="row">
//               <div className="col-md-2" >
//                     <label htmlFor="code">Shara Brown :</label>
//                   </div>
//                   <div className="col-md-4">
//                     <input
//                       type="text"
//                       id="code"
//                       placeholder="shara_brown"
//                       className="form-control"
//                       name="shara_brown"
//                       value={user.shara_brown}
//                       style={{height:'20px', width:'90px' , marginLeft: "-3%" ,textAlign:'right'}}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//               </div>
//               <div className="row">

// <div className="col-md-2" >
//                     <label htmlFor="code">Black Multi:</label>
//                   </div>
//                   <div className="col-md-4">
//                     <input
//                       type="text"
//                       id="code"
//                       placeholder="black_multi"
//                       className="form-control"
//                       name="black_multi"
//                       value={user.black_multi}
//                       style={{height:'20px', width:'90px' , marginLeft: "-3%" ,textAlign:'right'}}
//                       onChange={handleInputChange}
//                     />
//                   </div>


                
//                </div>
//                <div className="row">
//                <div className="col-md-2" >
//                     <label htmlFor="code">Wood Coat :</label>
//                   </div>
//                   <div className="col-md-4">
//                     <input
//                       type="text"
//                       id="code"
//                       placeholder="wood_coat"
//                       className="form-control"
//                       name="wood_coat"
//                       value={user.wood_coat}
//                       style={{height:'20px', width:'90px', marginLeft: "-3%" ,textAlign:'right' }}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                </div>
//                <br />
                
//                 <div style={{ marginRight: "70%" }}>
//                   <button
//                     className="btn btn-primary"
//                     style={{
//                       backgroundColor: primaryColor,
//                       height: "4%",
//                       fontSize: "11px",
//                       color: secondaryColor,
//                       width: "45%",
//                       marginRight: "2%",
//                     }}
//                     onClick={handleSubmit}
//                   >
//                     SUBMIT
//                   </button>
//                   <button
//                     className="btn btn-primary"
//                     onClick={() => navigate("/Get_Item")}
//                     style={{
//                       backgroundColor: primaryColor,
//                       height: "4%",
//                       fontSize: "11px",
//                       color: secondaryColor,
//                       width: "45%",
//                       marginRight: "2%",
//                     }}
//                   >
//                     Return
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//         <br />
//       </div>
//       </div>
//     </>
//   );
// }

// export default Update_Item;