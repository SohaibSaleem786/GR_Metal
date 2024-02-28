import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import "../Navbar/Navbar.css";
import axios from "axios";
import { useAuth} from '../../../AuthContext';
import "bootstrap/dist/css/bootstrap.min.css";
import { useTheme } from "../../../ThemeContext";


function NavBar() {

  const { primaryColor,secondaryColor } = useTheme();
  const { navbarHeight ,apiLinks} = useTheme();
  const getWindowWidth = () => window.innerWidth;
  let updatedNavbarHeight = getWindowWidth() > 768 ? navbarHeight : "auto";

  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();
  const [getUser, setUser] = useState();
  // const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Check if the user is logged in
  const { isLoggedIn, userData } = useAuth();
  const [showNavbar, setShowNavbar] = useState(false);

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

  function fetchMenuItems(userID) {
    const apiUrl = `${apiLinks}/get_usrmenu.php`;
    const data = {
      userid: userID,
    };
    const formData = new URLSearchParams(data).toString();

    axios
      .post(apiUrl, formData)
      .then((response) => {
        setMenuItems(response.data);
        console.log("object is ", response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  }
  const handleMenuItemClick = (menuItem) => {
    const routeMapping = {
      // "1-01-00": "/Get_Location",
      "1-01-00": "/Get_Item",
      "1-03-00": "/GetCategory",
      "1-04-00": "/Account_Code_Maintenance",
      "1-05-00": "/Get_UOM",
      "1-06-00": "/Get_Delivery",
      "1-07-00": "/Get_Location",
      "1-08-00": "/Get_MOP",

      "1-14-00": "/login",
      
      
      '2-01-00': "/Order_Number",
      '2-02-00': "/Order_Tracking",
      // '2-02-00': "/Check_Out_List",
      "2-03-00": "/Purchase",

      // "1-09-01": "/Get_Area",
      "3-01-00": "/Daily_Sale_Report",
      "3-02-00": "/Daily_Sale_Detail_Report",
      // "1-09-04": "/Get_Group",
      // "1-09-05": "/Get_Collector",
      // "1-07-00": "/Get_Employee",
      // "1-09-06": "/Get_Customer",
      "4-03-00": "/UserManagement1",
      
      // "4-04-00": "/Get_Item",
      // "4-06-00": "/ItemType",
      // "4-10-00": "/GroupCode",
      // "4-14-00": "/AccountCod",
    };
  
    const route = routeMapping[menuItem.tmencod];
    if (route) {
      navigate(route);
    }
  };
  
  

  ////////////// here is our code return

  function handleMouseEnter(e) {
    e.target.style.backgroundColor = 'rgba(247, 255, 249)';
    e.target.style.color = 'black';
  }
  
  function handleMouseLeave(e) {
    e.target.style.backgroundColor = '';
    e.target.style.color = 'black';
  }
  const subItemLogic = {
    "3-01-00": "3-01",
    "3-02-00": "3-02",
    "3-03-00": "3-03",
    "3-04-00": "3-04",
    "3-05-00": "3-05",
    "3-06-00": "3-06",
    "3-07-00": "3-07",
    // "3-09-00",
    // "3-10-00",
    // "3-12-00",
    // "3-13-00",
  };
  function getMenuItemStyle(item) {
    return {
      fontSize: '12px',     
      height: '16px',
      width: '208px',
      backgroundColor: 'white',
      color: 'black',
      padding: '0 20px',
      margin: '5px 0',
      display: 'block',
      pointerEvents: item.tmenprm === 'Y' ? 'auto' : 'none',
      opacity: item.tmenprm === 'Y' ? 1 : 0.6,
    };
  }
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="" // Use a dark variant for better contrast
      className="custom-navbar" // Add your custom class for styling
      style={{
        paddingRight: "190px",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        height: updatedNavbarHeight, 
      }}
    >
   
      <Container>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setShowNavbar(!showNavbar)}
        />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className={showNavbar ? "show" : ""}
        >
          <Nav className="me-auto justify-content-start">
            

          
          
           {menuItems.map((item) => {
  if (item.tmencod === "1-00-00") {
    return (
      <NavDropdown
        key={item.tmencod}
        className="Dropdown_1 mr-3"
        title={item.tmendsc.trim()}
        id="collasible-nav-dropdown"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {menuItems.map((subItem) => {
          if (subItem.tmencod === "1-09-00") {
            const isEnabled = subItem.tmenprm === 'Y';
            const itemStyle = getMenuItemStyle(subItem);
            const subItems = menuItems.filter(
              (subItem) =>
                subItem.tmencod.startsWith('1-09') &&
                subItem.tmencod !== '1-09-00'
            );
            return (
              <NavDropdown
                key={subItem.tmencod}
                className="SubDropdown_1 mr-3 dropend"
                title={subItem.tmendsc.trim()}
                id="sub-collasible-nav-dropdown"
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "rgba(255, 255, 255)";
                  e.target.style.color = "black";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "";
                  e.target.style.color = "black";
                }}
                style={{ height: '25px', marginTop: '-5px', marginBottom: '10px', fontSize: '14px', marginLeft: '10px' }}
              >
                {subItems.map((subItem) => {
                  const isEnabled = subItem.tmenprm === 'Y';
                  const itemStyle = getMenuItemStyle(subItem);

                  return (
                    <NavDropdown.Item
                      key={subItem.tmencod}
                      href={subItem.tmenurl}
                      style={itemStyle}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = primaryColor;
                        e.target.style.color = secondaryColor;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "";
                        e.target.style.color = "";
                      }}
                      onClick={() => handleMenuItemClick(subItem)}
                    >
                      {subItem.tmendsc.trim()}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
            );
          } else if (subItem.tmencod.startsWith('1-') && subItem.tmencod !== '1-00-00' 
          && subItem.tmencod.endsWith('-00')) {
            const itemStyle = getMenuItemStyle(subItem);
            return (
              <Nav.Link
                key={subItem.tmencod}
                href={subItem.tmenurl}
                onClick={() => handleMenuItemClick(subItem)}
                style={itemStyle}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = primaryColor;
                  e.target.style.color = secondaryColor;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "";
                  e.target.style.color = "";
                }}
                // style={{ height:'25px',fontSize:'14px',padding:'5px'}}
              >
                {subItem.tmendsc.trim()}
              </Nav.Link>
            );
          }
          return null;
        })}
      </NavDropdown>
    );
  }
  return null;
           })}


            



            {menuItems.map((item) => {
            if (item.tmenprm === 'Y') {
            if (item.tmencod === '2-00-00') {
            const subItems = menuItems.filter(
              (subItem) =>
                subItem.tmencod.startsWith('2-') &&
                subItem.tmencod !== '2-00-00'
            );

            return (
              <NavDropdown
                key={item.tmencod}
                className="Dropdown_1 mr-3"
                title={item.tmendsc.trim()}
                id="collapsible-nav-dropdown"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {subItems.map((subItem) => {
                  const isEnabled = subItem.tmenprm === 'Y';
                  const itemStyle = getMenuItemStyle(subItem);

                  return (
                    <NavDropdown.Item
                      key={subItem.tmencod}
                      href={subItem.tmenurl}
                      style={itemStyle}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = primaryColor;
                        e.target.style.color = secondaryColor;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "";
                        e.target.style.color = "";
                      }}
                      onClick={() => handleMenuItemClick(subItem)}
                    >
                      {subItem.tmendsc.trim()}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
            );
          }
          return null;
        }
        return null;
            })}
            
           

           

            {menuItems.map((item) => {
  if (item.tmencod === "3-00-00") {
    return (
      <NavDropdown
        key={item.tmencod}
        className="Dropdown_1 mr-3"
        title={item.tmendsc.trim()}
        id="collasible-nav-dropdown"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {menuItems.map((subItem) => {
          if (subItem.tmencod === "1-09-00") {
            const isEnabled = subItem.tmenprm === 'Y';
            const itemStyle = getMenuItemStyle(subItem);
            const subItems = menuItems.filter(
              (subItem) =>
                subItem.tmencod.startsWith('1-09') &&
                subItem.tmencod !== '1-09-00'
            );
            return (
              <NavDropdown
                key={subItem.tmencod}
                className="SubDropdown_1 mr-3 dropend"
                title={subItem.tmendsc.trim()}
                id="sub-collasible-nav-dropdown"
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "rgba(255, 255, 255)";
                  e.target.style.color = "black";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "";
                  e.target.style.color = "black";
                }}
                style={{ height: '25px', marginTop: '-5px', marginBottom: '10px', fontSize: '14px', marginLeft: '10px' }}
              >
                {subItems.map((subItem) => {
                  const isEnabled = subItem.tmenprm === 'Y';
                  const itemStyle = getMenuItemStyle(subItem);

                  return (
                    <NavDropdown.Item
                      key={subItem.tmencod}
                      href={subItem.tmenurl}
                      style={itemStyle}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = primaryColor;
                        e.target.style.color = secondaryColor;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "";
                        e.target.style.color = "";
                      }}
                      onClick={() => handleMenuItemClick(subItem)}
                    >
                      {subItem.tmendsc.trim()}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
            );
          } else if (subItem.tmencod.startsWith('3-') && subItem.tmencod !== '3-00-00' 
          && subItem.tmencod.endsWith('-00')) {
            const itemStyle = getMenuItemStyle(subItem);
            return (
              <Nav.Link
                key={subItem.tmencod}
                href={subItem.tmenurl}
                onClick={() => handleMenuItemClick(subItem)}
                style={itemStyle}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = primaryColor;
                  e.target.style.color = secondaryColor;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "";
                  e.target.style.color = "";
                }}
                // style={{ height:'25px',fontSize:'14px',padding:'5px'}}
              >
                {subItem.tmendsc.trim()}
              </Nav.Link>
            );
          }
          return null;
        })}
      </NavDropdown>
    );
  }
  return null;
           })}
            
            {menuItems.map((item) => {
            if (item.tmenprm === 'Y') {
            if (item.tmencod === '4-00-00') {
            const subItems = menuItems.filter(
              (subItem) =>
                subItem.tmencod.startsWith('4-') &&
                subItem.tmencod !== '4-00-00'
            );

            return (
              <NavDropdown
                key={item.tmencod}
                className="Dropdown_1 mr-3"
                title={item.tmendsc.trim()}
                id="collapsible-nav-dropdown"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {subItems.map((subItem) => {
                  const isEnabled = subItem.tmenprm === 'Y';
                  const itemStyle = getMenuItemStyle(subItem);

                  return (
                    <NavDropdown.Item
                      key={subItem.tmencod}
                      href={subItem.tmenurl}
                      style={itemStyle}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = primaryColor;
                        e.target.style.color = secondaryColor;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "";
                        e.target.style.color = "";
                      }}
                      onClick={() => handleMenuItemClick(subItem)}
                    >
                      {subItem.tmendsc.trim()}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
            );
          }
          return null;
        }
        return null;
            })}



          </Nav>
        </Navbar.Collapse>
      </Container>
      
    </Navbar>
  );
}

export default NavBar;



