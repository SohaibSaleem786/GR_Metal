// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
// import Header from '../../MainComponent/Header/Header';
// import Footer from '../../MainComponent/Footer/Footer';
// import PathHead from '../../MainComponent/PathHead/PathHead';
// import { useTheme } from '../../../ThemeContext';
// import Edit from '../../../image/edit.png';
// import '../Get_Category/GetCategory.css'
// const GetCategory = () => {
//   const navigate = useNavigate();
//   const { primaryColor,secondaryColor,apiLinks } = useTheme();

//   const handleMenuItemClick = () => {
//     navigate('/AddCategory');
//   };
//   const imageurl = `${apiLinks}/ctgImg/`;

//   const [data, setData] = useState([]);
//   const [filterValue, setFilterValue] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${apiLinks}/get_category.php`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }

//         const apiData = await response.json();
//         setData(apiData);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//     <Header />
      
//     <PathHead pageName="File > Category Maintenance"/>
//     <div className="col-12" >
     

//       <br />
//       <br />
//       <div style={{ marginLeft: '25%', marginRight: '25%', maxWidth: '50%' }}>
//         <div className="col-12">
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <button
//               className="btn btn-primary"
              // style={{
              //   backgroundColor: primaryColor,
              //   height: '4%',
              //   fontSize: '11px',
              //   color: secondaryColor,
              //   width: '15%',
              //   marginRight: '2%',
              // }}
//               onClick={handleMenuItemClick}
//             >
//               ADD
//             </button>
//             <button
//               className="btn btn-primary"
//               onClick={() => navigate('/MainPage')}
//               style={{
//                 backgroundColor: primaryColor,
//                 height: '4%',
//                 fontSize: '11px',
//                 color: secondaryColor,
//                 width: '15%',
//                 marginRight: '2%',
//               }}
//             >
//               Return
//             </button>
//             <div style={{ marginLeft: 'auto' }}>
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="form-control"
//                 value={filterValue}
//                 onChange={(e) => setFilterValue(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>
//         <div style={{ fontSize: '12px', width: '100%', overflowX: 'auto' }}>
//           <MDBTable scrollY maxHeight="440px" striped bordered small responsive>
//             <MDBTableHead>
//               <tr>
//               <th  style={{ backgroundColor: primaryColor,color:secondaryColor, fontWeight: "bold",position: "sticky",
//                 top: -1,
//                 zIndex: 1, }}>ID</th>
//                 <th  style={{ backgroundColor: primaryColor,color:secondaryColor, fontWeight: "bold",position: "sticky",
//                 top: -1,
//                 zIndex: 1, }}>Index</th>
//                 <th style={{ backgroundColor: primaryColor,color:secondaryColor, fontWeight: "bold",position: "sticky",
//                 top: -1,
//                 zIndex: 1, }}>Description</th>
//                  <th style={{ backgroundColor: primaryColor,color:secondaryColor, fontWeight: "bold",position: "sticky",
//                 top: -1,
//                 zIndex: 1, }}>Remarks</th>
//                 <th style={{ backgroundColor: primaryColor,color:secondaryColor, fontWeight: "bold" ,position: "sticky",
//                 top: -1,
//                 zIndex: 1,}}>Status</th>
//                 <th style={{ backgroundColor: primaryColor,color:secondaryColor, fontWeight: "bold" ,position: "sticky",
//                 top: -1,
//                 zIndex: 1,}}>Picture</th>
              
//                 <th style={{ backgroundColor: primaryColor,color:secondaryColor, fontWeight: "bold",position: "sticky",
//                 top: -1,
//                 zIndex: 1, }}>Edit</th>
//               </tr>
//             </MDBTableHead>
           
//             <MDBTableBody>
//               {data
//                 .filter((item) =>
//                   item.tctgdsc.toLowerCase().includes(filterValue.toLowerCase())
//                 )
//                 .map((item) => (
//                   <tr key={item.tctgid}>
//                     <td>{item.tctgid}</td>
//                     <td>{item.ctindexs}</td>
//                     <td style={{textAlign:'left'}}>{item.tctgdsc}</td>
//             <td style={{textAlign:'left'}}>{item.remarks}</td>
//                     <td>{item.tctgsts}</td>
                   
//                     <td style={{ width: "15%" }}>
//                       <img
//                         src={imageurl + item.tctgpic}
//                         alt="Category"
//                         style={{ width: '50px', height: 'auto' }}
//                       />
//                     </td>
                  
//                     <td style={{ width: "15%" }}>
//         <div>
         
//           <Link to={`/UpdateCategory/${item.tctgid}`}>

