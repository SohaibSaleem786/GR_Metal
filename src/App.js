// import './App.css';
// import React, { createContext, useState, useContext } from 'react';

// import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// // import React           from 'react';
// import HomePage2       from './Component/MainComponent/HomePage2/HomePage2'
// import HomePage1       from './Component/MainComponent/HomePage/Homepage'
// import Login           from './Component/MainComponent/Login/Login'
// import NavBar          from './Component/MainComponent/Navbar/Navbar';
// import UserManagement1 from './Component/Utilities/User_Management1/UserManagement1'
// import AddUser         from './Component/Utilities/User_Management1/Add_User/AddUser'
// import EditUser        from './Component/Utilities/User_Management1/Edit_User/Edit_User'
// import AddCategory     from './Component/Category/Add_Category/AddCategory';
// import GetCategory     from './Component/Category/Get_Category/GetCategory';
// import AddCategory1    from './Component/AddCategory1';
// import UpdateCategory  from './Component/Category/Update_Category/UpdateCategory';
// import Item            from './Component/File/Item Maintenance/Add Item/Item';
// import ItemType        from './Component/File/Item Maintenance/ItemType/ItemType';
// import GroupCode       from './Component/File/Code/GroupCode/GroupCode';
// import AccountCod      from './Component/File/Code/AccountCode/AccountCode';
// import AddUser1        from './Component/Utilities/User_Management1/Add_User1/AddUser1'
// import AuthProvider    from './AuthContext';
// import MenuUser        from './Component/Utilities/User_Management1/MenuUser/MenuUser';












// import Update_Item from './Component/File/Item Maintenance/Update Item/Update_Item';
// import Get_Item from './Component/File/Item Maintenance/Get Item/Get_Item'; 




// const ThemeContext = createContext();
//      export function useTheme() {
//      return useContext(ThemeContext);
// }
// function App() {
     
//      const [isDarkMode, setIsDarkMode] = useState(true);
//      const [primaryColor, setPrimaryColor] = useState('#ac1e1e');      // Set the primary color to orange
//      const [secondaryColor, setsecondaryColor] = useState('white'); // Set the primary color to orange
//      const [navbarheight, setnavbarheight] = useState(30); // Set the primary color to orange
//      const [pathheight, setpathbarheight] = useState(40); // Set the primary color to orange

//      // Toggle the theme
//      const toggleTheme = () => {
//        setIsDarkMode(!isDarkMode);
//      };
   
//      // Define theme-related values
//      const theme = {
//        isDarkMode,
//        toggleTheme,
//        primaryColor, 
//        secondaryColor,
//        navbarheight,
//        pathheight,
//      };
   
//   return (
//     <>
// {/* <Get_Area/>  */}
// {/* <Add_Group/> */}

// <div style={{backgroundColor: '#edf2ff', minHeight: "100vh"}}>
     
// <Router>


           

// <AuthProvider>
// <ThemeContext.Provider value={theme}>
// <Routes>
  
// <Route exact  path="/csres/malik"         element={<Login/>}/>
// <Route exact  path="/login"                 element={<Login/>}></Route>
// <Route exact  path="/MainPage"              element={<HomePage1/>}></Route>
// <Route exact path="/AddCategory"            element={<AddCategory/>}></Route>
// <Route exact path="/GetCategory"            element={<GetCategory/>}></Route>
// <Route exact path="/AddCategory1"           element={<AddCategory1/>}></Route>
// <Route exact path="/UpdateCategory/:tctgid" element={<UpdateCategory/>}></Route>
// <Route exact path="/Item"                   element={<Item/>}></Route>
// <Route exact path="/ItemType"               element={<ItemType/>}></Route>
// <Route exact path="/GroupCode"              element={<GroupCode/>}></Route>
// <Route exact path="/AccountCod"             element={<AccountCod/>}></Route>
// {/* <Route exact path="/Model"                  element={<Model/>}></Route>  */}



