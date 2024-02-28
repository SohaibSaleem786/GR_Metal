import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';
import {  CardContent, Typography } from '@mui/material';
import Edit from '../../../../image/edit.png'; // Ensure 'Edit' is imported from the correct path
import TextField from '@mui/material/TextField';
import {   CardColumns } from 'react-bootstrap'; 
import React, { useState, useEffect ,useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions'; // Add this import
import Header from '../../../MainComponent/Header/Header';
import Footer from '../../../MainComponent/Footer/Footer';
import PathHead from '../../../MainComponent/PathHead/PathHead';
import { useTheme } from '../../../../ThemeContext';
import { Form } from 'react-bootstrap'; // Add this import at the beginning of your file
import axios from 'axios';
import '../OrderCtg/OrderCtg.css'
import {
  Row,
  Col,
  FormControl,
  InputGroup,
  Card,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { RowIdContext } from '../../../../createContext';
const Order_Category = () => {
  const { rowId } = useContext(RowIdContext);

  const navigate = useNavigate();
  const { primaryColor, secondaryColor, apiLinks } = useTheme();
  const imageurl = `${apiLinks}/ctgImg/`;

  const [alertData, setAlertData] = useState(null);
  const { id } = useParams();

  const handleMenuItemClick = () => {
    navigate('/AddCategory');
  };

  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  const [filterValue, setFilterValue] = useState('');
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.crystalsolutions.com.pk/grmetal/get_category.php');
        if (!response.ok) {
          throw new Error(`Failed to fetch data from ${response.url}. Status: ${response.status} ${response.statusText}`);
        }
  
        const apiData = await response.json();
        console.log('Category data:', apiData); // Debug statement
        setData(apiData);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.crystalsolutions.com.pk/grmetal/get_item.php');
        if (!response.ok) {
          throw new Error(`Failed to fetch data from ${response.url}. Status: ${response.status} ${response.statusText}`);
        }
        
  
        const apiData = await response.json();
        console.log('Item data:', apiData); // Debug statement
        setData1(apiData);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);
  
  const handleCardClick = (item) => {
    // Pass the selected category ID to the Item component
    navigate(`/Order_Item/${item.tctgid}`);
  };


  /////////////////////////////////////////////////////////////////////////
 /////////////////////////////////////////////////////////////////////////
 ///////////////////////////New ORder id generate ///////////////////////////////
 /////////////////////////////////////////////////////////////////////////
 const [Orderid, setOrderId] = useState(""); 
 function generateOrderid() {
  const apiUrl = `${apiLinks}/NewOrder.php`;
  
  // Create an empty form data object
  const formData = new URLSearchParams().toString();

  // Make a POST request to the API
  axios
    .post(apiUrl, formData)
    .then((response) => {
        if (response.data.error === 200) {
            setOrderId(response.data.orderid);

      console.log("New Order id generated:", response.data.orderid);
          setAlertData({
            type: "success",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
          }, 1000);
          
        }
         else {
          console.log(response.data.message);

          setAlertData({
            type: "error",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
          }, 2000);
        }
        // navigate("/Item");

      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });

  
}
const [selectedCategory, setSelectedCategory] = useState('Category List');
// Other state variables you may have

// Define a function to handle the change in the dropdown selection
const [view, setView] = useState('card'); // Initialize the default view as 'table'

const handleChangeView = (e) => {
  setView(e.target.value);
};


const [filteredData, setFilteredData] = useState([]);





//////////////////////////// orderitwm


const [getUser, setUser] = useState();

useEffect(() => {
  const userData = JSON.parse(localStorage.getItem("user"));

  if (userData) {
    setUser(userData);
    // handleAddToCart();
    console.log(userData);
    console.log("user id is", userData.id);
  } else {
    console.error("User data not available in local storage.");
  }
}, []);
const handleQuantityChange = (itemIndex, newValue) => {
  const updatedData = [...filteredData];
  // Parse the new value as a float
  const parsedValue = parseFloat(newValue);
  // Check if the parsed value is a valid number
  if (!isNaN(parsedValue)) {
    updatedData[itemIndex].quantity = parsedValue;
    setFilteredData(updatedData);
  }
};
useEffect(() => {
  fetch(`${apiLinks}/get_item.php`)
    .then((response) => response.json())
    .then((apiData) => {

      const transformedData = apiData.map((item) => ({

        id : item.id,
        titmdsc: item.titmdsc,
        dull: item.dull,
        h23_lh23: item.h23_lh23,
        shara_brown: item.shara_brown,
        black_multi : item.black_multi,
        wood_coat: item.wood_coat,
        tctgcod: item.tctgcod,

    
        quantity: 1.00, // Add a quantity property to each item
      }));

     

      setData2({   apiData});
      setFilteredData(transformedData); // Set filteredData initially
      console.log('sdfsdfsdfsftransformedDatasfsdfsdffsf',transformedData)  
      console.log('orderitem data is :',apiData);
    })
    .catch((error) => console.error(error));
}, []);
const handleDecrement = (itemIndex) => {
  const updatedData = [...filteredData];
  if (updatedData[itemIndex].quantity > 0) {
    updatedData[itemIndex].quantity -= 100;
    setFilteredData(updatedData);
  }
};

const handleIncrement = (itemIndex) => {
  const updatedData = [...filteredData];
  updatedData[itemIndex].quantity += 100;
  setFilteredData(updatedData);
};


const [selectedOptions, setSelectedOptions] = useState([]);

// Initialize selectedOptions for each item in your data
useEffect(() => {
  const initialSelectedOptions = filteredData.map(() => "dull"); // Set "dull" as the default value for each item
  setSelectedOptions(initialSelectedOptions);
}, [filteredData]);




const handleSelectOption = (index, selectedOption) => {
  const updatedOptions = [...selectedOptions];
  updatedOptions[index] = selectedOption;
  setSelectedOptions(updatedOptions);
};
function handleAddToCart(item, selectedDropdown, row) {
  const { id, titmdsc, TPurRat, TSalRat, quantity, itmdis } = item;
  // Create a function to map selectedDropdown to the price
  const getPriceForSelectedDropdown = (selectedDropdown) => {
    switch (selectedDropdown) {
      case "dull":
        return row.dull;
      case "h23_lh23":
        return row.h23_lh23;
      case "wood_coat":
        return row.wood_coat;
      case "shara_brown":
        return row.shara_brown;
      case "black_multi":
        return row.black_multi;
      default:
        return 0; // Handle this case as needed
    }
  };

  // Get the price for the selected dropdown
  const saleRate = getPriceForSelectedDropdown(selectedDropdown);

  // const currentCartItems = [...cartItems.detail2];

  // Create an object with the new item details
  

  // Add the new item to the current cart items

  // Create a new response with the updated cart items
  // const updatedResponse = {
  //   ...cartItems,
  //   detail2: currentCartItems,
  // };

  // Update the cart items in state

  const data = {
    itemid: id,
    itemDec: titmdsc,
    saleRate: saleRate,
    slratedsc: selectedDropdown, // Use the selected dropdown value
    qty: quantity,
    orderid: rowId,
    userid :getUser.id,
  };
console.log('itemid',id)
console.log('itemdsc',titmdsc)
console.log('TSalRat',saleRate)
console.log('saledescrip',selectedDropdown)
console.log('qtya',quantity)
console.log('orderid',rowId) 
console.log('userid',getUser.id) 


  const formData = new URLSearchParams(data).toString();

  axios
    .post(`${apiLinks}/Add_Cart.php`, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((response) => {
      if (response.data.error === 200) {
        setAlertData({
          type: "success",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
          // navigate("/Order_Item");
        }, 1000);
        console.log('our data is here add to cart data ',response.data);
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
    // <div className="col-12">
    <>
      {/* <Header id={id}/> */}
      <Header id={rowId} screen="OrderCategory" />

      <PathHead pageName="Transaction > Order > Category" />
<br />
      <Row>
      <Col xs={12} sm={3} md={3} lg={3} xl={{ span: 2 ,offset:8 }}>
      <Form.Control
        as="select"
        name="FCtgStss"
        style={{ height: '35px', width: '130px', marginLeft: '60px', fontWeight: 'bold' }}
        onChange={handleChangeView}
      >
        <option value="card">Category Card</option>

        <option value="table">Category List</option>
        <option value="Item_tbl">Item List</option>
        <option value="Item_card">Item Card</option>

      </Form.Control>
              </Col>
      </Row>
      <Row style={{marginLeft: '5%', marginRight: '5%'}}>
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
                  ADD
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
             
              <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 2, offset: 6 }}>
    <Form.Control
     
      type="text"
      placeholder="Search..."
      className="form-control"
      value={filterValue}
      onChange={(e) => setFilterValue(e.target.value)}
    />
  </Col>

            </Row>


            {view === 'card' ? (
  <div
    className="card-container"
    style={{
      marginLeft: '5%',
      marginRight: '5%',
      overflowX: 'hidden',
      overflowY: 'auto',
      maxHeight: '65vh',
    }}
  >
    <div>
      <div className="cards" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {data
          .filter((item) =>
            item.tctgdsc.toLowerCase().includes(filterValue.toLowerCase())
          )
          .filter((item) => item.tctgsts === 'Y')
          .map((item) => (
            <Card
              key={item.id}
              // sx={{
                // maxWidth: 345,
                // margin: '8px',
                // width: '18.5%',
                // backgroundColor: primaryColor,              }}
              style={{

                maxWidth: 345,
                margin: '8px',
                width: '18.5%',
                backgroundColor: primaryColor,   

              }}
            >
              <CardContent
                style={{
                  color: secondaryColor,
                  height: '100px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Link
                  to={`/Order_Item/${item.id}`}
                  style={{ textDecoration: 'none', color: secondaryColor }}
                >
                  <Typography
                    gutterBottom
                    component="div"
                    style={{
                      fontSize: '18px',
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}
                  >
                    {item.tctgdsc}
                  </Typography>
                </Link>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  </div>
) : view === 'table' ? (
  <div style={{ fontSize: '12px', width: '40%', marginLeft: '30%', marginRight: '30%', overflowX: 'auto' }}>
    <MDBTable scrollY maxHeight="380px" striped bordered small responsive>
      <MDBTableHead>
        <tr>
          <th
            style={{
              backgroundColor: primaryColor,
              color: secondaryColor,
              fontWeight: 'bold',
              position: 'sticky',
              top: '-1px',
              zIndex: 1,
              width: '6%',
            }}
          >
            ID
          </th>
          <th
            style={{
              backgroundColor: primaryColor,
              color: secondaryColor,
              fontWeight: 'bold',
              position: 'sticky',
              top: '-1px',
              zIndex: 1,
              width: '43%',
            }}
          >
            Description
          </th>
          <th
            style={{
              backgroundColor: primaryColor,
              color: secondaryColor,
              fontWeight: 'bold',
              position: 'sticky',
              top: '-1px',
              zIndex: 1,
              width: '15%',
            }}
          >
            Status
          </th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {data
         .filter((item) =>
         item.tctgdsc.toLowerCase().includes(filterValue.toLowerCase())
       )
        .map((row, index) => (
          <tr key={index}>
            <td>{row.id}</td>
            <td style={{textAlign:'left'}}>{row.tctgdsc}</td>
            <td>{row.tctgsts}</td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  </div>
) : view === 'Item_tbl' ? (
  <div style={{ fontSize: '12px', width: '70%', marginLeft: '15%', marginRight: '15%', overflowX: 'auto' }}>
  <MDBTable scrollY maxHeight="380px" striped bordered small responsive>
    <MDBTableHead>
      <tr>
        <th
          style={{
            backgroundColor: primaryColor,
            color: secondaryColor,
            fontWeight: 'bold',
            position: 'sticky',
            top: '-1px',
            zIndex: 1,
            width: '6%',
          }}
        >
          ID
        </th>
        <th
          style={{
            backgroundColor: primaryColor,
            color: secondaryColor,
            fontWeight: 'bold',
            position: 'sticky',
            top: '-1px',
            zIndex: 1,
            width: '23%',
          }}
        >
          Description
        </th>
        <th
          style={{
            backgroundColor: primaryColor,
            color: secondaryColor,
            fontWeight: 'bold',
            position: 'sticky',
            top: '-1px',
            zIndex: 1,
          }}
        >
          Dull
        </th>
        <th
          style={{
            backgroundColor: primaryColor,
            color: secondaryColor,
            fontWeight: 'bold',
            position: 'sticky',
            top: '-1px',
            zIndex: 1,
          }}
        >
          H23 lH23
        </th>
        <th
          style={{
            backgroundColor: primaryColor,
            color: secondaryColor,
            fontWeight: 'bold',
            position: 'sticky',
            top: '-1px',
            zIndex: 1,
          }}
        >
          Shara Brown
        </th>

        <th
          style={{
            backgroundColor: primaryColor,
            color: secondaryColor,
            fontWeight: 'bold',
            position: 'sticky',
            top: '-1px',
            zIndex: 1,
          }}
        >
          Black Multi
        </th>

        <th
          style={{
            backgroundColor: primaryColor,
            color: secondaryColor,
            fontWeight: 'bold',
            position: 'sticky',
            top: '-1px',
            zIndex: 1,
          }}
        >
          Wood Coat
        </th>
        <th
          style={{
            backgroundColor: primaryColor,
            color: secondaryColor,
            fontWeight: 'bold',
            position: 'sticky',
            top: '-1px',
            zIndex: 1,
          }}
        >
          Category Id
        </th>
      </tr>
    </MDBTableHead>
    <MDBTableBody>
      {data1
      
      .filter((item) =>
         item.titmdsc.toLowerCase().includes(filterValue.toLowerCase())
       )
      .map((row, index) => (
        <tr key={index}>
          <td>{row.id}</td>
          <td style={{  textAlign:'left'}}>{row.titmdsc}</td>
          <td style={{  textAlign:'right'}}>{row.dull}</td>
          <td style={{  textAlign:'right'}}>{row.h23_lh23}</td>
          <td style={{  textAlign:'right'}}>{row.shara_brown}</td>
          <td style={{  textAlign:'right'}}>{row.black_multi}</td>
          <td style={{  textAlign:'right'}}>{row.wood_coat}</td>
          <td>{row.tctgcod}</td>
        </tr>
      ))}
    </MDBTableBody>
  </MDBTable>
</div>
) : view === 'Item_card' ? (



<div className={`card-container `} 
        style={{
          marginLeft: '5%',
          marginRight: '5%',
          overflowX: 'hidden', // Hide horizontal overflow
          overflowY: 'auto',
          maxHeight: '67vh',
        }}>
  <div >
   
   
   
   <Row xs={1} md={2} lg={3} xl={4}>
   {data1
   
   .filter((item) =>
            item.titmdsc.toLowerCase().includes(filterValue.toLowerCase())
          )
          // .filter((item) => item.tctgsts === 'Y')
   
   
   .map((row, index) => (
                  <Col key={index}>
                    <Card style={{ marginBottom:'11px' }}>
                      {/* <Card.Img variant="top" height="140"   src={imageurl + row.TItmPic} /> */}
                      <Card.Body>
                        <Card.Title style={{ fontSize:'17px',fontWeight:'bold' ,height:'40px' }}>{row.titmdsc}</Card.Title>
                        
                      
                        <br  />

                    


                        
                        <Form.Control
  as="select"
  name="FCtgStss"
  value={selectedOptions[index]} // Use the selected option from the state
  onChange={(event) => handleSelectOption(index, event.target.value)}
  style={{ height: '40px',fontWeight:'bold' }}
>
  <option value="dull">Dull: {row.dull}</option>
  <option value="h23_lh23">H23 lh23: {row.h23_lh23}</option>
  <option value="wood_coat">Wood Coat: {row.wood_coat}</option>
  <option value="shara_brown">Shara Brown: {row.shara_brown}</option>
  <option value="black_multi">Black Multi: {row.black_multi}</option>
</Form.Control>


                      

                      </Card.Body>
                      <div style={{ borderTop: '1px solid #e0e0e0', padding: '8px', marginTop: 'auto' }}>
                        <CardActions style={{ justifyContent: 'space-between' }}>
                        <Button
  variant="contained"
  style={{
    width: '130px',
    height: '30px',
    fontSize: '9px',
    backgroundColor: primaryColor,
    color: secondaryColor,
    marginRight: '10px',
    minWidth: '0',
    padding: '0',
  }}
  onClick={() => handleAddToCart(row, selectedOptions[index], row)}
>
  Add to Cart
</Button>

                          <div style={{ display: 'flex', alignItems: 'center' }}>
  <Button
    variant="contained"
    style={{
      width: '25px',
      height: '25px',
      backgroundColor: primaryColor,
      color: secondaryColor,
      borderRadius: '50%',
      marginRight: '10px',
      minWidth: '0',
      padding: '0',
    }}
    onClick={() => handleDecrement(index)}
  >
    -
  </Button>
 
<TextField
  value={row.quantity !== undefined ? row.quantity.toFixed(2) : '0.00'}
  onChange={(e) => handleQuantityChange(index, e.target.value)}
  style={{ width: '100px', fontSize: '11px', marginRight: '10px' }}
/>
{/* <TextField
  value={row.quantity !== undefined ? row.quantity.toFixed(2) : ''}
  onChange={(e) => handleQuantityChange(index, e.target.value)}
  style={{ width: '100px', fontSize: '11px', marginRight: '10px' }}
/> */}


  <Button
    variant="contained"
    style={{
      width: '25px',
      height: '25px',
      backgroundColor: primaryColor,
      color: secondaryColor,
      borderRadius: '50%',
      minWidth: '0',
      padding: '0',
    }}
    onClick={() => handleIncrement(index)}
  >
    +
  </Button>
</div>

                        </CardActions>
                      </div>
                    </Card>
                  </Col>
                ))}
   
   </Row>
   
   
   
   
   
   
   
   
   
   
   
   
   
</div>
</div>
): null}
























   
      <Footer />
      </>
  
  );
};

export default Order_Category;
