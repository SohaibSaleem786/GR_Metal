import Alert from "@mui/material/Alert";
import PathHead from "../../../../../../MainComponent/PathHead/PathHead";
import Header from "../../../../../../MainComponent/Header/Header";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../../../../../../ThemeContext";
import { useLocation } from "react-router-dom";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdbreact"; // Import the necessary components from "mdbreact"
import {
  Card,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";

import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import Footer from "../../../../../../MainComponent/Footer/Footer";

function CheckOut() {
  const [values, setValues] = useState({
    customerNamee: "",
    orderAddd: "",
    emaill:'',
    mobilee: "",
    ordscc: "",
    loading: false,
  });
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("Yes");
  const [selectedStatus1, setSelectedStatus1] = useState("");
  // const [selectedCategoryId, setSelectedCategoryId] = useState("Startup");
  const [alertData, setAlertData] = useState(null);
  const { secondaryColor ,apiLinks } = useTheme();

  const [selectedType, setSelectedType] = useState("Item Purchase");
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);

  const [selectedDeliveryId, setSelectedDeliveryId] = useState("Startup");
  const [selectedMOPId, setSelectedMOPId] = useState("Jazz Cash");

  const [alert, setAlert] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const { primaryColor } = useTheme();
  const imageurl = `${apiLinks}/itemimage/`;



  // Function to handle adding new data
  const location = useLocation();
  const detailItem = location.state && location.state.detailItem;
  const tamtItems = location.state && location.state.tamtItems;
  const totalItem = location.state && location.state.totalItem;
  const cartItems = location.state && location.state.cartItems;
  const [response, setCartItems] = useState({
    detail1: {},
    detail2: [],
  });

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleImageChange1 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage1(file);
      const imgElement = document.getElementById("pic-preview");
      imgElement.src = URL.createObjectURL(file);
    }
  };
  {/* ////////////////////////  DUE TO GET DATA OF CATEGORY ////////////////////////// */}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/get_delivery.php`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
  
        const apiData = await response.json();
        setData(apiData);
  
        // Set the selectedCategoryId with the first category ID from the API data
        if (apiData.length > 0) {
          setSelectedDeliveryId(apiData[0].dvid);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/get_payment_mode.php`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
  
        const apiData = await response.json();
        setData1(apiData);
  
        // Set the selectedCategoryId with the first category ID from the API data
        if (apiData.length > 0) {
          setSelectedMOPId(apiData[0].id);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);
  const UserId = 33;


  {/* ////////////////////////  CALL API TO POST DATA ////////////////////////// */}
  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    // Create an object with the form data
    const formData = {
      customerName: values.customerNamee,
      orderAdd: values.orderAddd,
      email: values.emaill,
      mobile: values.mobilee,
      ordsc: values.ordscc,
      orderAmt: tamtItems.replace(/,/g, ''),
      qty: totalItem,
      orderId: orderid,
    };
  console.log('form data is is :',formData)
    // Create a copy of cartItems to avoid mutating the state directly
    const updatedCartItems = { ...cartItems };
  
    // Add the formData to the detail1 property of cartItems[0]
    updatedCartItems.detail1 = formData;
  
    // Update the state with the updated cartItems
    setCartItems(updatedCartItems);
    try {
      // Send the form data to the server
      const response = await axios.post(
        `${apiLinks}/CheckOut.php`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data"}
        }
      );
  
      if (response.data.error === 200) {
        navigate('/Order_Number')
        console.log('when the error is 200 or etc',response.data);
        setAlertData({
          type: "success",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
        }, 1000);
      } else {
        console.log('when the error is 404 or etc',response.data);
  
        setAlertData({
          type: "error",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
        }, 2000);
      }
    } catch (error) {
      console.error("Error uploading data:", error);
      setAlert("Error uploading data.");
    } finally {
      // Reset form values after submission
      setValues({
        customerNamee: "",
        orderAddd: "",
        emaill: "",
        mobilee: "",
        ordscc: "",
        loading: true,
      });
  
      setSelectedStatus("Yes");
      setSelectedStatus1("");
      setSelectedDeliveryId(data.length > 0 ? data[0].dvid : "Startup");
      setSelectedMOPId(data.length > 0 ? data[0].id : "Startup");

      setSelectedType("Item Purchase");
  
      setSelectedImage1(null);
  
      // window.location.reload();
    }
  };
  
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     setValues((prevState) => ({
//       ...prevState,
//       loading: true,
//     }));

//     try {
//       const formData = new FormData();
//       formData.append("customerName", values.customerNamee);  
//       formData.append("orderAdd", values.orderAddd);
//       formData.append("email", values.emaill);
//       formData.append("mobile", values.mobilee);
//       formData.append("ordsc", values.ordscc);
//       formData.append("orderAmt", tamtItems);
//       formData.append("qty", totalItem);
//       formData.append("orderId", orderid); // Use selectedCategoryId here
    
//       // formData.append('FUsrId', UserId);
// console.log('odreid',orderid[0]);
//       const response = await axios.post(
//         `${apiLinks}/CheckOut.php`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data",
//           // 'Content-Type': 'application/json;charset=UTF-8', 
//         },
//         }
//       )
//       .then((response) => {
//         if (response.data.error === 200) {
//       console.log('respose name is' ,response.data)

//           // Create an object with the form data
//     const formData1 = {
//       customerName: values.customerNamee,
//       orderAdd: values.orderAddd,
//       email: values.emaill,
//       mobile: values.mobilee,
//       ordsc: values.ordscc,
//       orderAmt: tamtItems,
//       qty: totalItem,
//       orderId: orderid,
//     };
 
//     // Create a copy of cartItems to avoid mutating the state directly
//     const updatedCartItems = { ...cartItems };
  
//     // Add the formData to the detail1 property of cartItems[0]
//     updatedCartItems.detail1 = formData1;
  
//     // Update the state with the updated cartItems
//     setCartItems(updatedCartItems);
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
//         customerNamee: "",
//         orderAddd: "",
//         emaill:"",
//         mobilee: "", // Set the initial value for itemStss
//         ordscc: "",
//         loading: true,
//       });
//       setSelectedStatus("Yes"); // Set the initial value for selectedStatus
//       setSelectedStatus1(""); // Set the initial value for selectedStatus1
//       setSelectedCategoryId(data.length > 0 ? data[0].tctgid : "Startup"); // Set the initial value for selectedCategoryId
//       setSelectedType("Item Purchase"); // Set the initial value for selectedType
  
//       setSelectedImage1(null); // Clear the selected image
  
//       setAlert("Image uploaded successfully.");
//       navigate("/Item");
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
  ////////////////////////get item id show them in inout field//////////////////////////
  const [item, setItem] = useState([]);
  const [orderid, settordidValues] = useState([]);





  

  useEffect(() => {
    if (detailItem) {
      const tordidValues = detailItem.map(item => item.tordid);
     settordidValues(tordidValues[0]);
      console.log("detailItem data:", tordidValues);
    }
  }, [detailItem]);
  useEffect(() => {
    fetchItemData();
  }, []);
  const [itemPictures, setItemPictures] = useState([]);

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
  console.log('this cartitem is on chckout screen:',response);
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
        {/* <Header id={orderid}/> */}
        <Header id={orderid} screen="Checkout" />
        <PathHead pageName="Transaction > Order > Category > Order Number > Cart Item > Checkout" />
      <div className="col-12" >
        

        <div
          className="row"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1%",
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
              maxWidth: "70%",
              margin: "2% 0",
              
            }}
          >
            <form
              onSubmit={handleFormSubmit}
              style={{ textAlign: "right" ,fontSize:'12px',fontWeight:'bold',marginLeft:'1%'}}
            >
              <div className="form-group" >


               <div className="row">


                <div className="col-6">
                  <br />
                
                

                  <div className="row">
  <div className="col-md-4">
    <label htmlFor="code">Mobile :</label>
  </div>
  <div className="col-md-8">
    <input
      type="text"
      id="code"
      placeholder="Phone Number"
      name="mobilee"
      className="form-control"
      value={values.mobilee }
      style={{
        height: '20px',
        width: '120px',
        fontSize: '12px',
        marginLeft: '-3%',
      }}
      onChange={handleInputChange}
    />
  </div>
</div>
               
                
    <div className="row">
                  <div className="col-md-4" >
                    <label htmlFor="code" >Name :</label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      id="code"
                      placeholder="Enter Your Name"
                      name="customerNamee"
                      className="form-control"
                      value={values.customerNamee}
                      style={{height:'20px', width:'150px' ,fontSize:'12px',marginLeft: "-3%"}}
                      onChange={handleInputChange}
                    />
                  </div>

                  
                </div>
    
  
                
{/*              
                <div className="row">
<div className="col-md-4">
                    <label htmlFor="required">Delivery :</label>
                  </div>
                  <div className="col-md-8">
                    <select
                      name="categoryIdd"
                      onChange={(e) => {
                        // setSelectedCategoryId(e.target.value);
                        setSelectedDeliveryId(e.target.value);

                      }}
                      id="categoryIdd"
                      style={{ height: '27px', fontSize: '11px', width: '120px',marginLeft: "-3%"}}
                      className="form-control"                    >
                    {data.map((item) => (
      <option
        key={item.dvid}
        value={item.dvid}
      >
        {item.dvdsc}
      </option>
    ))}
                    </select>
                  </div>
                </div>
                  
                <div className="row">
<div className="col-md-4">
                    <label htmlFor="required">MOP :</label>
                  </div>
                  <div className="col-md-8">
                    <select
                      name="categoryIdd"
                      onChange={(e) => {
                        // setSelectedCategoryId(e.target.value);
                        setSelectedMOPId(e.target.value);

                      }}
                      id="categoryIdd"
                      style={{ height: '27px', fontSize: '11px', width: '120px',marginLeft: "-3%"}}
                      className="form-control"                    >
                    {data1.map((item) => (
      <option
        key={item.id}
        value={item.id}
      >
        {item.paydsc}
      </option>
    ))}
                    </select>
                  </div>
                </div> */}
                <div className="row">
  <div className="col-md-4">
    <label htmlFor="code">Email :</label>
  </div>
  <div className="col-md-8">
    <input
      type="text"
      id="code"
      placeholder="Email Address"
      name="emaill"
      className="form-control"
      value={values.emaill }
      style={{
        height: '20px',
        width: '180px',
        fontSize: '12px',
        marginLeft: '-3%',
      }}
      onChange={handleInputChange}
    />
  </div>
</div>
<div className="row">
                  <div className="col-md-4" >
                    <label htmlFor="code" >Address :</label>
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      id="code"
                      placeholder="Address  "
                      name="orderAddd"
                      className="form-control"
                      value={values.orderAddd}
                      style={{height:'20px', width:'270px' ,fontSize:'12px',marginLeft: "-3%"}}
                      onChange={handleInputChange}
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
                      placeholder="Order Description"
                      name="ordscc"
                      className="form-control"
                      value={values.ordscc}
                      style={{height:'20px', width:'270px' ,fontSize:'12px',marginLeft: "-3%"}}
                      onChange={handleInputChange}
                    />
                  </div>

                  
                </div>

                </div>
{/* ////////////////////////////////  PICTURE////////////////////////// */}

<div className="col-6">
          <div className={`cards ${detailItem.length > 0 ? "cards-large" : "cards-small"}`} style={{ textAlign: 'left', maxHeight: '250px', overflowY: 'auto' }}>
            {detailItem.map((row, index) => {
              const filteredItemPictures = itemPictures ? itemPictures.filter((apiItem) => apiItem.TItmId === row.titmid) : [];

              return (
                <div key={index} >
                  <div className="card mb-2" style={{height:'83px'}}>
                    <div className="card-body">
                      <div className="row">
                        
                        <div className="col-12">
                          <div className="row" style={{ fontSize: '10px' }}>
                          <div className="col-" style={{ fontSize: '14px' }}>
                              <p>{row.titmdsc}</p>
                            </div>
                            <div className="col">
                              <p>Item Id: {row.titmid}</p>
                            </div>
                            
                            <div className="col">
                              <p>Item Qnt: {row.titmqnt}</p>
                            </div>
                            <div className="col">
                              <p>Item Price: {row.tsalrat}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* <div className="row" style={{marginRight:'40%'}}>
          <div className="summary-box">
            <h5>Summary</h5>
            <div className="summary-item">
              <span>Total Items: </span>
              <span>{totalItem}</span>
            </div>
            <div className="summary-item">
              <span>Total Amount: </span>
              <span>{tamtItems}</span>
            </div>
           
          </div>
        </div> */}
      
     <div style={{textAlign:'center'}}>
      <h5>Summary</h5>
     </div>

        

        </div>

        





               </div>
                
{/* ////////////////////////////////  BUTTON ////////////////////////// */}
<br />
<Row>
      <Col md={3}>
        <Button
          className="btn btn-primary"
          style={{
            backgroundColor: primaryColor,
            height: "25px",
            width:'100px',
            fontSize: "11px",
            color: secondaryColor,
          }}
          onClick={handleFormSubmit}
        >
          SUBMIT
        </Button>
      </Col>

      <Col md={3}>
        <Button
          className="btn btn-primary"
          onClick={() => navigate("/Order_Number")}
          style={{
            backgroundColor: primaryColor,
            width:'100px',
            height: "25px",
            fontSize: "11px",
            color: secondaryColor,
            marginRight:'120px'
          }}
        >
          RETURN
        </Button>
      </Col>

      <Col md={6}>
        <div className="card">
          {/* Other card content here */}
          <div className="summary-box row" style={{ position: 'sticky' }}>
            <Col className="summary-item" md={6}>
              <span>Total Items: </span>
              <span>{totalItem}</span>
            </Col>
            <Col className="summary-item" md={6}>
              <span>Total Amount: </span>
              <span>{tamtItems}</span>
            </Col>
          </div>
        </div>
      </Col>
    </Row>
              </div>
            </form>
          </div>
        </div>
        <br />
      </div>
      </div>
      <Footer />
   </>
  );
}

export default CheckOut;