// {/* ///////////////////////  Item MAINTENANCE //////////////////////////////// */}
//  <Route exact path="/Get_Item"                element={<Get_Item/> }></Route>
//  <Route exact path="/Item"                    element={<Item/> }></Route>
//  <Route exact path="/Update_Item/:TItmId"     element={<Update_Item/> }></Route>





// {/* /////////////////////////////////////////////////////////////////////////////// */}   
// {/* /////////////////////////////////////////////////////////////////////////////// */}
// {/* /////////////////////////////////////////////////////////////////////////////// */}
// {/* ////////////////////////////////////// UTILITES  ////////////////////////// */}
// {/* ///////////////////     User Management  ////////////////////////// */}
// <Route exact path="/UserManagement1"   element={<UserManagement1/>}></Route>
// <Route       path="/EditUser/:tusrid"  element={<EditUser />} />
// <Route       path="/MenuUser/:id"      element={<MenuUser />} />
// <Route exact path="/AddUser1"          element={<AddUser1 />}></Route>

                

// </Routes>
// </ThemeContext.Provider>

// </AuthProvider>

// </Router>
// </div>

//     </>   
//   );
// }


// export default App;















import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage2 from './Component/MainComponent/HomePage2/HomePage2';
import HomePage1 from './Component/MainComponent/HomePage/Homepage';
import Login from './Component/MainComponent/Login/Login';
import NavBar from './Component/MainComponent/Navbar/Navbar';
import UserManagement1 from './Component/Utilities/User_Management1/UserManagement1';
import AddUser from './Component/Utilities/User_Management1/Add_User/AddUser';
import EditUser from './Component/Utilities/User_Management1/Edit_User/Edit_User';
import AddCategory from './Component/Category/Add_Category/AddCategory';
import GetCategory from './Component/Category/Get_Category/GetCategory';
import AddCategory1 from './Component/AddCategory1';
import UpdateCategory from './Component/Category/Update_Category/UpdateCategory';
import Item from './Component/File/Item Maintenance/Add Item/Item';
import ItemType from './Component/File/Item Maintenance/ItemType/ItemType';
import GroupCode from './Component/File/Code/GroupCode/GroupCode';
import AccountCode from './Component/File/Code/AccountCode/AccountCode';
import AddUser1 from './Component/Utilities/User_Management1/Add_User1/AddUser1';
import AuthProvider from './AuthContext';
import MenuUser from './Component/Utilities/User_Management1/MenuUser/MenuUser';
import Update_Item from './Component/File/Item Maintenance/Update Item/Update_Item';
import Get_Item from './Component/File/Item Maintenance/Get Item/Get_Item';
import { ThemeProvider } from './ThemeContext'; // Import the ThemeProvider
import Order_Category from './Component/Transaction/Order/OrderCtg/OrderCtg';
import Order_Item from './Component/Transaction/Order/OrderCtg/OrderItm/OrderItm';
import Cart_Item from './Component/Transaction/Order/OrderCtg/OrderItm/OrderNo/Cart_Item/Cart_Item'
import Order_Number from './Component/Transaction/Order/OrderCtg/OrderItm/OrderNo/OrderNumber';
import CheckOut from './Component/Transaction/Order/OrderCtg/OrderItm/OrderNo/Checkout/Checkout';
import Check_Out_List from './Component/Transaction/CheckOutOrder/OrderList/CheckOutOrderList';
import Check_Out_Cart from './Component/Transaction/CheckOutOrder/CheckOutCart/CheckOutCart';
import Daily_Sale_Report from './Component/Reports/DailySaleReport/DailySaleReports';
import Daily_Sale_Detail_Report from './Component/Reports/DailySaleDetailReport/DailySaleDetailReport';
import Purchase from './Component/Transaction/Purchase/Purchase';
import Account_Code_Maintenance from './Component/File/Account_Code/AccountCode_Maintenance';
import Invoice from './Component/Transaction/Order/OrderCtg/OrderItm/OrderNo/Invoice/Invoice';
import Get_Delivery from './Component/File/Delivery_Maintenance/Get_Delivery/Get_Delivery';
import Add_Delivery from './Component/File/Delivery_Maintenance/Add_Delivery/Add_Delivery';
import Update_Delivery from './Component/File/Delivery_Maintenance/Update_Delivery/Update_Delivery';
import Get_UOM from './Component/File/UOM_Maintenance/Get_UOM/Get_UOM';
import Add_UOM from './Component/File/UOM_Maintenance/Add_UOM/Add_UOM';
import Update_UOM from './Component/File/UOM_Maintenance/Update_UOM/Update_UOM';
import Get_Location from './Component/File/Location_Maintenance/Get_Location/Get_Location';
import Add_Location from './Component/File/Location_Maintenance/Add_Location/Add_Location';
import Update_Location from './Component/File/Location_Maintenance/Update_Location/Update_Location';
import Get_MOP from './Component/File/Mode_Of_Payment_Maintenance/Get_MOP/Get_MOP';
import Add_MOP from './Component/File/Mode_Of_Payment_Maintenance/Add_MOP/Add_MOP';
import Update_MOP from './Component/File/Mode_Of_Payment_Maintenance/Update_MOP/Update_MOP';
import { RowIdProvider } from './createContext';
import Order_Tracking from './Component/Transaction/OrderTracking/Order_Tracking';

