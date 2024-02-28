// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
// import Header from "../../../../../../MainComponent/Header/Header";
// import Footer from "../../../../../../MainComponent/Footer/Footer";
// import PathHead from "../../../../../../MainComponent/PathHead/PathHead";
// // import Edit from '../../../../image/edit.png';
// import { Form } from 'react-bootstrap'; 
// import Empty from '../../../../../../../image/empty.png';
// import Bin from '../../../../../../../image/bin.png';
// import Alert from "@mui/material/Alert";

// import {
//   Card,
//   Row,
//   Col,
//   Button,
//   FormControl,
//   InputGroup,
// } from "react-bootstrap";
// import axios from "axios";
// import { useTheme } from "../../../../../../../ThemeContext";
// import { useLocation, useParams } from 'react-router-dom';

// const Cart_Item = () => {
//   const location = useLocation();

//   const cartItems = location.state.cartItems;
//   const navigate = useNavigate();
//   const [searchText, setSearchText] = useState("");
//   const [data, setData] = useState({ columns: [], rows: [] });
//   const { id } = useParams();
//   const [alertData, setAlertData] = useState(null);
//   const [alert, setAlert] = useState(null);
//   const [rowNumber, setRowNumber] = useState(0); // Initialize row number

//   const { primaryColor, secondaryColor } = useTheme();
//   const { apiLinks } = useTheme();
//   const [menuItems, setMenuItems] = useState([]);
//   const imageurl = `${apiLinks}/itemimage/`;

//   const handleMenuItemClick = () => {
//     navigate(`/Order_Category/${id}`);
//   };
//   const handleMenuItemClick1 = () => {
//     navigate("/CheckOut", {
//       state: {
//         cartItems,
//         tamtItems,
//         totalItem,
//         detailItem,
//         itemPictures, // Pass the itemPictures array as part of the state

//       },
//     });
//   };
//   const [getUser, setUser] = useState();

//   useEffect(() => {
//     // Retrieve user data from local storage
//     const userData = JSON.parse(localStorage.getItem("user"));

//     if (userData) {
//       setUser(userData);
//       console.log(userData);
//       fetchMenuItems(); // Fetch menu items based on user ID from userData
//       console.log("user id is", userData.id);
//     } else {
//       // Handle cases when user data is not available
//       console.error("User data not available in local storage.");
//     }
//   }, []);
//   const [tamtItems, settamtItems] = useState([]);
//   const [totalItem, settotalItem] = useState([]);
//   const [detailItem, setDetailItem] = useState([]);

//   function fetchMenuItems() {
//     const apiUrl = `${apiLinks}/Cart_Item.php`;
//     const formData = new URLSearchParams({ orderid: id }).toString();
  
//     axios
//       .post(apiUrl, formData)
//       .then((response) => {
//         setTableData({
//           columns: [], // Update with your columns data
//           rows: response.data.detail, // Update with your rows data
//         });
  
//         settamtItems(response.data.totalAmt.toLocaleString());
//         settotalItem(response.data.totalitem);
//         setDetailItem(response.data.detail);
//         console.log("titm total amt ", response.data.detail);
//       })
//       .catch((error) => {
//         // Handle errors
//         console.error("Error:", error);
//       });
//   }
  
  

//   const handleSearchChange = (event) => {
//     setSearchText(event.target.value);
//   };


//   const filteredRows = detailItem ? detailItem.filter((item) =>
//   item.titmdsc.toLowerCase().includes(searchText.toLowerCase())
// ) : [];

//   const [data1, setData1] = useState({ columns: [], rows: [] });

//   const [itemPictures, setItemPictures] = useState([]);

// // Define a function to fetch item data
// function fetchItemData() {
//   fetch(`${apiLinks}/get_item.php`)
//     .then((response) => response.json())
//     .then((apiData) => {
//       // Now you need to map 'TItmPic' from apiData and store it in 'itemPictures' state
//       const transformedData = apiData.map((item) => ({
//         TItmId: item.TItmId,
//         TItmPic: item.TItmPic, // Assuming 'TItmPic' is a property in your API response
//       }));

