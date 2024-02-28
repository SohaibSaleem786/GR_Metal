// import React, { useState, useEffect } from 'react';
// import { MDBDataTable } from 'mdbreact';
// import Select from 'react-select';
// import axios from 'axios';

// const MenuUser = () => {
//   const [activeTab, setActiveTab] = useState(1);
//   const [data, setData] = useState({ columns: [], rows: [] });
//   const [isChecked, setIsChecked] = useState(false);

//   const handleCheckboxChange = (event) => {
//     setIsChecked(event.target.checked);
//   };

//   const handleTabClick = (tabNumber) => {
//     setActiveTab(tabNumber);
//   };


//   useEffect(() => {
//     // Fetch data for userid === 33
//     fetchDataForUserId(33);
//   }, [activeTab]);




//   function fetchDataForUserId() {
//     const apiUrl = 'https://www.crystalsolutions.com.pk/csres/get_usrmenu.php';
//     const data = {
//       userid: '33',
//     };
//     const formData = new URLSearchParams(data).toString();
  
//     axios
//       .post(apiUrl, formData)
//       .then((response) => response.data)
//       .then((apiData) => {
//         // Simulated value of 'activeTab' for testing purposes
//         const activeTab = 'tab1'; // Replace this with your actual value or logic
        
//         const mainMenuItem = apiData.find((item) => item.tmencod === `${activeTab}-00-00`);
//         if (mainMenuItem) {
//           const subItems = apiData.filter(
//             (subItem) => subItem.tmencod.startsWith(`${activeTab}-`) && subItem.tmencod !== `${activeTab}-00-00`
//           );
  
//           const transformedData = subItems.map((item) => ({
//             Sr: `${item.tmencod.split('-')[1]}`,
//             Description: item.tmendsc,
//             Permission: item.tmenprm,
//             Add: 'Add',
//             View: 'View',
//           }));
  
//           const columns = [
//             {
//               label: 'Sr',
//               field: 'Sr',
//               sort: 'asc',
//             },
//             {
//               label: 'Description',
//               field: 'Description',
//               sort: 'asc',
//             },
//             {
//               label: 'Permission',
//               field: 'Permission',
//               sort: 'asc',
//             },
//             {
//               label: 'Add',
//               field: 'Add',
//               sort: 'asc',
//             },
//             {
//               label: 'View',
//               field: 'View',
//               sort: 'asc',
//             },
//           ];
  
//           setData({ columns, rows: transformedData });
//         } else {
//           console.log('Main menu item not found.');
//         }
//       })
//       .catch((error) => console.error('Error:', error.message));
//   }

//   // Function to fetch data for a specific userid
// //   const fetchDataForUserId = (userid) => {
// //     fetch(`https://www.crystalsolutions.com.pk/csres/get_usrmenu.php?userid=${userid}`)
// //       .then((response) => response.json())
// //       .then((apiData) => {
// //         const mainMenuItem = apiData.find((item) => item.tmencod === `${activeTab}-00-00`);
// //         if (mainMenuItem) {
// //           const subItems = apiData.filter(
// //             (subItem) => subItem.tmencod.startsWith(`${activeTab}-`) && subItem.tmencod !== `${activeTab}-00-00`
// //           );

// //           const transformedData = subItems.map((item) => ({
// //             Sr: `${item.tmencod.split('-')[1]}`,
// //             Description: item.tmendsc,
// //             Permission: item.tmenprm,
// //             Add: 'Add',
// //             View: 'View'
// //           }));

// //           const columns = [
// //             {
// //               label: 'Sr',
// //               field: 'Sr',
// //               sort: 'asc'
// //             },
// //             {
// //               label: 'Description',
// //               field: 'Description',
// //               sort: 'asc'
// //             },
// //             {
// //               label: 'Permission',
// //               field: 'Permission',
// //               sort: 'asc',
// //               // getValue: (value, row) => (
// //               //   <Select
// //               //     options={[
// //               //       { value: 'Yes', label: 'Yes' },
// //               //       { value: 'No', label: 'No' }
// //               //     ]}
// //               //     value={value}
// //               //     onChange={(selectedOption) => handlePermissionChange(selectedOption, row)}
// //               //   />
// //               // )
// //             },
// //             {
// //               label: 'Add',
// //               field: 'Add',
// //               sort: 'asc'
// //             },
// //             {
// //               label: 'View',
// //               field: 'View',
// //               sort: 'asc'
// //             }
// //           ];

// //           setData({ columns, rows: transformedData });
// //         }
// //       })
// //       .catch((error) => console.error(error));
// //   };



//   const handlePermissionChange = (selectedOption, row) => {
//     const updatedRows = data.rows.map((rowData) => {
//       if (rowData.Sr3 === row.Sr3) {
//         return {
//           ...rowData,
//           Permission: selectedOption.value
//         };
//       }
//       return rowData;
//     });

//     setData((prevState) => ({
//       ...prevState,
//       rows: updatedRows
//     }));
//   };
//   return (
//     <div className="col-12" style={{ color: 'black' }}>
//       <div className="row" style={{ background: 'orange', height: '40px', textAlign: 'center', borderBottom: '3px solid red' }}>
//         <h3>MENU</h3>
//       </div>
// <br /><br />
   

