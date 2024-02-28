import Alert from "@mui/material/Alert";
import axios from "axios";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect ,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {
  // ... other imports ...
  TextField, // Make sure TextField is imported from the correct library
} from "@mui/material";
import Header from "../../../../MainComponent/Header/Header";
import Footer from "../../../../MainComponent/Footer/Footer";
import PathHead from "../../../../MainComponent/PathHead/PathHead";
import Empty from '../../../../../image/empty.png';
// import '../Order/OrderItm.css'
import { Form } from 'react-bootstrap'; 
// import Cart from '../../../image/cart.png'
import { useTheme } from "../../../../../ThemeContext";
import { RowIdContext } from "../../../../../createContext";

const Order_Item = () => {
  const { rowId } = useContext(RowIdContext);

  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const [filteredData, setFilteredData] = useState([]);
  const { primaryColor, secondaryColor } = useTheme();
  const { apiLinks } = useTheme();
  const { categoryId } = useParams();
  const [filterValue, setFilterValue] = useState(""); // Define filterValue and setFilterValue
  const [alertData, setAlertData] = useState(null);
  // const { id } = useParams();
  const imageurl = `${apiLinks}/itemimage/`;
  const [selectedOption, setSelectedOption] = React.useState('');

  const handleMenuItemClick = () => {
    navigate("/Item");
  };
  const [getUser, setUser] = useState();

const oorrdderid = rowId;
  // const handleQuantityChange = (itemIndex, newQuantity) => {
  //   const updatedData = [...filteredData];
  //   updatedData[itemIndex].quantity = parseInt(newQuantity, 10); 
  //   setFilteredData(updatedData);
  // };

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
        const filteredData = apiData.filter((item) => item.tctgcod === categoryId);

        const transformedData = filteredData.map((item) => ({

          id : item.id,
          titmdsc: item.titmdsc,
          dull: item.dull,
          h23_lh23: item.h23_lh23,
          shara_brown: item.shara_brown,
          black_multi : item.black_multi,
          wood_coat: item.wood_coat,
          tctgcod: item.tctgcod,

          // TItmId: item.TItmId,
          // TItmDsc: item.TItmDsc,
          // uom:item.uom,
          // TItmSts: item.TItmSts,
          // TPurRat: item.TPurRat,
          // TSalRat: item.TSalRat,
          // TCtgId: item.TCtgId,
          // TitmTyp: item.TitmTyp,
          // TItmPic: item.TItmPic,
          // itmdis : item.itmdis,
          quantity: 1.00, // Add a quantity property to each item
        }));

        // const columns = [
        //   { label: "Item ID", field: "TItmId", sort: "asc" },
        //   { label: "Desription ", field: "TItmDsc", sort: "asc" },
        //   { label: "Status", field: "TItmSts", sort: "asc" },
        //   { label: "Pur. Rate", field: "TPurRat", sort: "asc" },
        //   { label: "Sale Rate", field: "TSalRat", sort: "asc" },
        //   { label: "Category", field: "TCtgId", sort: "asc" },
        //   { label: "Item Type", field: "TitmTyp", sort: "asc" },
        //   { label: "Pic ", field: "TItmPic", sort: "asc" },
        //   { label: "Edit ", field: "tedtdat", sort: "asc" },
        // ];
        // setData({ column,  rows: transformedData });

        setData({  rows: transformedData });
        setFilteredData(transformedData); // Set filteredData initially

        console.log('orderitem data is :',apiData);
      })
      .catch((error) => console.error(error));
  }, [categoryId]);

  const handleSearchChange = (event) => {
    const searchText = event.target.value.toLowerCase();
    const filteredItems = data.rows.filter((item) =>
      item.titmdsc.toLowerCase().includes(searchText)
    );
    setFilteredData(filteredItems);
    setSearchText(searchText);
  };

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

  const [OrderItem, settotalItem1] = useState([]);

  useEffect(() => {
    fetch(`${apiLinks}/PendingOrder.php`)
      .then((response) => response.json())
      .then((apiData) => {
        const transformedData = apiData.map((item) => ({
            id : item.id,
           
        
        }));
  
        const columns = [
          { label: "Order ID", field: "id", sort: "asc" },
          
          { label: "Edit ", field: "tedtdat", sort: "asc" },
  
  
        ];
  
        // setData({ columns, rows: transformedData });
         
        settotalItem1(apiData.length); 
        console.log('orderid',apiData.length)
      })
      .catch((error) => console.error(error));
  }, []);


  const [cartItems, setCartItems] = useState({
    detail1: {},
    detail2: [],
  });
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
  
    // Get the current cart items from state
    const currentCartItems = [...cartItems.detail2];
  
    // Create an object with the new item details
    const newItem = {
      orderid: oorrdderid,
      id: id,
      description: titmdsc,
      purchase_rate: TPurRat,
      sale_rate: TSalRat,
      discount_rate: itmdis,
      quantity: quantity,
      slratedsc: selectedDropdown, // Add selected dropdown value
    };
  
    // Add the new item to the current cart items
    currentCartItems.push(newItem);
  
    // Create a new response with the updated cart items
    const updatedResponse = {
      ...cartItems,
      detail2: currentCartItems,
    };
  
    // Update the cart items in state
    setCartItems(updatedResponse);
  
    const data = {
      itemid: id,
      itemDec: titmdsc,
      saleRate: saleRate,
      slratedsc: selectedDropdown, // Use the selected dropdown value
      qty: quantity,
      orderid: oorrdderid,
      userid :getUser.id,
    };
  console.log('itemid',id)
  console.log('itemdsc',titmdsc)
  console.log('TSalRat',saleRate)
  console.log('saledescrip',selectedDropdown)
  console.log('qtya',quantity)
  console.log('orderid',oorrdderid) 
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
  
  

  console.log('response: ',cartItems);
   /////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////
 ///////////////////////////CART ICON KA OPER ITEM NUMBER ///////////////////////////////
 /////////////////////////////////////////////////////////////////////////
 useEffect(() => {
  // Retrieve user data from local storage
  const userData = JSON.parse(localStorage.getItem("user"));

  if (userData) {
    setUser(userData);
    console.log(userData);
    fetchMenuItems(userData.id); // Fetch menu items based on user ID from userData
    console.log("user id is", userData.id);
  } else {
    // Handle cases when user data is not available
    console.error("User data not available in local storage.");
  }
}, []);
const [totalItem, settotalItem] = useState([]);

