import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './navbar.css';

import dropdown from '../../assets/dropdown.png';
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
                        <li><Link>Engine Data</Link></li>
                        <li className="dropDown-container">
                            <Link to='/chart'>Engine Analysis</Link>
                            <span id="dropdown" onMouseEnter={handleMouseEnter}>
                                <img
                                    src={dropdown}
                                    alt="dropdown"
                                    className={isRotated ? "rotate" : ""}
                                />
                            </span>
                        </li>
                        <li><Link>Engine Faults</Link></li>
                        <li><Link>Map View</Link></li>
                        <li><Link>Engine Error</Link></li>
                    </ul>
                </div>
            </div>
            <section className={isDropdownVisible ? "display" : ""} onMouseLeave={handleMouseLeave}>
                <ul id="dropDown-menu">
                    <li>Monthly</li>
                    <li>Weekly</li>
                    <li>Daily</li>
                </ul>
            </section>
        </div>
    );
};

export default Navbar;
