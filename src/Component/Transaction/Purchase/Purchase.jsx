// import React, { useState, useEffect } from "react";
// import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
// import axios from "axios";
// import { useTheme } from "../../../ThemeContext";
// import { Link, useNavigate } from "react-router-dom";
// import Alert from "@mui/material/Alert";
// import PathHead from "../../MainComponent/PathHead/PathHead";
// import Header from "../../MainComponent/Header/Header";
// import Footer from "../../MainComponent/Footer/Footer";
// import {
//     Card,
//     Row,
//     Col,
//     Button,
//     FormControl,
//     InputGroup,
//     Form,
//   } from "react-bootstrap";
// function Purchase() {
//     const [values, setValues] = useState({
//         itmIdd: "",
//         itemCodd: "", // Initialize itemCodd here or set it to a default value
//         itemDscc: "",
//         itemRmkss: "",
//         typee: "",
//         pic: "",
//         loading: false,
//       });
      
      
      
//   const navigate = useNavigate();
//   const [selectedStatus, setSelectedStatus] = useState("Yes");
//   const [selectedStatus1, setSelectedStatus1] = useState("");
//   const [selectedCategoryId, setSelectedCategoryId] = useState("Startup");
//   const [alertData, setAlertData] = useState(null);
//   const { secondaryColor ,apiLinks } = useTheme();

//   const [selectedType, setSelectedType] = useState("Item Purchase");
//   const [selectedUnit, setSelectedUnit] = useState("Quantity");

//   const [data, setData] = useState([]);

//   const [alert, setAlert] = useState(null);
//   const [selectedImage1, setSelectedImage1] = useState(null);
//   const { primaryColor } = useTheme();


//   const handleImageChange1 = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedImage1(file);
//       const imgElement = document.getElementById("pic-preview");
//       imgElement.src = URL.createObjectURL(file);
//     }
//   };
//   {/* ////////////////////////  DUE TO GET DATA OF CATEGORY ////////////////////////// */}

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${apiLinks}/get_category.php`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
  
//         const apiData = await response.json();
//         setData(apiData);
  
//         // Set the selectedCategoryId with the first category ID from the API data
//         if (apiData.length > 0) {
//           setSelectedCategoryId(apiData[0].tctgid);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };
  
//     fetchData();
//   }, []);
//   const UserId = 33;

 

//   {/* ////////////////////////  CALL API TO POST DATA ////////////////////////// */}
//   const responseData = {
//     detail1: [],
//     detail2: [],
//   };
//   const handleInputChange2 = (e) => {
//     setValues({ ...values, [e.target.name]: e.target.value });
//   };
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
    
//     const value = {
//       itemStss: selectedStatus,
//       categoryIdd: selectedStatus1,
//       typee: selectedType,
//       uomm:selectedUnit
//     };
//     setValues((prevState) => ({
//       ...prevState,
//       loading: true,
//     }));

//     try {
//       const formData = new FormData();
//       formData.append("itmId", nextItemId);  
//       formData.append("itemDsc", values.itemDscc);
//       formData.append("itemDscUrd", values.itemDscUrdd);
//       formData.append("itemSts", value.itemStss);
//       formData.append("purRate", values.purRatee);
//       formData.append("saleRate", values.saleRatee);
//       formData.append("discont", values.discontt);
//       formData.append("categoryId", selectedCategoryId); // Use selectedCategoryId here
//       formData.append("type", value.typee);
//       formData.append("uom", value.uomm);
//       formData.append("pic", selectedImage1); 

//       // formData.append('FUsrId', UserId);
//       const response = await axios.post(
//         `${apiLinks}/add_item.php`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data",
//           // 'Content-Type': 'application/json;charset=UTF-8', 
//         },
//         }
//       )

// // Your code for creating responseData.detail2
// responseData.detail2 = tableData.map((item) => ({
//     item_id: item.name,
//     description: item.Desctiption,
//     quantity: item.quantity,
//     purchase_rate: item.Purchase,
//     amount: item.Amount,
//     unit: item.Unit,
//   }));
  
//   // Your code for pushing data into responseData.detail1
//   responseData.detail1.push({
//     purchaseid: nextItemId,
//     codeid: values.itemCodd,
//     codedescription: values.itemDscc,
//     remarks: values.itemRmkss,
//     // Add other properties as needed
//   });
  
//   // Accessing responseData.detail2
//   console.log('JSON variable is:', responseData);
  
//   // You can access responseData.detail2 like this
//   const detail2Data = responseData.detail2;
  
//   // You can now use detail2Data as needed
//   console.log('Detail 2 data:', detail2Data)
  
//       .then((response) => {
//         if (response.data.error === 200) {
         

//           setAlertData({
//             type: "success",
//             message: `${response.data.message}`,
//           });
//           setTimeout(() => {
//             setAlertData(null);
//           }, 1000);
          
//         }
//          else {
//           console.log(response.data.message);

//           setAlertData({
//             type: "error",
//             message: `${response.data.message}`,
//           });
//           setTimeout(() => {
//             setAlertData(null);
//           }, 2000);
//         }
//         // navigate("/Item");

//       })
//       .catch((error) => {
//         // Handle errors
//         console.error("Error:", error);
//       });

//       console.log(response.data); 
//       // Reset form values after submission
//       setValues({
//         itmIdd: "",
//         itemCodd: "", // Initialize itemCodd here or set it to a default value
//         itemDscc: "",
//         itemRmkss: "",
//         loading: true,
//       });
//       setSelectedStatus("Yes"); // Set the initial value for selectedStatus
//       setSelectedStatus1(""); // Set the initial value for selectedStatus1
//       setSelectedCategoryId(data.length > 0 ? data[0].tctgid : "Startup"); // Set the initial value for selectedCategoryId
//       setSelectedType("Item Purchase"); // Set the initial value for selectedType
//       setSelectedUnit("Quantity");
//       setSelectedImage1(null); // Clear the selected image
  
//       setAlert("Image uploaded successfully.");
     
//       window.location.reload();

//     } catch (error) {
//       console.error("Error uploading image:", error);
//       setAlert("Error uploading image.");
//     } finally {
//       setValues((prevState) => ({
//         ...prevState,
//         loading: false,
//       }));
//     }
//   };
//   ////////////////////////get item id show them in inout field//////////////////////////
//   const [item, setItem] = useState([]);
//   const [nextItemId, setNextItemId] = useState(1); // Initialize the next TItmId

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${apiLinks}/get_item.php`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }

//         const apiData = await response.json();
//         setItem(apiData);

//         // Find the maximum TItmId in the existing data
//         const maxItemId = Math.max(...apiData.map((item) => parseInt(item.TItmId)));
//         // Set the nextItemId to be one greater than the maximum TItmId
//         setNextItemId(maxItemId + 1);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

  





//   const [tableData, setTableData] = useState([
//     { name: '', quantity: '', Purchase: '', Amount: '' },
//   ]);
  
//   const handleInputChange = (event, index) => {
//     const { name, value } = event.target;
//     const newData = [...tableData];
//     newData[index][name] = value;
  
//     // Calculate the "amount" based on "quantity" and "purchase"
//     if (name === "quantity" || name === "purchase") {
//       const quantity = parseFloat(newData[index].quantity || 0);
//       const purchase = parseFloat(newData[index].purchase || 0);
//       newData[index].amount = (quantity * purchase).toFixed(2);
//     }
  
//     setTableData(newData);
//   };
// // const handleInputChange = (event, index) => {
// //         const { name, value } = event.target;
// //         const newData = [...tableData];
// //         newData[index][name] = value;
    
// //         // Calculate the "amount" based on "quantity" and "purchase"
// //         if (name === "quantity" || name === "purchase") {
// //           const quantity = parseFloat(newData[index].quantity || 0);
// //           const purchase = parseFloat(newData[index].purchase || 0);
// //           newData[index].amount = (quantity * purchase).toFixed(2);
// //         }
    
// //         setTableData(newData);
// //       };
//   const calculateAmount = (quantity, Purchase) => {
//     const parsedQuantity = parseFloat(quantity) || 0;
//     const parsedPurchase = parseFloat(Purchase) || 0;
//     return (parsedQuantity * parsedPurchase).toFixed(2);
//   };
  