//       {/* Tabs */}
//       <div
//           className="row-12"
//           style={{
//             backgroundColor: 'grey',
//             display: 'flex',
//             borderTop: '3px solid red',
//             borderBottom: '3px solid red',
//             borderLeft: '3px solid red',
//             flexDirection: 'row',
//           }}
//         >
//           <div
//   style={{ background: activeTab === 1 ? 'orange' : '', textAlign: 'center' }}
//   className={`tab col-3 ${activeTab === 1 ? 'active' : ''}`}
//   onClick={() => handleTabClick(1)}
// >
//   File Maintenance
// </div>
// <div
//   style={{ background: activeTab === 2 ? 'orange' : '', textAlign: 'center' }}
//   className={`tab col-3 ${activeTab === 2 ? 'active' : ''}`}
//   onClick={() => handleTabClick(2)}
// >
//   Transaction
// </div>
// <div
//   style={{ background: activeTab === 3 ? 'orange' : '', textAlign: 'center' }}
//   className={`tab col-3 ${activeTab === 3 ? 'active' : ''}`}
//   onClick={() => handleTabClick(3)}
// >
//   Reports
// </div>
// <div
//   style={{ background: activeTab === 4 ? 'orange' : '', textAlign: 'center' }}
//   className={`tab col-3 ${activeTab === 4 ? 'active' : ''}`}
//   onClick={() => handleTabClick(4)}
// >
//   Utilities
// </div>

//         </div>

//       {/* Tab Content */}
//       <div className="tab-content" style={{ marginLeft:"60px", marginRight:"60px",}}>
//         {activeTab === 1 && (
//           <div style={{ textAlign: 'center', fontSize: '20px', margin: '5px' }}>
//             {/* Custom Table Component */}
//             <MDBDataTable
//               scrollY
//               maxHeight="400px"
              
//               striped
//               bordered
//               small

//               data={data}
//               paging={false}
//               searching={false}
//             />
//           </div>
//         )}

//         {activeTab === 2 && (
//           <div style={{ textAlign: 'center', fontSize: '20px', margin: '5px', marginLeft: '40' }}>
//             {/* Custom Table Component */}
//             <MDBDataTable
//               scrollY
//               maxHeight="400px"
//               striped
//               bordered
//               small
//               data={data}
//               paging={false}
//               searching={false}
//             />
//           </div>
//         )}

//         {activeTab === 3 && (
//           <div style={{ textAlign: 'center', fontSize: '20px', margin: '5px', marginLeft: '40' }}>
//             {/* Custom Table Component */}
//             <MDBDataTable
//               scrollY
//               maxHeight="400px"
//               striped
//               bordered
//               small
//               data={data}
//               paging={false}
//               searching={false}
//             />
//           </div>
//         )}


// {activeTab === 4 && (
//           <div style={{ textAlign: 'center', fontSize: '20px', margin: '5px', marginLeft: '40' }}>
//             {/* Custom Table Component */}
//             <MDBDataTable
//               scrollY
//               maxHeight="400px"
//               striped
//               bordered
//               small
//               data={data}
//               paging={false}
//               searching={false}
//             />
//           </div>
//         )}
//       </div>

//       {/* ///////////.............................. TWO BUTTON IS HERE.................................../////////// */}
//       <div className="col-6" style={{ marginLeft: '600px' }}>  
//           <div className="row">
//             <div className="col-3">
//               {/* Button 1 */}
//               <button className="btn btn-primary" style={{ backgroundColor: 'orange', color: 'black', width: '180px' }}>
//                 Save
//               </button>
//             </div>
//             <div className="col-3">
//               {/* Button 2 */}
//               <button className="btn btn-secondary" style={{ backgroundColor: 'orange', color: 'black', width: '180px' }}>
//                 Return
//               </button>
//             </div>
//           </div>
//         </div>
//     </div>
//   );
// };

// export default MenuUser;













// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom'; // Add 'Link' to the import statement
// import { MDBDataTable } from 'mdbreact';
// import Select from 'react-select';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const MenuUser = () => {
//   const { id } = useParams();
//   const notify = () => toast("Wow so easy!");
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState(1);
//   const [data, setData] = useState({ columns: [], rows: [] });

//   function handleTabClick(tabNumber) {
//     setActiveTab(tabNumber);
//   }
//   const customStyles = {
//     control: (provided, state) => ({
//       ...provided,
//       borderRadius: 0, // Optional: Customize the appearance of the select container
//       boxShadow: state.isFocused ? '0 0 0 2px orange' : 'none', // Optional: Add focus styles
//     }),
//     indicatorSeparator: (provided) => ({
//       ...provided,
//       display: 'none', // Hide the dropdown arrow icon
//     }),
//     dropdownIndicator: (provided) => ({
//       ...provided,
//       display: 'none', // Hide the dropdown arrow icon
//     }),
//   };
//   useEffect(() => {
//     fetchDataForUserId(id); // Change the user ID as needed
//   }, [activeTab, id]);
//   console.log(id);

//   function fetchDataForUserId(userId) {
//     const apiUrl = 'https://www.crystalsolutions.com.pk/csres/get_usrmenu.php';
//     const data = {
//       userid: userId,
//     };
//     const formData = new URLSearchParams(data).toString();

//     return axios
//       .post(apiUrl, formData)
//       .then((response) => response.data)
//       .then((apiData) => {
//         const mainMenuItem = apiData.find((item) => item.tmencod === `${activeTab}-00-00`);
//         if (mainMenuItem) {
//           const subItems = apiData.filter(
//             (subItem) => subItem.tmencod.startsWith(`${activeTab}-`) && subItem.tmencod !== `${activeTab}-00-00`
//           );

