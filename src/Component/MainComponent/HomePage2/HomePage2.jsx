import React from "react";
import "../HomePage2/HomePage2.css";
import Sidebar from "../SideBar/SideBar";
// import Ittefaq from "../../image/Ittefaq.png";
import Ittefaq from '../../../image/Ittefaq.png'

function HomePage2() {
  return (
    <>
      <Sidebar />
      <div className="container-fluid">
        <div className="HomePage1" style={{ backgroundColor: "lightblack" }}>
          <div
            className="row justify-content-center align-items-center"
            style={{ height: "55vh", backgroundColor: "lightblack" }}
          >
            <div className="col-12 col-md-8 col-lg-6 text-center">
              <img
                src={Ittefaq}
                alt="ITTEFAQ ELECTRONICS"
                style={{ width: "200px" }}
              />
              <h1
                className="mt-4 mb-5"
                style={{
                  color: "#1A1A1A",
                  fontSize: "48px",
                  fontWeight: "bold",
                }}
              >
                Welcome to ITTEFAQ ELECTRONICS
              </h1>
              <p
                style={{
                  color: "#444444",
                  fontSize: "20px",
                  lineHeight: "1.5",
                }}
              >
                Discover the latest technology and enhance your life with
                Ittefaq Electronics - your one-stop shop for all your electronic
                needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage2;