//   const handleAddRow = () => {
//     setTableData([...tableData, { name: '', quantity: '', price: '' }]);
//   };

//   const handleRemoveRow = (index) => {
//     const newData = [...tableData];
//     newData.splice(index, 1);
//     setTableData(newData);
//   };
//   const [itemdata, setitemdata] = useState([]);

//   const columns = [
//     { label: "Item ID", field: "TItmId" },
//     { label: "Description", field: "TItmDsc" },
//     { label: "Unit", field: "uom" },
//     { label: "Purchase", field: "TPurRat" },

//   ];
//   const [searchText, setSearchText] = useState("");

//   useEffect(() => {
//     fetch(`${apiLinks}/get_item.php`)
//       .then((response) => response.json())
//       .then((apiData) => {
//         const transformedData = apiData.map((item) => ({
//           TItmId: item.TItmId,
//           TItmDsc: item.TItmDsc,
//           uom:item.uom,
//           TPurRat:item.TPurRat,
//         }));

//         setitemdata(transformedData);

//         console.log(apiData); // Log the fetched data
//       })
//       .catch((error) => console.error(error));
//   }, []);
  

//   const handleSearchChange = (event) => {
//     setSearchText(event.target.value);
//   };
//   const [selectedItemData, setSelectedItemData] = useState({ TItmId: "", TItmDsc: "",TPurRat:'',uom:'' });


//   const handleRowClick = (rowData) => {
//     setSelectedItemData(rowData);
//   };
// // Add the following state variables at the beginning of your component
// const [selectedItemIndex, setSelectedItemIndex] = useState(0);

// // Modify the handleInputChange1 function to handle item selection and update the first row
// const handleInputChange1 = (event, rowIndex) => {
//   const { name, value } = event.target;
//   const updatedTableData = [...tableData];

//   if (name === "name") {
//     // Handle item selection
//     setSelectedItemIndex(rowIndex);
//     const selectedItem = itemdata.find((item) => item.TItmId === value);

//     if (selectedItem) {
//   updatedTableData[0] = {
//     ...updatedTableData[0],
//     name: selectedItem.TItmId,
//     Desctiption: selectedItem.TItmDsc,
//     Unit: selectedItem.uom,
//     Purchase: selectedItem.TPurRat,
//     Amount: calculateAmount(updatedTableData[0].quantity, selectedItem.TPurRat),
//   };
// }

//   } else {
//     // Handle other input changes in the selected row
//     updatedTableData[rowIndex] = {
//       ...updatedTableData[rowIndex],
//       [name]: value,
//     };

//     // Calculate the "Amount" based on "Purchase" and "Quantity"
//     if (name === "quantity" || name === "Purchase") {
//       const quantity = parseFloat(updatedTableData[rowIndex].quantity || 0);
//       const Purchase = parseFloat(updatedTableData[rowIndex].Purchase || 0);
//       updatedTableData[rowIndex].Amount = (quantity * Purchase).toFixed(2);
//     }
//   }

//   setTableData(updatedTableData);
// };
  
  
  
  
//    // Add event listeners to the input fields of the last row
//     // Add event listeners to the input fields of the last row
//      // Add event listeners to the input fields of the last row
//       // Add event listeners to the input fields of the last row
//        // Add event listeners to the input fields of the last row
//          const addNewRow = () => {
//     setTableData([...tableData, { name: '', quantity: '', Purchase: '', Amount: '' }]);
//   };

//    useEffect(() => {
//     const lastRowInputs = document.querySelectorAll(
//       'tr:last-child input[type="number"]'
//     );

//     const handleInputChangeLastRow = (event) => {
//       const { name, value } = event.target;
//       // Check if all fields in the last row are filled
//       const isRowFilled =
//         lastRowInputs.length === 3 &&
//         lastRowInputs[0].value.trim() !== '' &&
//         lastRowInputs[1].value.trim() !== '' &&
//         lastRowInputs[2].value.trim() !== '';

//       if (isRowFilled) {
//         // Add a new row when the last row is filled
//         addNewRow();
//       }
//     };

//     lastRowInputs.forEach((input) => {
//       input.addEventListener('input', handleInputChangeLastRow);
//     });

//     return () => {
//       // Remove event listeners when the component unmounts
//       lastRowInputs.forEach((input) => {
//         input.removeEventListener('input', handleInputChangeLastRow);
//       });
//     };
//   }, [tableData]);
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
//         <Header />
        
//         <PathHead pageName="Transaction > Purchase " />
//       <div className="col-12" >
        

//         <div
//           className="row"
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             padding: "1%",
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
//               padding: "1%",
//               width: "100%",
//               maxWidth: "74%",
//               margin: "2% 0",
              
//             }}
//           >
//             <form
//               onSubmit={handleFormSubmit}
//               style={{ textAlign: "right" ,fontSize:'12px',fontWeight:'bold',marginLeft:'1%'}}
//             >
//               <div className="form-group" >


//                <div className="row">


//                 <div className="col-6">
                  
//                 <div>
//       <div className="row">
//         <div className="col-md-4">
//           <label htmlFor="code">Purchase# :</label>
//         </div>
//         <div className="col-md-8">
//           <input
//             type="text"
//             id="code"
//             placeholder=" Id"
//             name="itmIdd"
//             className="form-control"
//             value={ nextItemId} // Display the nextItemId
//             style={{ height: '20px', width: '60px', marginLeft: '-3%', textAlign: 'right' }}
//             readOnly // Make the input read-only to prevent user edits
//           />
//         </div>
//       </div>
//       {/* <button onClick={handleAddData}>Add Data</button> */}
//       {/* Render the existing data */}
      
//     </div>
//                 <div className="row">
//                   <div className="col-md-4" >
//                     <label htmlFor="code">Code :</label>
//                   </div>
//                   <div className="col-md-4">
//                     <input
//                       type="text"
//                       id="code"
//                       placeholder="Cash / Supplier"
//                       name="itemCodd"
//                       className="form-control"
//                       value={values.itemCodd}

//                       style={{height:'20px', width:'170px' ,marginLeft: "-7%"}}
//                       onChange={handleInputChange2}
//                     />
//                   </div>
//                   <div className="col-md-4">
//                     <input
//                       type="text"
//                       id="code"
//                       placeholder="Code Description"
//                       name="itemDscc"
//                       className="form-control"
//                       value={values.itemDscc}
//                       style={{height:'20px', width:'170px' ,marginLeft: "2%"}}
//                       onChange={handleInputChange2}
//                     />
//                   </div>
//                 </div>

                
               
                


//                 <div className="row">
//                   <div className="col-md-4" >
//                     <label htmlFor="code" >Remarks :</label>
//                   </div>
//                   <div className="col-md-8">
//                     <input
//                       type="text"
//                       id="code"
//                       placeholder="Remarks  "
//                       name="itemRmkss"
//                       className="form-control"
//                       value={values.itemRmkss }
//                       style={{height:'20px', width:'200px' ,fontSize:'12px',marginLeft: "-3%"}}
//                       onChange={handleInputChange2}
//                     />
//                   </div>

                  
//                 </div>
             
//              <br />
            
