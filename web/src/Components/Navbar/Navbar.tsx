import React from "react";
import "./navbar.scss";
import logo from "../../assets/logo.png";
import { NavbarProps } from "../../types/NavbarProps";
import { fetchNui } from "../../helper/fetchNui";

const Navbar: React.FC<{
  currentPage: string;
  setCurrentPage: (value: string) => void;
  navbarItems: NavbarProps[];
}> = ({ currentPage, setCurrentPage, navbarItems }) => {
  return (
    <div className="navbar">
      <img src={logo} />
      <div className="navbarElements">
        {navbarItems.map((item, index) => (
          <div
            className={`element ${currentPage === item.value ? "active" : ""}`}
            key={index}
            onClick={() => {
              setCurrentPage(item.value);
            }}
          >
            <div className="iconContainer">{item.icon}</div>
            <p className="title">{item.label}</p>
          </div>
        ))}
      </div>
      <button onClick={() => fetchNui("close")}>Kilépés</button>
    </div>
  );
};

export default Navbar;