//           const transformedData = subItems.map((item) => ({
//             Sr: `${item.tmencod.split('-')[1]}`,
//             Description: item.tmendsc,
//             Permission: (
//               <Select
//                 options={[
//                   { value: 'Y', label: 'Y' },
//                   { value: 'N', label: 'N' },
//                 ]}
//                 defaultValue={{ value: item.tmenprm, label: item.tmenprm }}
//                 onChange={(selectedOption) => handlePermissionChange(item.tmencod, selectedOption)}
//                 styles={customStyles} // Apply the custom styles to the Select component
//                 isSearchable={false} // Hide the text input

//               />
//             ),
//           }));

//           const columns = [
//             {
//               label: 'Sr',
//               field: 'Sr',
//               sort: 'asc',
//             },
//             {
//               label: 'Description',
//               field: 'Description',
//               sort: 'asc',
//             },
//             {
//               label: 'Permission',
//               field: 'Permission',
//               sort: 'asc',
//             },
//             {
//               label: 'Add',
//               field: 'Add',
//               sort: 'asc',
//             },
//             {
//               label: 'View',
//               field: 'View',
//               sort: 'asc',
//             },
//           ];

//           setData({ columns, rows: transformedData });
//         } else {
//           console.log('Main menu item not found.');
//         }
//       })
//       .catch((error) => {
//         console.error('Error:', error.message);
//         throw error; // Rethrow the error to be handled at the component level
//       });
//   }

//   function handlePermissionChange(menuCode, selectedOption) {
//     const newPermission = selectedOption.value;
//     Update_Menu({ id, mcode: menuCode, permission: newPermission });
//   }

//   function Update_Menu(user) {
//     const apiUrl = 'https://www.crystalsolutions.com.pk/csres/update_permission.php';
//     const data = {
//       userid: user.id,
//       mcode: user.mcode,
//       permission: user.permission,
//     };
//     const formData = new URLSearchParams(data).toString();

//     axios
//       .post(apiUrl, formData)
//       .then((response) => {
//         // Handle the response, if needed
//         console.log("object is ", response.data);
//         toast.success("Update successful!"); // Show toast notification on success
//       })
//       .catch((error) => {
//         // Handle errors
//         console.error('Error:', error);
//         toast.error("Update failed. Please try again."); // Show toast notification on error
//       });
//   }

//   return (
//     <div className="col-12" style={{ color: 'black' }}>
//       <div className="row" style={{ background: 'orange', height: '40px', textAlign: 'center', borderBottom: '3px solid red' }}>
//         <h3>MENU</h3>
//       </div>
//       <br /><br />
  
//       {/* Tabs */}
//       <div
//         className="row-12"
//         style={{
//           backgroundColor: 'grey',
//           display: 'flex',
//           borderTop: '3px solid red',
//           borderBottom: '3px solid red',
//           borderLeft: '3px solid red',
//           flexDirection: 'row',
//         }}
//       >
//         {["File Maintenance", "Transaction", "Reports", "Utilities"].map((tabLabel, index) => (
//           <div
//             key={index}
//             style={{ background: activeTab === index + 1 ? 'orange' : '', textAlign: 'center' }}
//             className={`tab col-3 ${activeTab === index + 1 ? 'active' : ''}`}
//             onClick={() => handleTabClick(index + 1)}
//           >
//             {tabLabel}
//           </div>
//         ))}
//       </div>
//   <br />
//       {/* Tab Content */}
//       <div className="tab-content" style={{ marginLeft: "60px", marginRight: "60px" }}>
//   {[1, 2, 3, 4].map((tabNumber) => (
//     activeTab === tabNumber && (
//       <div key={tabNumber} style={{ textAlign: 'center', fontSize: '20px', margin: '5px', marginLeft: '40' }}>
//         {/* Custom Table Component */}
//         <div style={{ height: '400px', overflowY: 'auto', fontSize: '12px', width: '100%', overflowX: 'auto' }}>
//           <table className="table table-striped table-bordered table-sm responsive">
//             <thead>
//               <tr>
//                 {data.columns.map((column, index) => (
//                   <th
//                     key={index}
//                     scope="col"
//                     style={{ backgroundColor: 'orange', color: 'black' }} // Apply styles to the header column
//                   >
//                     {column.label}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {data.rows.map((row, rowIndex) => (
//                 <tr key={rowIndex}>
//                   {Object.keys(row).map((key) => (
//                     <td key={key}>{key === 'tusrpwd' ? '*****' : row[key]}</td>
//                   ))}
//                   <td>
//                     <div>
//                       <Link>
//                         <button
//                           className="btn btn-primary"
//                           style={{
//                             backgroundColor: 'orange',
//                             color: 'black',
//                             border: 'none',
//                             height: '30px',
//                             padding: '5px 10px',
//                             cursor: 'pointer',
//                           }}
//                         >
//                           ADD
//                         </button>
//                       </Link>
//                     </div>
//                   </td>
//                   <td>
//                     <div>
//                       <Link>
//                         <button
//                           className="btn btn-secondary"
//                           style={{
//                             backgroundColor: 'orange',
//                             color: 'black',
//                             border: 'none',
//                             height: '30px',
//                             padding: '5px 10px',
//                             cursor: 'pointer',
//                           }}
//                         >
//                           VIEW
//                         </button>
//                       </Link>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     )
//   ))}
// </div>

  
//       {/* ///////////.............................. TWO BUTTON IS HERE.................................../////////// */}
//       <div className="col-3" style={{ marginLeft: '35%' }}>
//         <div className="row">
//           <div className="col-3">
//             {/* Button 1 */}
//             <button className="btn btn-primary" style={{ backgroundColor: 'orange', color: 'black', width: '180px' }}>
//               Update
//             </button>
//           </div>
          