//                 <div  style={{marginLeft:'40%',width:'600px',height:'200px',fontSize:'11px'}}>
//                 <MDBTable responsive striped bordered hover>
//   <MDBTableHead>
//     <tr >
//       <th style={{backgroundColor: primaryColor,color:secondaryColor, fontWeight: "bold",position: "sticky",
//               top: -1,
//               zIndex: 1 }}>Sr.</th>
//       <th style={{backgroundColor: primaryColor,color:secondaryColor, fontWeight: "bold",position: "sticky",
//               top: -1,
//               zIndex: 1 }}>ID</th>
//       <th style={{backgroundColor: primaryColor,color:secondaryColor, fontWeight: "bold",position: "sticky",
//               top: -1,
//               zIndex: 1 }}>Description</th>
//       <th style={{backgroundColor: primaryColor,color:secondaryColor, fontWeight: "bold",position: "sticky",
//               top: -1,
//               zIndex: 1 }}>Unit</th>
//       <th style={{backgroundColor: primaryColor,color:secondaryColor, fontWeight: "bold",position: "sticky",
//               top: -1,
//               zIndex: 1 }}>Quantity</th>
//       <th style={{backgroundColor: primaryColor,color:secondaryColor, fontWeight: "bold",position: "sticky",
//               top: -1,
//               zIndex: 1 }}>Purchase</th>
//       <th style={{backgroundColor: primaryColor,color:secondaryColor, fontWeight: "bold",position: "sticky",
//               top: -1,
//               zIndex: 1 }}>Amount</th>
//     </tr>
//   </MDBTableHead>
//   <MDBTableBody>
//   {tableData.map((rowData, index) => (
//     <tr key={index}>
//       <td style={{ border: "1px solid #000", padding: "8px", textAlign: "center" }}>{index + 1}</td>
//       <td style={{ border: "1px solid #000", padding: "8px", textAlign: "center" }}>
//         <input
//           type="text"
//           name="name"
//           placeholder="ID"
//           value={selectedItemData.TItmId}
//           onChange={(e) => handleInputChange1(e, index)}
//           style={{
//             width: "100%",
//             border: "none",
//             backgroundColor: "transparent",
//             textAlign: "center",
//           }}
//         />
//       </td>
//       <td style={{ border: "1px solid #000", padding: "8px", textAlign: "center" }}>
//         <input
//           type="text"
//           name="Desctiption"
//           placeholder="Description"
//           value={selectedItemData.TItmDsc}
//           onChange={(e) => handleInputChange1(e, index)}
//           style={{
//             width: "100%",
//             border: "none",
//             backgroundColor: "transparent",
//             textAlign: "center",
//           }}
//         />
//       </td>
//       <td style={{ border: "1px solid #000", padding: "8px", textAlign: "center" }}>
//         <input
//           type="text"
//           name="Unit"
//           placeholder="Unit"
//           value={selectedItemData.uom}
//           onChange={(e) => handleInputChange1(e, index)}
//           style={{ width: "100%", border: "none", backgroundColor: "transparent", textAlign: "center" }}
//         />
//       </td>
//       <td style={{ border: "1px solid #000", padding: "8px", textAlign: "center", background: "#f5f5f5" }}>
//         <input
//           type="number"
//           name="quantity"
//           placeholder="Quantity"
//           value={rowData.quantity}
//           onChange={(e) => handleInputChange(e, index)}
//           style={{ width: "100%", border: "none", backgroundColor: "transparent", textAlign: "center" }}
//         />
//       </td>
//       <td style={{ border: "1px solid #000", padding: "8px", textAlign: "center", background: "#f5f5f5" }}>
//         <input
//           type="number"
//           name="Purchase"
//           placeholder="Purchase"
//           value={selectedItemData.TPurRat}
//           onChange={(e) => handleInputChange1(e, index)}
//           style={{ width: "100%", border: "none", backgroundColor: "transparent", textAlign: "center" }}
//         />
//       </td>
//       <td style={{ border: "1px solid #000", padding: "8px", textAlign: "center", background: "#f5f5f5" }}>
//   <input
//     type="number"
//     name="Amount"
//     placeholder="Amount"
//     value={calculateAmount(rowData.quantity, selectedItemData.TPurRat)}
//     onChange={(e) => handleInputChange(e, index)}
//     style={{ width: "100%", border: "none", backgroundColor: "transparent", textAlign: "center" }}
//   />
// </td>

//     </tr>
//   ))}
// </MDBTableBody>

// </MDBTable>


                    
//                   </div>
                


//                 </div>

//                </div>

//                  <div className="row">
//                  <div className="col-6" style={{width:'50%'}}>
//                <Row>
            
//             <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 7, offset: 5 }}>
//               <Form.Control
//                 type="text"
//                 placeholder="Search..."
//                 value={searchText}
//                 onChange={handleSearchChange}
//               />
//             </Col>
//           </Row>
//           <MDBTable
//   scrollY
//   maxHeight="7rem"
//   striped
//   bordered
//   small
//   responsive
// >
//   <MDBTableHead>
//     <tr>
//       {columns.map((column, index) => (
//         <th
//           style={{
//             backgroundColor: primaryColor,
//             color: secondaryColor,
//             fontWeight: "bold",
//             position: "sticky",
//             top: -1,
//             zIndex: 1,
//           }}
//           key={index}
//         >
//           {column.label}
//         </th>
//       ))}
//     </tr>
//   </MDBTableHead>
//   <MDBTableBody>
//         {itemdata
//           .filter((row) =>
//             columns.some((column) =>
//               row[column.field]
//                 .toLowerCase()
//                 .includes(searchText.toLowerCase())
//             )
//           )
//           .map((row, rowIndex) => (
//             <tr
//               key={rowIndex}
//               onClick={() => handleRowClick(row)} // Handle click on row
//               style={{ cursor: "pointer" }}
//             >
//               {columns.map((column, colIndex) => (
//                 <td key={colIndex}>{row[column.field]}</td>
//               ))}
//             </tr>
//           ))}
//       </MDBTableBody>
// </MDBTable>

//                 </div>


//                 <div className="col-6" >
//                     <br /><br /><br />
//                     <br /><br /><br />
//                   <button
//                     className="btn btn-primary"
//                     style={{
//                       backgroundColor: primaryColor,
//                       height: "24%",
//                       fontSize: "11px",
//                       color: secondaryColor,
//                       width: "35%",
//                       marginRight:'1%'
//                     }}
//                     onClick={handleFormSubmit}
//                   >
//                     SUBMIT
//                   </button>
//                   <button
//                     className="btn btn-primary"
//                     onClick={() => navigate("/MainPage")}
//                     style={{
//                       backgroundColor: primaryColor,
//                       height: "24%",
//                       fontSize: "11px",
//                       color: secondaryColor,
//                       width: "35%",
//                     }}
//                   >
//                     RETURN
//                   </button>
//                 </div>
//             </div>
              
// {/* ////////////////////////////////  BUTTON ////////////////////////// */}
// <br />
                
//               </div>
//             </form>
//           </div>
//         </div>
//         <br />
//       </div>
//       </div>
//       <Footer/>
//     </>
//   );
// }

// export default Purchase;



// import React, { useState, useEffect ,useRef } from "react";
// import { MDBTable, MDBTableBody, MDBTableHead,MDBTableFoot } from "mdbreact";
// import axios from "axios";
// import { useTheme } from "../../../ThemeContext";
// import { Link, useNavigate } from "react-router-dom";
// import Alert from "@mui/material/Alert";
// import PathHead from "../../MainComponent/PathHead/PathHead";
// import Header from "../../MainComponent/Header/Header";
// import Footer from "../../MainComponent/Footer/Footer";
// import {
//     Card,
//     Row,
//     Col,
//     Button,
//     FormControl,
//     InputGroup,
//     Form,
//   } from "react-bootstrap";


//   function Purchase() {
//     const [values, setValues] = useState({
//         itmIdd: "",
//         itemCodd: "", // Initialize itemCodd here or set it to a default value
//         itemDscc: "",
//         itemRmkss: "",
//         typee: "",
//         pic: "",
//         loading: false,
//       });
      
      
//       const lastInputRef = useRef(null);

//   const navigate = useNavigate();
//   const [selectedStatus, setSelectedStatus] = useState("Yes");
//   const [selectedStatus1, setSelectedStatus1] = useState("");
//   const [selectedCategoryId, setSelectedCategoryId] = useState("Startup");
//   const [alertData, setAlertData] = useState(null);
//   const { secondaryColor ,apiLinks } = useTheme();

//   const [selectedType, setSelectedType] = useState("Item Purchase");
//   const [selectedUnit, setSelectedUnit] = useState("Quantity");

//   const [data, setData] = useState([]);

//   const [alert, setAlert] = useState(null);
//   const [selectedImage1, setSelectedImage1] = useState(null);
//   const { primaryColor } = useTheme();
//   const [totalQuantity, setTotalQuantity] = useState(0);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [getPurchase, setPurchase] = useState();

  

