import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './navbar.css';


import logo from '../../assets/MotomatriX_Logo.png';

const Navbar = () => {
const [isDropdownVisible, setDropdownVisible] = useState(false);
const [isRotated, setRotated] = useState(false);

const handleMouseEnter = () => {
    if (!isDropdownVisible) {
        setDropdownVisible(true);
        setRotated(true);
    }
};

const handleMouseLeave = () => {
    if (isDropdownVisible) {
        setDropdownVisible(false);
        setRotated(false);
    }
};

return (
    <div className="navbar">
        <div className="nav-container">
            <img src={logo} alt="logo" className="logo" />
            <div className="nav-links">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/EngineData" >Engine Data</Link></li>
                    <li ><Link to='/chart'>Engine Analysis</Link></li>
                    <li><Link to="/EngineFaults">Engine Faults</Link></li>
                    <li><Link to="/GpsTracker">Map</Link></li>
                    <li><Link to="ErrorPrevent">Error prevention</Link></li>
                </ul>
            </div>
        </div>
       
    </div>
);
};

export default Navbar;