//       setItemPictures(transformedData);
//       console.log(apiData); // Log the fetched data
//     })
//     .catch((error) => console.error(error));
// }

// // Use the fetchItemData function within a useEffect
// useEffect(() => {
//   fetchItemData();
// }, []);

// // You can also call fetchItemData elsewhere in your component as needed




//   ///////////////////////////////////////////////////////////
//   ///////////////////////////////////////////////////////////
//   //////////////////// DELETE ITEM api ////////////////////////
//   ///////////////////////////////////////////////////////////
//   const [tableData, setTableData] = useState({ columns: [], rows: [] });

//   const [refreshKey, setRefreshKey] = useState(0);

//   const DeleteItem = async (item) => {
//     try {
//       const formData = new FormData();
//       formData.append("id", item);
  
//       const response = await axios.post(
//         `${apiLinks}/DeleteItem.php`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
  
//       if (response.data.error === 200) {
//         setTableData((prevData) => ({
//           ...prevData,
//           rows: prevData.rows.filter((row) => row.id !== item.id),
//         }));
//         setAlertData({
//           type: "success",
//           message: `${response.data.message}`,
//         });
//         setTimeout(() => {
//           setAlertData(null);
//           window.location.reload();

//         }, 1000);
  
//         // Change the key to trigger a component refresh
//         // setRefreshKey((prevKey) => prevKey + 1);
  
//       } else {
//         console.log(response.data.message);
  
//         setAlertData({
//           type: "error",
//           message: `${response.data.message}`,
//         });
//         setTimeout(() => {
//           setAlertData(null);
//         }, 2000);
//       }
  
//       console.log(response.data.message);
//     } catch (error) {
//       console.error("Error deleting item:", error);
//       setAlert("Error deleting item.");
//     }
//   };
  
  
//   console.log('array of cartitem is',cartItems);
//   return (
//     <>
//     <div 
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
//       <Header id={id} />
//       <PathHead pageName="Transaction > Order > Category > Order Number > Cart Item" />




//     <div style={{marginLeft:'16%',marginRight:'16%',marginTop:'3%'}}>
//     <Row>
//             <Col xs={12} sm={4} md={4} lg={4} xl={2}>
//               <Button
//                 className="btn btn-primary"
//                 style={{
//                   backgroundColor: primaryColor,
//                   fontSize: '11px',
//                   color: secondaryColor,
//                   width: '100%',
//                   marginBottom: '10px',
//                 }}
//                 onClick={handleMenuItemClick}
//               >
//                 Add Item
//               </Button>
//             </Col>
//             <Col xs={12} sm={4} md={4} lg={4} xl={2}>
//               <Button
//                 className="btn btn-primary"
//                 onClick={() => navigate('/Order_Number')}
//                 style={{
//                   backgroundColor: primaryColor,
//                   fontSize: '11px',
//                   color: secondaryColor,
//                   width: '100%',
//                   marginBottom: '10px',
//                 }}
//               >
//                 Return
//               </Button>
//             </Col>
//             <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 3, offset: 5 }}>
//               <Form.Control
//                 type="text"
//                 placeholder="Search..."
//                 value={searchText}
//                 onChange={handleSearchChange}
//               />
//             </Col>
//           </Row>
//     </div >
//       {filteredRows.length > 0 ? (
//             <>
//           <div className="col-12" style={{ color: secondaryColor }} key={refreshKey}>
//         <div style={{ marginLeft: "15%", marginRight: "15%", maxWidth: "70%" }}>
         
//           <div style={{ fontSize: "12px", width: "100%", overflowX: "auto", color: secondaryColor }}>
//             <div style={{ maxHeight: "360px", overflowY: "scroll" }} >
//               <MDBTable
               