//   const handleEnterKeyPress = (event, currentIndex) => {
//     if (event.key === "Enter") {
//       // Check if Enter is pressed in the last input field
//       if (currentIndex === tableData.length - 1) {
//         addNewRow(); // Add a new row
//         // Set focus on the first input field of the new row
//         if (lastInputRef.current) {
//           lastInputRef.current.focus();
//         }
//       }
//     }
//   };
  
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${apiLinks}/get_category.php`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
  
//         const apiData = await response.json();
//         setData(apiData);
  
//         // Set the selectedCategoryId with the first category ID from the API data
//         if (apiData.length > 0) {
//           setSelectedCategoryId(apiData[0].tctgid);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };
  
//     fetchData();
//   }, []);
//   const UserId = 33;



  
//   {/* ////////////////////////  CALL API TO POST DATA ////////////////////////// */}
//   const responseData = {
//     // detail1: [],
//     detail1: [],
//   };
//   const handleInputChange2 = (e) => {
//     setValues({ ...values, [e.target.name]: e.target.value });
//   };
  
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
    
//     const value = {
//       itemStss: selectedStatus,
//       categoryIdd: selectedStatus1,
//       typee: selectedType,
//       uomm:selectedUnit
//     };
//     setValues((prevState) => ({
//       ...prevState,
//       loading: true,
//     }));

//     try {
      
//       const response = await axios.post(
//         `${apiLinks}/Purchase.php`,
//         JSON.stringify(getPurchase), // Serialize the JSON object to a string
//         {
//           headers: { "Content-Type": "application/json" }, // Set the content type to JSON
//         }
//       );
// console.log(response);

// responseData.purchaseid       = nextItemId;
// responseData.codeid           = values.itemCodd;
// responseData.codedescription  = values.itemDscc;
// responseData.remarks          = values.itemRmkss;
// responseData.totalAmount      = totalAmount;
// responseData.totalQuantity    = totalQuantity;

//   responseData.detail1 = tableData.map((item) => ({
//     item_id      : item.name,
//     description  : item.Desctiption,
//     quantity     : item.quantity,
//     purchase_rate: item.Purchase,
//     amount       : item.Amount,
//     unit         : item.Unit,
//   }));
//   // Accessing responseData.detail2
//   console.log('JSON variable is:', responseData);
//   setPurchase(responseData)
//   // You can access responseData.detail2 like this
//   const detail2Data = responseData.detail1;
  
//   // You can now use detail2Data as needed
//   console.log('Detail 2 data:', detail2Data)
  
//   .then((response) => {
//     if (response.data.error === 200) {
//       // navigate("/Purchase");
//       console.log(response.data.message);
//       setAlertData({
//         type: "success",
//         message: `${response.data.message}`,
//       });
//       setTimeout(() => {
//         setAlertData(null);
//         window.location.reload();

//       }, 1000);
      
//     }
//      else {
//       console.log(response.data.message);

//       setAlertData({
//         type: "error",
//         message: `${response.data.message}`,
//       });
//       setTimeout(() => {
//         setAlertData(null);
//       }, 2000);
//     }

//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

//       console.log('showing is response data :',response.data); 
//       console.log('showing is response med :',response.data.message); 
//       // Reset form values after submission
//       setValues({
//         itmIdd: "",
//         itemCodd: "", // Initialize itemCodd here or set it to a default value
//         itemDscc: "",
//         itemRmkss: "",
//         loading: true,
//       });
//       setSelectedStatus("Yes"); // Set the initial value for selectedStatus
//       setSelectedStatus1(""); // Set the initial value for selectedStatus1
//       setSelectedCategoryId(data.length > 0 ? data[0].tctgid : "Startup"); // Set the initial value for selectedCategoryId
//       setSelectedType("Item Purchase"); // Set the initial value for selectedType
//       setSelectedUnit("Quantity");
//       setSelectedImage1(null); // Clear the selected image
  
//       setAlert("Image uploaded successfully.");
     
//       window.location.reload();

//     } catch (error) {
//       console.error("Error uploading image:", error);
//       setAlert("Error uploading image.");
//     } finally {
//       setValues((prevState) => ({
//         ...prevState,
//         loading: false,
//       }));
//     }
//   };





//   // const calculateTotals = () => {
//   //   let quantityTotal = 0;
//   //   let amountTotal = 0;
//   //   tableData.forEach((rowData) => {
//   //     const quantity = parseFloat(rowData.quantity || 0);
//   //     const purchase = parseFloat(rowData.Purchase || 0);
//   //     quantityTotal += quantity;
//   //     amountTotal += quantity * purchase;
//   //   });
//   //   setTotalQuantity(quantityTotal);
//   //   setTotalAmount(amountTotal.toFixed(2));
//   // };
//   const calculateTotals = () => {
//     let quantityTotal = 0;
//     let amountTotal = 0;
  
//     tableData.forEach((rowData) => {
//       const quantity = parseFloat(rowData.quantity || 0);
//       const purchase = parseFloat(rowData.Purchase || 0);
//       quantityTotal += quantity;
//       amountTotal += quantity * purchase;
//     });
  
//     setTotalQuantity(quantityTotal);
//     // Format the amount with commas using toLocaleString
//     setTotalAmount(amountTotal.toLocaleString()); // Format the amount with commas
//   };
  
//   ////////////////////////get item id show them in inout field//////////////////////////
//   const [item, setItem] = useState([]);
//   const [nextItemId, setNextItemId] = useState(1); // Initialize the next TItmId

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${apiLinks}/get_item.php`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }

//         const apiData = await response.json();
//         setItem(apiData);
       
//         // Find the maximum TItmId in the existing data
//         const maxItemId = Math.max(...apiData.map((item) => parseInt(item.TItmId)));
//         // Set the nextItemId to be one greater than the maximum TItmId
//         setNextItemId(maxItemId + 1);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

  





//   const [tableData, setTableData] = useState([
//     { name: '', quantity: '', Purchase: '', Amount: '' },
//   ]);
  
//   const handleInputChange = (event, index) => {
//     const { name, value } = event.target;
//     const newData = [...tableData];
//     newData[index][name] = value;
//     setTableData(newData);
//     calculateTotals(); 
//     // Calculate the "amount" based on "quantity" and "purchase"
//     if (name === "quantity" || name === "purchase") {
//       const quantity = parseFloat(newData[index].quantity || 0);
//       const purchase = parseFloat(newData[index].Purchase || 0);
//       newData[index].Amount = (quantity * purchase).toFixed(2);
//     }
  
//     setTableData(newData);
//   };

//   const calculateAmount = (quantity, Purchase) => {
//     const parsedQuantity = parseFloat(quantity) || 0;
//     const parsedPurchase = parseFloat(Purchase) || 0;
//     return (parsedQuantity * parsedPurchase).toFixed(2);
//   };
  

//   const handleAddRow = () => {
//     setTableData([...tableData, { name: '', quantity: '', price: '' }]);
//   };

//   const handleRemoveRow = (index) => {
//     const newData = [...tableData];
//     newData.splice(index, 1);
//     setTableData(newData);
//   };
//   const [itemdata, setitemdata] = useState([]);

//   const columns = [
//     { label: "Item ID", field: "TItmId" },
//     { label: "Description", field: "TItmDsc" },
//     { label: "Unit", field: "uom" },
//     { label: "Purchase", field: "TPurRat" },

//   ];
//   const [searchText, setSearchText] = useState("");
//   const [filteredItemData, setFilteredItemData] = useState([]);

//   useEffect(() => {
//     // Filter the itemdata array based on TItmDsc and searchText
//     const filteredData = itemdata.filter((item) =>
//       item.TItmDsc.toLowerCase().includes(searchText.toLowerCase())
//     );
//     setFilteredItemData(filteredData);
//   }, [searchText, itemdata]);



//   useEffect(() => {
//     fetch(`${apiLinks}/get_item.php`)
//       .then((response) => response.json())
//       .then((apiData) => {
//         const transformedData = apiData.map((item) => ({
//           TItmId: item.TItmId,
//           TItmDsc: item.TItmDsc,
//           uom:item.uom,
//           TPurRat:item.TPurRat,
//         }));

//         setitemdata(transformedData);

//         console.log(apiData); // Log the fetched data
//       })
//       .catch((error) => console.error(error));
//   }, []);
  

//   const handleSearchChange = (event) => {
//     setSearchText(event.target.value);
//   };
//   const [selectedItemData, setSelectedItemData] = useState({ TItmId: "", TItmDsc: "",TPurRat:'',uom:'' });


