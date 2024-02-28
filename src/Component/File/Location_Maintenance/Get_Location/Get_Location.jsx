


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import Header from '../../../MainComponent/Header/Header';
import Footer from '../../../MainComponent/Footer/Footer';
import PathHead from '../../../MainComponent/PathHead/PathHead';
import Edit from '../../../../image/edit.png';
import '../Get_Location/Get_Location.css';
import { useTheme } from '../../../../ThemeContext';

const Get_Location = () => {
  const navigate = useNavigate();
  const { primaryColor, secondaryColor, apiLinks } = useTheme();

  const handleMenuItemClick = () => {
    navigate('/Add_Location');
  };
  const imageurl = `${apiLinks}/ctgImg/`;

  const [data, setData] = useState([]);
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/get_location.php`);
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

      <PathHead pageName="File > Location Maintenance" />
      <div className="col-12">
        <br />
        <br />
        <div>
        <div className="col-12 Location-container">
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
                    Edit
                  </th>
                </tr>
              </MDBTableHead>

              <MDBTableBody>
                {data
                  .filter((item) =>
                    item.lodsc.toLowerCase().includes(filterValue.toLowerCase())
                  )
                  .map((item) => (
                    <tr key={item.loid}>
                      <td>{item.loid}</td>
                      <td style={{ textAlign: 'left' }}>{item.lodsc}</td>
                      <td>{item.losts}</td>

                    

                      <td style={{ width: '15%' }}>
                        <div>
                          <Link to={`/Update_Location/${item.loid}`}>
                            <img
                              src={Edit}
                              alt="Login"
                              className="login-image"
                              style={{ height: '7%', width: '45%' }}
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

export default Get_Location;

