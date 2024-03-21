import React from "react";
import styles from "./WhyAreWeBetter.module.css";
import Card from "../../../components/Card/Card";

function WhyAreWeBetter() {
  return (
    <div className={styles.sectionContainer}>
      <h2>Why Choose US?</h2>
      <div>
        <Card title="Excellent Service" content="We are commited to making sure you get the most out of the deal you can." />
        <Card title="Free Estimates" content="We charge nothing to look at and put a price on your project, Commercial or Residential." />
        <Card title="Quality paint" content="We use paint that will last, and keep your finish in good condition for years to come." />
      </div>
    </div>
  );
}

export default WhyAreWeBetter;
