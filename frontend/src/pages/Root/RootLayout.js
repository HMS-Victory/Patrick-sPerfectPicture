import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./Root.module.css";
import TopBar from "../FrontPage/TopBar/TopBar";
import Footer from "../FrontPage/Footer/Footer";

function RootLayout() {
  return (
    <>
      <div className={styles.app}>
        <TopBar />
        <div className={styles.outletcontainer}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default RootLayout;
