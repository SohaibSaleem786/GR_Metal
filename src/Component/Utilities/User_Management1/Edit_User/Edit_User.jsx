import React, { useState, useEffect } from "react";
import Header from "../../../MainComponent/Header/Header";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Alert from "@mui/material/Alert";
import PathHead from "../../../MainComponent/PathHead/PathHead";
import { useTheme } from "../../../../ThemeContext";

const EditUser = () => {
  const navigate = useNavigate();
  const { primaryColor } = useTheme();
  const [alertData, setAlertData] = useState(null);
  const { secondaryColor } = useTheme();

  const { tusrid } = useParams();
  const [userData, setUserData] = useState({});

  const [user, setUser] = useState({
    tusrid: "",
    tusrnam: "",
    tusrpwd: "",
    tusrsts: "",
    tusrtyp: "",
    tmobnum: "",
    temladd: "",
  });

  useEffect(() => {
    fetch(
      `https://www.crystalsolutions.com.pk/csres/GetUsers.php?tusrid=${user.tusrid}`
    )
      .then((response) => response.json())
      .then((apiData) => {
        // this code is showing automatically fill data
        const user = apiData.find((item) => item.tusrid === tusrid);
        setUserData(user);
        setUser(user);
        ///////////////////end//////////////////
      })
      .catch((error) => console.error(error));
  }, [tusrid]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    //////////// with out these three line we can not write anything in this code
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
      ////////////////////
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(
      `https://www.crystalsolutions.com.pk/csres/update_user.php?tusrid=${tusrid}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          FUsrId: user.tusrid,
          FUsrNam: user.tusrnam,
          FUsrPwd: user.tusrpwd,
          FUsrTyp: user.tusrtyp,
          FUsrSts: user.tusrsts,
          FMobNum: user.tmobnum,
          FEmlAdd: user.temladd,
        }),
      }
    ).then((response) => {
      if (response.ok) {
        return response.json(); // Parse the JSON response
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .then((data) => {
      if (data.error === 200) {
        setAlertData({
          type: "success",
          message: data.message,
        });
        setTimeout(() => {
          setAlertData(null);
          navigate("/UserManagement1");
        }, 3000);
      } else {
        console.log(data.message);

        setAlertData({
          type: "error",
          message: data.message,
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

  return (
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
    <div className="container-fluid" style={{ color: "black" }}>
      <Header />
     

      <PathHead pageName=" Utilities > UserManagement > Update" />

      <br />
      <br />

      <div
        className="row"
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          width: "100%",
          maxWidth: "600px",
          marginLeft: "25%",
        }}
      >
        <div className="col-md-12">
          <form
            className="form"
            onSubmit={handleSubmit}
            style={{
              marginLeft: "-4%",
              fontSize: "12px",
              fontWeight: "bold",
              textAlign: "right",
            }}
          >
            <div className="form-group">
              <br />

              <div className="row mb-3">
                <label className="col-md-3" htmlFor="tusrid">
                  User ID :
                </label>
                <div className="col-md-9">
                  <input
                    type="text"
                    disabled
                    style={{
                      marginLeft: "-3%",
                      height: "20px",
                      width: "22%",
                      fontSize: "14px",
                    }}
                    className="form-control"
                    name="tusrid"
                    value={user?.tusrid || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="row mb-3" style={{ marginTop: "-17px" }}>
                <label className="col-md-3" htmlFor="tusrnam">
                  Name :
                </label>
                <div className="col-md-9">
                  <input
                    type="text"
                    style={{
                      marginLeft: "-3%",
                      height: "20px",
                      width: "65%",
                      fontSize: "14px",
                    }}
                    className="form-control"
                    name="tusrnam"
                    value={user.tusrnam}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row mb-3" style={{ marginTop: "-17px" }}>
                <label className="col-md-3" htmlFor="tusrpwd">
                  Password :
                </label>
                <div className="col-md-9">
                  <input
                    type="password"
                    style={{
                      marginLeft: "-3%",
                      width: "27%",
                      height: "20px",
                      fontSize: "14px",
                    }}
                    className="form-control"
                    name="tusrpwd"
                    value={user.tusrpwd}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row" style={{ marginTop: "-17px" }}>
                <div className="col-md-3">
                  <label htmlFor="tusrsts">Type :</label>
                </div>
                <div className="col-md-9">
                  <select
                    name="tusrtyp"
                    value={user.tusrtyp}
                    onChange={handleInputChange}
                    style={{
                      marginLeft: "-3%",
                      marginBottom: "4%",
                      width: "27%",
                      height: "30px",
                      fontSize: "12px",
                    }}
                    className="form-control"
                  >
                    <option value="">Select Type</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                    <option value="Waiter">Waiter</option>
                    <option value="Take Away">Take Away</option>
                    <option value="Home Delivery">Home Delivery</option>
                  </select>
                </div>
              </div>
              <div className="row" style={{ marginTop: "-20px" }}>
                <div className="col-md-3">
                  <label htmlFor="tusrsts">Status :</label>
                </div>
                <div className="col-md-9">
                  <select
                    name="tusrsts"
                    value={user.tusrsts}
                    onChange={handleInputChange}
                    style={{
                      marginLeft: "-3%",
                      marginBottom: "4%",
                      width: "27%",
                      height: "30px",
                      fontSize: "12px",
                    }}
                    className="form-control"
                  >
                    <option value="">Select Type</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3" style={{ marginTop: "-20px" }}>
                <label className="col-md-3" htmlFor="tmobnum">
                  Mobile# :
                </label>
                <div className="col-md-9">
                  <input
                    type="text"
                    style={{
                      marginLeft: "-3%",
                      height: "20px",
                      width: "27%",
                      fontSize: "14px",
                    }}
                    className="form-control"
                    name="tmobnum"
                    value={user.tmobnum}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="row mb-3" style={{ marginTop: "-17px" }}>
                <label className="col-md-3" htmlFor="temladd">
                  Email Address :
                </label>
                <div className="col-md-9">
                  <input
                    type="text"
                    style={{
                      marginLeft: "-3%",
                      height: "20px",
                      width: "35%",
                      fontSize: "14px",
                    }}
                    className="form-control"
                    name="temladd"
                    value={user.temladd}
                    onChange={handleInputChange}
                  />
                  <div className="invalid-feedback">
                    Please enter a valid email address.
                  </div>
                </div>
              </div>

              <div className="row justify-content-end">
                <div style={{ marginRight: "25%" }}>
                  <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    style={{
                      backgroundColor: primaryColor,
                      height: "30px",
                      fontSize: "11px",
                      color: secondaryColor,
                      width: "18%",
                      marginRight: "2%",
                    }}
                  >
                    SUBMIT
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/UserManagement1")}
                    style={{
                      backgroundColor: primaryColor,
                      height: "30px",
                      fontSize: "11px",
                      color: secondaryColor,
                      width: "18%",
                      marginRight: "2%",
                    }}
                  >
                    Return
                  </button>
                </div>

                <br />
                <br />
                <br />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default EditUser;