//           <div className="col-3" style={{marginLeft:'45%'}}>
//             {/* Button 2 */}
//             <button
//   onClick={() => navigate(-1)}
//   className="btn btn-secondary"
//   style={{ backgroundColor: 'orange', color: 'black', width: '180px' }}
// >
//   Return
// </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
  
// };

// export default MenuUser;






////////////////////////////  when i click Y then Automatically UPDATE /////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom'; // Add 'Link' to the import statement
// import { MDBDataTable } from 'mdbreact';
// import Select from 'react-select';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const MenuUser = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState(1);
//   const [data, setData] = useState({ columns: [], rows: [] });
//   const [newPermission, setNewPermission] = useState('');
//   const [showAlert, setShowAlert] = useState(false);

//   function handleTabClick(tabNumber) {
//     setActiveTab(tabNumber);
//   }
//   const customStyles = {
//     control: (provided, state) => ({
//       ...provided,
//       borderRadius: 0, // Optional: Customize the appearance of the select container
//       boxShadow: state.isFocused ? '0 0 0 2px orange' : 'none', // Optional: Add focus styles
//     }),
//     indicatorSeparator: (provided) => ({
//       ...provided,
//       display: 'none', // Hide the dropdown arrow icon
//     }),
//     dropdownIndicator: (provided) => ({
//       ...provided,
//       display: 'none', // Hide the dropdown arrow icon
//     }),
//   };
//   useEffect(() => {
//     fetchDataForUserId(id); // Change the user ID as needed
//   }, [activeTab, id]);
//   console.log(id);

//   function fetchDataForUserId(userId) {
//     const apiUrl = 'https://www.crystalsolutions.com.pk/csres/get_usrmenu.php';
//     const data = {
//       userid: userId,
//     };
//     const formData = new URLSearchParams(data).toString();

//     return axios
//       .post(apiUrl, formData)
//       .then((response) => response.data)
//       .then((apiData) => {
//         const mainMenuItem = apiData.find((item) => item.tmencod === `${activeTab}-00-00`);
//         if (mainMenuItem) {
//           const subItems = apiData.filter(
//             (subItem) => subItem.tmencod.startsWith(`${activeTab}-`) && subItem.tmencod !== `${activeTab}-00-00`
//           );

//           const transformedData = subItems.map((item) => ({
//             Sr: `${item.tmencod.split('-')[1]}`,
//             Description: item.tmendsc,
//             Permission: (
//               <Select
//                 options={[
//                   { value: 'Y', label: 'Y' },
//                   { value: 'N', label: 'N' },
//                 ]}
//                 defaultValue={{ value: item.tmenprm, label: item.tmenprm }}
//                 onChange={(selectedOption) => handlePermissionChange(item.tmencod, selectedOption)}
//                 styles={customStyles} // Apply the custom styles to the Select component
//                 isSearchable={false} // Hide the text input

//               />
//             ),
//           }));

//           const columns = [
//             {
//               label: 'Sr',
//               field: 'Sr',
//               sort: 'asc',
//             },
//             {
//               label: 'Description',
//               field: 'Description',
//               sort: 'asc',
//             },
//             {
//               label: 'Permission',
//               field: 'Permission',
//               sort: 'asc',
//             },
//             {
//               label: 'Add',
//               field: 'Add',
//               sort: 'asc',
//             },
//             {
//               label: 'View',
//               field: 'View',
//               sort: 'asc',
//             },
//           ];

//           setData({ columns, rows: transformedData });
//         } else {
//           console.log('Main menu item not found.');
//         }
//       })
//       .catch((error) => {
//         console.error('Error:', error.message);
//         throw error; // Rethrow the error to be handled at the component level
//       });
//   }
//   useEffect(() => {
//     if (showAlert) {
//       const timeout = setTimeout(() => {
//         setShowAlert(false);
//       }, 800); // Hide the alert after 3 seconds (adjust the time as needed)
//       return () => clearTimeout(timeout);
//     }
//   }, [showAlert]);
//   function handlePermissionChange(menuCode, selectedOption) {
//     const newPermissionValue = selectedOption.value;
//     setNewPermission(newPermissionValue);
//     Update_Menu({ id, mcode: menuCode, permission: newPermissionValue })
//       .then(() => {
//         setShowAlert(true);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   }
  

//   function Update_Menu(user) {
//     return new Promise((resolve, reject) => {
//       const apiUrl = 'https://www.crystalsolutions.com.pk/csres/update_permission.php';
//       const data = {
//         userid: user.id,
//         mcode: user.mcode,
//         permission: user.permission,
//       };
//       const formData = new URLSearchParams(data).toString();
  
//       axios
//         .post(apiUrl, formData)
//         .then((response) => {
//           // Handle the response, if needed
//           console.log("object is ", response.data);
//           resolve(); // Resolve the promise on success
//         })
//         .catch((error) => {
//           // Handle errors
//           console.error('Error:', error);
//           reject(error); // Reject the promise on error
//         });
//     });
//   }
  


