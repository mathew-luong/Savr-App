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
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import React, { useState } from "react";

function NavBar() {

    const [hamburgerOpen,setHamburger] = useState(false);

    const toggleHamburger = () => {
        return setHamburger(!hamburgerOpen);
    };

    // INITIALLY HAMBURGEROPEN = FALSE -> HIDEHAMBURGER
    // AFTER CLICK HAMBURGEROPEN = TRUE -> SHOWHAMBURGER

    return (
    <nav className={classes.navContainer}>
        {/* <nav className={`${hamburgerOpen ? "navContainer" : "navContainerHidden"}`}> */}
        <div className={classes.navMenu}>
            <h2 className={classes.navHeader}>Savr</h2>
            <button className={classes.navHamburgerBtn} onClick={toggleHamburger}>
                <FontAwesomeIcon icon={faBars} width="2.5rem" className={classes.hamburgerIcon}/>
            </button>
        </div>
        <div className={`${hamburgerOpen ? "showHamburger" : "hideHamburger"}`}>
        {/* <div className={`${hamburgerOpen ? "hideHamburger" : "showHamburger"}`}> */}
            <ul>
            {/* <ul className={`${hamburgerOpen ? "showHamburger" : "hideHamburger"}`}> */}
                <li className={classes.navItem}>
                    <NavLink exact className={({ isActive }) => (isActive ? `${classes.active}` : `${classes.navLink}`)} to="/dashboard">
                        <FontAwesomeIcon icon={faDesktop} width="2.5rem"/>
                        Dashboard
                    </NavLink>
                </li>
                <li className={classes.navItem}>
                    <NavLink exact className={({ isActive }) => (isActive ? `${classes.active}` : `${classes.navLink}`)} to="/expenses">
                    <FontAwesomeIcon icon={faCreditCard}  width="2.5rem"/>
                        Expenses
                    </NavLink>
                </li>
                <li className={classes.navItem}>
                    <NavLink exact className={({ isActive }) => (isActive ? `${classes.active}` : `${classes.navLink}`)} to="/savings">
                    <FontAwesomeIcon icon={faChartLine} width="2.5rem"/>
                        Savings
                    </NavLink>
                </li>
                <li className={classes.navItem}>
                    <NavLink exact className={({ isActive }) => (isActive ? `${classes.active}` : `${classes.navLink}`)} to="/support">
                    <FontAwesomeIcon icon={faPersonCircleQuestion} width="2.5rem"/>
                        Support
                    </NavLink>                    
                </li>
                <li className={classes.dropdownLi}>
                    <Dropdown className={classes.dropdownBtn} drop="up">
                        <Dropdown.Toggle variant="danger" id="dropdown-basic" className={classes.dropdownText}>
                            <FontAwesomeIcon icon={faUser} width="2.5rem"/>
                            <div>
                                <h4 className={classes.dropdownUserName}>User</h4>
                            </div>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className={classes.dropdownMenu}>
                            <Dropdown.Item href="#/action-1" className={classes.dropdownMenuItem}>Account Settings</Dropdown.Item>
                            <Dropdown.Item href="/" className={classes.dropdownMenuItem}>Log Out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
            </ul>
        </div>
        <style jsx> {`
            // .showHamburger {
            //     display: block;
            //     background-color: #656565;
            // }
            // .hideHamburger {
            //     display: none;
            //     height: 0vh;
            //     background-color: #E5355F;
            // }
            // .navContainer {
            //     height:  60vh;
            // }
            // .navContainerHidden {
            //     height: 8vh;
            // }
        `}</style>
    </nav>
    );
}

export default NavBar;