function App() {
  return (
    <>
       

      <div style={{ backgroundColor: '#edf2ff',fontFamily: 'Verdana', minHeight: '100vh' }}>
        <Router>
          <AuthProvider>
            {/* Use the ThemeProvider */}
            <ThemeProvider>
            <RowIdProvider>
            <Routes>
  
  <Route exact  path="/csres/grmetal"         element={<Login/>}/>
  <Route exact  path="/login"                 element={<Login/>}></Route>
  <Route exact  path="/MainPage"              element={<HomePage1/>}></Route>
  <Route exact path="/AddCategory"            element={<AddCategory/>}></Route>
  <Route exact path="/GetCategory"            element={<GetCategory/>}></Route>
  <Route exact path="/AddCategory1"           element={<AddCategory1/>}></Route>
  <Route exact path="/UpdateCategory/:id" element={<UpdateCategory/>}></Route>
  <Route exact path="/Item"                   element={<Item/>}></Route>
  <Route exact path="/ItemType"               element={<ItemType/>}></Route>
  <Route exact path="/GroupCode"              element={<GroupCode/>}></Route>
  {/* <Route exact path="/AccountCod"             element={<AccountCod/>}></Route> */}
  {/* <Route exact path="/Model"                  element={<Model/>}></Route>  */}
  
  
      {/* /////////////////////////////////////////////////////////////////////////////// */}   
  {/* /////////////////////////////////////////////////////////////////////////////// */}
  {/* /////////////////////////////////////////////////////////////////////////////// */}
  {/* ////////////////////////////////////// File  ////////////////////////// */}
  {/* ///////////////////////  Item MAINTENANCE //////////////////////////////// */}
   <Route exact path="/Get_Item"                element={<Get_Item/> }></Route>
   <Route exact path="/Item"                    element={<Item/> }></Route>
   <Route exact path="/Update_Item/:id"     element={<Update_Item/> }></Route>
       {/* ///////////////////////  UOM MAINTENANCE //////////////////////////////// */}
       <Route exact path="/Get_UOM"                element={<Get_UOM/> }></Route>
   <Route exact path="/Add_UOM"                    element={<Add_UOM/> }></Route> 
    <Route exact path="/Update_UOM/:uomid"     element={<Update_UOM/> }></Route> 
    {/* ///////////////////////  Delivery MAINTENANCE //////////////////////////////// */}
    <Route exact path="/Get_Delivery"                element={<Get_Delivery/> }></Route>
   <Route exact path="/Add_Delivery"                    element={<Add_Delivery/> }></Route>
   <Route exact path="/Update_Delivery/:dvid"     element={<Update_Delivery/> }></Route>
       {/* ///////////////////////  Location MAINTENANCE //////////////////////////////// */}
       <Route exact path="/Get_Location"                element={<Get_Location/> }></Route>
   <Route exact path="/Add_Location"                    element={<Add_Location/> }></Route>
   <Route exact path="/Update_Location/:loid"     element={<Update_Location/> }></Route>
 {/* ///////////////////////  MOP MAINTENANCE //////////////////////////////// */}
          <Route exact path="/Get_MOP"                element={<Get_MOP/> }></Route>
   <Route exact path="/Add_MOP"                    element={<Add_MOP/> }></Route>
   <Route exact path="/Update_MOP/:id"     element={<Update_MOP/> }></Route>
    {/* ///////////////////////  Account Code MAINTENANCE //////////////////////////////// */}
    <Route exact path="/Account_Code_Maintenance" element={<Account_Code_Maintenance/> }></Route>

  
  
    {/* /////////////////////////////////////////////////////////////////////////////// */}   
  {/* /////////////////////////////////////////////////////////////////////////////// */}
  {/* /////////////////////////////////////////////////////////////////////////////// */}
  {/* ////////////////////////////////////// Reports  ////////////////////////// */}
  {/* ///////////////////     Daily Reports  ////////////////////////// */}
  <Route exact path="/Daily_Sale_Report"   element={<Daily_Sale_Report/>}></Route>
  <Route exact path="/Daily_Sale_Detail_Report"   element={<Daily_Sale_Detail_Report/>}></Route>

  
  {/* /////////////////////////////////////////////////////////////////////////////// */}   
  {/* /////////////////////////////////////////////////////////////////////////////// */}
  {/* /////////////////////////////////////////////////////////////////////////////// */}
  {/* ////////////////////////////////////// UTILITES  ////////////////////////// */}
  {/* ///////////////////     User Management  ////////////////////////// */}
  <Route exact path="/UserManagement1"   element={<UserManagement1/>}></Route>
  <Route       path="/EditUser/:tusrid"  element={<EditUser />} />
  <Route       path="/MenuUser/:id"      element={<MenuUser />} />
  <Route exact path="/AddUser1"          element={<AddUser1 />}></Route>
  
  
    {/* /////////////////////////////////////////////////////////////////////////////// */}   
  {/* /////////////////////////////////////////////////////////////////////////////// */}
  {/* /////////////////////////////////////////////////////////////////////////////// */}
  {/* ////////////////////////////////////// TRANSACTION  ////////////////////////// */}
  {/* ///////////////////     ORDER  ////////////////////////// */}
  <Route exact path="/Order_Category/:id"   element={<Order_Category/>}></Route>
  <Route path="/Order_Item/:categoryId" element={<Order_Item />} /> {/* Include categoryId as a parameter */}
  <Route exact path="/Cart_Item/:id"   element={<Cart_Item/>}></Route>
  <Route exact path="/Order_Number"   element={<Order_Number/>}></Route>
  <Route path="/Order_Item" element={<Order_Item />} /> 
  <Route path="/CheckOut" element={<CheckOut />} /> 
  <Route exact path="/Invoice/:id"   element={<Invoice/>}></Route>
  {/* ///////////////////     ORDER Tracking  ////////////////////////// */}
  <Route exact path="/Order_Tracking"   element={<Order_Tracking/>}></Route>


{/* ///////////////////     Check Out Order List  ////////////////////////// */}
  <Route path="/Check_Out_List" element={<Check_Out_List />} /> 
  <Route exact path="/Check_Out_Cart/:id"   element={<Check_Out_Cart/>}></Route>
{/* ///////////////////     Purchase  ////////////////////////// */}
<Route path="/Purchase" element={<Purchase />} /> 
            </Routes>
            </RowIdProvider>

            </ThemeProvider>
          </AuthProvider>
        </Router>
      </div>
     

    </>
  );
}

export default App;




 






