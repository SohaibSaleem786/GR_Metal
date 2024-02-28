import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Shop from '../../../image/metal.jpg';
import Metal from "../../../image/grmetal.png";
import Crystal from "../../../image/logo.png";
import axios from "axios";
// import { useAuth } from "../../AuthContext"; // Adjust the path based on your project structure
import { ToastContainer, toast } from "react-toastify";
import Alert from "@mui/material/Alert";
import GRMETAL from '../../../image/grmetal.png';
import { useTheme } from "../../../ThemeContext";
function Login() {
  const navigate = useNavigate();
  const userid = useRef();
  const password = useRef();
  const [alertData, setAlertData] = useState(null);
  const { primaryColor,secondaryColor } = useTheme();

  const [userData, setUserData] = useState({
    userid: "",
    password: "",
    loading: false,
  });

  // const { isLoggedIn, userData, login } = useAuth();

  function UserLogin() {
    const data = {
      userid: userid.current.value,
      password: password.current.value,
    };
    const formData = new URLSearchParams(data).toString();

    axios
      .post("https://www.crystalsolutions.com.pk/grmetal/login.php", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        if (response.data.error === 200) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("user", JSON.stringify(response.data.user));
          // navigate("/MainPage");
          setAlertData({
            type: "success",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
            navigate("/MainPage");
          }, 500);
          // Display a success toast
          // toast.success("Login successful!", {
          //   position: toast.POSITION.TOP_CENTER,
          // });
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
      <div className="row">
        <div className="col-6 ">
          <img
            src={Shop}
            alt="Login"
            className="login-image"
            style={{ height: "78%", width: "100%" }}
          />
        </div>
        <div className="col-6" style={{ padding: "4%" }}>
          <div
            style={{
              borderTop: `3px solid ${primaryColor}`,
  borderRight: `3px solid ${primaryColor}`,
  borderLeft: `3px solid ${primaryColor}`,
  borderBottom: `3px solid ${primaryColor}`,
            }}
          >
            <div className="col" style={{ marginLeft: "25%" }}>
              <br />
              <img
                src={Metal}
                alt="Login"
                style={{ marginLeft: "6%", height: "200px", width: "50%" }}
              />

              <div>
                <input
                  type="text"
                  id="userid"
                  name="userid"
                  ref={userid}
                  style={{ width: "65%", padding: "2%", marginBottom: "2%" }}
                  placeholder="ID"
                  required
                />
                <br />
                <input
                  type="password"
                  id="password"
                  name="password"
                  ref={password}
                  style={{ width: "65%", padding: "2%", marginBottom: "2%" }}
                  placeholder="Password"
                  required
                />
              </div>
              <br />
              <button
                style={{
                  backgroundColor: primaryColor,
                  border: `1px solid ${primaryColor}`,
                  width: "65%",
                  padding: "2%",
                  color: secondaryColor,
                }}
                type="submit"
                className="login-button"
                disabled={userData.loading}
                onClick={UserLogin}
              >
                Log In
              </button>       
              <br />
              <br />
              <button
                style={{
                  backgroundColor: primaryColor,
                  border: `1px solid ${primaryColor}`,
                  width: "65%",
                  padding: "2%",
                  color: secondaryColor,
                }}
                type="submit"
                className="login-button"
                disabled={userData.loading}
              >
                Home Delivery
              </button>

              <p style={{ display: "inline-block;", marginLeft: "10%" }}>
                <img
                  src={Crystal}
                  style={{ height: "21%", width: "15%", marginRight: "5%" }}
                />
                Crystal Solution
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>

    </>
  );
}

export default Login;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../Login/Login.css';
// import ITTEFAQ from '../../image/Ittefaq.png';
// import logo from '../../image/logo.png';

// function Login(props) {
//   const navigate = useNavigate();

//   const [userData, setUserData] = useState({
//     userid: '',
//     password: '',
//     loading: false,
//   });

//   const [alert, setAlert] = useState(null);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUserData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     setUserData((prevState) => ({
//       ...prevState,
//       loading: true,
//     }));

//     try {
//       const response = await fetch('https://www.crystalsolutions.com.pk/csres/GetUsers.php');
//       const data = await response.json();
//       console.warn(data);

//       // Check if the user exists in the fetched data
//       const userExists = data.some((user) => user.tusrid === userData.userid && user.tusrpwd === userData.password);

//       if (userExists) {
//         navigate('/MainPage'); // navigate to the page
//       } else {
//         setAlert({ type: 'error', message: 'Wrong credentials' });
//         setTimeout(() => {
//           setAlert(null);
//           setUserData({
//             userid: '',
//             password: '',
//             loading: false,
//           });
//         }, 2000);
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setUserData((prevState) => ({
//         ...prevState,
//         loading: false,
//       }));
//     }
//   };

//   return (
//     <>
//       {alert && (
//         <div className="alert alert-danger" role="alert" style={{ position: 'fixed', textAlign: 'center', alignItems: 'center', left: '350px', top: 0, width: '50%', zIndex: 999 }}>
//           {alert.message}
//         </div>
//       )}

//       <div className="container">
//         <div className="login-container">
//           <div style={{ display: 'flex', justifyContent: 'center' }}>
//             <img src={logo} alt="ITTEFAQ ELECTRONICS" style={{ width: '100px', margin: 'auto' }} />
//           </div>
//           <h1 className="logo" style={{ color: 'Orange' }}>Crystal Solution</h1>
//           <form onSubmit={handleFormSubmit} className="login-form">
//             <label htmlFor="userid" className="sr-only">User ID</label>
//             <input type="text" id="userid" name="userid" value={userData.userid} onChange={handleInputChange} className="login-input" placeholder="User ID" required />
//             <label htmlFor="password" className="sr-only">Password</label>
//             <input type="password" id="password" name="password" value={userData.password} onChange={handleInputChange} className="login-input" placeholder="Password" required />
//             <button type="submit" className="login-button" disabled={userData.loading}>Log In</button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;

// 2nd DESIGN IS HEREE.........................

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Login.css';
// import loginImage from '../../image/logo.png';

// function Login(props) {
//   const navigate = useNavigate();

//   const [userData, setUserData] = useState({
//     userid: '',
//     password: '',
//     loading: false,
//   });

//   const [alert, setAlert] = useState(null);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUserData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     setUserData((prevState) => ({
//       ...prevState,
//       loading: true,
//     }));

//     try {
//       const response = await fetch('https://www.crystalsolutions.com.pk/csres/GetUsers.php');
//       const data = await response.json();
//       console.warn(data);

//       // Check if the user exists in the fetched data
//       const userExists = data.some((user) => user.tusrid === userData.userid && user.tusrpwd === userData.password);

//       if (userExists) {
//         navigate('/MainPage'); // navigate to the page
//       } else {
//         setAlert({ type: 'error', message: 'Wrong credentials' });
//         setTimeout(() => {
//           setAlert(null);
//           setUserData({
//             userid: '',
//             password: '',
//             loading: false,
//           });
//         }, 2000);
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setUserData((prevState) => ({
//         ...prevState,
//         loading: false,
//       }));
//     }
//   };

//   return (
//     <div className="container">
//       <div className="login-container">
//         <div className="login-content">
//         <div className="login-Left">
//             <img src={loginImage} style={{ }} alt="Login" className="login-image" />
//           </div>
//           <div className="login-Right" >
//             <h1 className="logo" >Sign In </h1>
//             <h1 className="logo">Crystal Solution</h1>
//             <form onSubmit={handleFormSubmit} className="login-form">
//               <label htmlFor="userid" className="sr-only">User ID</label>
// <input type="text" id="userid" name="userid" value={userData.userid} onChange={handleInputChange} className="login-input" placeholder="User ID" required />
//               <label htmlFor="password" className="sr-only">Password</label>
// <input type="password" id="password" name="password" value={userData.password} onChange={handleInputChange} className="login-input" placeholder="Password" required />
// <button type="submit" className="login-button" disabled={userData.loading}>Log In</button>
//             </form>
//             {alert && (
//               <div className="alert alert-danger" role="alert" style={{ textAlign: 'center', marginTop: '2rem' }}>
//                 {alert.message}
//               </div>
//             )}

//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

////////////////////HERE IS OUR FINAL CODE IS ////////////////////////

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Login.css';
// import Resturant from '../../image/Resturant.jpg';
// import Malik from '../../image/malik.png';
// import Crystal from '../../image/logo.png';

// function Login(props) {
//   const navigate = useNavigate();

//   const [userData, setUserData] = useState({
//     userid: '',
//     password: '',
//     loading: false,
//   });

//   const [alert, setAlert] = useState(null);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUserData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     setUserData((prevState) => ({
//       ...prevState,
//       loading: true,
//     }));

//     try {

//       const response = await fetch('https://www.crystalsolutions.com.pk/csres/GetUsers.php');
//       const data = await response.json();
//       console.warn(data);

//       // Check if the user exists in the fetched data
//       const userExists = data.some((user) => user.tusrid === userData.userid && user.tusrpwd === userData.password);

//       if (userExists) {
//         navigate('/MainPage'); // navigate to the page
//       } else {
//         setAlert({ type: 'error', message: 'Wrong credentials' });
//         setTimeout(() => {
//           setAlert(null);
//           setUserData({
//             userid: '',
//             password: '',
//             loading: false,
//           });
//         }, 2000);
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setUserData((prevState) => ({
//         ...prevState,
//         loading: false,
//       }));
//     }
//   };

//   return (
//     <div className="row">
//     <div className="col-6" style={{padding:'20px'}}>
//     <div style={{ borderTop:'3px solid brown',borderRight:'3px solid brown',borderLeft:'3px solid brown',borderBottom:'3px solid brown'}}>

//     <div className='col' style={{ marginLeft:'170px',height: '560px' }}>
//             <br />
//     <img src={Malik}  alt="Login" style={{marginLeft:'50px', height: '200px', width: '200px' }} />
//              <input
//               type="text"
//               id="userid"
//               name="userid"
//               value={userData.userid}
//               onChange={handleInputChange}
//               style={{ width: '300px', padding: '10px', marginBottom: '10px' }}
//               placeholder="ID"
//               required
//             />
//           <input
//               type="password"
//               id="password"
//               name="password"
//               value={userData.password}
//               onChange={handleInputChange}
//               style={{ width: '300px', padding: '10px', marginBottom: '10px' }}
//               placeholder="Password"
//               required
//             />
//             <br /><button
//               style={{ backgroundColor: 'brown', border: '1px solid brown', width: '300px', padding: '10px', color: 'white' }}
//               type="submit"
//               className="login-button"
//               disabled={userData.loading}
//               onClick={handleFormSubmit}
//             >
//               Log In
//             </button>
//             <br /><br /><button
//               style={{ backgroundColor: 'brown', border: '1px solid brown', width: '300px', padding: '10px', color: 'white' }}
//               type="submit"
//               className="login-button"
//               disabled={userData.loading}
//             >
//               Home Delivery
//             </button>

// <p style={{display:"inline-block;",marginLeft:'50px'}}>
//   <img src={Crystal} style={{ height: '60px', width: '50px', marginRight: '10px' }}/>
//    Crystal Solution
// </p>

//           </div>

//     </div>
//     </div>

//     <div className="col-6">

//         <img src={Resturant} alt="Login" className="login-image" style={{ height: '600px',width:'100%' }} />

//     </div>
//   </div>

//   );
// }

// export default Login;

// import React, { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function Login() {
//   const navigate = useNavigate();
//   const userid = useRef();
//   const password = useRef();

//   function UserLogin() {

//     const data = {
//       userid: userid.current.value,
//       password: password.current.value,
//     };
//     const formData = new URLSearchParams(data).toString();

//     axios.post('https://www.crystalsolutions.com.pk/csres/login.php', formData, {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//     })
//       .then(response => {
//         console.log(response)
//         if (response.data.error === 200) {
//           navigate('/MainPage');
//           localStorage.setItem('user', JSON.stringify(response.data.user));
//         }
//       else{
//          console.log(response.data.message);

//        }
//       })
//       .catch(error => {
//         // Handle errors
//         console.error('Error:', error);
//       });

//         }

//   return (
//     <div>
//       <input type="text" ref={userid} placeholder="User ID" />
//       <input type="password" ref={password} placeholder="Password" />
//       <button onClick={UserLogin}>Log In</button>
//     </div>
//   );
// }

// export default Login;

////////////////////////////// I THINKS IS BEST CODE  7:02


