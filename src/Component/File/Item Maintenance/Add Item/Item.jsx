import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import PathHead from '../../../MainComponent/PathHead/PathHead';
import Alert from "@mui/material/Alert";
import Header from '../../../MainComponent/Header/Header';
import React, { useState, useEffect,useRef  } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../../../ThemeContext";
import Footer from '../../../MainComponent/Footer/Footer';
import '../Add Item/Item.css';

function Item() {
  const [values, setValues] = useState({
    itemDscc: "",
    dulll: "",
    h23_lh233: "",
    shara_brownn: "",
    black_multii: "",
    wood_coatt: "",
    tctgcodd: "",
    
    loading: false,
  });
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedStatus1, setSelectedStatus1] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [alertData, setAlertData] = useState(null);
  const { secondaryColor } = useTheme();

  const [selectedType, setSelectedType] = useState("");
  const [data, setData] = useState([]);

  const [alert, setAlert] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const { primaryColor } = useTheme();

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleImageChange1 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage1(file);
      const imgElement = document.getElementById("pic-preview");
      imgElement.src = URL.createObjectURL(file);
    }
  };
  {/* ////////////////////////  DUE TO GET DATA OF CATEGORY ////////////////////////// */}

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
  const UserId = 33;



  {/* ////////////////////////  CALL API TO POST DATA ////////////////////////// */}

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // if (!selectedImage1) {
    //   setAlert('Please select an image.');
    //   return;
    // }
    const value = {
      itemStss: selectedStatus,
      categoryIdd: selectedStatus1,
      typee: selectedType,
    };
    setValues((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      const formData = new FormData();
      formData.append("itemDsc", values.itemDscc);  
      formData.append("dull", values.dulll);
      formData.append("h23_lh23", values.h23_lh233);
      formData.append("shara_brown", values.shara_brownn);
      formData.append("black_multi", values.black_multii);
      formData.append("wood_coat", values.wood_coatt); // Use selectedCategoryId here
      formData.append("tctgcod", selectedCategoryId);


      const response = await axios.post(
        "https://www.crystalsolutions.com.pk/grmetal/add_item.php",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
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
          // navigate("/Get_Item");
        } else {
          console.log(response.data.message);

          setAlertData({
            type: "error",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
            window.location.reload();
            // navigate("/Get_Item");
          }, 2000);
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });

      console.log(response.data); 
      // Reset form values after submission
      setValues({
        itemDsc: '',
        dull: '',
        h23_lh23: '',
        shara_brown: '',
        black_multi: '',
        wood_coat: '',
        tctgcod: '',
      
      loading: false,
      });

      setAlert("Image uploaded successfully.");
    } catch (error) {
      console.error("Error uploading image:", error);
      setAlert("Error uploading image.");
    } finally {
      setValues((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };


  ////////// this code is used for press enter in text field 
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
    const inputRefs = [
    useRef(), // Ref for itemDscc
    useRef(), // Ref for categoryIdd
    useRef(), // Ref for dulll
    useRef(), // Ref for h23_lh233
    useRef(), // Ref for shara_brownn
    useRef(), // Ref for black_multii
    useRef(), // Ref for wood_coatt
  ];
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default Enter behavior
      const nextFieldIndex = (currentFieldIndex + 1) % inputRefs.length;
      inputRefs[nextFieldIndex].current.focus();
      setCurrentFieldIndex(nextFieldIndex);
    }
  };

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

<PathHead pageName="File > Item Maintenance > Add Item" screen='Get_Item' pageLink="/Get_Item"/>

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
            overflowY: "scroll", // Enable vertical scrolling
            height: "calc(100vh - 200px)", // Set an appropriate height
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
            fontSize: '12px'
          }}
          >
            <Form onSubmit={handleFormSubmit}>
            <div className="row">
  {/* Left side (label and input field) */}
  <div className="col-6">
 
    <Form.Group controlId="description" style={{ display: 'flex', alignItems: 'center',marginTop:'-2%' }}>
      <Form.Label style={{ marginRight: '10px' ,marginLeft:'25px'}}>Dscription:</Form.Label>
      <Form.Control
         type="text"
         id="itemDscc"
         placeholder=" Dscription "
         name="itemDscc"
         className="form-control"
         value={values.itemDscc}
         style={{height:'20px', width:'300px'  }}
         onChange={handleInputChange}
         onKeyDown={handleKeyPress}
         ref={inputRefs[0]}
      />
    </Form.Group>


    <Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center',marginTop:'-1%'  }}>
      <Form.Label style={{ marginRight: '10px', marginLeft: '34px', textAlign: 'right' }}>Category:</Form.Label>
      <Form.Control


