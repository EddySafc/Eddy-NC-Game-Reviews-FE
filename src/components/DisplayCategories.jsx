import { getReviews } from "../requests";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import moment from "moment";

const DisplayCategories = ({
  chosenCategory,
  sortByOrder,
  setSortByOrder,
  sortByProperty,
  setSortByProperty,
}) => {
  const [categoryReviews, setCategoryReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const addOrderButton = (order, buttonName) => {
    return (
      <button
        id="order-button"
        onClick={() => {
          setSortByOrder(order);
        }}
      >
        {buttonName}
      </button>
    );
  };

  const addOrderByButton = (property, buttonName) => {
    return (
      <button
        id="order-button"
        onClick={() => {
          setSortByProperty(property);
        }}
      >
        {buttonName}
      </button>
    );
  };

  useEffect(() => {
    getReviews(sortByOrder, sortByProperty, chosenCategory).then((data) => {
      setSearchParams(
        `order=${sortByOrder}&sort_by=${sortByProperty}&category=${chosenCategory}`
      );
      setCategoryReviews(data);
      setLoading(false);
    });
  }, [chosenCategory, sortByOrder, sortByProperty]);

  if (loading === true) {
    return <section>Loading...</section>;
  }
  if (loading === false) {
    return (
      <section>
        <div className="ordering">
          order:
          {addOrderButton("ASC", "Ascending")}
          {addOrderButton("DESC", "Descending")}
          Order is: {sortByOrder}ENDING
        </div>
        <div className="ordering">
          order by:
          {addOrderByButton("created_at", "created at")}
          {addOrderByButton("votes", "votes")}
          {addOrderByButton("comment_count", "comments")}
          Order is: {sortByProperty}
        </div>
        {categoryReviews.map((review) => {
          return (
            <ul className="specific_category_review">
              <li key={review.review_id} id="specific_category_review">
                <p>{review.title}</p>
                <p>Votes:{review.votes}</p>
                <p>Comment Count:{review.comment_count}</p>
                <p>{moment(review.created_at).format(`DD/MM/YY [at] HH:mm`)}</p>
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