//                 striped
//                 bordered
//                 small
//                 responsive
//               >
//                 <MDBTableHead>
//                   <tr>
//                   <th style={{
//                       backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
//                       top: 0,
//                       zIndex: 1,
//                     }}>No. </th>
//                     {/* <th style={{
//                       backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
//                       top: 0,
//                       zIndex: 1,
//                     }}>Id</th> */}
//                     <th style={{
//                       backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
//                       top: 0,
//                       zIndex: 1,
//                     }}>Order Id</th>
//                     <th style={{
//                       backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
//                       top: 0,
//                       zIndex: 1,
//                     }}>Order Date</th>
//                     <th style={{
//                       backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
//                       top: 0,
//                       zIndex: 1,
//                     }}>Item Id</th>
//                     <th style={{
//                       backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
//                       top: 0,
//                       zIndex: 1,
//                     }}>Item Description</th>
//                     <th style={{
//                       backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
//                       top: 0,
//                       zIndex: 1,
//                     }}>Quantity</th>
//                     {/* <th style={{
//                       backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
//                       top: 0,
//                       zIndex: 1,
//                     }}>Purchase Rate</th> */}
//                     <th style={{
//                       backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
//                       top: 0,
//                       zIndex: 1,
//                     }}>Sale Rate</th>
//                     {/* <th style={{
//                       backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
//                       top: 0,
//                       zIndex: 1,
//                     }}>Discount Rate</th> */}
//                     <th style={{
//                       backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
//                       top: 0,
//                       zIndex: 1,width:'90px'
//                     }}>Sale Amount</th>
//                     <th style={{
//                       backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
//                       top: 0,
//                       zIndex: 1,
//                     }}>User Id</th>
//                     <th style={{
//                       backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
//                       top: 0,
//                       zIndex: 1,
//                     }}>Picture</th>
//                     <th style={{
//                       backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
//                       top: 0,
//                       zIndex: 1,
//                     }}>Delete</th>
//                   </tr>
//                 </MDBTableHead>
//                 <MDBTableBody>
//             {filteredRows.map((item, index) => {
//               const row = {
//                 rowNumber: rowNumber + index + 1, // Calculate row number
//                 ...item, // Include other row data
//               };

//               const filteredItemPictures = itemPictures ? itemPictures.filter((apiItem) => apiItem.TItmId === item.titmid) : [];

//               return (
//                 <tr key={index}>
//                   <td>{row.rowNumber}</td>
//                         <td style={{ width: "7%" }}>{item.tordid}</td>
//                         <td>{item.torddat}</td>
//                         <td>{item.titmid}</td>
//                         <td style={{ textAlign: "left" }}>{item.titmdsc}</td>
//                         <td style={{ width: "1%" }}>{item.titmqnt}</td>
//                         <td>{item.tsalrat}</td>
//                         <td >{item.salamt}</td>
//                         <td>{item.tuserid}</td>
//                   <td>
//                     {filteredItemPictures.map((filteredItem, apiIndex) => (
//                       <img
//                         key={apiIndex}
//                         src={imageurl + filteredItem.TItmPic}
//                         alt="Category"
//                         style={{ width: '50px', height: 'auto' }}
//                       />
//                     ))}
//                   </td>
//                   <td>
//                     <img
//                       onClick={() => DeleteItem(row.id)} // Wrap the DeleteItem call in an arrow function
//                       src={Bin}
//                       alt="delete"
//                       style={{ width: '30px', height: 'auto' }}
//                     />
//                   </td>
//                 </tr>
//               );
//             })}
//           </MDBTableBody>
//               </MDBTable>
//             </div>
           
//           </div>
//         </div>
        
