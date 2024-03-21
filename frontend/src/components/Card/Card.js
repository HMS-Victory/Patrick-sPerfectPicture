import React from "react";
import styles from "./Card.module.css"
import CardFiller from "../../assets/cardFiller.jpg";

function Card({title, content, icon}){
    return(
        <div className={styles.container}>
            <h3>{title}</h3>
            <img src={CardFiller} alt="" className={styles.image} />
            <p>{content}</p>
        </div>
    )
}

export default Card;