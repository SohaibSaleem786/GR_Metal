import Header from '../../MainComponent/Header/Header';
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import PathHead from '../../MainComponent/PathHead/PathHead';
import { useTheme } from '../../../ThemeContext';
import Footer from '../../MainComponent/Footer/Footer';

function Account_Code_Maintenance() {
  const [values, setValues] = useState({
    FCtgDscc: '',
    FCtgStss: '',
     
    loading: false,
  });
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [alertData, setAlertData] = useState(null);
  const [alert, setAlert] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const { primaryColor,secondaryColor,apiLinks } = useTheme();


  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  function handleImageChange1(event) {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage1(file);
      const imgElement = document.getElementById('pic-preview'); // Replace 'image1-preview' with the actual ID of your preview element
      imgElement.src = URL.createObjectURL(file);
    }
  }

const UserId =33;


  
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const value = {
      FCtgStss: selectedStatus,
    
  };
    if (!selectedImage1) {
      setAlert('Please select an image.');
      return;
    }
   
    setValues((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      const formData = new FormData();
      formData.append('FCtgDsc', values.FCtgDscc);
      formData.append('FCtgSts', value.FCtgStss);
      formData.append('pic', selectedImage1);

      axios
        .post(
          `${apiLinks}/add_category.php`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        )
        // .then((res) => {
        //   console.log(res);
        // });
        .then((response) => {
          if (response.data.error === 200) {
            setAlertData({
              type: "success",
              message: `${response.data.message}`,
            });
            setTimeout(() => {
              setAlertData(null);
              navigate("/GetCategory");
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

      // Reset form values after submission
      setValues({
        FCtgDscc: '',
        FCtgStss: '',
        loading: false,
      });

      setAlert('Image uploaded successfully.');
    } catch (error) {
      setAlert('Error uploading image.');
      console.error(error);
    } finally {
      setValues((prevState) => ({
        ...prevState,
        loading: false,
      }));
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

<PathHead pageName="File > Account Code Maintenance" />

<div
          className="row"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1%",
            backgroundColor: "#f5f5f5",
            minHeight: "100vh",
          }}
        >
          <div
            className="col-md-12"
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              padding: "1%",
              width: "100%",
              maxWidth: "32%",
              margin: "2% 0",
              
            }}
          >
             <form
            onSubmit={handleFormSubmit}
              
              style={{textAlign: "right",fontSize:'12px',fontWeight:'bold'}}>
              <div className="form-group" > 
<br />
<div className='row'>
  
<br />
                <div className="row">
                  
                  <div className="col-md-3">
                      <label htmlFor="required">New :</label>
                    </div>
                    <div className="col-md-9">
                      <select
                        name="FCtgGrp"
                        value={selectedStatus} // Bind the selectedStatus state to the select value
                        onChange={(e) => setSelectedStatus(e.target.value)} // Update the selectedStatus state on change
                        className="form-control"
                        style={{height:'27px', fontSize:'11px', width:'150px', marginLeft: "-3%"}}
                      >
                        <option value="Cash Account">Cash Account</option>
                        <option value="Sale Account">Sale Account</option>
                        <option value="Credit Account">Credit Account</option>
                        <option value="Debit Account">Debit Account</option>

                      </select>
                    </div>
                
                  
                </div>
                <hr style={{marginTop:'1%',marginBottom:'1%'}}/>

                  <div className="row">
                  <div className="col-md-3" >
                    <label htmlFor="code">Acc Code :</label>
                  </div>
                  <div className="col-md-9">
                    <input
                      type="text"
                      id="code"
                      placeholder="12-01-001"
                      name="FCtgCodd"
                      className="form-control"
                      value={values.FCtgCodd}
                      style={{height:'20px', width:'170px' ,marginLeft: "-3%",}}
                      onChange={handleInputChange}
                    />
                  </div>
          
                
                  
                </div>
                    <div className="row">
                  <div className="col-md-3" >
                    <label htmlFor="code">Description :</label>
                  </div>
                  <div className="col-md-9">
                    <input
                      type="text"
                      id="code"
                      placeholder="Description"
                      name="FCtgDscc"
                      className="form-control"
                      value={values.FCtgDscc}
                      style={{height:'20px', width:'270px' ,marginLeft: "-3%",}}
                      onChange={handleInputChange}
                    />
                  </div>
          
                
                  
                </div>
              
                <div className="row">
                  
                  <div className="col-md-3">
                      <label htmlFor="required">Status :</label>
                    </div>
                    <div className="col-md-9">
                      <select
                        name="FCtgStss"
                        value={selectedStatus} // Bind the selectedStatus state to the select value
                        onChange={(e) => setSelectedStatus(e.target.value)} // Update the selectedStatus state on change
                        className="form-control"
                        style={{height:'27px', fontSize:'11px', width:'70px', marginLeft: "-3%"}}
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                
                  
                </div>
                <div className="row">
                  <div className="col-md-3" >
                    <label htmlFor="code">Debit Amt :</label>
                  </div>
                  <div className="col-md-9">
                    <input
                      type="text"
                      id="code"
                      placeholder="Debit Amount"
                      name="Debit"
                      className="form-control"
                      value={values.Debit || '.00'}
                      style={{height:'20px', width:'100px' ,marginLeft: "-3%",textAlign:'right'}}
                      onChange={handleInputChange}
                    />
                  </div>
          
                
                  
                </div>
                <div className="row">
                  <div className="col-md-3" >
                    <label htmlFor="code">Credit Amt:</label>
                  </div>
                  <div className="col-md-9">
                    <input
                      type="text"
                      id="code"
                      placeholder="Credit Amount"
                      name="Credit"
                      className="form-control"
                      value={values.Credit || '.00'}
                      style={{height:'20px', width:'100px' ,marginLeft: "-3%",textAlign:'right'}}
                      onChange={handleInputChange}
                    />
                  </div>
          
                
                  
                </div>
                <hr style={{marginTop:'1%',marginBottom:'1%'}}/>

                {/* <div className="row">
                  <div className="col-md-3" >
                    <label htmlFor="code">Address #1 :</label>
                  </div>
                  <div className="col-md-9">
                    <input
                      type="text"
                      id="code"
                      placeholder="Enter your home address #1"
                      name="Address1"
                      className="form-control"
                      value={values.Address1}
                      style={{height:'20px', width:'270px' ,marginLeft: "-3%"}}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3" >
                    <label htmlFor="code">Address #2 :</label>
                  </div>
                  <div className="col-md-9">
                    <input
                      type="text"
                      id="code"
                      placeholder="Enter your home address #2"
                      name="Address2"
                      className="form-control"
                      value={values.Address2}
                      style={{height:'20px', width:'270px' ,marginLeft: "-3%"}}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3" >
                    <label htmlFor="code">Mobile :</label>
                  </div>
                  <div className="col-md-9">
                    <input
                      type="text"
                      id="code"
                      placeholder="Mobile Number"
                      name="Mobile"
                      className="form-control"
                      value={values.Mobile}
                      style={{height:'20px', width:'140px' ,marginLeft: "-3%"}}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>



<hr style={{marginTop:'1%',marginBottom:'1%'}}/>


                <div className="row">
                  <div className="col-md-3" >
                    <label htmlFor="code">NIC# :</label>
                  </div>
                  <div className="col-md-9">
                    <input
                      type="text"
                      id="code"
                      placeholder="Enter your CNIC"
                      name="NIC"
                      className="form-control"
                      value={values.NIC}
                      style={{height:'20px', width:'160px' ,marginLeft: "-3%"}}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3" >
                    <label htmlFor="code">NTN# :</label>
                  </div>
                  <div className="col-md-9">
                    <input
                      type="text"
                      id="code"
                      placeholder="NTN"
                      name="NTN"
                      className="form-control"
                      value={values.NTN}
                      style={{height:'20px', width:'180px' ,marginLeft: "-3%"}}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3" >
                    <label htmlFor="code">STRN# :</label>
                  </div>
                  <div className="col-md-9">
                    <input
                      type="text"
                      id="code"
                      placeholder="STRN"
                      name="STRN"
                      className="form-control"
                      value={values.STRN}
                      style={{height:'20px', width:'180px' ,marginLeft: "-3%"}}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
</div>
<hr style={{marginTop:'1%'}}/> */}



                <br />
                <div  style={{marginRight:'40%'}}>
                  <button
                    className="btn btn-primary"
                    style={{
                      backgroundColor: primaryColor,
                      height: "28px",
                      fontSize: "11px",
                      color: secondaryColor,
                      width: "45%",
                      marginRight: "2%",
                    }}
                    onClick={handleFormSubmit}
                  >
                    SUBMIT
                  </button>
                  <button
                className="btn btn-primary"
                onClick={() => navigate("/MainPage")}
                style={{
                  backgroundColor: primaryColor,
                  height: "28px",
                  fontSize: "11px",
                  color: secondaryColor,
                  width: "45%",
                  marginRight: "2%",
                }}
              >
                Return
              </button>
                </div>
              </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Account_Code_Maintenance;