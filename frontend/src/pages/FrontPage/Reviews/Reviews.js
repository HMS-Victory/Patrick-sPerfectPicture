import ReviewCard from "./ReviewCard";
import styles from "./Reviews.module.css";
import React, { useState, useEffect } from "react";
import { fetchTopReviews } from "../../../components/api";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  async function getData() {
    try {
      const data = await fetchTopReviews(3);
      if (data.data) {
        setReviews(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
    //no dependancies listed for performance purposes
  }, []);

  return (
    <>
      {reviews.length > 0 && (
        <div className={styles.container}>
          <h2>Reviews</h2>
          <div>
            {reviews.map((review, index) => {
              return (
                <ReviewCard
                  name={review._fieldsProto.name.stringValue}
                  content={review._fieldsProto.content.stringValue}
                  rating={review._fieldsProto.rating.integerValue}
                  header={review._fieldsProto.header.stringValue}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Reviews;
