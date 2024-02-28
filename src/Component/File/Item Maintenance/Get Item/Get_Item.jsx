import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import Header from "../../../MainComponent/Header/Header";
import Footer from "../../../MainComponent/Footer/Footer";
import { useTheme } from "../../../../ThemeContext";
import PathHead from "../../../MainComponent/PathHead/PathHead";
import Edit from '../../../../image/edit.png';
import {
  Card,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
  Form,
} from "react-bootstrap";
import '../Get Item/Get_Item.css';

const Get_Item = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const { primaryColor ,secondaryColor} = useTheme();
  const { apiLinks } = useTheme();
  const imageurl = `${apiLinks}/itemimage/`;

  const handleMenuItemClick = () => {
    navigate("/Item");
  };
  const [getUser, setUser] = useState();

  useEffect(() => {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      setUser(userData);
      console.log(userData);
      console.log("user id is", userData.id);
    } else {
      // Handle cases when user data is not available
      console.error("User data not available in local storage.");
    }
  }, []);   
  useEffect(() => {
    fetch('https://www.crystalsolutions.com.pk/grmetal/get_item.php')
      .then((response) => response.json())
      .then((apiData) => {
        const transformedData = apiData.map((item) => ({
          id : item.id,
          titmdsc: item.titmdsc,
          dull: item.dull,
          h23_lh23: item.h23_lh23,
          shara_brown: item.shara_brown,
          black_multi : item.black_multi,
          wood_coat: item.wood_coat,
          tctgcod: item.tctgcod,
        
        }));

        const columns = [
          { label: "Item ID", field: "id", sort: "asc" },
          { label: "Desription ", field: "titmdsc", sort: "asc" },
          { label: "DULL ", field: "dull", sort: "asc" },
          { label: "h23_lh23", field: "h23_lh23", sort: "asc" },
          { label: "Shara Brown", field: "shara_brown", sort: "asc" },
          { label: "Black Multi", field: "black_multi", sort: "asc" },
          { label: "Wood Coat", field: "wood_coat", sort: "asc" },
          { label: " Category ", field: "tctgcod", sort: "asc" },
          


        ];

        setData({ columns, rows: transformedData });

        console.log(apiData); // Log the fetched data
      })
      .catch((error) => console.error(error));
  }, []);
  const filteredRows = data.rows.filter((row) =>
  row.titmdsc.toLowerCase().includes(searchText.toLowerCase())
);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  ///////////////// here is our Search Function

  const stickyHeaderStyle = {
    backgroundColor: primaryColor,
    color: secondaryColor,
    fontWeight: 'bold',
    position: 'sticky', // Make the header sticky
    top: -2, // Stick it at the top
    zIndex: 2, // Add a z-index to ensure it's displayed above other elements
  };

  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (row) => {
    if (selectedRow === row.id) {
      // If the clicked row is already selected, navigate to the update screen
      navigate(`/Update_Item/${row.id}`);
    } else {
      // Set the selectedRow state to the clicked row id
      setSelectedRow(row.id);
    }
  };
  return (
    <>
      <Header />
      <PathHead pageName="File > Item Maintenance" screen='Get_Item' pageLink="/MainPage"/>

      <div className="col-12" style={{ color: secondaryColor}}>
        

        <br />
        <div className="Item-container" 
        // style={{ marginLeft: "5%", marginRight: "5%", maxWidth: "90%" }}
        >
        
          <Row>
            <Col xs={12} sm={4} md={4} lg={4} xl={2}>
              <Button
                className="btn btn-primary"
                style={{
                  backgroundColor: primaryColor,
                  fontSize: '11px',
                  color: secondaryColor,
                  width: '100%',
                  marginBottom: '10px',
                }}
                onClick={handleMenuItemClick}
              >
                ADD
              </Button>
            </Col>
            
            <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 3, offset: 7 }}>
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={handleSearchChange}
              />
            </Col>
          </Row>
          <div style={{ fontSize: '12px', width: '100%', overflowX: 'auto' }}>
          <MDBTable
              scrollY
              maxHeight="380px"
              striped
              bordered
              small
              responsive
            >
              {/* <MDBTableHead columns={data.columns} /> */}
              <MDBTableHead>
                <tr>
                  {data.columns.map((column, columnIndex) => (
                    <th
                      key={columnIndex}
                      // style={{ backgroundColor: primaryColor,color:secondaryColor, fontWeight: "bold" }}
                      style={stickyHeaderStyle}
                   >
                      {column.label}
                    </th>
                  ))}
                  
                </tr>
              </MDBTableHead>
              <MDBTableBody>
  {filteredRows.map((row, index) => (
    <tr key={index}  onClick={() => handleRowClick(row)}>
      {Object.keys(row).map((key, columnIndex) => {
        
        
        return (
          <td
            key={key}
            style={{
              textAlign:
                columnIndex === 1 
                  ? "left"
                  : columnIndex === 2 ||   columnIndex === 3 || columnIndex === 4 ||   columnIndex === 5
                  ? "right"
                  : "center" ,
                  // width: columnIndex === 0 ? "5%" : columnIndex === 1 ? "15%" : columnIndex === 2 ? "10%" : columnIndex === 3 ? "10%" :columnIndex === 4 ? "10%" :columnIndex === 5 ? "10%" : columnIndex === 6 ? "10%" :columnIndex === 7 ? "10%" :"auto",
                  
            }}
          >
            {key === "tusrpwd" ? "*****" : row[key]}
          </td>
        );
      })}
      
    
     
      {/* <td style={{ width: "10%" }}>
        <div>
         
          <Link to={`/Update_Item/${row.id}`}>

<img
    src={Edit}
    alt="Login"
    className="login-image"
    style={{ height: "23px", width: "30%" }}
  />
  </Link>
        </div>
      </td> */}
    </tr>
  ))}
</MDBTableBody>
            </MDBTable>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Get_Item;









