import React from "react";
// import { NavLink } from "react-router-dom";
import styles from "./WorkWeDo.module.css";
import Card from "../../../components/Card/Card";

function WorkWeDo() {
  return (
    <div className={styles.container}>
      <div>
        <Card title="Painting" content="We work anywhere in Utah with a road connected to it, and we can paint anything that you want painted." />
        <Card title="staining" content="Helps preserve your wood fixtures, and makes them look clean and neat to reinforce an orderly yet rustic appearance." />
        <Card title="Epoxies" content="A finishing for cement which makes the cement more durable, and adds traction to you floor." />
      </div>
    </div>
  );
}

export default WorkWeDo;
