import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./TopBar.module.css";
import FillerIcon from "../../../assets/icons/wesnoth-icon.png";

function TopBar() {
  return (
    <div className={styles.topBarContainer}>
      <NavLink className={styles.navItem} tp="/">  
        <div className={styles.logoAndTitleContainer}>
          {/* add logo here */} 
          <img src={FillerIcon} alt="" />
          <h1 className={styles.navItem}>Patrick's Perfect Picture Painting</h1>
        </div> 
      </NavLink>
      <div className={styles.navigation}>
        <NavLink className={styles.navItem} to="/schedule">
          <p>Request Estimate</p>
        </NavLink>
        <NavLink className={styles.navItem} to="/reviews">
          <p>Reviews</p>
        </NavLink>
      </div>

      {/* <div className={styles.header}>
                <h1>Patrick's Perfect Picture Painting</h1>
                <p className={styles.subtitle}>5 star painter</p>
            </div> */}
      {/* navigation?? */}
      {/* <div className={styles.navigation}>
                <p>leave a review</p>
                <p>past work</p>
                <p>Deals</p>
            </div> */}
    </div>
  );
}

export default TopBar;
