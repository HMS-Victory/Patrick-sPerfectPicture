import React from "react";
import styles from "./InfoPage.module.css"
import { useLocation } from "react-router-dom";

//TODO: First task of tomorrow will be to get the navigation working


function InfoPage({data}){ 
    let location = useLocation();
    console.log(location.state.title);
    return(
        <div className={styles.container}>
            <h1>{location.state.title}</h1>
        </div>
    )
}


export default InfoPage;