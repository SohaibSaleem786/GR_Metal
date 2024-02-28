


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import Header from '../../../MainComponent/Header/Header';
import Footer from '../../../MainComponent/Footer/Footer';
import PathHead from '../../../MainComponent/PathHead/PathHead';
import Edit from '../../../../image/edit.png';
import '../Get_Delivery/Get_Delivery.css';
import { useTheme } from '../../../../ThemeContext';

const Get_Delivery = () => {
  const navigate = useNavigate();
  const { primaryColor, secondaryColor, apiLinks } = useTheme();

  const handleMenuItemClick = () => {
    navigate('/Add_Delivery');
  };
  const imageurl = `${apiLinks}/ctgImg/`;

  const [data, setData] = useState([]);
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/get_delivery.php`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const apiData = await response.json();
        setData(apiData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />

      <PathHead pageName="File > Delevery Maintenance" />
      <div className="col-12">
        <br />
        <br />
        <div>
        <div className="col-12 delivery-container">
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <button
      className="btn btn-primary"
      onClick={handleMenuItemClick}
      style={{
        backgroundColor: primaryColor,
        height: '4%',
        fontSize: '11px',
        color: secondaryColor,
        width: '15%',
        marginRight: '2%',
      }}
    >
      ADD
    </button>
    <button
      className="btn btn-primary"
      onClick={() => navigate('/MainPage')}
      style={{
        backgroundColor: primaryColor,
        height: '4%',
        fontSize: '11px',
        color: secondaryColor,
        width: '15%',
        marginRight: '2%',
      }}
    >
      Return
    </button>
    <div style={{ marginLeft: 'auto' }}>
      <input
        type="text"
        placeholder="Search..."
        className="form-control"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
      />
    </div>
  </div>
  <div style={{ fontSize: '12px', width: '100%', overflowX: 'auto' }}>
            <MDBTable scrollY maxHeight="400px" striped bordered small responsive>
              <MDBTableHead>
                <tr>
                  <th
                    style={{
                      backgroundColor: primaryColor,
                      color: secondaryColor,
                      fontWeight: 'bold',
                      position: 'sticky',
                      top: -1,
                      zIndex: 1,
                    }}
                  >
                    ID
                  </th>
                 
                  <th
                    style={{
                      backgroundColor: primaryColor,
                      color: secondaryColor,
                      fontWeight: 'bold',
                      position: 'sticky',
                      top: -1,
                      zIndex: 1,
                    }}
                  >
                    Description
                  </th>
                 
                  <th
                    style={{
                      backgroundColor: primaryColor,
                      color: secondaryColor,
                      fontWeight: 'bold',
                      position: 'sticky',
                      top: -1,
                      zIndex: 1,
                    }}
                  >
                    Status
                  </th>
                  <th
                    style={{
                      backgroundColor: primaryColor,
                      color: secondaryColor,
                      fontWeight: 'bold',
                      position: 'sticky',
                      top: -1,
                      zIndex: 1,
                    }}
                  >
                    Delivery Amt
                  </th>
                  
                  <th
                    style={{
                      backgroundColor: primaryColor,
                      color: secondaryColor,
                      fontWeight: 'bold',
                      position: 'sticky',
                      top: -1,
                      zIndex: 1,
                    }}
                  >
                    Edit
                  </th>
                </tr>
              </MDBTableHead>

              <MDBTableBody>
                {data
                  .filter((item) =>
                    item.dvdsc.toLowerCase().includes(filterValue.toLowerCase())
                  )
                  .map((item) => (
                    <tr key={item.dvid}>
                      <td>{item.dvid}</td>
                      <td style={{ textAlign: 'left' }}>{item.dvdsc}</td>
                      <td>{item.dvsts}</td>
                      <td >{item.dvamt}</td>

                     

                      <td style={{ width: '15%' }}>
                        <div>
                          <Link to={`/Update_Delivery/${item.dvid}`}>
                            <img
                              src={Edit}
                              alt="Login"
                              className="login-image"
                              style={{ height: '5%', width: '25%' }}
                            />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
              </MDBTableBody>
            </MDBTable>
          </div>
</div>

         
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Get_Delivery;

