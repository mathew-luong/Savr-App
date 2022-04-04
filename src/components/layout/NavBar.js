// Dropdown React-bootstrap
// import "bootstrap";
import Dropdown from 'react-bootstrap/Dropdown'
import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core";

import { NavLink } from 'react-router-dom';
import classes from './NavBarStyling.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// FontAwesome Icons
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { faPersonCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import React, { useState } from "react";

function NavBar() {

    const [hamburgerOpen,setHamburger] = useState(false);

    const toggleHamburger = () => {
        return setHamburger(!hamburgerOpen);
    };

    return (
    <nav className={`${hamburgerOpen ? `${classes.navContainerActive}` : `${classes.navContainer}`}`}>
        <div className={classes.navMenu}>
            <h2 className={classes.navHeader}>Savr</h2>
            <button className={classes.navHamburgerBtn} onClick={toggleHamburger}>
                <FontAwesomeIcon icon={faBars} width="2.5rem" className={classes.hamburgerIcon}/>
            </button>
        </div>
        <div className={`${hamburgerOpen ? `${classes.navUlActive}` : `${classes.navUl}`}`}>
            <ul>
                <li className={classes.navItem}>
                    <NavLink className={({ isActive }) => (isActive ? `${classes.active}` : `${classes.navLink}`)} to="/dashboard">
                        <FontAwesomeIcon icon={faDesktop} width="2.5rem"/>
                        Dashboard
                    </NavLink>
                </li>
                <li className={classes.navItem}>
                    <NavLink className={({ isActive }) => (isActive ? `${classes.active}` : `${classes.navLink}`)} to="/expenses">
                    <FontAwesomeIcon icon={faCreditCard}  width="2.5rem"/>
                        Expenses
                    </NavLink>
                </li>
                <li className={classes.navItem}>
                    <NavLink className={({ isActive }) => (isActive ? `${classes.active}` : `${classes.navLink}`)} to="/savings">
                    <FontAwesomeIcon icon={faChartLine} width="2.5rem"/>
                        Savings
                    </NavLink>
                </li>
                <li className={classes.navItem}>
                    <NavLink className={({ isActive }) => (isActive ? `${classes.active}` : `${classes.navLink}`)} to="/support">
                    <FontAwesomeIcon icon={faPersonCircleQuestion} width="2.5rem"/>
                        Support
                    </NavLink>                    
                </li>
                <li className={classes.dropdownLi}>
                    <Dropdown className={classes.dropdownBtn} drop="up">
                        <Dropdown.Toggle variant="danger" id="dropdown-basic" className={classes.dropdownText}>
                            <h4 className={classes.dropdownUserName}>User</h4>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className={classes.dropdownMenu}>
                            <Dropdown.Item href="#/action-1" className={classes.dropdownMenuItem}>Account Settings</Dropdown.Item>
                            <Dropdown.Item href="/" className={classes.dropdownMenuItem}>Log Out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
            </ul>
        </div>
    </nav>
    );
}

export default NavBar;
