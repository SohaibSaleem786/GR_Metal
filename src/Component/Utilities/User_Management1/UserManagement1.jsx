import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import Header from '../../MainComponent/Header/Header';
import Footer from '../../MainComponent/Footer/Footer';
import PathHead from '../../MainComponent/PathHead/PathHead';
import { useTheme } from '../../../ThemeContext';
const UserManagement1 = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState({ columns: [], rows: [] });
  const { primaryColor } = useTheme();
  const { secondaryColor } = useTheme();

  const handleMenuItemClick = () => {
    navigate('/AddUser1');
  };

  useEffect(() => {
    fetch('https://www.crystalsolutions.com.pk/csres/GetUsers.php')
      .then((response) => response.json())
      .then((apiData) => {
        const transformedData = apiData.map((item) => ({
          id: item.id,
          tusrid: item.tusrid,
          tusrnam: item.tusrnam,
          tusrpwd: item.tusrpwd,
          tusrsts: item.tusrsts,
          tusrtyp: item.tusrtyp,
          tmobnum: item.tmobnum,
          temladd: item.temladd,
        }));

        const columns = [
          { label: 'ID', field: 'id', sort: 'asc' },
          { label: 'User ID', field: 'tusrid', sort: 'asc' },
          { label: 'Name', field: 'tusrnam', sort: 'asc' },
          { label: 'Password', field: 'tusrpwd', sort: 'asc' },
          { label: 'Status', field: 'tusrsts', sort: 'asc' },
          { label: 'Type', field: 'tusrtyp', sort: 'asc' },
          { label: 'Mobile Number', field: 'tmobnum', sort: 'asc' },
          { label: 'Email Address', field: 'temladd', sort: 'asc' },
          { label: 'Edit', field: 'temladd', sort: 'asc' },
          { label: 'Menu', field: 'temladd', sort: 'asc' },

        ];

        setData({ columns, rows: transformedData });

        console.log(apiData); // Log the fetched data
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredRows = data.rows.filter((row) =>
    row.tusrnam.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
    <Header />
  
      <PathHead pageName="Utilities > UserManagement" />

    <div className="col-12" style={{ color: 'black' }}>
      

      <br />
      <div style={{ marginLeft: '7%', marginRight: '7%', maxWidth: '100%' }}>
        <div className="col-12">
        <div style={{ display: 'flex', alignItems: 'center' }}>

          <button
    className="btn btn-primary"
    style={{
      backgroundColor: primaryColor,
      height: '4%',
      fontSize: '11px',
      color: secondaryColor,
      width: '14%', // Adjusted width for smaller screens
      marginRight: '2%', // Added margin to separate from the input field on smaller screens
    }}
    onClick={handleMenuItemClick}
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
                  width: '18%',
                  marginRight: '2%',
                }}
              >
                Return
              </button>
  <div style={{marginLeft:'70%'}}>
    <input
      type="text"
      placeholder="Search..."
      value={searchText}
      onChange={handleSearchChange}
      className="form-control"
    />
  </div>
</div>

        </div>

        <div style={{ fontSize: '12px', width: '100%', overflowX: 'auto' }}>
          <MDBTable scrollY maxHeight="380px" striped bordered small responsive>
            {/* 'responsive' class added to the table to make it responsive */}
            <MDBTableHead>
                <tr>
                  {data.columns.map((column, columnIndex) => (
                    <th
                      key={columnIndex}
                      style={{ backgroundColor: primaryColor,color:secondaryColor, fontWeight: "bold" }}
                    >
                      {column.label}
                    </th>
                  ))}
                  
                </tr>
              </MDBTableHead>
            <MDBTableBody>
              {filteredRows.map((row, index) => (
                <tr key={index}>
                  {Object.keys(row).map((key) => {
                    if (key === 'tusrpwd') {
                      // Render asterisks (*) instead of the actual password
                      return <td key={key}>*****</td>;
                    } else {
                      return <td key={key}>
                        {row[key]}
                        </td>;
                    }
                  })}
                  <td>
                    <div>
                      <Link to={`/EditUser/${row.tusrid}`}>
                        <button
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                            border: 'none',
                            height: '22px',
                            padding: '5px 10px',
                            cursor: 'pointer',
                          }}
                        >
                          Edit
                        </button>
                      </Link>
                    </div>
                  </td>
                  <td>
                    <div>
                      <Link to={`/MenuUser/${row.id}`}>
                        <button
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                            border: 'none',
                            height: '22px',
                            padding: '5px 10px',
                            cursor: 'pointer',
                          }}
                        >
                          Menu
                        </button>
                      </Link>
                    </div>
                  </td>
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

export default UserManagement1;

















