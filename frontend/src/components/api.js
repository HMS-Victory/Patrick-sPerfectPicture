import axios from "axios";

const url = process.env.BASE_URL;

//need to send a parameter in the get function
export const fetchReviews = (reviewsOffset) => axios.get(`${url}/reviews?offset=${reviewsOffset}`);
export const fetchTopReviews=(limit)=>axios.get(`${url}/topReviews?limit=${limit}`);
export const emailVerification=(email)=>axios.post(`${url}/verification`, {email: email})
export const writeReview = (review) => axios.post(`${url}/writeAReview`, review);
export const requestEstimate=(email)=>axios.post(`${url}/requestEstimate`, email);