// // Add the following state variables at the beginning of your component
// const [selectedItemIndex, setSelectedItemIndex] = useState(0);

// // Modify the handleInputChange1 function to handle item selection and update the first row
// const handleInputChange1 = (event, rowIndex) => {
//   const { name, value } = event.target;
//   const updatedTableData = [...tableData];

//   if (name === "name") {
//     const selectedItem = itemdata.find((item) => item.TItmId === value);

//     if (selectedItem) {
//       updatedTableData[rowIndex] = {
//         ...updatedTableData[rowIndex],
//         name: selectedItem.TItmId,
//         Desctiption: selectedItem.TItmDsc,
//         Unit: selectedItem.uom,
//         Purchase: selectedItem.TPurRat,
//         Amount: calculateAmount(
//           updatedTableData[rowIndex].quantity,
//           selectedItem.TPurRat
//         ),
//       };
//     }
//   } else {
//     updatedTableData[rowIndex] = {
//       ...updatedTableData[rowIndex],
//       [name]: value,
//     };

//     if (name === "quantity" || name === "Purchase") {
//       const quantity = parseFloat(updatedTableData[rowIndex].quantity || 0);
//       const Purchase = parseFloat(updatedTableData[rowIndex].Purchase || 0);
//       updatedTableData[rowIndex].Amount = (quantity * Purchase).toFixed(2);
//     }
//   }

//   setTableData(updatedTableData);
//   calculateTotals();
// };

  
  
  
  
  
//    // Add event listeners to the input fields of the last row
//     // Add event listeners to the input fields of the last row
//      // Add event listeners to the input fields of the last row
//       // Add event listeners to the input fields of the last row
//        // Add event listeners to the input fields of the last row
//          const addNewRow = () => {
//     setTableData([...tableData, { name: '', quantity: '', Purchase: '', Amount: '' }]);
//   };


//   const [selectedRowIndex, setSelectedRowIndex] = useState(null);


//   const handleRowClick = (rowData, rowIndex) => {
//     // Create a copy of the current tableData
//     const updatedTableData = [...tableData];
  
//     // if (rowIndex >= 0 && rowIndex < updatedTableData.length) {
//       if (rowIndex >= 0 && rowIndex < '100000000') {

//       updatedTableData[updatedTableData.length - 1] = {
//         ...updatedTableData[updatedTableData.length - 1],
//         name: rowData.TItmId,
//         Desctiption: rowData.TItmDsc,
//         Unit: rowData.uom,
//         Purchase: rowData.TPurRat,
//         Amount: calculateAmount(
//           updatedTableData[updatedTableData.length - 1].quantity,
//           rowData.TPurRat
//         ),
//       };
//     }
  
//     // Update the state with the modified tableData
//     setTableData(updatedTableData);
//     calculateTotals();
//   };
  
  



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
//         <Header />
        
//         <PathHead pageName="Transaction > Purchase " />
//       <div className="col-12" >
        

//         <div
//           className="row"
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
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
//               padding: "1%",
//               width: "100%",
//               maxWidth: "74%",
//               margin: "2% 0",
              
//             }}
//           >
//             <form
//               onSubmit={handleFormSubmit}
//               style={{ textAlign: "right" ,fontSize:'12px',fontWeight:'bold',marginLeft:'1%',height:'30rem'}}
//             >
//               <div className="form-group" >


//                <div className="row">


//                 <div className="col-6">
                  
//                 <div>
//       <div className="row">
//         <div className="col-md-4">
//           <label htmlFor="code">Purchase# :</label>
//         </div>
//         <div className="col-md-8">
//           <input
//             type="text"
//             id="code"
//             placeholder=" Id"
//             name="itmIdd"
//             className="form-control"
//             value={ nextItemId} // Display the nextItemId
//             style={{ height: '20px', width: '60px', marginLeft: '-3%', textAlign: 'right' }}
//             readOnly // Make the input read-only to prevent user edits
//           />
//         </div>
//       </div>
  
      
//     </div>
//                 <div className="row">
//                   <div className="col-md-4" >
//                     <label htmlFor="code">Code :</label>
//                   </div>
//                   <div className="col-md-4">
//                     <input
//                       type="text"
//                       id="code"
//                       placeholder="Cash / Supplier"
//                       name="itemCodd"
//                       className="form-control"
//                       value={values.itemCodd}

//                       style={{height:'20px', width:'170px' ,marginLeft: "-7%"}}
//                       onChange={handleInputChange2}
//                     />
//                   </div>
//                   <div className="col-md-4">
//                     <input
//                       type="text"
//                       id="code"
//                       placeholder="Code Description"
//                       name="itemDscc"
//                       className="form-control"
//                       value={values.itemDscc}
//                       style={{height:'20px', width:'170px' }}
//                       onChange={handleInputChange2}
//                     />
//                   </div>
//                 </div>

                
               
                


//                 <div className="row">
//                   <div className="col-md-4" >
//                     <label htmlFor="code" >Remarks :</label>
//                   </div>
//                   <div className="col-md-8">
//                     <input
//                       type="text"
//                       id="code"
//                       placeholder="Remarks  "
//                       name="itemRmkss"
//                       className="form-control"
//                       value={values.itemRmkss }
//                       style={{height:'20px', width:'200px' ,fontSize:'12px',marginLeft: "-3%"}}
//                       onChange={handleInputChange2}
//                     />
//                   </div>

                  
//                 </div>
             
//              <br />
            
//                 <div  style={{marginLeft:'40%',width:'140%',height:'250px',fontSize:'11px'}}>
//                 <MDBTable responsive striped bordered hover maxHeight="15rem">
//   <MDBTableHead>
//     <tr>
//       <th style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky", top: -1, zIndex: 1  , border: "1px solid #000"}}>Sr.</th>
//       <th style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky", top: -1, zIndex: 1  , border: "1px solid #000",width:'9%'}}>Item ID</th>
//       <th style={{backgroundColor: primaryColor, color: secondaryColor,width:'20%', fontWeight: "bold", position: "sticky", top: -1, zIndex: 1  , border: "1px solid #000",width:'25%'}}>Description</th>
//       <th style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky", top: -1, zIndex: 1  , border: "1px solid #000",width:'14%'}}>Unit</th>
//       <th style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky", top: -1, zIndex: 1  , border: "1px solid #000",width:'14%'}}>Quantity</th>
//       <th style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky", top: -1, zIndex: 1  , border: "1px solid #000"}}>Purchase</th>
//       <th style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky", top: -1, zIndex: 1  , border: "1px solid #000"}}>Amount</th>
//     </tr>
//   </MDBTableHead>
//   <MDBTableBody>
//     {tableData.map((rowData, index) => (
//       <tr key={index}>
//         <td style={{ border: "1px solid #000", padding: "8px", textAlign: "center" }}>{index + 1}</td>
//         <td style={{ border: "1px solid #000", padding: "8px", textAlign: "center" }}>
//       <input
//         type="text"
//         name="name"
//         placeholder="ID"
//         value={rowData.name}
//         onChange={(e) => handleInputChange1(e, index)}
//         style={{
//           width: "100%",
//           border: "none",
//           backgroundColor: "transparent",
//           textAlign: "center",
//         }}
//         // ref={index === tableData.length - 1 ? lastInputRef : null}
//       />
//     </td>
//         <td style={{ border: "1px solid #000", padding: "8px", textAlign: "center" }}>
//           <input
//             type="text"
//             name="Desctiption"
//             placeholder="Description"
//             value={rowData.Desctiption}
//             onChange={(e) => handleInputChange1(e, index)}
//             style={{
//               width: "100%",
//               border: "none",
//               backgroundColor: "transparent",
//               textAlign:'left',
//             }}
//           />
//         </td>
//         <td style={{ border: "1px solid #000", padding: "8px", textAlign: "center" }}>
//           <input
//             type="text"
//             name="Unit"
//             placeholder="Unit"
//             value={rowData.Unit}
//             onChange={(e) => handleInputChange1(e, index)}
//             style={{ width: "100%", border: "none", backgroundColor: "transparent", textAlign: "center" }}
//           />
//         </td>
//         <td style={{ border: "1px solid #000", padding: "8px", textAlign: "center", background: "#f5f5f5" }}>
//           <input
//             type="number"
//             name="quantity"
//             placeholder="Quantity"
//             value={rowData.quantity}
//             onChange={(e) => handleInputChange(e, index)}
//             onKeyDown={(e) => handleEnterKeyPress(e, index)}
 
