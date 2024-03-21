import React, { useState } from "react";
import styles from "./ReviewCard.module.css";
import { FaStar } from "react-icons/fa";

function ReviewCard({ name, content, rating, header, profileImg }) {
  const [readmoreActive, setReadMoreActive] = useState(false);

  const paragraph = content.split("", 100);
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.titleContainer}>
          <h3>{header}</h3>
          <p>{name}</p>
          <div className={styles.rating}>
            {[...Array(5)].map((star, index) => (
              <label key={index}>
                <input type="radio" name="rating" value={rating} />
                <FaStar
                  className={styles.star}
                  size={10}
                  color={rating >= index + 1 ? "#ffc107" : "#e4e5e9"}
                />
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.content}>
        {content.length > 100 ? (
          <p>
            {!readmoreActive
              ? [
                  paragraph,
                  <i
                    onClick={() => setReadMoreActive(true)}
                    className={styles.link}
                  >
                    {" "}
                    read more...
                  </i>,
                ]
              : [
                  content,
                  <i
                    onClick={() => setReadMoreActive(false)}
                    className={styles.link}
                  >
                    {" "}
                    read less.
                  </i>,
                ]}
          </p>
        ) : (
          <p>{content}</p>
        )}
      </div>
    </div>
  );
}

export default ReviewCard;
