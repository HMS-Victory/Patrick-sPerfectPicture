import React, { useState } from "react";
import styles from "./ScheduleEstimate.module.css";
import { requestEstimate } from "../../components/api";

function ScheduleEstimate() {
  const [inputValues, setInputValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    zipCode: "",
    content: "",
  });
  const [inputValid, setInputValid] = useState({
    firstName: true,
    lastName: true,
    email: true,
    phoneNumber: true,
    streetAddress: true,
    city: true,
    zipCode: true,
    content: true,
  });
  const [inputError, setInputError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    zipCode: "",
    content: "",
  });
  const [attemptedSubmti, setAttemptedSubmit] = useState(false);

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
      firstName: inputValues.firstName.length < 3 ? false : true,
      lastName: inputValues.lastName.length < 3 ? false : true,
      email: validateEmail(inputValues.email) ? true : false,
      phoneNumber: inputValues.phoneNumber.length !== 11 ? false : true,
      streetAddress: inputValues.streetAddress.length < 8 ? false : true,
      city: inputValues.city.length < 3 ? false : true,
      zipCode: inputValues.zipCode.length !== 5 ? false : true,
      content: inputValues.content.length < 1 ? false : true,
    });
    setInputError({
      firstName: inputValues.firstName.length < 3 ? "name invalid length" : "",
      lastName:
        inputValues.lastName.length < 3 ? "last name invalid length" : "",
      email: validateEmail(inputValues.email) ? "" : "email invalid",
      phoneNumber:
        inputValues.phoneNumber.length !== 11 ? "phone number invalid" : "",
      streetAddress:
        inputValues.streetAddress.length < 8 ? "invalid street address" : "",
      city: inputValues.city.length < 3 ? "invalid city" : "",
      zipCode: inputValues.zipCode.length !== 5 ? "invalid zip" : "",
      content: inputValues.content.length < 1 ? "required field" : "",
    });
    if (
      inputValues.firstName.length < 3 ||
      inputValues.lastName.length < 3 ||
      !validateEmail(inputValues.email) ||
      inputValues.phoneNumber.length !== 11 ||
      inputValues.streetAddress.length < 8 ||
      inputValues.city.length < 3 ||
      inputValues.zipCode.length !== 5 ||
      inputValues.content.length < 1
    ) {
      isValid = false;
    }

    return isValid;
  }
  async function submitHandler(e) {
    e.preventDefault();
    try {
      let isValid = checkIsValid();
      console.log(isValid);
      if (isValid) {
        requestEstimate(inputValues);
        //give them a popup to say the email was successfuly sent and clear all of the fields
      } else {
        setAttemptedSubmit(true);
        alert("please fill out all of the fields.");
      }
    } catch (error) {
      console.log(error);
    }
  }
  function handleChanges(event) {
    switch (event.target.name) {
      case "firstName":
        setInputValues({ ...inputValues, firstName: event.target.value });
        if (inputValues.firstName.length < 3 && attemptedSubmti) {
          setInputValid({ ...inputValid, firstName: false });
        } else {
          setInputError({ ...inputError, firstName: "" });
          setInputValid({ ...inputValid, firstName: true });
        }
        break;
      case "lastName":
        setInputValues({ ...inputValues, lastName: event.target.value });
        if (inputValues.lastName.length < 3 && attemptedSubmti) {
          setInputValid({ ...inputValid, lastName: false });
        } else {
          setInputError({ ...inputError, lastName: "" });
          setInputValid({ ...inputValid, lastName: true });
        }
        break;
      case "email":
        setInputValues({ ...inputValues, email: event.target.value });
        if (!validateEmail(inputValues.email) && attemptedSubmti) {
          setInputValid({ ...inputValid, email: false });
        } else {
          setInputError({ ...inputError, email: "" });
          setInputValid({ ...inputValid, email: true });
        }
        break;
      case "phoneNumber":
        setInputValues({ ...inputValues, phoneNumber: event.target.value });
        if (inputValues.phoneNumber.length !== 12 && attemptedSubmti) {
          setInputValid({ ...inputValid, phoneNumber: false });
        } else {
          setInputError({ ...inputError, phoneNumber: "" });
          setInputValid({ ...inputValid, phoneNumber: true });
        }
        break;
      case "streetAddress":
        setInputValues({ ...inputValues, streetAddress: event.target.value });
        if (inputValues.streetAddress.length < 8 && attemptedSubmti) {
          setInputValid({ ...inputValid, streetAddress: false });
        } else {
          setInputError({ ...inputError, streetAddress: "" });
          setInputValid({ ...inputValid, streetAddress: true });
        }
        break;
      case "city":
        setInputValues({ ...inputValues, city: event.target.value });
        if (inputValues.city.length < 3 && attemptedSubmti) {
          setInputValid({ ...inputValid, city: false });
        } else {
          setInputError({ ...inputError, city: "" });
          setInputValid({ ...inputValid, city: true });
        }
        break;
      case "zipCode":
        setInputValues({ ...inputValues, zipCode: event.target.value });
        if (inputValues.zipCode.length !== 5 && attemptedSubmti) {
          setInputValid({ ...inputValid, zipCode: false });
        } else {
          setInputError({ ...inputError, zipCode: "" });
          setInputValid({ ...inputValid, zipCode: true });
        }
        break;
      case "description":
        setInputValues({ ...inputValues, content: event.target.value });
        if (inputValues.content.length < 1 && attemptedSubmti) {
          setInputValid({ ...inputValid, content: false });
        } else {
          setInputError({ ...inputError, content: "" });
          setInputValid({ ...inputValid, content: true });
        }
        break;
      default: {
        return;
      }
    }
  }

  return (
    <div className={styles.formContainer}>
      <h2>Tell us about yourself...</h2>
      <form className={styles.form}>
        <div>
          <div>
            <label htmlFor="firstName">First Name</label>
            <p className={styles.errorText}>{inputError.firstName}</p>
            <input
              type="text"
              placeholder="John"
              name="firstName"
              value={inputValues.firstName}
              className={[!inputValid.firstName && styles.invalid]}
              onChange={handleChanges}
            ></input>
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <p className={styles.errorText}>{inputError.lastName}</p>
            <input
              type="text"
              placeholder="Doe"
              name="lastName"
              value={inputValues.lastName}
              className={[!inputValid.lastName && styles.invalid]}
              onChange={handleChanges}
            ></input>
          </div>
        </div>
        <h4>Contact Info</h4>
        <div>
          <div>
            <label htmlFor="email">Email</label>
            <p className={styles.errorText}>{inputError.email}</p>
            <input
              type="email"
              placeholder="user@mail.com"
              name="email"
              value={inputValues.email}
              className={[!inputValid.email && styles.invalid]}
              onChange={handleChanges}
            ></input>
          </div>
          <div>
            <label htmlFor="phoneNumber">Phone Number</label>
            <p className={styles.errorText}>{inputError.phoneNumber}</p>
            <input
              type="number"
              placeholder="1(234)567-8901"
              name="phoneNumber"
              value={inputValues.phoneNumber}
              className={[!inputValid.phoneNumber && styles.invalid]}
              onChange={handleChanges}
            ></input>
          </div>
        </div>
        <h4>Address</h4>
        <div>
          <div>
            <label htmlFor="streetAddress">Street Address</label>
            <p className={styles.errorText}>{inputError.streetAddress}</p>
            <input
              type="text"
              placeholder="123 Street"
              name="streetAddress"
              value={inputValues.streetAddress}
              className={[!inputValid.streetAddress && styles.invalid]}
              onChange={handleChanges}
            ></input>
          </div>
          <div>
            <label htmlFor="city">City</label>
            <p className={styles.errorText}>{inputError.city}</p>
            <input
              type="text"
              placeholder="city"
              name="city"
              value={inputValues.city}
              className={[!inputValid.city && styles.invalid]}
              onChange={handleChanges}
            ></input>
          </div>
          <div>
            <label htmlFor="zipCode">zip</label>
            <p className={styles.errorText}>{inputError.zipCode}</p>
            <input
              type="number"
              placeholder="zip"
              name="zipCode"
              value={inputValues.zipCode}
              className={[!inputValid.zipCode && styles.invalid]}
              onChange={handleChanges}
            ></input>
          </div>
        </div>
        <div className={styles.descriptionContainer}>
          <label htmlFor="description">
            Brief description of job to be done
          </label>
          <p className={styles.errorText}>{inputError.content}</p>
          <textarea
            className={`${styles.description} ${
              !inputValid.content ? styles.invalidTextarea : ""
            }`}
            type="text"
            placeholder="..."
            name="description"
            value={inputValues.content}
            onChange={handleChanges}
          ></textarea>
        </div>
        <button
          onClick={(e) => submitHandler(e)}
          className={styles.submitButton}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ScheduleEstimate;
