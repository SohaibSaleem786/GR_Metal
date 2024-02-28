// import Cart from '../../../image/cart.png';
// import logo from '../../../image/logo.png';
// import "../Header/Header.css";
// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
// import moment from "moment";
// import { useNavigate } from "react-router-dom";
// import { useTheme } from '../../../ThemeContext';
// import {
//   Card,
//   Row,
//   Col,
//   Button,
//   FormControl,
//   InputGroup,
// } from "react-bootstrap";
// import axios from 'axios';
// import { useData } from '../../../DataContext';

// function Header( { id }) {
//   const navigate = useNavigate();
//   const { primaryColor,secondaryColor } = useTheme();
//   const [getUser, setUser] = useState();
//   const { apiLinks } = useTheme();

//   const handleLogout = () => {
//     // Remove user data from local storage
//     localStorage.removeItem("user");

//     // Redirect to the login page
//     navigate("/login");
//   };
//   useEffect(() => {
//     // Retrieve user data from local storage
//     const userData = JSON.parse(localStorage.getItem("user"));

//     if (userData) {
//       setUser(userData);
//       console.log(userData);
//       console.log("user id is", userData.userid); // Updated to access the 'id' property
//     } else {
//       // Handle cases when user data is not available
//       console.error("User data not available in local storage.");
//     }
//   }, []);

//      /////////////////////////////////////////////////////////////////////////
//     /////////////////////////////////////////////////////////////////////////
//  ///////////////////////////CART ICON KA OPER ITEM NUMBER ///////////////////////////////
//  /////////////////////////////////////////////////////////////////////////
//  const { orderData } = useData();

 
//  useEffect(() => {
//   // Retrieve user data from local storage
//   const userData = JSON.parse(localStorage.getItem("user"));

//   if (userData) {
//     setUser(userData);
//     console.log(userData);
//     // fetchMenuItems(userData.id); // Fetch menu items based on user ID from userData
//     console.log("user id is", userData.id);
//   } else {
//     // Handle cases when user data is not available
//     console.error("User data not available in local storage.");
//   }
// }, []);
// const [totalItems, settotalItem] = useState([]);


// useEffect(() => {
//   fetch(`${apiLinks}/PendingOrder.php`)
//     .then((response) => response.json())
//     .then((apiData) => {
//       const transformedData = apiData.map((item) => ({
//           id : item.id,
         
      
//       }));

//       const columns = [
//         { label: "Order ID", field: "id", sort: "asc" },
        
//         { label: "Edit ", field: "tedtdat", sort: "asc" },


//       ];

//       // setData({ columns, rows: transformedData });
       
//       settotalItem(apiData.length); 
//     })
//     .catch((error) => console.error(error));
// }, []);
// const totalItem = totalItems; // Replace with your actual total item count

//   return (
//  <>
//     <header
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         padding: "5px",
//       }}
//     >
//       <div style={{ display: "flex", alignItems: "center" }}>
//         <img
//           src={logo}
//           alt="Company Logo"
//           style={{ height: "50px", marginRight: "20px" }}
//         />
//         <h1 style={{ fontSize: "40px", margin: "0", color: primaryColor }}>
//           Crystal Solution
//         </h1>
//       </div>
     
//       <div style={{ display: "flex", alignItems: "center" }}>
//         <h7>
//         Orderid: {id}
//         </h7>

      
//         <h5 style={{ fontSize: "14px", margin: "0",marginLeft: "10px" }}>
//           {moment().format("L")}
//         </h5>
//         <div className="btn-group">
//           <button
//             className="btn"
//             style={{ fontSize: "14px" }}
//             data-bs-toggle="dropdown"
//             aria-expanded="false"
//           >
//             <FontAwesomeIcon icon={faEllipsisV} />
//           </button>
//           <ul className="dropdown-menu dropdown-menu-left">
//             <li>
//               <a
//                 className="dropdown-item"
//                 href="#"
//                 onMouseEnter={(e) => {
//                   e.target.style.backgroundColor = primaryColor;
//                   e.target.style.color = secondaryColor;
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.backgroundColor = "";
//                   e.target.style.color = "";
//                 }}
//               >
//                 {getUser && getUser.tusrid}
//               </a>
//             </li>
//             <li>
//               <a
//                 className="dropdown-item"
//                 href="#"
//                 onMouseEnter={(e) => {
//                   e.target.style.backgroundColor = primaryColor;
//                   e.target.style.color = secondaryColor;
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.backgroundColor = "";
//                   e.target.style.color = "";
//                 }}
//                 onClick={handleLogout}
//               >
//                 Logout
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </header>
//  </>
//   );
// }

// export default Header;






import Cart from '../../../image/cart.png';
import logo from '../../../image/logo.png';
import "../Header/Header.css";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useTheme } from '../../../ThemeContext';
import {
  Card,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import axios from 'axios';
import { useData } from '../../../DataContext';

function Header( { id ,screen }) {
  const navigate = useNavigate();
  const { primaryColor,secondaryColor } = useTheme();
  const [getUser, setUser] = useState();
  const { apiLinks } = useTheme();

  const handleLogout = () => {
    // Remove user data from local storage
    localStorage.removeItem("user");

    // Redirect to the login page
    navigate("/login");
  };
  useEffect(() => {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      setUser(userData);
      console.log(userData);
      console.log("user id is", userData.userid); // Updated to access the 'id' property
    } else {
      // Handle cases when user data is not available
      console.error("User data not available in local storage.");
    }
  }, []);

     /////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////
 ///////////////////////////CART ICON KA OPER ITEM NUMBER ///////////////////////////////
 /////////////////////////////////////////////////////////////////////////
 const { orderData } = useData();

 
 useEffect(() => {
  // Retrieve user data from local storage
  const userData = JSON.parse(localStorage.getItem("user"));

  if (userData) {
    setUser(userData);
    console.log(userData);
    // fetchMenuItems(userData.id); // Fetch menu items based on user ID from userData
    console.log("user id is", userData.id);
  } else {
    // Handle cases when user data is not available
    console.error("User data not available in local storage.");
  }
}, []);
const [totalItems, settotalItem] = useState([]);


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
       
      settotalItem(apiData.length); 
    })
    .catch((error) => console.error(error));
}, []);
const totalItem = totalItems; // Replace with your actual total item count

  return (
 <>
    <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "5px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="Company Logo"
            style={{ height: "50px", marginRight: "20px" }}
          />
          <h1 style={{ fontSize: "35px", margin: "0", color: primaryColor }}>
            Crystal Solution
          </h1>
        </div>

        {screen === "CartItem" || screen === "OrderCategory" || screen === "OrderItem" || screen === "Checkout" ? (
          <div style={{marginLeft:'780px'}}>
            <h7>
              Orderid: {id}
            </h7>
          </div>
        ) : null}

        
        <div className="btn-group">
        <h5 style={{ fontSize: "14px", marginTop: "10px" }}>
          {moment().format("DD/MM/YYYY")
}
        </h5>
          <button
            className="btn"
            style={{ fontSize: "14px" }}
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
          <ul className="dropdown-menu dropdown-menu-left">
            <li>
              <a
                className="dropdown-item"
                href="#"
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = primaryColor;
                  e.target.style.color = secondaryColor;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "";
                  e.target.style.color = "";
                }}
              >
                {getUser && getUser.tusrid}
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = primaryColor;
                  e.target.style.color = secondaryColor;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "";
                  e.target.style.color = "";
                }}
                onClick={handleLogout}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
    </header>
 </>
  );
}

export default Header;






