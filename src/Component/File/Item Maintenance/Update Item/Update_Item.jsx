



import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "../../../MainComponent/Header/Header";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import PathHead from "../../../MainComponent/PathHead/PathHead";
import { useTheme } from "../../../../ThemeContext";
import Footer from "../../../MainComponent/Footer/Footer";

function Update_Item() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [alertData, setAlertData] = useState(null);

  const [previewImage1, setPreviewImage] = useState('');
  const [previewImage2, setPreviewImage2] = useState('');
  const [previewImage3, setPreviewImage3] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const { secondaryColor } = useTheme();

  const imageurl = 'https://www.crystalsolutions.com.pk/csres/itemimage/';
  const [data, setData] = useState([]);
  const { primaryColor } = useTheme();

  const [user, setUser] = useState({
   
    id :'',
    titmdsc:'',
    dull:'',
    h23_lh23:'',
    shara_brown:'',
    black_multi :'',
    wood_coat:'',
    tctgcod:'',
  });

  useEffect(() => {
    fetch(
      `https://www.crystalsolutions.com.pk/grmetal/get_item.php?id=${id}`
    )
      .then((response) => response.json())
      .then((apiData) => {
        const user = apiData.find((item) => item.id === id);
        setUser(user);
        // setPreviewImage(user.TItmPic ? imageurl + user.TItmPic : '');
  

      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  
  const [values, setValues] = useState({
    itmIdd: "",
    itemDscc: "",
    itemStss: "",
    purRatee: "",
    saleRatee: "",
    categoryIdd: "",
    typee: "",
    pic : '',
    loading: false,
  });

  const [selectedStatus, setSelectedStatus] = useState("");

  const [alert, setAlert] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
//   const [selectedImage2, setSelectedImage2] = useState(null);
//   const [selectedImage3, setSelectedImage3] = useState(null);

  function handleImageChange1(event) {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage1(file);
      const imgElement = document.getElementById("pic-preview");
      if (imgElement) {
        imgElement.src = URL.createObjectURL(file);
      }
    }
  }


  const UserId = 33;
  useEffect(() => {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      // setUsers(userData);
      console.log(userData);
      console.log("user id is", userData.tusrid);
    } else {
      // Handle cases when user data is not available
      console.error("User data not available in local storage.");
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.crystalsolutions.com.pk/grmetal/get_category.php"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const apiData = await response.json();
        setData(apiData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();


    return () => {
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const FSinUsr = 33; // Your user ID logic here
  
    const requestBody = new FormData();
    requestBody.append("itmId", user.TItmId);
    requestBody.append("itemDsc", user.itemDsc);
    requestBody.append("itemSts", user.TItmSts);
    requestBody.append("purRate", user.TPurRat);
    requestBody.append("saleRate", user.TSalRat);
    requestBody.append("categoryId", selectedCategoryId);
    requestBody.append("type", user.TitmTyp);
 
    requestBody.append("pic", selectedImage1);

    
   

    axios
      .post(
        `https://www.crystalsolutions.com.pk/csres/update_item.php?id=${id}`,
        requestBody
      )
      .then((response) => {
        if (response.data.error === 200) {
          setAlertData({
            type: "success",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
            navigate("/Get_Item");
          }, 3000);
          
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
  };
  

  
  useEffect(() => {
    if (selectedImage1) {
      document.getElementById("pic-preview").src = URL.createObjectURL(selectedImage1);
    }
  }, [selectedImage1]);


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
<Header />

<PathHead pageName="File > Item Maintenance > Update Item" screen='Get_Item' pageLink="/Get_Item"/>

      <div className="col-12" style={{ color: 'black' ,fontWeight:'bold' }}>
        

        <div
          className="row"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "5px",
            backgroundColor: "#f5f5f5",
            minHeight: "100vh",
          }}
        >
          <div className="col-md-12 form-container"
          style={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            padding: "10px",
            width: "100%",
            maxWidth: "500px",
            margin: "20px 0",
            fontSize:'12px'
          }}
          >
            <Form onSubmit={handleSubmit}>
            <div className="row">
  <div className="col-6">
  <Form.Group controlId="Id" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Label style={{ marginRight: '10px',marginLeft: '58px' }}>Id :</Form.Label>
      <Form.Control
      type="text"
      id="code"
      placeholder=" Id"
      className="form-control"
      name="id"
      value={user.id}
      onChange={handleInputChange}
      style={{height:'20px', width:'70px' }}
      disabled
      />
    </Form.Group>
    <Form.Group controlId="description" style={{ display: 'flex', alignItems: 'center' ,marginTop:'-2%'}}>
      <Form.Label style={{ marginRight: '10px' }}>Description:</Form.Label>
      <Form.Control
         type="text"
         id="code"
         placeholder="Description"
         className="form-control"
         name="titmdsc"
         value={user.titmdsc}
         style={{height:'20px', width:'350px'}}
         onChange={handleInputChange}
      />
    </Form.Group>
   
    <Form.Group controlId="remarks" style={{ display: 'flex', alignItems: 'center' ,marginTop:'-2%'}}>
      <Form.Label style={{ marginRight: '10px', marginLeft: '50px' }}>Dull:</Form.Label>
      <Form.Control
        type="text"
        id="code"
        placeholder="Dull"
        className="form-control"
        name="dull"
        value={user.dull}
        style={{height:'20px', width:'90px',textAlign:'right' }}
        onChange={handleInputChange}
      />
    </Form.Group>
    <Form.Group controlId="index" style={{ display: 'flex', alignItems: 'center' ,marginTop:'-2%'}}>
      <Form.Label style={{ marginRight: '10px', marginLeft: '13px' }}>H23_lh23:</Form.Label>
      <Form.Control
        type="text"
        id="code"
        placeholder="h23_lh23"
        className="form-control"
        name="h23_lh23"
        value={user.h23_lh23}
        style={{height:'20px', width:'90px' ,textAlign:'right' }}
        onChange={handleInputChange}
      />
    </Form.Group>


    <Form.Group controlId="Category" style={{ display: 'flex', alignItems: 'center', marginTop: '-1%' }}>
  <Form.Label style={{ marginRight: '10px', marginLeft: '18px', textAlign: 'right' }}>Category:</Form.Label>
  <select
    name="tctgcod"
    value={user.TCtgId}
    style={{ height: '27px', fontSize: '11px', width: '220px' }}
    onChange={(e) => {
      setSelectedCategoryId(e.target.value);
      setUser((prevUser) => ({
        ...prevUser,
        TCtgId: e.target.value,
      }));
    }}
    id="categoryIdd"
    className="form-control"
  >
    {data.map((item) => (
      <option key={item.tctgid} value={item.tctgid}>
        {item.tctgdsc}
      </option>
    ))}
  </select>
</Form.Group>
    <Form.Group controlId="index" style={{ display: 'flex', alignItems: 'center' ,marginTop:'-1%'}}>
      <Form.Label style={{ marginRight: '10px', marginLeft: '-8px' }}>Shara Brown:</Form.Label>
      <Form.Control
       type="text"
       id="code"
       placeholder="shara_brown"
       className="form-control"
       name="shara_brown"
       value={user.shara_brown}
       style={{height:'20px', width:'90px' ,textAlign:'right'}}
       onChange={handleInputChange}
      />
    </Form.Group>

    <Form.Group controlId="index" style={{ display: 'flex', alignItems: 'center' ,marginTop:'-2%'}}>
      <Form.Label style={{ marginRight: '10px' }}>Black Multi :</Form.Label>
      <Form.Control
      type="text"
      id="code"
      placeholder="black_multi"
      className="form-control"
      name="black_multi"
      value={user.black_multi}
      style={{height:'20px', width:'90px' ,textAlign:'right'}}
      onChange={handleInputChange}
      />
    </Form.Group>

    <Form.Group controlId="index" style={{ display: 'flex', alignItems: 'center' ,marginTop:'-2%'}}>
      <Form.Label style={{ marginRight: '10px' }}>Wood Coat :</Form.Label>
      <Form.Control
       type="text"
       id="code"
       placeholder="wood_coat"
       className="form-control"
       name="wood_coat"
       value={user.wood_coat}
       style={{height:'20px', width:'90px' ,textAlign:'right' }}
       onChange={handleInputChange}
      />
    </Form.Group>
    
  </div>


</div>
<br />
<Button
                    className="btn btn-primary"
                    style={{
                      backgroundColor: primaryColor,
                      height: "4%",
                      fontSize: "11px",
                      color: secondaryColor,
                      width: "25%",
                      marginRight: "2%",
                    }}
                    onClick={handleSubmit}
                  >
                    SUBMIT
                  </Button>
                
              </Form>
          </div>
        </div>
        <br />
      </div>
      </div>
      <Footer/>
    </>
  );
}

export default Update_Item;

// import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import { useParams } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import Header from "../../../MainComponent/Header/Header";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import Alert from "@mui/material/Alert";
// import PathHead from "../../../MainComponent/PathHead/PathHead";
// import { useTheme } from "../../../../ThemeContext";
// import Footer from "../../../MainComponent/Footer/Footer";

// function Update_Item() {
//   const navigate = useNavigate();
//   const { TItmId } = useParams();
//   const [alertData, setAlertData] = useState(null);

//   const [previewImage1, setPreviewImage] = useState('');
//   const [previewImage2, setPreviewImage2] = useState('');
//   const [previewImage3, setPreviewImage3] = useState('');
//   const [selectedCategoryId, setSelectedCategoryId] = useState("");
//   const { secondaryColor ,apiLinks} = useTheme();

//   const imageurl = `${apiLinks}/itemimage/`;
//   const [data, setData] = useState([]);
//   const { primaryColor } = useTheme();

//   const [user, setUser] = useState({
   
//     TItmId :'',
// TItmDsc:'',
// itmdscurd:'',
// itmremarks:'',
// itmindex:'',
// uom:'',
// TItmSts:'',
// TPurRat:'',
// TSalRat:'',
// TCtgId :'',
// TitmTyp:'',
// TItmPic:'',
// itmdis:'',
//   });

//   useEffect(() => {
//     fetch(
//       `${apiLinks}/get_item.php?TItmId=${TItmId}`
//     )
//       .then((response) => response.json())
//       .then((apiData) => {
//         const user = apiData.find((item) => item.TItmId === TItmId);
//         setUser(user);
//         setPreviewImage(user.TItmPic ? imageurl + user.TItmPic : '');
  

//       })
//       .catch((error) => console.error(error));
//   }, [TItmId]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUser((prevUser) => ({
//       ...prevUser,
//       [name]: value,
//     }));
//   };

  
//   const [values, setValues] = useState({
//     itmIdd: "",
//     itemDscc: "",
//     itmdscurd:'',
//     itmindex:'',
//     itmremarks:'',
//     itmdscurd:'',
//     itemStss: "",
//     purRatee: "",
//     saleRatee: "",
//     categoryIdd: "",
//     discountt:"",
//     typee: "",
//     pic : '',
//     loading: false,
//   });

//   const [selectedStatus, setSelectedStatus] = useState("");

//   const [alert, setAlert] = useState(null);
//   const [selectedImage1, setSelectedImage1] = useState(null);
// //   const [selectedImage2, setSelectedImage2] = useState(null);
// //   const [selectedImage3, setSelectedImage3] = useState(null);

//   function handleImageChange1(event) {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedImage1(file);
//       const imgElement = document.getElementById("pic-preview");
//       if (imgElement) {
//         imgElement.src = URL.createObjectURL(file);
//       }
//     }
//   }


//   const UserId = 33;
//   useEffect(() => {
//     // Retrieve user data from local storage
//     const userData = JSON.parse(localStorage.getItem("user"));

//     if (userData) {
//       // setUsers(userData);
//       console.log(userData);
//       console.log("user id is", userData.tusrid);
//     } else {
//       // Handle cases when user data is not available
//       console.error("User data not available in local storage.");
//     }
//   }, []);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `${apiLinks}/get_category.php`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         const apiData = await response.json();
//         setData(apiData);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();


//     return () => {
//     };
//   }, []);

//   const handleSubmit = (event) => {
//     event.preventDefault();
  
//     const FSinUsr = 33; // Your user ID logic here
  
//     const requestBody = new FormData();
//     requestBody.append("itmId", user.TItmId);
//     requestBody.append("itemDsc", user.TItmDsc);
//     requestBody.append("itemDscUrd", user.itmdscurd);
//     requestBody.append("uom", user.uom);
//     requestBody.append("itemSts", user.TItmSts);
//     requestBody.append("purRate", user.TPurRat);
//     requestBody.append("saleRate", user.TSalRat);
//     requestBody.append("discont", user.itmdis);
//     requestBody.append("categoryId", user.TCtgId);
//     requestBody.append("itmremarks", user.itmremarks);
//     requestBody.append("itmindex", user.itmindex);
//     // requestBody.append("categoryId", selectedCategoryId);
//     requestBody.append("type", user.TitmTyp);
//     requestBody.append("pic", selectedImage1);


//     axios
//       .post(
//         `${apiLinks}/update_item.php?TItmId=${TItmId}`,
//         requestBody
//       )
//       .then((response) => {
//         if (response.data.error === 200) {
//           setAlertData({
//             type: "success",
//             message: `${response.data.message}`,
//           });
//           setTimeout(() => {
//             setAlertData(null);
//             navigate("/Get_Item");
//           }, 1000);
          
//         } else {
//           console.log(response.data.message);

//           setAlertData({
//             type: "error",
//             message: `${response.data.message}`,
//           });
//           setTimeout(() => {
//             setAlertData(null);
//           }, 2000);
//         }
//       })
//       .catch((error) => {
//         // Handle errors
//         console.error("Error:", error);
//       });
//   };
  

  
//   useEffect(() => {
//     if (selectedImage1) {
//       document.getElementById("pic-preview").src = URL.createObjectURL(selectedImage1);
//     }
//   }, [selectedImage1]);


//   return (
//     <>
//        <div
//         style={{
//           position: "relative",
//           width: "100%",
//           height: "100vh",
//           overflow: "hidden",
//         }}
//       >
//         {alertData && (
//           <Alert
//             severity={alertData.type}
//             style={{
//               position: "fixed",
//               top: 0,
//               left: 0,
//               width: "30%",
//               marginLeft: "35%", 
//               zIndex: 1000,
//               textAlign: "center", 
//             }}
//           >
//             {alertData.message}
//           </Alert>
//         )}
// <Header />

// <PathHead pageName="File > Item Maintenance > Update Item" />

//       <div className="col-12" style={{ color: 'black' ,fontWeight:'bold' }}>
        

//         <div
//           className="row"
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             padding: "5px",
//             backgroundColor: "#f5f5f5",
//             minHeight: "100vh",
//           }}
//         >
//           <div className="col-md-12 form-container"
//           style={{
//             backgroundColor: "#fff",
//             borderRadius: "10px",
//             boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//             padding: "10px",
//             width: "100%",
//             maxWidth: "600px",
//             margin: "20px 0",
//             fontSize:'12px'
//           }}
//           >
//             <Form onSubmit={handleSubmit}>
//             <div className="row">
//   <div className="col-6">
//   <Form.Group controlId="Id" style={{ display: 'flex', alignItems: 'center' }}>
//       <Form.Label style={{ marginRight: '10px',marginLeft: '50px' }}>Id :</Form.Label>
//       <Form.Control
//         type="text"
//         id="code"
//         placeholder=" Id"
//         className="form-control"
//         name="TItmId"
//         value={user.TItmId}
//         style={{height:'20px', width:'70px' }}
//         onChange={handleInputChange}
//         disabled
//       />
//     </Form.Group>
//     <Form.Group controlId="description" style={{ display: 'flex', alignItems: 'center' ,marginTop:'-2%'}}>
//       <Form.Label style={{ marginRight: '10px' }}>Description:</Form.Label>
//       <Form.Control
//          type="text"
//          id="code"
//          placeholder="Description"
//          className="form-control"
//          name="TItmDsc"
//          value={user.TItmDsc}
//          style={{height:'20px', width:'270px' }}
//          onChange={handleInputChange}
//       />
//     </Form.Group>
//     <Form.Group controlId="description" style={{ display: 'flex', alignItems: 'center' ,marginTop:'-2%'}}>
//       <Form.Control
//           type="text"
//           id="code"
//           placeholder="تفصیل"
//           name="itmdscurd"
//           className="form-control"
//           value={user.itmdscurd}
//           style={{height:'20px', width:'210px' ,textAlign:'right' ,marginLeft:'78px'}}
//           onChange={handleInputChange}
//       />
//       <Form.Label style={{ marginRight: '10px' }}>:تفصیل</Form.Label>

//     </Form.Group>
//     <Form.Group controlId="remarks" style={{ display: 'flex', alignItems: 'center' ,marginTop:'-2%'}}>
//       <Form.Label style={{ marginRight: '10px', marginLeft: '17px' }}>Remarks:</Form.Label>
//       <Form.Control
//        type="text"
//        id="code"
//        placeholder="Remarks"
//        name="itmremarks"
//        className="form-control"
//        value={user.itmremarks}
//        style={{height:'20px', width:'270px' }}
//        onChange={handleInputChange}
//       />
//     </Form.Group>
//     <Form.Group controlId="index" style={{ display: 'flex', alignItems: 'center' ,marginTop:'-2%'}}>
//       <Form.Label style={{ marginRight: '10px', marginLeft: '34px' }}>Index:</Form.Label>
//       <Form.Control
//        type="text"
//        id="code"
//        placeholder="Index."
//        name="itmindex"
//        className="form-control"
//        value={user.itmindex}
//        style={{height:'20px', width:'70px' }}
//        onChange={handleInputChange}
//       />
//     </Form.Group>
//     <Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center' ,marginTop:'-1%'}}>
//       <Form.Label style={{ marginRight: '10px', marginLeft: '31px', textAlign: 'right' }}>Status:</Form.Label>
//      <Form.Control

// as="select"

// name="TItmSts"
// value={user.TItmSts}
// onChange={handleInputChange}
// className="form-control"
// style={{height:'27px', fontSize:'11px', width:'70px'}}
// >
//   <option value="Yes">Yes</option>
//   <option value="No">No</option>
// </Form.Control>

//     </Form.Group>
//     <Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center' }}>
//       <Form.Label style={{ marginRight: '10px', marginLeft: '37px', textAlign: 'right' }}>UOM:</Form.Label>
//      <Form.Control

// as="select"

// name="uom"
// value={user.uom}
// onChange={handleInputChange}
// className="form-control"
// style={{height:'27px', fontSize:'11px', width:'100px' }}
// >
// <option value="Number">Number</option>
//       <option value="KG">KG</option>
//       <option value="Liter">Liter</option>
//       <option value="Gram">Gram</option>
//       <option value="Half">Half</option>
//       <option value="Full">Full </option>
// </Form.Control>

//     </Form.Group>

//     <Form.Group controlId="remarks" style={{ display: 'flex', alignItems: 'center' ,marginTop:'-1%'}}>
//       <Form.Label style={{ marginRight: '10px', marginLeft: '18px' }}>Pur Rate:</Form.Label>
//       <Form.Control
//        type="text"
//        id="code"
//        placeholder="Purchase Rate"
//        className="form-control"
//        name="TPurRat"
//        value={user.TPurRat}
//        style={{height:'20px', width:'80px',textAlign:'right' }}
//        onChange={handleInputChange}
//       />
//     </Form.Group>

//     <Form.Group controlId="remarks" style={{ display: 'flex', alignItems: 'center' ,marginTop:'-2%'}}>
//       <Form.Label style={{ marginRight: '10px', marginLeft: '15px' }}>Sale Rate:</Form.Label>
//       <Form.Control
//        type="text"
//        id="code"
//        placeholder="Sale Rate"
//        className="form-control"
//        name="TSalRat"
//        value={user.TSalRat}
//        style={{height:'20px', width:'80px' ,textAlign:'right'}}
//        onChange={handleInputChange}
//       />
//     </Form.Group>

//     <Form.Group controlId="remarks" style={{ display: 'flex', alignItems: 'center' ,marginTop:'-2%'}}>
//       <Form.Label style={{ marginRight: '10px', marginLeft: '15px' }}>Disc Rate:</Form.Label>
//       <Form.Control
//         type="text"
//         id="code"
//         placeholder="Discount Rate"
//         className="form-control"
//         name="itmdis"
//         value={user.itmdis}
//         style={{height:'20px', width:'80px',textAlign:'right' }}
//         onChange={handleInputChange}
//       />
//     </Form.Group>

//     <Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center' ,marginTop:'-1%'}}>
//       <Form.Label style={{ marginRight: '10px', marginLeft: '15px', textAlign: 'right' }}>Category:</Form.Label>
//      <Form.Control

// as="select"

// name="categoryId"
//     value={user.TCtgId}
//     onChange={(e) => {
//       // setSelectedCategoryId(e.target.value);
//       setUser((prevUser) => ({
//         ...prevUser,
//         TCtgId: e.target.value,
//       }));
//     }}
//     style={{height:'27px', fontSize:'11px', width:'110px'}}
//     id="categoryIdd"
//     className="form-control">
//     {data.map((item) => (
//       <option
//         key={item.tctgid}
//         value={item.tctgid}
//       >
//         {item.tctgdsc}
//       </option>
//     ))}
// </Form.Control>

//     </Form.Group>




//     <Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center' }}>
//       <Form.Label style={{ marginRight: '10px', marginLeft: '10px', textAlign: 'right' }}>Item Type:</Form.Label>
//      <Form.Control

// as="select"

// name="TitmTyp"
// value={user.TitmTyp}
// onChange={handleInputChange}
// className="form-control"
// style={{height:'27px', fontSize:'11px', width:'100px'}}
// >
// <option value="Item Sale">Item Sale</option>
//                       <option value="Item Purchase">Item Purchase</option>
                    
// </Form.Control>

//     </Form.Group>
//   </div>

//   {/* Right side (picture code) */}
//   <div className="col-6">
//     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
//       <div style={{ flex: 1, marginRight: '-20px', textAlign: 'center' }}>
//       <label
//                       htmlFor="pic"
//                       style={{
//                         display: "block",
//                         marginBottom: "10px",
//                         marginLeft:'15%'
//                       }}
//                     >
//                       Item Pic:
//                     </label>
//                     <label
//                       htmlFor="pic"
//                       style={{ cursor: "pointer", display: "block" }}
//                     >
//                       <div
//                         style={{
//                           width: "100px",
//                           height: "100px",
//                           marginLeft:'45%',
//                           border: "2px dashed #bbb",
//                           borderRadius: "5px",
//                           display: "flex",
//                           flexDirection: "column",
//                           justifyContent: "center",
//                           alignItems: "center",
//                         }}
//                       >
//                         <span
//                           style={{
//                             color: "#aaa",
//                             marginBottom: "5px",
//                           }}
//                         >
//                           Click to Upload
//                         </span>
//                         <label htmlFor="pic" style={{ cursor: "pointer" }}>
//           <img
//             id="pic-preview"
//             src={previewImage1}  
//             alt="Category"
//             style={{ width: '100%', height: '60px' }}
//           />
//           <input
//             type="file"
//             id="pic"
//             style={{ display: "none" }}
//             onChange={handleImageChange1}
//           />
//         </label>
//                       </div>
//                     </label>
//       </div>
//     </div>
//   </div>
// </div>
// <br />
// <Button
//                     className="btn btn-primary"
//                     style={{
//                       backgroundColor: primaryColor,
//                       height: "4%",
//                       fontSize: "11px",
//                       color: secondaryColor,
//                       width: "25%",
//                       marginRight: "2%",
//                     }}
//                     onClick={handleSubmit}
//                   >
//                     SUBMIT
//                   </Button>
//                   <Button
//                 className="btn btn-primary"
//                 onClick={() => navigate("/Get_Item")}
//                 style={{
//                   backgroundColor: primaryColor,
//                   height: "4%",
//                   fontSize: "11px",
//                   color: secondaryColor,
//                   width: "25%",
//                   marginRight: "2%",
//                 }}
//               >
//                 Return
//               </Button>
//               </Form>
//           </div>
//         </div>
//         <br />
//       </div>
//       </div>
//       <Footer/>
//     </>
//   );
// }

// export default Update_Item;