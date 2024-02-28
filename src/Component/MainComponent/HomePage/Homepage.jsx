import {React,useState} from "react";
import NavBar from "../Navbar/Navbar";
import Header from "../Header/Header";
// import Ittefaq from "../../image/logo.png";
import Ittefaq from '../../../image/logo.png';
import Footer from "../Footer/Footer";
import { useLocation  } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import Metal from '../../../image/grmetal.png'
import { useTheme } from "../../../ThemeContext";
function HomePage1() {
  const location = useLocation();
  const { primaryColor,secondaryColor } = useTheme();
  const [showNavBar, setShowNavBar] = useState(true);

  const toggleNavbar = () => {
    setShowNavBar(!showNavBar);
  };
  const userid = location?.state?.userid || null; // Check if location state contains the userid
  const permissions = location?.state?.permissions || [];

  return (
    <>
 
 <Header /> <NavBar />
    {/* {showNavBar ?   <>  <Header /> <NavBar /></> : <SideBar />} */}


    <div
      className="d-flex flex-column flex-grow-1"
      style={{ backgroundColor: "lightblack" }}
    >
      
      <div className="container-fluid HomePage1 row justify-content-center align-items-center">
      {/* <div  >
        <button onClick={toggleNavbar} style={{backgroundColor:primaryColor,color:secondaryColor}}>
      {showNavBar ? 'Show SideBar' : 'Show NavBar'}
    </button>
    </div> */}
        <div className="col-12 col-md-8 col-lg-6 text-center" style={{marginTop:'3%'}}>
        
          <img
            src={Metal}
            alt="ITTEFAQ ELECTRONICS"
            style={{ width: "30%" }}
          />
          <h1
            className="mt-4 mb-5"
            style={{ color: primaryColor, fontSize: "48px", fontWeight: "bold" }}
          >
            Welcome to GR Metal
          </h1>
          <p
            style={{ color: "#444444", fontSize: "18px", lineHeight: "1.4" }}
          >
           We specialize in providing a wide range of metals to meet your industrial and creative needs. From sturdy steel to lustrous aluminum, we're here to supply the building blocks of your projects.
          </p>
        </div>
      </div>
      
    </div>
    <Footer className="mt-auto fixed-bottom" />
  </>
  );
}

export default HomePage1;