//             style={{ width: "100%", border: "none", backgroundColor: "transparent", textAlign: "center" }}
//           />
//         </td>
//         <td style={{ border: "1px solid #000", padding: "8px", textAlign: "center", background: "#f5f5f5" }}>
//           <input
//             type="number"
//             name="Purchase"
//             placeholder="Purchase"
//             value={rowData.Purchase}
//             onChange={(e) => handleInputChange1(e, index)}
//             style={{ width: "100%", border: "none", backgroundColor: "transparent", textAlign: "center" }}
//           />
//         </td>
//         <td style={{ border: "1px solid #000", padding: "8px", textAlign: "center", background: "#f5f5f5" }}>
//   <input
//     type="text"  // Change type to "text" to display formatted number
//     name="Amount"
//     placeholder="Amount"
//     value={rowData.Amount.toLocaleString()}
//     onChange={(e) => handleInputChange(e, index)}
//     style={{ width: "100%", border: "none", backgroundColor: "transparent", textAlign: "center" }}
//   />
// </td>

        
//       </tr>
      
//     ))}
     
//   </MDBTableBody>
//   <MDBTableFoot style={{ position: "sticky", bottom: 0, zIndex: 2 }}>
//   <tr>
//       <td style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold"  , border: "1px solid #000"}}></td>
//       <td style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold"  , border: "1px solid #000"}}></td>
//       <td style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold" , border: "1px solid #000"}}></td>
//       <td style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold"  , border: "1px solid #000"}}></td>
//       <td style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold" , border: "1px solid #000"}}>{totalQuantity}</td>
//       <td style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold"  , border: "1px solid #000"}}></td>
//       <td style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky" , border: "1px solid #000"}}>{totalAmount || '.00'}</td>
//     </tr>
//   </MDBTableFoot>
// </MDBTable>



                    
//                   </div>
                


//                 </div>

//                </div>

//                  <div className="row">
//                  <div className="col-6" style={{width:'50%'}}>
//                <Row>
            
//             <Col xs={12} sm={4} md={4} lg={4} xl={{ span:5, offset: 7 }}>
//               <Form.Control
//                 type="text"
//                 style={{height:'30px'}}
//                 placeholder="Item Description"
//                 value={searchText}
//                 onChange={handleSearchChange}
//               />
//             </Col>
//           </Row>
//           <MDBTable scrollY maxHeight="8rem" striped bordered small responsive>
//           <MDBTableHead>
//             <tr>
//               {columns.map((column, index) => (
//                 <th
//                   style={{
//                     backgroundColor: primaryColor,
//                     color: secondaryColor,
//                     fontWeight: "bold",
//                     position: "sticky",
//                     top: -1,
//                     zIndex: 1,
//                   }}
//                   key={index}
//                 >
//                   {column.label}
//                 </th>
//               ))}
//             </tr>
//           </MDBTableHead>
//           <MDBTableBody>
//   {filteredItemData.map((row, rowIndex) => (
//     <tr
//       key={rowIndex}
//       onClick={() => handleRowClick(row, rowIndex)}
//       style={{
//         cursor: "pointer",
//         backgroundColor:
//           rowIndex === selectedRowIndex ? "lightgray" : "white",
//       }}
//     >
//       {columns.map((column, colIndex) => (
//         <td
//           key={colIndex}
//           style={{ textAlign: colIndex === 1 ? "left" : "center" }}
//         >
//           {row[column.field]}
//         </td>
//       ))}
//     </tr>
//   ))}
// </MDBTableBody>

//         </MDBTable>

//                 </div>


//                 <div className="col-6" >
//                     <br /><br /><br />
//                     <br /><br /><br />
//                   <button
//                     className="btn btn-primary"
//                     style={{
//                       backgroundColor: primaryColor,
//                       height: "24%",
//                       fontSize: "11px",
//                       color: secondaryColor,
//                       width: "35%",
//                       marginRight:'1%'
//                     }}
//                     onClick={handleFormSubmit}
                    
//                   >
//                     SUBMIT
//                   </button>
//                   <button
//                     className="btn btn-primary"
//                     onClick={() => navigate("/MainPage")}
//                     style={{
//                       backgroundColor: primaryColor,
//                       height: "24%",
//                       fontSize: "11px",
//                       color: secondaryColor,
//                       width: "35%",
//                     }}
//                   >
//                     RETURN
//                   </button>
//                 </div>
//             </div>
              
// {/* ////////////////////////////////  BUTTON ////////////////////////// */}
// <br />
                
//               </div>
//             </form>
//           </div>
//         </div>
//         <br />
//       </div>
//       </div>
//       <Footer/>
//     </>
//   );
// }

// export default Purchase;

// 