// <img
//     src={Edit}
//     alt="Login"
//     className="login-image"
//     style={{ height: "7%", width: "45%" }}
//   />
//   </Link>
//         </div>
//       </td>
//                   </tr>
//                 ))}
//             </MDBTableBody>
//           </MDBTable>
//         </div>
//       </div>
//       <Footer />
//     </div>
//     </>
//   );
// };

// export default GetCategory;



import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import Header from '../../MainComponent/Header/Header';
import Footer from '../../MainComponent/Footer/Footer';
import PathHead from '../../MainComponent/PathHead/PathHead';
import { useTheme } from '../../../ThemeContext';
import Edit from '../../../image/edit.png';
import '../Get_Category/GetCategory.css';

const GetCategory = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const imageurl = 'https://www.crystalsolutions.com.pk/csres/itemimage/';
  const { primaryColor }   = useTheme();
  const { secondaryColor } = useTheme();

  const handleMenuItemClick = () => {
    navigate("/AddCategory");
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
    fetch("https://www.crystalsolutions.com.pk/grmetal/get_category.php")
      .then((response) => response.json())
      .then((apiData) => {
        const transformedData = apiData.map((item) => ({
          id : item.id,
          tctgcod: item.tctgcod,
          tctgdsc: item.tctgdsc,
          tctgsts: item.tctgsts,
            
        
        }));

        const columns = [
          { label: "ID", field: "id", sort: "asc" },
          { label: "Code ", field: "tctgcod", sort: "asc" },
          { label: "Description", field: "tctgdsc", sort: "asc" },
          { label: "Status", field: "tctgsts", sort: "asc" },


        ];

        setData({ columns, rows: transformedData });

        console.log(apiData); // Log the fetched data
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  ///////////////// here is our Search Function
  const filteredRows = data.rows.filter((row) =>
  row.tctgdsc.toLowerCase().includes(searchText.toLowerCase())
);


///////////////// here is our Search Function

const [selectedRow, setSelectedRow] = useState(null);

const handleRowClick = (row) => {
  if (selectedRow === row.id) {
    // If the clicked row is already selected, navigate to the update screen
    navigate(`/UpdateCategory/${row.id}`);
  } else {
    // Set the selectedRow state to the clicked row id
    setSelectedRow(row.id);
  }
};
  return (
    <>
      <Header />

      <PathHead pageName="File > Category Maintenance" screen='Get_Item' pageLink="/MainPage"/>
      <div className="col-12">
        <br />
        <br />
        <div>
        <div className="col-12 Category-container">
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <button
      className="btn btn-primary"
      onClick={handleMenuItemClick}
      style={{
        backgroundColor: primaryColor,
        height: '4%',
        fontSize: '11px',
        color: secondaryColor,
        width: '25%',
        marginRight: '2%',
      }}
    >
      ADD
    </button>
    
    <div style={{ marginLeft: 'auto' }}>
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={handleSearchChange}
        className="form-control"
      />
    </div>
  </div>
  <div style={{ fontSize: '12px', width: '100%', overflowX: 'auto' }}>
  <MDBTable
      scrollY
      maxHeight="380px"
      striped
      bordered
      small
      responsive
    >
      <MDBTableHead>
        <tr>
          {data.columns.map((column, columnIndex) => (
            <th
              key={columnIndex}
              style={{
                backgroundColor: primaryColor,
                color: secondaryColor,
                fontWeight: "bold",
                position: "sticky",
                top: -1,
                zIndex: 1, // Ensure the header is above the content
              }}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {filteredRows.map((row, index) => (
          <tr key={index}    onClick={() => handleRowClick(row)}>
            {Object.keys(row).map((key, columnIndex) => {
              if (columnIndex === 7) {
                // Skip rendering these columns
                return null;
              }
              return (
                <td
                  key={key}
                  style={{
                    textAlign: columnIndex === 2 ? "left" : "center",
                    width:
                      columnIndex === 0
                        ? "6%"
                        : columnIndex === 1
                        ? "9%"
                        : columnIndex === 2
                        ? "43%"
                        : columnIndex === 3
                        ? "6%"
                        : "auto",
                  }}
                >
                  {key === "tusrpwd" ? "*****" : row[key]}
                </td>
              );
            })}
            {/* <td style={{  width: "15%" }}>
              <div >
                <Link to={`/UpdateCategory/${row.id}`}>
                  <img
                    src={Edit}
                    alt="Login"
                    className="login-image"
                    // style={{ height: "8%", width: "40%" }}
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

         
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GetCategory;