//       </div>
//       <div style={{ marginLeft: '15%', marginRight: '15%', maxWidth: '70%',height:'5px'}}>
//   <Card>
//     <Card.Body>
//       <Row>
//       <Col xs={4} sm={4} md={4} lg={4} xl={4}>
//       <Button
//                 className="btn btn-primary"
//                 style={{
//                   backgroundColor: primaryColor,
//                   fontSize: '11px',
//                   color: secondaryColor,
//                   width: '50%',
//                   marginBottom: '10px',
//                 }}
//                 onClick={handleMenuItemClick1}
//               >
//                 Checkout
//               </Button>
//         </Col>
//         <Col xs={4} sm={4} md={4} lg={4} xl={4}>
//           <h6>Total Amount: {tamtItems}</h6>
//         </Col>
//         <Col xs={4} sm={4} md={4} lg={4} xl={4}>
//           <h6>Total Quantity: {totalItem}</h6>
//         </Col>
        
//       </Row>
//     </Card.Body>
//   </Card>
//        </div>
//           </>
//         ) : (
//           <>
            
//             <div style={{marginLeft:'40%',marginTop:'14%'}}>  
//               <img
//                 src={Empty}
//                 onClick={() => navigate(`/Order_Category/${id}`)}
//                 style={{ height: "24%", width: "25%", marginRight: "5%" }}
//               />
//             </div>
//           </>
//         )}
//         <Footer />
//         </div>
//     </>
//   );
// };

// export default Cart_Item;