//   return (
//     <div className="col-12" style={{ color: 'black' }}>
//      <div style={{ width: '100%', alignItems: 'center', position: 'relative' }}>
//   {/* The entire content, including the toast, is wrapped inside this parent div */}
//   {showAlert && (
//     <div className="alert alert-warning" role="alert" style={{ width: '400px', textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
//       Update successful!
//     </div>
//   )}

//   <div className="row" style={{ background: 'orange', height: '40px', textAlign: 'center', borderBottom: '3px solid red' }}>
//     <h3>MENU</h3>
//   </div>

//   {/* Rest of your menu content */}
// </div>

//       <br /><br />
    
//       {/* Tabs */}
//       <divs
//         className="row-12"
//         style={{
//           backgroundColor: 'grey',
//           display: 'flex',
//           borderTop: '3px solid red',
//           borderBottom: '3px solid red',
//           borderLeft: '3px solid red',
//           flexDirection: 'row',
//         }}
//       >
//         {["File Maintenance", "Transaction", "Reports", "Utilities"].map((tabLabel, index) => (
//           <div
//             key={index}
//             style={{ background: activeTab === index + 1 ? 'orange' : '', textAlign: 'center' }}
//             className={`tab col-3 ${activeTab === index + 1 ? 'active' : ''}`}
//             onClick={() => handleTabClick(index + 1)}
//           >
//             {tabLabel}
//           </div>
//         ))}
//       </divs>
//   <br />
//       {/* Tab Content */}
//       <div className="tab-content" style={{ marginLeft: "16%", marginRight: "3%" }}>
//   {[1, 2, 3, 4].map((tabNumber) => (
//     activeTab === tabNumber && (
//       <div key={tabNumber} style={{ textAlign: 'center', fontSize: '20px'  }}>
//         {/* Custom Table Component */}
//         <div style={{ height: '400px', overflowY: 'auto', fontSize: '12px', width: '70%', overflowX: 'auto' }}>
//           <table className="table table-striped table-bordered table-sm responsive">
//             <thead>
//               <tr>
//                 {data.columns.map((column, index) => (
//                   <th
//                     key={index}
//                     scope="col"
//                     style={{
//                       backgroundColor: 'orange',
//                       color: 'black',
//                       width: index === 0
//                         ? '5%'
//                         : index === 1
//                         ? '35%'
//                         : index === 2
//                         ? '8%'
//                         : index === 3
//                         ? '10%'
//                         : index === 4
//                         ? '10%'
//                         : 'auto'
//                     }}
//                   >
//                     {column.label}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {data.rows.map((row, rowIndex) => (
//                 <tr key={rowIndex}>
//                   {Object.keys(row).map((key, index) => (
//                     <td key={key} style={{
//                       width: key === 'tusrpwd' ? '50px' : (key === 'your_second_column_key_here' ? '200px' : 'auto'),
//                       textAlign: index === 1 ? 'left' : 'auto',
//                     }}>
//                       {key === 'tusrpwd' ? '*****' : row[key]}
//                     </td>
//                   ))}
//                   <td>
//                     <div>
//                       <Link>
//                         <button
//                           className="btn btn-primary"
//                           style={{
//                             backgroundColor: 'orange',
//                             color: 'black',
//                             border: 'none',
//                             height: '30px',
//                             padding: '5px 10px',
//                             cursor: 'pointer',
//                           }}
//                         >
//                           ADD
//                         </button>
//                       </Link>
//                     </div>
//                   </td>
//                   <td>
//                     <div>
//                       <Link >
//                         <button
//                           className="btn btn-secondary"
//                           style={{
//                             backgroundColor: 'orange',
//                             color: 'black',
//                             border: 'none',
//                             height: '30px',
//                             padding: '5px 10px',
//                             cursor: 'pointer',
//                           }}
//                         >
//                           VIEW
//                         </button>
//                       </Link>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     )
//   ))}
// </div>



  
//       {/* ///////////.............................. TWO BUTTON IS HERE.................................../////////// */}
//       <div className="col-3" style={{ marginLeft: '35%' }}>
//     <div className="row">


//       {/* <div className="col-3">
//         <button
//           onClick={() => {
//             // Update_Menu function will be called here when the "Update" button is clicked
//             handlePermissionChange(data.columns[2].field, { value: newPermission, label: newPermission });
//           }}
//           className="btn btn-primary"
//           style={{ backgroundColor: 'orange', color: 'black', width: '180px' }}
//         >
//           Update
//         </button>
//       </div> */}


//       <div className="col-3" >
//         {/* Button 2 */}
//         <button
//           onClick={() => navigate(-1)}
//           className="btn btn-secondary"
//           style={{ backgroundColor: 'orange', color: 'black', width: '180px' }}
//         >
//           Return
//         </button>
//       </div>
//     </div>
//   </div>

// </div>

//   );
  
// };

// export default MenuUser;










////////////////////////////  when i click Y then Automatically UPDATE /////////////////////////////////



// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom'; // Add 'Link' to the import statement
// import { MDBDataTable } from 'mdbreact';
// import Select from 'react-select';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const MenuUser = () => {
//   const { id } = useParams();
//   const notify = () => toast("Wow so easy!");
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState(1);
//   const [data, setData] = useState({ columns: [], rows: [] });
//   const [newPermission, setNewPermission] = useState('');
//   const [permissionUpdates, setPermissionUpdates] = useState([]);