import React, { useState, useEffect ,useRef } from "react";
import { MDBTable, MDBTableBody, MDBTableHead,MDBTableFoot } from "mdbreact";
import axios from "axios";
import { useTheme } from "../../../ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import PathHead from "../../MainComponent/PathHead/PathHead";
import Header from "../../MainComponent/Header/Header";
import Footer from "../../MainComponent/Footer/Footer";
import {
    Card,
    Row,
    Col,
    Button,
    FormControl,
    InputGroup,
    Form,
  } from "react-bootstrap";


  function Purchase() {
    const [values, setValues] = useState({
        itmIdd: "",
        itemCodd: "", // Initialize itemCodd here or set it to a default value
        itemDscc: "",
        itemRmkss: "",
        typee: "",
        pic: "",
        loading: false,
      });
      
      
      const lastInputRef = useRef(null);

  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("Yes");
  const [selectedStatus1, setSelectedStatus1] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("Startup");
  const [alertData, setAlertData] = useState(null);
  const { secondaryColor ,apiLinks } = useTheme();

  const [selectedType, setSelectedType] = useState("Item Purchase");
  const [selectedUnit, setSelectedUnit] = useState("Quantity");

  const [data, setData] = useState([]);

  const [alert, setAlert] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const { primaryColor } = useTheme();
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [getPurchase, setPurchase] = useState();

  

  const handleEnterKeyPress = (event, currentIndex) => {
    if (event.key === "Enter") {
      // Check if Enter is pressed in the last input field
      if (currentIndex === tableData.length - 1) {
        addNewRow(); // Add a new row
        // Set focus on the first input field of the new row
        if (lastInputRef.current) {
          lastInputRef.current.focus();
        }
      }
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/get_category.php`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
  
        const apiData = await response.json();
        setData(apiData);
  
        // Set the selectedCategoryId with the first category ID from the API data
        if (apiData.length > 0) {
          setSelectedCategoryId(apiData[0].tctgid);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);
  const UserId = 33;



  
  {/* ////////////////////////  CALL API TO POST DATA ////////////////////////// */}
  const responseData = {
    // detail1: [],
    detail1: [],
  };
  
  const handleInputChange2 = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    setValues((prevState) => ({
      ...prevState,
      loading: true,
    }));
  
    try {
      // Prepare the data to be sent in the request
      const requestData = {
        purchaseid: nextItemId,
        codeid: values.itemCodd,
        codedescription: values.itemDscc,
        remarks: values.itemRmkss,
        totalAmount: totalAmount,
        totalQuantity: totalQuantity,
        detail1: tableData.map((item) => ({
          item_id: item.name,
          description: item.Desctiption,
          quantity: item.quantity,
          purchase_rate: item.Purchase,
          amount: item.Amount,
          unit: item.Unit,
        })),
      };
  
      const response = await axios.post(
        `${apiLinks}/Purchase.php`,
        JSON.stringify(requestData),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
  
      console.log(response);
      console.log(requestData);
      
      if (response.data.error === 200) {
        // navigate("/MainPage");
        console.log(response.data.message);
        setAlertData({
          type: "success",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
          window.location.reload();
        }, 1000);
      } else {
        console.log(response.data.message);
  
        setAlertData({
          type: "error",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setValues((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };
  





  // const calculateTotals = () => {
  //   let quantityTotal = 0;
  //   let amountTotal = 0;
  //   tableData.forEach((rowData) => {
  //     const quantity = parseFloat(rowData.quantity || 0);
  //     const purchase = parseFloat(rowData.Purchase || 0);
  //     quantityTotal += quantity;
  //     amountTotal += quantity * purchase;
  //   });
  //   setTotalQuantity(quantityTotal);
  //   setTotalAmount(amountTotal.toFixed(2));
  // };
  const calculateTotals = () => {
    let quantityTotal = 0;
    let amountTotal = 0;
  
    tableData.forEach((rowData) => {
      const quantity = parseFloat(rowData.quantity || 0);
      const purchase = parseFloat(rowData.Purchase || 0);
      quantityTotal += quantity;
      amountTotal += quantity * purchase;
    });
  
    setTotalQuantity(quantityTotal);
    // Format the amount with commas using toLocaleString
    setTotalAmount(amountTotal.toLocaleString()); // Format the amount with commas
  };
  
  ////////////////////////get item id show them in inout field//////////////////////////
  const [item, setItem] = useState([]);
  const [nextItemId, setNextItemId] = useState(1); // Initialize the next TItmId

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/get_item.php`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const apiData = await response.json();
        setItem(apiData);
       
        // Find the maximum TItmId in the existing data
        const maxItemId = Math.max(...apiData.map((item) => parseInt(item.TItmId)));
        // Set the nextItemId to be one greater than the maximum TItmId
        setNextItemId(maxItemId + 1);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  





  const [tableData, setTableData] = useState([
    { name: '', quantity: '', Purchase: '', Amount: '' },
  ]);
  
  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const newData = [...tableData];
    newData[index][name] = value;
    setTableData(newData);
    calculateTotals(); 
    // Calculate the "amount" based on "quantity" and "purchase"
    if (name === "quantity" || name === "purchase") {
      const quantity = parseFloat(newData[index].quantity || 0);
      const purchase = parseFloat(newData[index].Purchase || 0);
      newData[index].Amount = (quantity * purchase).toFixed(2);
    }
  
    setTableData(newData);
  };

  const calculateAmount = (quantity, Purchase) => {
    const parsedQuantity = parseFloat(quantity) || 0;
    const parsedPurchase = parseFloat(Purchase) || 0;
    return (parsedQuantity * parsedPurchase).toFixed(2);
  };
  

  const handleAddRow = () => {
    setTableData([...tableData, { name: '', quantity: '', price: '' }]);
  };

  const handleRemoveRow = (index) => {
    const newData = [...tableData];
    newData.splice(index, 1);
    setTableData(newData);
  };
  const [itemdata, setitemdata] = useState([]);

  const columns = [
    { label: "Item ID", field: "TItmId" },
    { label: "Description", field: "TItmDsc" },
    { label: "Unit", field: "uom" },
    { label: "Purchase", field: "TPurRat" },

  ];
  const [searchText, setSearchText] = useState("");
  const [filteredItemData, setFilteredItemData] = useState([]);

  useEffect(() => {
    // Filter the itemdata array based on TItmDsc and searchText
    const filteredData = itemdata.filter((item) =>
      item.TItmDsc.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredItemData(filteredData);
  }, [searchText, itemdata]);



  useEffect(() => {
    fetch(`${apiLinks}/get_item.php`)
      .then((response) => response.json())
      .then((apiData) => {
        const transformedData = apiData.map((item) => ({
          TItmId: item.TItmId,
          TItmDsc: item.TItmDsc,
          uom:item.uom,
          TPurRat:item.TPurRat,
        }));

        setitemdata(transformedData);

        console.log(apiData); // Log the fetched data
      })
      .catch((error) => console.error(error));
  }, []);
  

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  const [selectedItemData, setSelectedItemData] = useState({ TItmId: "", TItmDsc: "",TPurRat:'',uom:'' });


// Add the following state variables at the beginning of your component
const [selectedItemIndex, setSelectedItemIndex] = useState(0);

// Modify the handleInputChange1 function to handle item selection and update the first row
const handleInputChange1 = (event, rowIndex) => {
  const { name, value } = event.target;
  const updatedTableData = [...tableData];

  if (name === "name") {
    const selectedItem = itemdata.find((item) => item.TItmId === value);

    if (selectedItem) {
      updatedTableData[rowIndex] = {
        ...updatedTableData[rowIndex],
        name: selectedItem.TItmId,
        Desctiption: selectedItem.TItmDsc,
        Unit: selectedItem.uom,
        Purchase: selectedItem.TPurRat,
        Amount: calculateAmount(
          updatedTableData[rowIndex].quantity,
          selectedItem.TPurRat
        ),
      };
    }
  } else {
    updatedTableData[rowIndex] = {
      ...updatedTableData[rowIndex],
      [name]: value,
    };

    if (name === "quantity" || name === "Purchase") {
      const quantity = parseFloat(updatedTableData[rowIndex].quantity || 0);
      const Purchase = parseFloat(updatedTableData[rowIndex].Purchase || 0);
      updatedTableData[rowIndex].Amount = (quantity * Purchase).toFixed(2);
    }
  }

  setTableData(updatedTableData);
  calculateTotals();
};

  
  
  
  
  
   // Add event listeners to the input fields of the last row
    // Add event listeners to the input fields of the last row
     // Add event listeners to the input fields of the last row
      // Add event listeners to the input fields of the last row
       // Add event listeners to the input fields of the last row
         const addNewRow = () => {
    setTableData([...tableData, { name: '', quantity: '', Purchase: '', Amount: '' }]);
  };


  const [selectedRowIndex, setSelectedRowIndex] = useState(null);


  const handleRowClick = (rowData, rowIndex) => {
    // Create a copy of the current tableData
    const updatedTableData = [...tableData];
  
    // if (rowIndex >= 0 && rowIndex < updatedTableData.length) {
      if (rowIndex >= 0 && rowIndex < '100000000') {

      updatedTableData[updatedTableData.length - 1] = {
        ...updatedTableData[updatedTableData.length - 1],
        name: rowData.TItmId,
        Desctiption: rowData.TItmDsc,
        Unit: rowData.uom,
        Purchase: rowData.TPurRat,
        Amount: calculateAmount(
          updatedTableData[updatedTableData.length - 1].quantity,
          rowData.TPurRat
        ),
      };
    }
  
    // Update the state with the modified tableData
    setTableData(updatedTableData);
    calculateTotals();
  };
  
  



  return (
    <>
     <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {alertData && (
          <Alert
            severity={alertData.type}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "30%",
              marginLeft: "35%", 
              zIndex: 1000,
              textAlign: "center", 
            }}
          >
            {alertData.message}
          </Alert>
        )}
        <Header />
        
        <PathHead pageName="Transaction > Purchase " />
      <div className="col-12" >
        

        <div
          className="row"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
            minHeight: "100vh",
          }}
        >
          <div
            className="col-md-12"
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              padding: "1%",
              width: "100%",
              maxWidth: "74%",
              margin: "2% 0",
              
            }}
          >
            <form
              onSubmit={handleFormSubmit}
              style={{ textAlign: "right" ,fontSize:'12px',fontWeight:'bold',marginLeft:'1%',height:'30rem'}}
            >
              <div className="form-group" >


               <div className="row">


                <div className="col-6">
                  
                <div>
      <div className="row">
        <div className="col-md-4">
          <label htmlFor="code">Purchase# :</label>
        </div>
        <div className="col-md-8">
          <input
            type="text"
            id="code"
            placeholder=" Id"
            name="itmIdd"
            className="form-control"
            value={ nextItemId} // Display the nextItemId
            style={{ height: '20px', width: '60px', marginLeft: '-3%', textAlign: 'right' }}
            readOnly // Make the input read-only to prevent user edits
          />
        </div>
      </div>
  
      
    </div>
                <div className="row">
                  <div className="col-md-4" >
                    <label htmlFor="code">Code :</label>
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      id="code"
                      placeholder="Cash / Supplier"
                      name="itemCodd"
                      className="form-control"
                      value={values.itemCodd}

                      style={{height:'20px', width:'170px' ,marginLeft: "-7%"}}
                      onChange={handleInputChange2}
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      id="code"
                      placeholder="Code Description"
                      name="itemDscc"
                      className="form-control"
                      value={values.itemDscc}
                      style={{height:'20px', width:'170px' }}
                      onChange={handleInputChange2}
                    />
                  </div>
                </div>

                
               
                


                <div className="row">
                  <div className="col-md-4" >
                    <label htmlFor="code" >Remarks :</label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      id="code"
                      placeholder="Remarks  "
                      name="itemRmkss"
                      className="form-control"
                      value={values.itemRmkss }
                      style={{height:'20px', width:'200px' ,fontSize:'12px',marginLeft: "-3%"}}
                      onChange={handleInputChange2}
                    />
                  </div>

                  
                </div>
             
             <br />
            
                <div  style={{marginLeft:'40%',width:'140%',height:'250px',fontSize:'11px'}}>
                <MDBTable responsive striped bordered hover maxHeight="15rem">
  <MDBTableHead>
    <tr>
      <th style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky", top: -1, zIndex: 1  , border: "1px solid #000"}}>Sr.</th>
      <th style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky", top: -1, zIndex: 1  , border: "1px solid #000",width:'9%'}}>Item ID</th>
      <th style={{backgroundColor: primaryColor, color: secondaryColor,width:'20%', fontWeight: "bold", position: "sticky", top: -1, zIndex: 1  , border: "1px solid #000",width:'25%'}}>Description</th>
      <th style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky", top: -1, zIndex: 1  , border: "1px solid #000",width:'14%'}}>Unit</th>
      <th style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky", top: -1, zIndex: 1  , border: "1px solid #000",width:'14%'}}>Quantity</th>
      <th style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky", top: -1, zIndex: 1  , border: "1px solid #000"}}>Purchase</th>
      <th style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky", top: -1, zIndex: 1  , border: "1px solid #000"}}>Amount</th>
    </tr>
  </MDBTableHead>
  <MDBTableBody>
    {tableData.map((rowData, index) => (
      <tr key={index}>
        <td style={{ border: "1px solid #000", padding: "8px", textAlign: "center" }}>{index + 1}</td>
        <td style={{ border: "1px solid #000", padding: "8px", textAlign: "center" }}>
      <input
        type="text"
        name="name"
        placeholder="ID"
        value={rowData.name}
        onChange={(e) => handleInputChange1(e, index)}
        style={{
          width: "100%",
          border: "none",
          backgroundColor: "transparent",
          textAlign: "center",
        }}
        // ref={index === tableData.length - 1 ? lastInputRef : null}
      />
    </td>
        <td style={{ border: "1px solid #000", padding: "8px", textAlign: "center" }}>
          <input
            type="text"
            name="Desctiption"
            placeholder="Description"
            value={rowData.Desctiption}
            onChange={(e) => handleInputChange1(e, index)}
            style={{
              width: "100%",
              border: "none",
              backgroundColor: "transparent",
              textAlign:'left',
            }}
          />
        </td>
        <td style={{ border: "1px solid #000", padding: "8px", textAlign: "center" }}>
          <input
            type="text"
            name="Unit"
            placeholder="Unit"
            value={rowData.Unit}
            onChange={(e) => handleInputChange1(e, index)}
            style={{ width: "100%", border: "none", backgroundColor: "transparent", textAlign: "center" }}
          />
        </td>
        {/* <td style={{ border: "1px solid #000", padding: "8px", textAlign: "center", background: "#f5f5f5" }}>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={rowData.quantity}
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleEnterKeyPress(e, index)}
 
            style={{ width: "100%", border: "none", backgroundColor: "transparent", textAlign: "center" }}
          />


        </td> */}

<td style={{ border: "1px solid #000", padding: "8px", textAlign: "center", background: "#f5f5f5" }}>
  <input
    type="number"
    name="quantity"
    placeholder="Quantity"
    value={rowData.quantity}
    onChange={(e) => handleInputChange(e, index)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        e.preventDefault(); // Prevent the default behavior of "Enter"
        addNewRow(); // Add a new row
        if (lastInputRef.current) {
          lastInputRef.current.focus();
        }
      }
    }}
    style={{ width: "100%", border: "none", backgroundColor: "transparent", textAlign: "center" }}
  />
</td>

        <td style={{ border: "1px solid #000", padding: "8px", textAlign: "center", background: "#f5f5f5" }}>
          <input
            type="number"
            name="Purchase"
            placeholder="Purchase"
            value={rowData.Purchase}
            onChange={(e) => handleInputChange1(e, index)}
            style={{ width: "100%", border: "none", backgroundColor: "transparent", textAlign: "center" }}
          />
        </td>
        <td style={{ border: "1px solid #000", padding: "8px", textAlign: "center", background: "#f5f5f5" }}>
  <input
    type="text"  // Change type to "text" to display formatted number
    name="Amount"
    placeholder="Amount"
    value={rowData.Amount.toLocaleString()}
    onChange={(e) => handleInputChange(e, index)}
    style={{ width: "100%", border: "none", backgroundColor: "transparent", textAlign: "center" }}
  />
</td>

        
      </tr>
      
    ))}
     
  </MDBTableBody>
  <MDBTableFoot style={{ position: "sticky", bottom: 0, zIndex: 2 }}>
  <tr>
      <td style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold"  , border: "1px solid #000"}}></td>
      <td style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold"  , border: "1px solid #000"}}></td>
      <td style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold" , border: "1px solid #000"}}></td>
      <td style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold"  , border: "1px solid #000"}}></td>
      <td style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold" , border: "1px solid #000"}}>{totalQuantity}</td>
      <td style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold"  , border: "1px solid #000"}}></td>
      <td style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky" , border: "1px solid #000"}}>{totalAmount || '.00'}</td>
    </tr>
  </MDBTableFoot>
