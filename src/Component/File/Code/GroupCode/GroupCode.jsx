import Header from '../../../MainComponent/Header/Header';
import React, { useState } from 'react';
import axios from 'axios';

function GroupCode() {
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
          <h3>Utilities {'>'} Group Code </h3>
        </div>
        <br />
        <div
          className="row"
          style={{
            marginLeft: '300px',
            height: '460px',
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
                <br /><br />
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
                <div className="row">
                  <div className="col-md-3" style={{ marginBottom: '30px' }}>
                    <label htmlFor="type">Type :</label>
                  </div>
                  <div className="col-md-9">
                    <select id="type" className="form-control">
                      <option value="">Assets</option>
                      <option value="type1">Liability</option>
                      <option value="type1">Capital A/C</option>
                      <option value="type1">Sales</option>
                      <option value="type1">Purchase</option>
                      <option value="type1">Expence</option>
                      <option value="type1">Other Profit</option>
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

export default GroupCode;