as="select"

        name="categoryIdd"
        onChange={(e) => {
          setSelectedCategoryId(e.target.value);
        }}
        ref={inputRefs[1]}
        onKeyDown={handleKeyPress}
        id="categoryIdd"
        style={{ height: '27px', fontSize: '11px', width: '180px'}}
        className="form-control"
      >
        {data.map((item) => (
      <option
        key={item.id}
        value={item.id}
      >
        {item.tctgdsc}
      </option>
    ))}
      </Form.Control>
    </Form.Group>




    <Form.Group controlId="description" style={{ display: 'flex', alignItems: 'center',marginTop:'-1%' }}>
      <Form.Label style={{ marginRight: '10px' ,marginLeft:'68px'}}>Dull:</Form.Label>
      <Form.Control
        type="text"
        id="code"
        placeholder="Dull"
        name="dulll"
        className="form-control"
        value={values.dulll || '.00'}
        style={{height:'20px', width:'90px' , textAlign:'right'}}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        ref={inputRefs[2]}
      />
    </Form.Group>
   
    <Form.Group controlId="description" style={{ display: 'flex', alignItems: 'center',marginTop:'-2%' }}>
      <Form.Label style={{ marginRight: '10px',marginLeft: "36px" }}>h23 lh23:</Form.Label>
      <Form.Control
  type="text"
  id="code"
  placeholder="h23 lh23"
  name="h23_lh233"
  className="form-control"
  value={values.h23_lh233 || '.00'}
  style={{height:'20px', width:'90px', textAlign:'right' }}
  onChange={handleInputChange}
  onKeyDown={handleKeyPress}
  ref={inputRefs[3]}


    
      />
    </Form.Group>
    <Form.Group controlId="description" style={{ display: 'flex', alignItems: 'center',marginTop:'-2%' }}>
      <Form.Label style={{ marginRight: '10px',marginLeft: "10px" }}>Shara Brown:</Form.Label>
      <Form.Control
         type="text"
         id="code"
         placeholder="Shara Brn"
         name="shara_brownn"
         className="form-control"
         value={values.shara_brownn || '.00'}
         style={{height:'20px', width:'90px' ,textAlign:'right'}}
         onChange={handleInputChange}
         onKeyDown={handleKeyPress}
         ref={inputRefs[4]}
      />
    </Form.Group>
    <Form.Group controlId="description" style={{ display: 'flex', alignItems: 'center',marginTop:'-2%' }}>
      <Form.Label style={{ marginRight: '10px',marginLeft: "21px" }}>Black multi:</Form.Label>
      <Form.Control
        type="text"
        id="code"
        placeholder="Black "
        name="black_multii"
        className="form-control"
        value={values.black_multii || '.00'}
        style={{height:'20px', width:'90px',textAlign:'right' }}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        ref={inputRefs[5]}
      />
    </Form.Group>
    <Form.Group controlId="description" style={{ display: 'flex', alignItems: 'center',marginTop:'-2%' }}>
      <Form.Label style={{ marginRight: '10px',marginLeft: "24px" }}>Wood coat:</Form.Label>
      <Form.Control
         type="text"
         id="code"
         placeholder="Wood "
         name="wood_coatt"
         className="form-control"
         value={values.wood_coatt || '.00'}
         style={{height:'20px', width:'90px',textAlign:'right' }}
         onChange={handleInputChange}
         onKeyDown={handleKeyPress}
         ref={inputRefs[6]}
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
                    onClick={handleFormSubmit}
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

export default Item;