</MDBTable>



                    
                  </div>
                


                </div>

               </div>

                 <div className="row">
                 <div className="col-6" style={{width:'50%'}}>
               <Row>
            
            <Col xs={12} sm={4} md={4} lg={4} xl={{ span:5, offset: 7 }}>
              <Form.Control
                type="text"
                style={{height:'30px'}}
                placeholder="Item Description"
                value={searchText}
                onChange={handleSearchChange}
              />
            </Col>
          </Row>
          <MDBTable scrollY maxHeight="8rem" striped bordered small responsive>
          <MDBTableHead>
            <tr>
              {columns.map((column, index) => (
                <th
                  style={{
                    backgroundColor: primaryColor,
                    color: secondaryColor,
                    fontWeight: "bold",
                    position: "sticky",
                    top: -1,
                    zIndex: 1,
                  }}
                  key={index}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </MDBTableHead>
          <MDBTableBody>
  {filteredItemData.map((row, rowIndex) => (
    <tr
      key={rowIndex}
      onClick={() => handleRowClick(row, rowIndex)}
      style={{
        cursor: "pointer",
        backgroundColor:
          rowIndex === selectedRowIndex ? "lightgray" : "white",
      }}
    >
      {columns.map((column, colIndex) => (
        <td
          key={colIndex}
          style={{ textAlign: colIndex === 1 ? "left" : "center" }}
        >
          {row[column.field]}
        </td>
      ))}
    </tr>
  ))}
</MDBTableBody>

        </MDBTable>

                </div>


                <div className="col-6" >
                    <br /><br /><br />
                    <br />

                    
                  <button
                    className="btn btn-primary"
                    style={{
                      backgroundColor: primaryColor,
                      height: "24%",
                      fontSize: "11px",
                      color: secondaryColor,
                      width: "35%",
                      marginRight:'1%'
                    }}
                    onClick={handleFormSubmit}
                    
                  >
                    SUBMIT
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/MainPage")}
                    style={{
                      backgroundColor: primaryColor,
                      height: "24%",
                      fontSize: "11px",
                      color: secondaryColor,
                      width: "35%",
                    }}
                  >
                    RETURN
                  </button>
                </div>
            </div>
              
{/* ////////////////////////////////  BUTTON ////////////////////////// */}
<br />
                
              </div>
            </form>
          </div>
        </div>
        <br />
      </div>
      </div>
      <Footer/>
    </>
  );
}

export default Purchase;
