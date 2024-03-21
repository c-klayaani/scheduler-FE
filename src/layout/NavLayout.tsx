import { Outlet } from "react-router";
// import Sidebar from "../components/sidebar";
import Navbar from "../components/Sidebar";

const NavLayout = () => {



  
  return (
    <div >
      <Navbar />
      <div style={{paddingLeft:"200px", backgroundColor: "aliceblue",minHeight:'100dvh',width:'100%' }} >
        <Outlet />
      </div>
    </div>
  );
};
export default NavLayout;
