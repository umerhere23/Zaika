import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