function fetchMenuItems(userID) {
  const apiUrl = `${apiLinks}/Cart_Item.php`;
  const data = {
    userid: userID,
  };

  const formData = new URLSearchParams(data).toString();

  axios
    .post(apiUrl, formData)
    .then((response) => {

      settotalItem(response.data.totalItem);

      console.log("titm total amt ", response.data.titm);
    })
    .catch((error) => {
      // Handle errors
      console.error("Error:", error);
    });
}

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
      
      
      
      <Header id={rowId} screen="OrderItem" />
      {/* <Header id={id}/> */}
      <PathHead pageName="Transaction > Order > Category > Item" />


      <div className="col-12" style={{ color: secondaryColor }}>
        <br />
        <Row style={{marginLeft: '5%',
          marginRight: '5%'}}>
              <Col xs={12} sm={4} md={4} lg={4} xl={2}>
  <Link to={`/Cart_Item/${rowId}`} state={{ cartItems }}>
    <Button
      className="btn btn-primary"
      style={{
        backgroundColor: primaryColor,
        fontSize: '11px',
        color: secondaryColor,
        width: '100%',
        marginBottom: '10px',
      }}
    >
      CheckOut
    </Button>
  </Link>
</Col>

              <Col xs={12} sm={4} md={4} lg={4} xl={2}>
                <Button
                  className="btn btn-primary"
                  onClick={() => navigate(`/Order_Category/${rowId}`)}
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
              {/* <Col xs={12} sm={4} md={4} lg={4} xl={2}>
                <Button
                  className="btn btn-primary"
                  onClick={() => navigate('/CheckOut')}
                  style={{
                    backgroundColor: primaryColor,
                    fontSize: '11px',
                    color: secondaryColor,
                    width: '100%',
                    marginBottom: '10px',
                  }}
                >
                  Check Out
                </Button>
              </Col> */}
              <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 3, offset: 5}}>
    <Form.Control
      type="text"
      placeholder="Search..."
      value={searchText}
      onChange={handleSearchChange}
    />
  </Col>

            </Row>
        <div className={`card-container ${filteredData.length > 0 ? 'cards' : ''}`} 
        style={{
          // Your existing styles for the container div
          marginLeft: '5%',
          marginRight: '5%',
          overflowX: 'hidden', // Hide horizontal overflow
          overflowY: 'auto',
          maxHeight: '67vh',
        }}>
           
          {filteredData.length > 0 ? (
            <>
            
           
            
            <div className={`cards ${filteredData.length > 0 ? "cards-large" : "cards-small"}`}>
              <Row xs={1} md={2} lg={3} xl={4}>
                {filteredData.map((row, index) => (
                  <Col key={index}>
                    <Card style={{ marginBottom:'11px' }}>
                      {/* <Card.Img variant="top" height="140"   src={imageurl + row.TItmPic} /> */}
                      <Card.Body>
                        <Card.Title style={{ fontSize:'17px',fontWeight:'bold' ,height:'40px' }}>{row.titmdsc}</Card.Title>
                        
                      
                        <br  />

                    


                        {/* <Select
  value={selectedOptions[index]} // Set the value to the selected option for this item
  onChange={(event) => handleSelectOption(index, event.target.value)}
  style={{ height: '30px' }}
>

  <MenuItem value="dull">Dull: {row.dull}</MenuItem>
  <MenuItem value="h23_lh23">H23 lh23: {row.h23_lh23}</MenuItem>
  <MenuItem value="wood_coat">Wood Coat: {row.wood_coat}</MenuItem>
  <MenuItem value="shara_brown">Shara Brown: {row.shara_brown}</MenuItem>
  <MenuItem value="black_multi">Black Multi: {row.black_multi}</MenuItem>
</Select>  */}
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
  {/* <TextField
  value={row.quantity.toFixed(2).toString()} // Format the value to two decimal places and convert to a string
  onChange={(e) => handleQuantityChange(index, e.target.value)}
  style={{ width: '50px', fontSize: '11px', marginRight: '10px' }}
/> */}
<TextField
  value={row.quantity.toFixed(2)} // Format the value to two decimal places
  onChange={(e) => handleQuantityChange(index, e.target.value)}
  style={{ width: '100px', fontSize: '11px', marginRight: '10px' }}
/>

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
          </>
        ) : (
          <>
           
            <div style={{marginLeft:'40%',marginTop:'14%'}}>  
              <img
                src={Empty}
                onClick={() => navigate("/Item")}
                style={{ height: "24%", width: "25%", marginRight: "5%" }}
              />
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
    </div>
  </>
);
};

export default Order_Item;






    {/* <div style={{ display: 'flex', alignItems: 'center',fontSize:'11px' }}>
                         
                          <Typography gutterBottom  component="div" style={{ fontSize:'13px' ,fontWeight:'bold'}}>
                            Dull: 
                          </Typography>               
                          <Typography gutterBottom  component="div" style={{ fontSize:'13px' }}>
                            {row.dull}
                          </Typography>
                          
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center',fontSize:'11px' }}>
                         
                          <Typography gutterBottom  component="div" style={{ fontSize:'13px' ,fontWeight:'bold' }}>
                          H23 lh23: 
                          </Typography>               
                          <Typography gutterBottom  component="div" style={{ fontSize:'13px' }}>
                            {row.h23_lh23}
                          </Typography>
                          
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center',fontSize:'11px' }}>
                         
                          <Typography gutterBottom  component="div" style={{ fontSize:'13px',fontWeight:'bold' }}>
                            Wood Coat: 
                          </Typography>               
                          <Typography gutterBottom  component="div" style={{ fontSize:'13px' }}>
                            {row.wood_coat}
                          </Typography>
                          
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center',fontSize:'11px' }}>
                         
                          <Typography gutterBottom  component="div" style={{ fontSize:'13px' ,fontWeight:'bold' }}>
                          Shara Brown: 
                          </Typography>               
                          <Typography gutterBottom  component="div" style={{ fontSize:'13px' }}>
                            {row.shara_brown}
                          </Typography>
                          
                        </div> */}
                        {/* <div style={{ display: 'flex', alignItems: 'center',fontSize:'11px' }}>
                         
                          <Typography gutterBottom  component="div" style={{ fontSize:'13px' ,fontWeight:'bold' }}>
                          Black Multi: 
                          </Typography>               
                          <Typography gutterBottom  component="div" style={{ fontSize:'13px' }}>
                            {row.black_multi}
                          </Typography>
                          
                        </div> */}


