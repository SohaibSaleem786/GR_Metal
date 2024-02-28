import Header from '../../../MainComponent/Header/Header';
import React, { useState } from 'react';
import axios from 'axios';

function ItemType() {
  const [values, setValues] = useState({
    FCtgDscc: '',
    FCtgStss: '',
    loading: false,
  });

  const [alert, setAlert] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    console.log(e.target.files)
    setSelectedImage(e.target.files[0]);
  };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedImage) {
//       setAlert('Please select an image.');
//       return;
//     }
  
//     setValues((prevState) => ({
//       ...prevState,
//       loading: true,
//     }));
  
//     try {
//       const formData = new FormData()
//       formData.append('FCtgDsc', values.FCtgDscc);
//       formData.append('FCtgSts', values.FCtgStss);
//       // formData.append('FCtgPic', selectedImage); // Append the selected image file to formData
//   formData.append('pic' , selectedImage);
//       axios.post(
//         'https://www.crystalsolutions.com.pk/csres/add_category.php',
//         formData,
//         {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         }
//       ).then((res) => {
//         console.log(res);
//       });
      
  
//       // if (response.status === 200) {
//       //   setAlert('Image uploaded successfully.');
//       //   console.log('Image uploaded successfully.');
//       //   // Perform any additional actions on success
//       // } else {
//       //   throw new Error('Error storing user data');
//       // }
//     } catch (error) {
//       setAlert('Error uploading image.');
//       console.error(error);
//     } finally {
//       setValues((prevState) => ({
//         ...prevState,
//         loading: false,
//       }));
//     }
//   };
  

  return (
    <>
      <div className="col-12" style={{ color: 'black' }}>
        <Header />
        <div
          className="row"
          style={{
            background: 'orange',
            height: '40px',
            textAlign: 'left',
            borderBottom: '3px solid red',
            borderTop: '3px solid red',
          }}
        >
          <h3>Utilities {'>'} Item Type </h3>
        </div>
        <br />
        <br />
        <div
          className="row"
          style={{
            marginLeft: '300px',
            height: '260px',
            width: '720px',
            marginRight: '150px',
            backgroundColor: '#FFD580',
            color: 'black',
            border: '10px solid orange',
          }}
        >
          <div className="col-md-12">
            <form
              className="form"
              style={{
                width: '600px',
                marginTop: '10px',
                fontSize: '11px',
                fontWeight: 'bold',
                textAlign: 'right',
                marginLeft: '25px',
              }}
            >
              <div className="form-group" style={{ marginRight: '100px' }}>
                <br />
              <div className="row">
                  <div className="col-md-3" style={{ marginBottom: '30px' }}>
                    <label htmlFor="code">Id :</label>
                  </div>
                  <div className="col-md-9">
                    <input
                      type="text"
                      id="code"
                      placeholder=" Id"
                      name="FCtgDscc"
                      className="form-control"
                      value={values.FCtgDscc}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3" style={{ marginBottom: '30px' }}>
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
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3" style={{ marginBottom: '30px' }}>
                    <label htmlFor="type">Status :</label>
                  </div>
                  <div className="col-md-9">
                    <select id="type" className="form-control">
                      <option value="">Yes</option>
                      <option value="type1">No</option>
                    </select>
                  </div>
                </div>
                
                <div style={{ marginRight: '150px' }}>
                  <button
                    className="btn btn-primary"
                    style={{
                      backgroundColor: 'orange',
                      color: 'black',
                      width: '180px',
                    }}
                    // onClick={handleFormSubmit}
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <br />
      </div>
    </>
  );
}

export default ItemType;