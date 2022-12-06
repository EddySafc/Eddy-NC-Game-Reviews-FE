import axios from "axios";

export const getReviews = () => {
  return axios
    .get("https://wandering-pink-gloves.cyclic.app/api/reviews")
    .then((reviews) => {
      return reviews.data;
    });
};

export const getReviewsById = (review_id) => {
  return axios
    .get(`https://wandering-pink-gloves.cyclic.app/api/reviews/${review_id}`)
    .then((reviews) => {
      return reviews.data;
    });
};