import React, { useState, useEffect ,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import Header from "../../../../../../MainComponent/Header/Header";
import Footer from "../../../../../../MainComponent/Footer/Footer";
import PathHead from "../../../../../../MainComponent/PathHead/PathHead";
// import Edit from '../../../../image/edit.png';
import { Form } from 'react-bootstrap'; 
import Empty from '../../../../../../../image/empty.png';
import Bin from '../../../../../../../image/bin.png';
import Alert from "@mui/material/Alert";

import {
  Card,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import axios from "axios";
import { useTheme } from "../../../../../../../ThemeContext";
import { useLocation, useParams } from 'react-router-dom';
import { RowIdContext } from "../../../../../../../createContext";


const Cart_Item = () => {
  const { rowId } = useContext(RowIdContext);

  const location = useLocation();
  const [editedQuantities, setEditedQuantities] = useState({});
  const cartItems = location.state && location.state.cartItems ? location.state.cartItems : [];

  // const cartItems = location.state.cartItems;
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const { id } = useParams();
  const [alertData, setAlertData] = useState(null);
  const [alert, setAlert] = useState(null);
  const [rowNumber, setRowNumber] = useState(0); // Initialize row number

  const { primaryColor, secondaryColor } = useTheme();
  const { apiLinks } = useTheme();
  const [menuItems, setMenuItems] = useState([]);
  const imageurl = `${apiLinks}/itemimage/`;

  const handleMenuItemClick = () => {
    navigate(`/Order_Category/${id}`);
  };
  const handleMenuItemClick1 = () => {
    navigate("/CheckOut", {
      state: {
        cartItems,
        tamtItems,
        totalItem,
        detailItem,
        itemPictures, // Pass the itemPictures array as part of the state

      },
    });
  };
  const [getUser, setUser] = useState();

  useEffect(() => {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      setUser(userData);
      console.log(userData);
      fetchMenuItems(); // Fetch menu items based on user ID from userData
      console.log("user id is", userData.id);
    } else {
      // Handle cases when user data is not available
      console.error("User data not available in local storage.");
    }
  }, []);
  const [tamtItems, settamtItems] = useState([]);
  const [totalItem, settotalItem] = useState([]);
  const [detailItem, setDetailItem] = useState([]);

  function fetchMenuItems() {
    const apiUrl = `${apiLinks}/Cart_Item.php`;
    const formData = new URLSearchParams({ orderid: id }).toString();
  
    axios
      .post(apiUrl, formData)
      .then((response) => {
        setTableData({
          columns: [], // Update with your columns data
          rows: response.data.detail, // Update with your rows data
        });
  
        settamtItems(response.data.totalAmt.toLocaleString());
        settotalItem(response.data.totalitem);
        setDetailItem(response.data.detail);
        console.log("titm total amt ", response.data.detail);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  }
  
  

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };


  const filteredRows = detailItem ? detailItem.filter((item) =>
  item.titmdsc.toLowerCase().includes(searchText.toLowerCase())
) : [];

  const [data1, setData1] = useState({ columns: [], rows: [] });

  const [itemPictures, setItemPictures] = useState([]);

// Define a function to fetch item data
function fetchItemData() {
  fetch(`${apiLinks}/get_item.php`)
    .then((response) => response.json())
    .then((apiData) => {
      // Now you need to map 'TItmPic' from apiData and store it in 'itemPictures' state
      const transformedData = apiData.map((item) => ({
        TItmId: item.TItmId,
        TItmPic: item.TItmPic, // Assuming 'TItmPic' is a property in your API response
      }));

      setItemPictures(transformedData);
      console.log(apiData); // Log the fetched data
    })
    .catch((error) => console.error(error));
}

// Use the fetchItemData function within a useEffect
useEffect(() => {
  fetchItemData();
}, []);

// You can also call fetchItemData elsewhere in your component as needed




  ///////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////
  //////////////////// DELETE ITEM api ////////////////////////
  ///////////////////////////////////////////////////////////
  const [tableData, setTableData] = useState({ columns: [], rows: [] });

  const [refreshKey, setRefreshKey] = useState(0);

  const DeleteItem = async (item) => {
    try {
      const formData = new FormData();
      formData.append("id", item);
  
      const response = await axios.post(
        `${apiLinks}/DeleteItem.php`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.data.error === 200) {
        setTableData((prevData) => ({
          ...prevData,
          rows: prevData.rows.filter((row) => row.id !== item.id),
        }));
        setAlertData({
          type: "success",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
          // window.location.reload();
          fetchMenuItems();
        }, 1000);
  
        // Change the key to trigger a component refresh
        // setRefreshKey((prevKey) => prevKey + 1);
  
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
  
      console.log(response.data.message);
    } catch (error) {
      console.error("Error deleting item:", error);
      setAlert("Error deleting item.");
    }
  };
  const saveEditedQuantities = () => {
    const editedQuantityData = Object.entries(editedQuantities).map(([titmid, quantity]) => ({
      titmid,
      quantity,
    }));
  
    // Send `editedQuantityData` to the server to save the edited quantities
    // You will need to implement the server-side logic to handle this data
  };
  
  
  console.log('array of cartitem is',cartItems);
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
      {/* <Header id={id} /> */}
      <Header id={rowId} screen="CartItem" />
      <PathHead pageName="Transaction > Order > Category > Order Number > Cart Item" />


      {/* <p>Row ID from the previous screen: {rowId}</p> */}

    <div style={{marginLeft:'10%',marginRight:'10%',marginTop:'3%'}}>
    <Row>
            <Col xs={12} sm={4} md={4} lg={4} xl={2}>
              <Button
                className="btn btn-primary"
                style={{
                  backgroundColor: primaryColor,
                  fontSize: '11px',
                  color: secondaryColor,
                  width: '100%',
                  marginBottom: '10px',
                }}
                onClick={handleMenuItemClick}
              >
                Add Item
              </Button>
            </Col>
            <Col xs={12} sm={4} md={4} lg={4} xl={2}>
              <Button
                className="btn btn-primary"
                onClick={() => navigate('/Order_Number')}
                style={{
                  backgroundColor: primaryColor,
                  fontSize: '11px',
                  color: secondaryColor,
                  width: '100%',
                  marginBottom: '10px',
                }}
              >
                Return
              </Button>
            </Col>
            <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 3, offset: 5 }}>
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={handleSearchChange}
              />
            </Col>
          </Row>
    </div >
      {filteredRows.length > 0 ? (
            <>
          <div className="col-12" style={{ color: secondaryColor }} key={refreshKey}>
        <div style={{ marginLeft: "10%", marginRight: "10%", maxWidth: "80%" }}>
         
          <div style={{ fontSize: "12px", width: "100%", overflowX: "auto", color: secondaryColor }}>
            <div style={{ maxHeight: "360px", overflowY: "scroll" }} >
              <MDBTable
               
                striped
                bordered
                small
                responsive
              >
                <MDBTableHead>
                  <tr>
                  <th style={{
                      backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}>No. </th>
                   
                    <th style={{
                      backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}>Order Id</th>
                    <th style={{
                      backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}>Order Date</th>
                    <th style={{
                      backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}>Item Id</th>
                   
                    <th style={{
                      backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}>Item Description</th>
                     <th style={{
                      backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}>Item Desc</th>
                    <th style={{
                      backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}>Quantity</th>
                    
                    <th style={{
                      backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}>Sale Rate</th>
                
                    <th style={{
                      backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
                      top: 0,
                      zIndex: 1,width:'90px'
                    }}> Amount</th>
                    <th style={{
                      backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}>User Id</th>
                  
                    <th style={{
                      backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}>Delete</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
            {filteredRows.map((item, index) => {
              const row = {
                rowNumber: rowNumber + index + 1, // Calculate row number
                ...item, // Include other row data
              };

              const filteredItemPictures = itemPictures ? itemPictures.filter((apiItem) => apiItem.TItmId === item.titmid) : [];

              return (
                <tr key={index}>
                  <td>{row.rowNumber}</td>
                        <td style={{ width: "7%" }}>{item.tordid}</td>
                        <td>{item.torddat}</td>
                        <td>{item.titmid}</td>
                        <td style={{ textAlign: "left" }}>{item.titmdsc}</td>
                        <td>{item.itmsldsc}</td>

                        <td style={{ width: "1%" }}>
  <input
    type="number"
    value={editedQuantities[item.titmid] || item.titmqnt}
    style={{
      width: "100%",
      border: "none",
      backgroundColor: "transparent",
      textAlign: "center",
    }}
    onChange={(e) => {
      const newQuantities = { ...editedQuantities };
      newQuantities[item.titmid] = parseInt(e.target.value, 10);
      setEditedQuantities(newQuantities);
    }}
  />
</td>

                        <td>{item.tsalrat}</td>
                        <td >{item.salamt}</td>
                        <td>{item.tuserid}</td>
                
                  <td>
                    <img
                      onClick={() => DeleteItem(row.id)} // Wrap the DeleteItem call in an arrow function
                      src={Bin}
                      alt="delete"
                      style={{ width: '30px', height: 'auto' }}
                    />
                  </td>
                </tr>
              );
            })}
          </MDBTableBody>
              </MDBTable>
            </div>
           
          </div>
        </div>
        
      </div>
      <div style={{ marginLeft: '15%', marginRight: '15%', maxWidth: '70%',height:'5px'}}>
  <Card>
    <Card.Body>
      <Row>
      <Col xs={4} sm={4} md={4} lg={4} xl={4}>
      <Button
                className="btn btn-primary"
                style={{
                  backgroundColor: primaryColor,
                  fontSize: '11px',
                  color: secondaryColor,
                  width: '50%',
                  marginBottom: '10px',
                }}
                onClick={handleMenuItemClick1}
              >
                Checkout
              </Button>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4} xl={4}>
          <h6>Total Amount: {tamtItems}</h6>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4} xl={4}>
          <h6>Total Quantity: {totalItem}</h6>
        </Col>
        
      </Row>
    </Card.Body>
  </Card>
       </div>
          </>
        ) : (
          <>
            
            <div style={{marginLeft:'40%',marginTop:'14%'}}>  
              <img
                src={Empty}
                onClick={() => navigate(`/Order_Category/${id}`)}
                style={{ height: "24%", width: "25%", marginRight: "5%" }}
              />
            </div>
          </>
        )}
        <Footer />
        </div>
    </>
  );
};

export default Cart_Item;







