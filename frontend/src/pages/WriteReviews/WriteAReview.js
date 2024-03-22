import React, { useState, useEffect } from "react";
import styles from "./WriteAReview.module.css";
import { FaStar } from "react-icons/fa";
import {
  fetchReviews,
  writeReview,
  emailVerification,
} from "../../components/api";

function WriteAReview() {
  const [hover, setHover] = useState(null);
  const [auth, setAuth] = useState(false);
  const [stateRating, setStateRating] = useState(0);
  const [writeReviewInProgress, setWriteReviewInProgress] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [inputValid, setInputValid] = useState({
    name: true,
    email: true,
    content: true,
    header: true,
  });
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    content: "",
    header: "",
  });
  //helps determine how many views to show in increments of 5
  const [reviewsOffset, setReviewsOffset]=useState(0)
  async function getData(offset) {
    try {
      console.log(offset)
      const data = offset ?  await fetchReviews(offset) : await fetchReviews(reviewsOffset)
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

  function toggleReviewModal() {
    setInputValue({ name: "", email: "", content: "", header: "" });
    setStateRating(0);
    setWriteReviewInProgress(!writeReviewInProgress);
  }
  async function authHandler(e) {
    e.preventDefault();
    try {
      let isValid = checkIsValid();
      if (isValid) {
        await emailVerification(inputValue.email);
        setAuth(true);
      } else {
        alert("Check to be sure all fields are filled");
      }
    } catch (error) {
      console.log(error);
    }
  }
  const validateEmail = (email) => {
    return email
      .toString()
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  function checkIsValid() {
    let isValid = true;
    setInputValid({
      name: inputValue.name.length < 3 ? false : true,
      email: validateEmail(inputValue.email) ? true : false,
      content: inputValue.content.length < 1 ? false : true,
      header: inputValue.header.length < 5 ? false : true,
    });
    if (
      inputValue.name.length < 3 ||
      !validateEmail(inputValue.email) ||
      inputValue.content.length < 1 ||
      inputValue.header.length < 5
    ) {
      isValid = false;
    }

    return isValid;
  }
  async function submitHandler(e) {
    try {
      const result = await writeReview({ ...inputValue, rating: stateRating });
      if (result.data) {
        setAuth(false);
        setWriteReviewInProgress(!writeReviewInProgress);
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  }
  function handleOnChange(event) {
    if (event.target.name === "content") {
      setInputValue({
        ...inputValue,
        content: event.target.value,
      });
    } else if (event.target.name === "fullName") {
      setInputValue({
        ...inputValue,
        name: event.target.value,
      });
    } else if (event.target.name === "email") {
      setInputValue({
        ...inputValue,
        email: event.target.value,
      });
    } else if (event.target.name === "header") {
      setInputValue({
        ...inputValue,
        header: event.target.value,
      });
    }
    setInputValid({
      name: inputValue.name.length < 3 ? false : true,
      email: validateEmail(inputValue.email) ? true : false,
      content: inputValue.content.length < 1 ? false : true,
      header: inputValue.header.length < 5 ? false : true,
    });
  }
  return (
    <div className={styles.container}>
      <h2>Reviews</h2>
      {!writeReviewInProgress && (
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={toggleReviewModal}>
            Write a Review
          </button>
        </div>
      )}
      {auth && (
        <div className={styles.authModal}>
          <h4>Check your email for the authentication code</h4>
          <input type="number"></input>
          <button
            className={styles.submitButton}
            onClick={(e) => authHandler(e)}
          >
            Resend Code
          </button>
          <button className={styles.submitButton} onClick={submitHandler}>
            Submit
          </button>
        </div>
      )}
      {writeReviewInProgress && (
        <form className={styles.formContainer}>
          {/* if email has been used in writing a review before you cannot use it again */}
          <div className={styles.rating}>
            {[...Array(5)].map((star, index) => {
              let currentRating = index + 1;
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rating"
                    value={stateRating}
                    onClick={() => setStateRating(currentRating)}
                  />
                  <FaStar
                    className={styles.star}
                    size={20}
                    color={
                      currentRating <= (hover || stateRating)
                        ? "#ffc107"
                        : "#e4e5e9"
                    }
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              name="fullName"
              onChange={handleOnChange}
              value={inputValue.name}
              className={[!inputValid.name && styles.invalid]}
              placeholder="John Doe"
            ></input>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="email">email</label>
            <input
              type="email"
              name="email"
              onChange={handleOnChange}
              value={inputValue.email}
              // className={[!inputValid.email && styles.invalid]}
              placeholder="text@mail.com"
            ></input>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="header">header</label>
            <input
              type="text"
              name="header"
              onChange={handleOnChange}
              value={inputValue.header}
              className={[!inputValid.header && styles.invalid]}
              placeholder="I love this!"
            ></input>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="content">Review</label>
            <textarea
              name="content"
              placeholder="Review"
              value={inputValue.content}
              className={[!inputValid.content && styles.invalid]}
              onChange={handleOnChange}
            ></textarea>
          </div>
          <div className={styles.buttonContainer}>
            <button onClick={toggleReviewModal} className={styles.submitButton} disabled={auth}>
              Cancel
            </button>
            <button
              onClick={(e) => authHandler(e)}
              className={styles.submitButton}
              disabled={auth} 
            >
              Submit Review
            </button>
          </div>
        </form>
      )}

      {reviews.length > 0 &&
        reviews.map((review, index) => {
          const name = review._fieldsProto.name.stringValue;
          const content = review._fieldsProto.content.stringValue;
          const rating = review._fieldsProto.rating.doubleValue
            ? review._fieldsProto.rating.doubleValue
            : review._fieldsProto.rating.integerValue;
          const header = review._fieldsProto.header.stringValue;
          console.log(reviewsOffset)
          return (
            <div className={styles.reviewContainer} key={index}>
              <div className={styles.headerContainer}>
                <div className={styles.titleContainer}>
                  <h3>{header}</h3>
                  <p>{name}</p>
                </div>
              </div>
              <div className={styles.content}>
                <div className={styles.rating}>
                  {[...Array(5)].map((star, index) => {
                    return (
                      <label key={Math.random()}>
                        <input type="radio" name="rating" value={rating} />
                        <FaStar
                          className={styles.star}
                          size={10}
                          color={rating >= index + 1 ? "#ffc107" : "#e4e5e9"}
                        />
                      </label>
                    );
                  })}
                </div>
                <p>{content}</p>
              </div>
            </div>
          );
        })}
      {reviews.length === reviewsOffset + 5 && (
        <p
          className={styles.link}
          onClick={() => {
            setReviewsOffset(reviewsOffset+5)
            getData(reviewsOffset+5);
          }}
        >
          See more.
        </p>
      )}
    </div>
  );
}

export default WriteAReview;

// const currentRating = index + 1;
