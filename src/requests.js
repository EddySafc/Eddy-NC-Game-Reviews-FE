import axios from "axios";

export const getReviews = () => {
  return axios
    .get("https://wandering-pink-gloves.cyclic.app/api/reviews")
    .then((reviews) => {
      return reviews.data;
    });
};
