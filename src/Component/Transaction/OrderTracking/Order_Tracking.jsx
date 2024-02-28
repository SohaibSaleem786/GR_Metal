import React, { useState, useEffect ,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import Header from "../../MainComponent/Header/Header";
import Footer from "../../MainComponent/Footer/Footer";
import PathHead from "../../MainComponent/PathHead/PathHead";
import Edit from '../../../image/edit1.png';
import Invoice from '../../../image/invoice.png';
import Order from '../../../image/order.png';
import Pending from '../../../image/progress.png';
import '../OrderTracking/Order_Tracking.css';
import axios from "axios";
import Alert from "@mui/material/Alert";
import { useData } from "../../../DataContext";
import { useParams } from "react-router-dom";
import Received from '../../../image/receive.png';
import Process from '../../../image/inprocess.png';
import Dispatch from '../../../image/Dispatch.png';
import Deliverd from '../../../image/Deliverd.png';
import { RowIdContext } from "../../../createContext";


import {
    Card,
    Row,
    Col,
    Button,
    FormControl,
    InputGroup,
  } from "react-bootstrap";
  import { Form } from 'react-bootstrap';
import { useTheme } from "../../../ThemeContext";
import { useLocation } from 'react-router-dom';


const Order_Tracking = () => {
  const location = useLocation();
  const cartItems = location.state ? location.state.cartItems : [];
 const { updateOrderData } = useData(); 
 const { id } = useParams();
 const [getOrderNum, setOrderdatainto] = useState();

  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const { primaryColor ,secondaryColor} = useTheme();
  const { apiLinks } = useTheme();
  const [alertData, setAlertData] = useState(null);


  const handleMenuItemClick = () => {
    navigate("/Item");
  };
  const [getUser, setUser] = useState();

  useEffect(() => {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      setUser(userData);
      console.log(userData);
      console.log("user id is", userData.id);
    } else {
      // Handle cases when user data is not available
      console.error("User data not available in local storage.");
    }
  }, []);   
  const imageurl = `${apiLinks}/itemimage/`;
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = () => {
    fetch(`${apiLinks}/OrderList.php`)
      .then((response) => response.json())
      .then((apiData) => {
        const transformedData = apiData.map((item) => ({
          id: item.id,
          torddat: item.torddat,
          tordtim: item.tordtim,
          tcstnam: item.tcstnam,
          tordadd: item.tordadd,
          tmobnum: item.tmobnum,
          tordamt: item.tordamt,
          tordsts: item.tordsts,
          tordrsvdt :item.tordrsvdt,
          tordrinpro :item.tordrinpro,

          torddisp :item.torddisp,
          tdlvdat :item.tdlvdat,

        }));
  
        const columns = [
          { label: "Sr.", field: "id", sort: "asc" },
          { label: "Ord ID", field: "id", sort: "asc" },
          { label: "Date", field: "torddat", sort: "asc" },
          { label: "Time", field: "tordtim", sort: "asc" },
          { label: "Customer Name", field: "tcstnam", sort: "asc" },
          { label: "Mobile", field: "tmobnum", sort: "asc" },
          { label: "Order Address", field: "tordadd", sort: "asc" },
          { label: "Amount", field: "tordamt", sort: "asc" },
          { label: "Status", field: "tordsts", sort: "asc" },
          { label: "Update Date", field: "tedtdat", sort: "asc" },
          { label: "Receive", field: "tedtdat", sort: "asc" },
        ];
  
        setData({ columns, rows: transformedData });
        setDataFetched(true);
        if (apiData.length > 0) {
          const lastId = apiData[apiData.length - 1].id; // Increment the last ID by 1
          console.log('Last ID:', lastId);
          setOrderdatainto(lastId);
        } else {
          console.log('apiData is empty');
        }
        console.log('dsfsdfsd', apiData.length);
        updateOrderData(apiData.length);
      })
      .catch((error) => console.error(error));
  };
  

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  ///////////////// here is our Search Function
//   const filteredRows = data.rows.filter((row) =>
  // (row.tcstnam && row.tcstnam.toLowerCase().includes(searchText.toLowerCase())) ||
  // (row.tmobnum && row.tmobnum.toLowerCase().includes(searchText.toLowerCase())) ||
  // (row.tordsts && row.tordsts.toLowerCase().includes(searchText.toLowerCase()))
// );
const [selectedOption, setSelectedOption] = useState('All'); // Initialize with 'All' or any default value

const handleSelectOption = (event) => {
  setSelectedOption(event.target.value);
};

const filteredRows = data.rows.filter((row) =>
  (selectedOption === 'All' || row.tordsts === selectedOption) &&
  (
    (row.tcstnam && row.tcstnam.toLowerCase().includes(searchText.toLowerCase())) ||
    (row.tmobnum && row.tmobnum.toLowerCase().includes(searchText.toLowerCase())) ||
    (row.tordsts && row.tordsts.toLowerCase().includes(searchText.toLowerCase()))
  )
);


   /////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////
 ///////////////////////////New ORder id generate ///////////////////////////////
 /////////////////////////////////////////////////////////////////////////
 const [Orderid, setOrderId] = useState(""); 
 const [refreshKey, setRefreshKey] = useState(0);

   /////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////
 ///////////////////////////status change ///////////////////////////////
 /////////////////////////////////////////////////////////////////////////
 const handleReceivedChange = (orderid) => {
  // Your code to generate a new order, similar to your existing code
  const apiUrl = `${apiLinks}/OrderReceived.php`;
  const data = {
    orderId: orderid,
  };

console.log('orderi d is this',orderid)

  const formData = new URLSearchParams(data).toString();

  axios
    .post(apiUrl, formData)
    .then((response) => {
      if (response.data.error === 200) {
        // Log the entire response data
        console.log('order sataus update is', response.data);

       



        setAlertData({
          type: "success",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
        }, 2000);
        fetchData();
        // Do not navigate here

        // Update the DataContext with the new row.id value
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
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const handleOrderInProcessChange = (orderid) => {
  // Your code to generate a new order, similar to your existing code
  const apiUrl = `${apiLinks}/OrderInProcess.php`;
  const data = {
    orderId: orderid,
  };

console.log('orderi d is this',orderid)

  const formData = new URLSearchParams(data).toString();

  axios
    .post(apiUrl, formData)
    .then((response) => {
      if (response.data.error === 200) {
        // Log the entire response data
        console.log('order sataus update is', response.data);

       



        setAlertData({
          type: "success",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
        }, 2000);
        fetchData();
        // Do not navigate here

        // Update the DataContext with the new row.id value
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
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
const handleOrderDispatchChange = (orderid) => {
  // Your code to generate a new order, similar to your existing code
  const apiUrl = `${apiLinks}/OrderDispatch.php`;
  const data = {
    orderId: orderid,
  };

console.log('orderi d is this',orderid)

  const formData = new URLSearchParams(data).toString();

  axios
    .post(apiUrl, formData)
    .then((response) => {
      if (response.data.error === 200) {
        // Log the entire response data
        console.log('order sataus update is', response.data);

       



        setAlertData({
          type: "success",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
        }, 2000);
        fetchData();
        // Do not navigate here

        // Update the DataContext with the new row.id value
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
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
const handleOrderDeliveredChange = (orderid) => {
  // Your code to generate a new order, similar to your existing code
  const apiUrl = `${apiLinks}/OrderDelivered.php`;
  const data = {
    orderId: orderid,
  };

console.log('orderi d is this',orderid)

  const formData = new URLSearchParams(data).toString();

  axios
    .post(apiUrl, formData)
    .then((response) => {
      if (response.data.error === 200) {
        // Log the entire response data
        console.log('order sataus update is', response.data);

       



        setAlertData({
          type: "success",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
        }, 2000);
        fetchData();
        // Do not navigate here

        // Update the DataContext with the new row.id value
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
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};





//////////////////////////// usecontext to store the row id ////////////////////////////////
const { setRowId } = useContext(RowIdContext);

// // Assuming row.id is set somewhere in your component
// const rowId = row.id; 

// Use setRowId to update the context when navigating to the next screen
const handleLinkClick = (rowId) => {
  setRowId(rowId);
};
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

const [newOrderData, setNewOrderData] = useState(null);
const handleNewOrderClick = () => {
  // Your code to generate a new order, similar to your existing code
  const apiUrl = `${apiLinks}/NewOrder.php`;
  const data = {
    userid: getUser.id,
  };

  console.log(getUser.id);

  const formData = new URLSearchParams(data).toString();

  axios
    .post(apiUrl, formData)
    .then((response) => {
      if (response.data.error === 200) {
        // Log the entire response data
        console.log('Response Data:', response.data);

        const newOrder = {
          id: response.data.message,
        };
        const jsonString = JSON.stringify(newOrder);

        // Log the new order data
        console.log('this is or JSON variable:', jsonString);
        console.log('New Order Data:', newOrder);

        setNewOrderData(newOrder); // Store the new order data
        setAlertData({
          type: "success",
          message: `${response.data.message}`,
        });

        // Do not navigate here

        // Update the DataContext with the new row.id value
        handleLinkClick1(newOrder.id);
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
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const handleLinkClick1 = (rowId) => {
  setRowId(rowId);
};
useEffect(() => {
  if (newOrderData) {
    navigate(`/Order_Category/${newOrderData.id}`);
  }
}, [newOrderData]);




// Log newOrderData outside the function
console.log('Outside handleNewOrderClick:', newOrderData);
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
function formatCurrency(amount) {
  // Format the amount as currency with two decimal places
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}


const [selectedOptions, setSelectedOptions] = useState([]);
// Define the 'index' variable if needed
const index = 0;




return (
  <>
    <div style={{
      position: "relative",
      width: "100%",
      height: "100vh",
      overflow: "hidden",
    }}>
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

      <Header Orderid={Orderid}/>
      <PathHead pageName="Transaction > Order Tracking" />

      <div className="col-12 tracking-container" style={{ color: secondaryColor}}>
        <br />
        <div 
        // style={{ marginLeft: "15%", marginRight: "15%", maxWidth: "70%" }}
        >
          <Row>
            
              <Col xs={12} sm={3} md={3} lg={3} xl={2}>
                <Button
                  className="btn btn-primary"
                  onClick={() => navigate('/MainPage')}
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
              <Col xs={12} sm={3} md={3} lg={3} xl={{ span: 2 }}>
              <Form.Control
        as="select"
        name="FCtgStss"
        value={selectedOption}
        onChange={handleSelectOption}
        style={{ height: '35px', fontWeight: 'bold' }}
      >
        <option value="All">All</option>
        <option value="Pending">Order Pending</option>
        <option value="Received">Order Received</option>
        <option value="InProcess">Order IN Process</option>
        <option value="Dispatch">Order Dispatched</option>
        <option value="Delivered">Order Delivered</option>
      </Form.Control>
              </Col>
              <Col xs={12} sm={3} md={3} lg={3} xl={{ span: 2 ,offset: 6 }}>
    <Form.Control
      type="text"
      placeholder="Name & Phone"
      value={searchText}
      onChange={handleSearchChange}
    />
             </Col>

            </Row>
          <div style={{ fontSize: '12px', width: '100%', overflowX: 'auto' }}>
          <MDBTable scrollY maxHeight="430px" striped bordered small responsive>
  <MDBTableHead>
    <tr>
     
      {data.columns.map((column, columnIndex) => (
        <th
          key={columnIndex}
          style={{
            backgroundColor: primaryColor,
            color: secondaryColor,
            fontWeight: "bold",
            position: "sticky",
            top: -1,
            zIndex: 1,
          }}
        >
          {column.label}
        </th>
      ))}
    </tr>
  </MDBTableHead>
  <MDBTableBody>
  {filteredRows.map((row, index) => {
    const serialNumber = index + 1; // Calculate the serial number

    return (
      <tr key={index}>
        {/* Display the serial number in the first column */}
        <td >{serialNumber}</td>

        <td>{row.id}</td>
        <td>{formatDate(row.torddat)}</td>
        <td>{row.tordtim}</td>
        <td style={{ textAlign: "left" }}>{row.tcstnam}</td>
        <td>{row.tmobnum}</td>
        <td style={{ textAlign: "left" }}>{row.tordadd}</td>
        <td style={{ textAlign: "right" }}>{formatCurrency(row.tordamt)}</td>
        {/* <td>{row.tordsts}</td> */}
        <td>
          <div>
            {row.tordsts === "Pending" ? (
              <Button
                className="btn btn-primary"
                style={{
                  backgroundColor: primaryColor,
                  fontSize: '11px',
                  color: secondaryColor,
                  width: '100%',
                  // marginBottom: '10px',
                  height:'26px',
                }}
              >
                Pending
              </Button>
            ) : row.tordsts === "Order" ? (
              <Button
                className="btn btn-primary"
                style={{
                  backgroundColor: primaryColor,
                  fontSize: '11px',
                  color: secondaryColor,
                  width: '100%',
                  // marginBottom: '10px',
                  height:'26px',
                }}
              >
                Order
              </Button>
            ) : row.tordsts === "InProcess" ? (
              <Button
                className="btn btn-primary"
                style={{
                  backgroundColor: primaryColor,
                  fontSize: '11px',
                  color: secondaryColor,
                  width: '100%',
                  // marginBottom: '10px',
                  height:'26px',
                }}
              >
                InProcess
              </Button>
            ) : row.tordsts === "Dispatch" ? (
              <Button
                className="btn btn-primary"
                style={{
                  backgroundColor: primaryColor,
                  fontSize: '11px',
                  color: secondaryColor,
                  width: '100%',
                  // marginBottom: '10px',
                  height:'26px',
                }}
              >
                Dispatch
              </Button>
            ) : row.tordsts === "Delivered" ? (
              <Button
                className="btn btn-primary"
                style={{
                  backgroundColor: primaryColor,
                  fontSize: '11px',
                  color: secondaryColor,
                  width: '100%',
                  // marginBottom: '10px',
                  height:'26px',
                }}
              >
                Delivered
              </Button>
            ) : row.tordsts === "Received" ? (
              <Button
                className="btn btn-primary"
                style={{
                  backgroundColor: primaryColor,
                  fontSize: '11px',
                  color: secondaryColor,
                  width: '100%',
                  // marginBottom: '10px',
                  height:'26px',
                }}
              >
                Received
              </Button>
            ) : null}
          </div>
        </td>
        {/* Add a column for the corresponding date based on order status */}
        <td>
          {row.tordsts === "Received" && row.tordrsvdt}
          {row.tordsts === "InProcess" && row.tordrinpro}
          {row.tordsts === "Dispatch" && row.torddisp}
          {row.tordsts === "Delivered" && row.tdlvdat}
        </td>

        

        <td>
          <div>
            {row.tordsts === "Pending" || row.tordsts === "Order" ? (
              <Button
                className="btn btn-primary"
                style={{
                  backgroundColor: primaryColor,
                  fontSize: '11px',
                  color: secondaryColor,
                  width: '100%',
                  // marginBottom: '10px',
                  height:'26px',
                }}
                onClick={() => handleReceivedChange(row.id)}
              >
                Received
              </Button>
            ) : row.tordsts === "InProcess" ? (
              <Button
                className="btn btn-primary"
                style={{
                  backgroundColor: primaryColor,
                  fontSize: '11px',
                  color: secondaryColor,
                  width: '100%',
                  height:'26px',
                }}
                onClick={() => handleOrderDispatchChange(row.id)}
              >
                Dispatch
              </Button>
            ) : row.tordsts === "Dispatch" ? (
              <Button
                className="btn btn-primary"
                style={{
                  backgroundColor: primaryColor,
                  fontSize: '11px',
                  color: secondaryColor,
                  width: '100%',
                  // marginBottom: '10px',
                  height:'26px',
                }}
                onClick={() => handleOrderDeliveredChange(row.id)}
              >
                Delivered
              </Button>
            ) : row.tordsts === "Received" ? (
              <Button
                className="btn btn-primary"
                style={{
                  backgroundColor: primaryColor,
                  fontSize: '11px',
                  color: secondaryColor,
                  width: '100%',
                  // marginBottom: '10px',
                  height:'26px',
                }}
                onClick={() => handleOrderInProcessChange(row.id)}
              >
                InProcess
              </Button>
            ) : null}
          </div>
        </td>
      </tr>
    );
  })}
</MDBTableBody>

</MDBTable>


          </div>
          {/* <div style={{ backgroundColor: 'white', position: "fixed", top: "20%", right: "-7%", width: "20%", zIndex: 1000 }}>
      <h4 style={{margin:'2px'}}>Order Status</h4>
      <div >
        <img src={Received} alt="Received" style={{ height: "2.5rem", width: "20%" ,margin:'10px'}} />
        <span>Received</span>
      </div>
      
      <div>
        <img src={Process} alt="Process" style={{ height: "2.5rem", width: "20%" ,margin:'10px'}} />
        <span>In Process</span>
      </div>
      <div>
        <img src={Dispatch} alt="Dispatch" style={{ height: "2.5rem", width: "20%" ,margin:'10px'}} />
        <span>Dispatch</span>
      </div>
      <div>
        <img src={Deliverd} alt="Delivered" style={{ height: "2.5rem", width: "20%" ,margin:'10px'}} />
        <span>Delivered</span>
      </div>
    </div> */}




    
        </div>

        <Footer />
      </div>
      </div>
    </>
  );
};

export default Order_Tracking;