//   function handleTabClick(tabNumber) {
//     setActiveTab(tabNumber);
//   }
//   const customStyles = {
//     control: (provided, state) => ({
//       ...provided,
//       borderRadius: 0, // Optional: Customize the appearance of the select container
//       boxShadow: state.isFocused ? '0 0 0 2px orange' : 'none', // Optional: Add focus styles
//     }),
//     indicatorSeparator: (provided) => ({
//       ...provided,
//       display: 'none', // Hide the dropdown arrow icon
//     }),
//     dropdownIndicator: (provided) => ({
//       ...provided,
//       display: 'none', // Hide the dropdown arrow icon
//     }),
//   };
//   useEffect(() => {
//     fetchDataForUserId(id); // Change the user ID as needed
//   }, [activeTab, id]);
//   console.log(id);

//   function fetchDataForUserId(userId) {
//     const apiUrl = 'https://www.crystalsolutions.com.pk/csres/get_usrmenu.php';
//     const data = {
//       userid: userId,
//     };
//     const formData = new URLSearchParams(data).toString();

//     return axios
//       .post(apiUrl, formData)
//       .then((response) => response.data)
//       .then((apiData) => {
//         const mainMenuItem = apiData.find((item) => item.tmencod === `${activeTab}-00-00`);
//         if (mainMenuItem) {
//           const subItems = apiData.filter(
//             (subItem) => subItem.tmencod.startsWith(`${activeTab}-`) && subItem.tmencod !== `${activeTab}-00-00`
//           );

//           const transformedData = subItems.map((item) => ({
//             Sr: `${item.tmencod.split('-')[1]}`,
//             Description: item.tmendsc,
//             Permission: (
//               <Select
//                 options={[
//                   { value: 'Y', label: 'Y' },
//                   { value: 'N', label: 'N' },
//                 ]}
//                 defaultValue={{ value: item.tmenprm, label: item.tmenprm }}
//                 onChange={(selectedOption) => handlePermissionChange(item.tmencod, selectedOption)}
//                 styles={customStyles} // Apply the custom styles to the Select component
//                 isSearchable={false} // Hide the text input

//               />
//             ),
//           }));

//           const columns = [
//             {
//               label: 'Sr',
//               field: 'Sr',
//               sort: 'asc',
//             },
//             {
//               label: 'Description',
//               field: 'Description',
//               sort: 'asc',
//             },
//             {
//               label: 'Permission',
//               field: 'Permission',
//               sort: 'asc',
//             },
//             {
//               label: 'Add',
//               field: 'Add',
//               sort: 'asc',
//             },
//             {
//               label: 'View',
//               field: 'View',
//               sort: 'asc',
//             },
//           ];

//           setData({ columns, rows: transformedData });
//         } else {
//           console.log('Main menu item not found.');
//         }
//       })
//       .catch((error) => {
//         console.error('Error:', error.message);
//         throw error; // Rethrow the error to be handled at the component level
//       });
//   }

//   function handlePermissionChange(menuCode, selectedOption) {
//     const newPermissionValue = selectedOption.value;

//     // Collect the permission updates in an array
//     const updatedPermissions = [...permissionUpdates];
//     updatedPermissions.push({ id, mcode: menuCode, permission: newPermissionValue });

//     setNewPermission(newPermissionValue);
//     setPermissionUpdates(updatedPermissions);
//   }
//   function handleUpdatePermissions() {
//     // Loop through the collected permission updates and call the Update_Menu function for each item
//     permissionUpdates.forEach((permissionUpdate) => {
//       Update_Menu(permissionUpdate);
//     });

//     // Show the toast notification after all updates are successful
//     toast.success("Update successful!");
//   }

// function Update_Menu(user) {
//   const apiUrl = 'https://www.crystalsolutions.com.pk/csres/update_permission.php';
//   const data = {
//     userid: user.id,
//     mcode: user.mcode,
//     permission: user.permission,
//   };
//   const formData = new URLSearchParams(data).toString();

//   axios
//     .post(apiUrl, formData)
//     .then((response) => {
//       // Handle the response, if needed
//       console.log("object is ", response.data);
//       // toast.success("Update successful!"); // Show toast notification on success
//     })
//     .catch((error) => {
//       // Handle errors
//       console.error('Error:', error);
//       // toast.error("Update failed. Please try again."); // Show toast notification on error
//     });
// }


