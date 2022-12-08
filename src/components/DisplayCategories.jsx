import { getReviews } from "../requests";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const DisplayCategories = ({ chosenCategory }) => {
  const [categoryReviews, setCategoryReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getReviews().then((allReviews) => {
      setCategoryReviews(
        allReviews.filter((review) => {
          return review.category === chosenCategory;
        }),
        setLoading(false)
      );
    });
  }, [chosenCategory]);

  if (loading === true) {
    return <section>Loading...</section>;
  }
  if (loading === false) {
    return (
      <section className="specific_category_review">
        {categoryReviews.map((review) => {
          return (
            <ul>
              <li key={review.review_id} id="specific_category_review">
                <p>{review.title}</p>
                <p>{review.owner}</p>
                <img id="review-image" src={review.review_img_url}></img>
                <p>
                  <Link to={`/reviews/${review.review_id}`}>
                    See Further Details
                  </Link>
                </p>
              </li>
            </ul>
          );
        })}
      </section>
    );
  }
};

export default DisplayCategories;
