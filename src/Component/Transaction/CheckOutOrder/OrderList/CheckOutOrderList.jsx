import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import Header from "../../../MainComponent/Header/Header";
import Footer from "../../../MainComponent/Footer/Footer";
import PathHead from "../../../MainComponent/PathHead/PathHead";
// import Edit from '../../../../../../image/edit.png';


import axios from "axios";
import Alert from "@mui/material/Alert";
import { useData } from "../../../../DataContext";
import { useParams } from "react-router-dom";

import {
    Card,
    Row,
    Col,
    Button,
    FormControl,
    InputGroup,
  } from "react-bootstrap";
  import { Form } from 'react-bootstrap';
import { useTheme } from "../../../../ThemeContext";
  

const Check_Out_List = () => {
 const { updateOrderData } = useData(); 
 const { id } = useParams();

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

  useEffect(() => {
    fetch(`${apiLinks}/OrderList.php`)
      .then((response) => response.json())
      .then((apiData) => {
        const transformedData = apiData.map((item) => ({
            id : item.id,
            tcstnam : item.tcstnam,
            torddat : item.torddat,
            tordtim : item.tordtim,
            tmobnum : item.tmobnum,
            tordamt : item.tordamt,
            titmqnt : item.titmqnt,
            tcuteml : item.tcuteml,
        
        }));
        const columns = [
          { label: "Order ID", field: "id", sort: "asc" },
          { label: "Name", field: "tcstnam", sort: "asc" },
          { label: "Date", field: "torddat", sort: "asc" },
          { label: "Time", field: "tordtim", sort: "asc" },
          { label: "Mobile#", field: "tmobnum", sort: "asc" },
          { label: "Amount", field: "tordamt", sort: "asc" },
          { label: "Quantity", field: "titmqnt", sort: "asc" },
          { label: "Email", field: "tcuteml", sort: "asc" },
          { label: "View ", field: "tedtdat", sort: "asc" },


        ];

        setData({ columns, rows: transformedData });
         
        console.log('dsfsdfsd',apiData.length); 
        updateOrderData(apiData.length);

      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  ///////////////// here is our Search Function
  const filteredRows = data.rows.filter((row) =>
  row.tcstnam.toLowerCase().includes(searchText.toLowerCase())
);

   /////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////
 ///////////////////////////New ORder id generate ///////////////////////////////
 /////////////////////////////////////////////////////////////////////////
 const [Orderid, setOrderId] = useState(""); 
 const [refreshKey, setRefreshKey] = useState(0);

 function generateOrderid() {
  const apiUrl = `${apiLinks}/NewOrder.php`;

  // Create an empty form data object
  const formData = new URLSearchParams().toString();

  // Make a POST request to the API
  axios
    .post(apiUrl, formData)
    .then((response) => {
      if (response.data.error === 200) {
        setOrderId(response.data.message);

        console.log("Nesss:", response.data.message);
        setAlertData({
          type: "success",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
          // navigate(`/Order_Category`);
        }, 1000);

        // Update the DataContext with the new row.id value
        updateOrderData(response.data.orderid);

        // Store the orderData in localStorage
        // localStorage.setItem("orderData", JSON.stringify(response.data.orderid));
 setRefreshKey((prevKey) => prevKey + 1);

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
      // Handle errors
      console.error("Error:", error);
    });
}

  return (
    <>

<div style={{
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

      <Header Orderid={Orderid}/>
      <PathHead pageName="Transaction > Check Out Orders > Order List" />

      <div className="col-12" style={{ color: secondaryColor}}>
        

        <br />
        <div style={{ marginLeft: "15%", marginRight: "15%", maxWidth: "70%" }}>
      
          <Row >
              
             
              <Col xs={12} sm={4} md={4} lg={4} xl={3}>
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
              
              <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 3, offset: 6 }}>
    <Form.Control
      type="text"
      placeholder="Search..."
      value={searchText}
      onChange={handleSearchChange}
    />
  </Col>

            </Row>
          <div style={{ fontSize: '12px', width: '100%', overflowX: 'auto' }}>
          <MDBTable scrollY maxHeight="380px" striped bordered small responsive>
                <MDBTableHead>
                  <tr>
                    <th
                      style={{
                        backgroundColor: primaryColor,
                        color: secondaryColor,
                        fontWeight: "bold",
                        position: "sticky",
                        top: -1,
                        zIndex: 1,
                      }}
                    >
                      No.
                    </th>
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
                  {filteredRows.map((row, index) => (
                    <tr key={index}>
                      <td style={{ textAlign: "center" }}>{index + 1}</td>
                      {Object.keys(row).map((key, columnIndex) => (
                        <td
                          key={key}
                          style={{
                            textAlign:
                              columnIndex === 1 || columnIndex === 7 ? "left" : "center",
                            width:
                              columnIndex === 1  ? "17%" : "auto",
                          }}
                          
                        >
                          {row[key]}
                        </td>
                      ))}
                      <td>
                        <div>
                          <Link to={`/Check_Out_Cart/${row.id}`}>
                            <button
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                width: "100%",
                                border: `1px solid ${primaryColor}`,
                              }}
                            >
                              View
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
          </div>
        </div>

        <Footer />
      </div>
      </div>
    </>
  );
};

export default Check_Out_List;