//   return (
//     <div className="col-12" style={{ color: 'black' }}>
//       <div className="row" style={{ background: 'orange', height: '40px', textAlign: 'center', borderBottom: '3px solid red' }}>
//         <h3>MENU</h3>
//       </div>
//       <br /><br />
//       <ToastContainer />
//       {/* Tabs */}
//       <div
//         className="row-12"
//         style={{
//           backgroundColor: 'grey',
//           display: 'flex',
//           borderTop: '3px solid red',
//           borderBottom: '3px solid red',
//           borderLeft: '3px solid red',
//           flexDirection: 'row',
//         }}
//       >
//         {["File Maintenance", "Transaction", "Reports", "Utilities"].map((tabLabel, index) => (
//           <div
//             key={index}
//             style={{ background: activeTab === index + 1 ? 'orange' : '', textAlign: 'center' }}
//             className={`tab col-3 ${activeTab === index + 1 ? 'active' : ''}`}
//             onClick={() => handleTabClick(index + 1)}
//           >
//             {tabLabel}
//           </div>
//         ))}
//       </div>
//   <br />
//       {/* Tab Content */}
//       <div className="tab-content" style={{ marginLeft: "60px", marginRight: "60px" }}>
//   {[1, 2, 3, 4].map((tabNumber) => (
//     activeTab === tabNumber && (
//       <div key={tabNumber} style={{ textAlign: 'center', fontSize: '20px', margin: '5px', marginLeft: '40' }}>
//         {/* Custom Table Component */}
//         <div style={{ height: '400px', overflowY: 'auto', fontSize: '12px', width: '100%', overflowX: 'auto' }}>
//           <table className="table table-striped table-bordered table-sm responsive">
//             <thead>
//               <tr>
//                 {data.columns.map((column, index) => (
//                   <th
//                     key={index}
//                     scope="col"
//                     style={{ backgroundColor: 'orange', color: 'black' }} // Apply styles to the header column
//                   >
//                     {column.label}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {data.rows.map((row, rowIndex) => (
//                 <tr key={rowIndex}>
//                   {Object.keys(row).map((key) => (
//                     <td key={key}>{key === 'tusrpwd' ? '*****' : row[key]}</td>
//                   ))}
//                   <td>
//                     <div>
//                       <Link>
//                         <button
//                           className="btn btn-primary"
//                           style={{
//                             backgroundColor: 'orange',
//                             color: 'black',
//                             border: 'none',
//                             height: '30px',
//                             padding: '5px 10px',
//                             cursor: 'pointer',
//                           }}
//                         >
//                           ADD
//                         </button>
//                       </Link>
//                     </div>
//                   </td>
//                   <td>
//                     <div>
//                       <Link>
//                         <button
//                           className="btn btn-secondary"
//                           style={{
//                             backgroundColor: 'orange',
//                             color: 'black',
//                             border: 'none',
//                             height: '30px',
//                             padding: '5px 10px',
//                             cursor: 'pointer',
//                           }}
//                         >
//                           VIEW
//                         </button>
//                       </Link>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     )
//   ))}
// </div>

  
//       {/* ///////////.............................. TWO BUTTON IS HERE.................................../////////// */}
//       <div className="col-3" style={{ marginLeft: '35%' }}>
//     <div className="row">
//       <div className="col-3">
//         {/* Button 1 */}
//         <button
//         onClick={handleUpdatePermissions}
//         className="btn btn-primary"
//         style={{ backgroundColor: 'orange', color: 'black', width: '180px' }}
//       >
//         Update
//       </button>
//       </div>

//       <div className="col-3" style={{ marginLeft: '45%' }}>
//         {/* Button 2 */}
//         <button
//           onClick={() => navigate(-1)}
//           className="btn btn-secondary"
//           style={{ backgroundColor: 'orange', color: 'black', width: '180px' }}
//         >
//           Return
//         </button>
//       </div>
//     </div>
//   </div>

// </div>

//   );
  
// };

// export default MenuUser;







////////////////////////////  Add check box here  /////////////////////////////////

