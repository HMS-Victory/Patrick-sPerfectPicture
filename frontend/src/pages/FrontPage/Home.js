import React from "react";
import WorkWeDo from "./WorkWeDo/WorkWeDo";
import PastWork from "./PastWork/PastWork";
import WhyAreWeBetter from "./WhyAreWeBetter/WhyareWeBetter";
import Reviews from "./Reviews/Reviews";
import MainFiller from "../../assets/MainFiller.jpg";
import styles from "./Home.module.css";
import AboutUs from "./AboutUs/AboutUs";

function Home() {
  return (
    <>
      <div className={styles.mainImageContainer}>
        <img src={MainFiller} alt="" className={styles.MainImage} />
      </div>
      <AboutUs />
      <WorkWeDo />
      <PastWork
        images={[
          "blademaster.png",
          "enforcer.png",
          "flameheart.png",
          "inferno.png",
          "warden.png",
        ]}
      />
      <WhyAreWeBetter />
      <div className={styles.pastWorkContainer}>
        <PastWork
          images={[
            "blademaster.png",
            "enforcer.png",
            "flameheart.png",
            "inferno.png",
            "warden.png",
          ]}
        />
      </div>
      <Reviews />
    </>
  );
}

export default Home;
