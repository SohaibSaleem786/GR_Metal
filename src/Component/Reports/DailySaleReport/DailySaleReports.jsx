import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import Header from "../../MainComponent/Header/Header";
import Footer from "../../MainComponent/Footer/Footer";
import PathHead from "../../MainComponent/PathHead/PathHead";
// import Edit from '../../../../image/edit.png';
import { Form } from 'react-bootstrap'; 
import Empty from '../../../image/empty.png';
// import Bin from '../../../../../../../image/bin.png';
import Alert from "@mui/material/Alert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../DailySaleReport/DailySaleReports.css';
import "react-calendar/dist/Calendar.css"; // Import the CSS for styling

import {
  Card,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import axios from "axios";
import { useTheme } from "../../../ThemeContext";
import { useParams } from "react-router-dom";

const Daily_Sale_Report = () => {
    const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize with today's date

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
    const formattedDate = selectedDate.toISOString().split("T")[0]; // Convert selected date to 'yyyy-MM-dd' format
    const apiUrl = `${apiLinks}/DailySaleReport.php`;
    const formData = new URLSearchParams({ date: formattedDate }).toString();
  
    axios
      .post(apiUrl, formData)
      .then((response) => {
        setTableData({
          columns: [], // Update with your columns data
          rows: response.data.detail, // Update with your rows data
        });
  
        settamtItems(response.data.totalamt);
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
  item.id.toLowerCase().includes(searchText.toLowerCase())
) : [];






  ///////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////
  //////////////////// DELETE ITEM api ////////////////////////
  ///////////////////////////////////////////////////////////
  const [tableData, setTableData] = useState({ columns: [], rows: [] });



  
  
  useEffect(() => {
    fetchMenuItems(); // Call fetchMenuItems when selectedDate changes
  }, [selectedDate]);

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
      <Header id={id} />
      <PathHead pageName="Reports > Sale Reports > Daily Sale Reports " />

      


    <div style={{marginLeft:'16%',marginRight:'16%',marginTop:'3%'}}>
    <Row>
    <Col xs={12} sm={4} md={4} lg={4} xl={2}>
  <DatePicker
  style={{textAlign:'center'}}
    selected={selectedDate}
    onChange={(date) => setSelectedDate(date)}
    dateFormat="yyyy-MM-dd"
    className="custom-datepicker"
  />
</Col>

            
            <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 2 }}>
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
          <div className="col-12" style={{ color: secondaryColor }} >
        <div style={{ marginLeft: "15%", marginRight: "15%", maxWidth: "70%" }}>
         
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
                      backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold"
                    }}>No. </th>
                    {/* <th style={{
                      backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}>Id</th> */}
                    <th style={{
                      backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold"
                    }}>Order Id</th>
                    <th style={{
                      backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold"
                    }}>Customer Name</th>
                    <th style={{
                      backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold"
                    }}>Mobile Number</th>
                    <th style={{
                      backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold"
                    }}>Order Address</th>
                    <th style={{
                      backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold"
                    }}>Order Time</th>
                    
                    <th style={{
                      backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold"
                    }}>Item Quantity</th>
                    
                    <th style={{
                      backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold",width:'90px'
                    }}>Order Amt</th>
                    
                  
                  
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
            {filteredRows.map((item, index) => {
              const row = {
                rowNumber: rowNumber + index + 1, // Calculate row number
                ...item, // Include other row data
              };


              return (
                <tr key={index}>
                  <td>{row.rowNumber}</td>
                  {/* <td>{item.id}</td> */}
                        <td style={{ width: "7%" }}>{item.id}</td>
                        <td style={{ textAlign: "left" }}>{item.tcstnam}</td>
                        <td>{item.tmobnum}</td>
                        <td style={{ textAlign: "left" }}>{item.tordadd}</td>
                        <td >{item.tordtim}</td>
                        <td>{item.titmqnt}</td>
                        <td >{item.tordamt}</td>
                  
                  
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
      
        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
          <h6>Total Amount: {tamtItems}</h6>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
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
                // onClick={() => navigate(`/Order_Category/${id}`)}
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

export default Daily_Sale_Report;







