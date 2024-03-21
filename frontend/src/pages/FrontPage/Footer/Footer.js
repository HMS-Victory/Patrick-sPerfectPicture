import React from "react";
import styles from "./Footer.module.css";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className={styles.footerContainer}>
      {/* link to other pages */}
      <div className={styles.buttonsContainer}>
        <div className={styles.button}>
          <NavLink to="/schedule" className={styles.link}>
            <p>Schedule Estimate</p>
          </NavLink>
        </div>
        <div className={styles.button}>
          <NavLink to="/reviews" className={styles.link}>
            <p>Give A Review</p>
          </NavLink>
        </div>
      </div>
      {/* just contact info */}
      <div className={styles.contactInfo}>
        {/* add actual phone number later */}
        <p>(435)484-4383</p>
        <a href="https://www.facebook.com/ppppainting/">Facebook</a>
      </div>
    </div>
  );
}

export default Footer;