import '../MenuUser/MenuUser.css'
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import Select from 'react-select';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTheme } from '../../../../ThemeContext';
const MenuUser = () => {
  const { primaryColor } = useTheme();

  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const [data, setData] = useState({ columns: [], rows: [] });
  const [newPermission, setNewPermission] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [allPermissionsY, setAllPermissionsY] = useState(false);
  const { secondaryColor } = useTheme();

  function handleTabClick(tabNumber) {
    setActiveTab(tabNumber);
  }

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: 0,
      boxShadow: state.isFocused ? '0 0 0 2px orange' : 'none',
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      display: 'none',
    }),
  };

  useEffect(() => {
    fetchDataForUserId(id);
  }, [activeTab, id, allPermissionsY]);

  function fetchDataForUserId(userId) {
    const apiUrl = 'https://www.crystalsolutions.com.pk/malikspicy/get_usrmenu.php';
    const data = {
      userid: userId,
    };
    const formData = new URLSearchParams(data).toString();

    return axios
      .post(apiUrl, formData)
      .then((response) => response.data)
      .then((apiData) => {
        const mainMenuItem = apiData.find((item) => item.tmencod === `${activeTab}-00-00`);
        if (mainMenuItem) {
          const subItems = apiData.filter((subItem) => {
            if (activeTab !== undefined && subItem.tmencod) {
              return subItem.tmencod.startsWith(`${activeTab}-`) && subItem.tmencod !== `${activeTab}-00-00`;
            }
            return false; // Return false if activeTab is undefined or subItem.tmencod is falsy
          });
          

          const transformedData = subItems.map((item) => ({
            Sr: `${item.tmencod.split('-')[1]}`,
            Description: item.tmendsc,
            Permission: (
              <Select
                options={[
                  { value: 'Y', label: 'Y' },
                  { value: 'N', label: 'N' }, 
                ]}
                defaultValue={{ value: item.tmenprm, label: item.tmenprm }}
                onChange={(selectedOption) => handlePermissionChange(item.tmencod, selectedOption)}
                styles={customStyles}
                isSearchable={false}
              />
            ),
          }));

          const columns = [
            {
              label: 'Sr',
              field: 'Sr',
              sort: 'asc',
            },
            {
              label: 'Description',
              field: 'Description',
              sort: 'asc',
            },
            {
              label: 'Permission',
              field: 'Permission',
              sort: 'asc',
            },
            {
              label: 'Add',
              field: 'Add',
              sort: 'asc',
            },
            {
              label: 'View',
              field: 'View',
              sort: 'asc',
            },
          ];

          setData({ columns, rows: transformedData });
        } else {
          console.log('Main menu item not found.');
        }
      })
      .catch((error) => {
        console.error('Error:', error.message);
        throw error;
      });
  }

  useEffect(() => {
    if (showAlert) {
      const timeout = setTimeout(() => {
        setShowAlert(false);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [showAlert]);

  function handlePermissionChange(menuCode, selectedOption) {
    const newPermissionValue = selectedOption.value;
    setNewPermission(newPermissionValue);
    Update_Menu({ id, mcode: menuCode, permission: newPermissionValue })
      .then(() => {
        setShowAlert(true);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function Update_Menu(user) {
    return new Promise((resolve, reject) => {
      const apiUrl = 'https://www.crystalsolutions.com.pk/malikspicy/update_permission.php';
      const data = {
        userid: user.id,
        mcode: user.mcode,
        permission: user.permission,
      };
      const formData = new URLSearchParams(data).toString();

      axios
        .post(apiUrl, formData)
        .then((response) => {
          console.log("object is ", response.data);
          resolve();
        })
        .catch((error) => {
          console.error('Error:', error);
          reject(error);
        });
    });
  }

  function handleAllPermissionsToggle() {
    setAllPermissionsY(!allPermissionsY);

    // Iterate through the current rows and update their permissions to 'Y' or 'N'
    const updatedRows = data.rows.map((row) => ({
      ...row,
      Permission: allPermissionsY ? 'Y' : 'N',
    }));

    setData((prevData) => ({
      ...prevData,
      rows: updatedRows,
    }));

    // Update the server with the new permissions
    data.rows.forEach((row) => {
      const menuCode = `${activeTab}-${row.Sr.toString().padStart(2, '0')}-00`;
      Update_Menu({ id, mcode: menuCode, permission: allPermissionsY ? 'Y' : 'N' });
    });
  }

  return (
    <div className="col-12" style={{ color: 'black' }}>
      <div style={{ width: '100%', alignItems: 'center', position: 'relative' }}>
        {showAlert && (
          <div
            className="alert alert-warning"
            role="alert"
            style={{
              width: '400px',
              textAlign: 'center',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
            }}
          >
            Update successful!
          </div>
        )}

        <div
          className="row"
          style={{ background: primaryColor, height: '40px', textAlign: 'center', borderBottom: '3px solid red' }}
        >
          <h3>MENU</h3>
        </div>
      </div>

    


      <br />
      <div className="row-12" style={{
        backgroundColor: 'grey',
        display: 'flex',
        borderTop: '3px solid red',
        borderBottom: '3px solid red',
        borderLeft: '3px solid red',
        flexDirection: 'row',
      }}>
        {["File Maintenance", "Transaction", "Reports", "Utilities"].map((tabLabel, index) => (
          <div
            key={index}
            style={{ background: activeTab === index + 1 ? primaryColor : '', textAlign: 'center' }}
            className={`tab col-3 ${activeTab === index + 1 ? 'active' : ''}`}
            onClick={() => handleTabClick(index + 1)}
          >
            {tabLabel}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <label>
          <input
            type="checkbox"
            checked={allPermissionsY}
            onChange={handleAllPermissionsToggle}
          />
           All Permissions
        </label>
      </div>
      <br />
      <div className="tab-content" style={{ marginLeft: "16%", marginRight: "3%" }}>
        {[1, 2, 3, 4].map((tabNumber) => (
          activeTab === tabNumber && (
            <div key={tabNumber} style={{ textAlign: 'center', fontSize: '20px' }}>
              <div style={{ height: '400px', overflowY: 'auto', fontSize: '12px', width: '70%', overflowX: 'auto' }}>
                <table className="table table-striped table-bordered table-sm responsive">
                  <thead>
                    <tr>
                      {data.columns.map((column, index) => (
                        <th
                          key={index}
                          scope="col"
                          style={{
                            backgroundColor: primaryColor,
                            color:secondaryColor,
                            width: index === 0
                              ? '5%'
                              : index === 1
                              ? '35%'
                              : index === 2
                              ? '8%'
                              : index === 3
                              ? '10%'
                              : index === 4
                              ? '10%'
                              : 'auto',
                          }}
                        >
                          {column.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {Object.keys(row).map((key, index) => (
                          <td key={key} style={{
                            width: key === 'tusrpwd' ? '50px' : (key === 'your_second_column_key_here' ? '200px' : 'auto'),
                            textAlign: index === 1 ? 'left' : 'auto',
                          }}>
                            {key === 'tusrpwd' ? '*****' : row[key]}
                          </td>
                        ))}
                        <td>
                          <div>
                            <Link>
                              <button
                                className="btn btn-primary"
                                style={{
                                  backgroundColor: primaryColor,
                                  color: secondaryColor,
                                  border: 'none',
                                  height: '30px',
                                  padding: '5px 10px',
                                  cursor: 'pointer',
                                }}
                              >
                                ADD
                              </button>
                            </Link>
                          </div>
                        </td>
                        <td>
                          <div>
                            <Link>
                              <button
                                className="btn btn-secondary"
                                style={{
                                  backgroundColor: primaryColor,
                                  color: secondaryColor,
                                  border: 'none',
                                  height: '30px',
                                  padding: '5px 10px',
                                  cursor: 'pointer',
                                }}
                              >
                                VIEW
                              </button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        ))}
      </div>

      <div className="col-3" style={{ marginLeft: '35%' }}>
        <div className="row">
         
          <div className="col-3">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-secondary"
              style={{ backgroundColor: primaryColor, color: secondaryColor, width: '180px' }}
            >
              Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuUser;

