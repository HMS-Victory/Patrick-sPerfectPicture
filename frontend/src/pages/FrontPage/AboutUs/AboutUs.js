import React from "react";
import styles from "./AboutUs.module.css";
import teamFiller from "../../../assets/teamFiller.jpg";

function AboutUs() {
  return (
    <div className={styles.container}>
      <img src={teamFiller} alt="" className={styles.image} />
      <div className={styles.textContainer}>
        <h2>About Us</h2>
        <h4>Painting & Refinishing</h4>
        <p>
          We are a family run business, devoted towards making the world a
          beautiful place. We paint houses inside and out, with the same care we
          would use if it were our house. We do Interior, Exterior Painting,
          Cabinetry Refinishing, drywall repair and much more! Anything you want
          painted we can paint it.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
