import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import { CTAButton } from "./form_components/CTAButton";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <Sidebar
        dismissable={false}
        showCloseIcon={false}
        modal={false}
        visible={true}
        onHide={() => {}}
        style={{ width: "200px" }}
      >
        <div className="sidebar-content">
          <div>
            <h1>Menu</h1>
            <ul className="sidebar-menu">
              {/* <ul> */}
              <li>
                <i className="pi pi-home" />
                <Link to="/">Home</Link>
              </li>
              <li>
                <i className="pi pi-briefcase" />

                <Link to="/services">Services</Link>
              </li>
              <li>
                <i className="pi pi-user" />
                <Link to="/clients">Clients</Link>
              </li>
              <li>
                <i className="pi pi-inbox" />
                <Link to="/contacts">Contacts</Link>
              </li>
            </ul>
          </div>
          <div className="p-20px w-100">
            <CTAButton text="Logout" onClick={logout} />
          </div>
        </div>
      </Sidebar>
    </>
  );
};
export default Navbar;
