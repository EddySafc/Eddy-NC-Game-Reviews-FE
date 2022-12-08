import { getReviews } from "../requests";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import moment from "moment";

const DisplayCategories = ({ chosenCategory }) => {
  const [categoryReviews, setCategoryReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState(null);

  useEffect(() => {
    getReviews().then((allReviews) => {
      let categoryFilter = allReviews.filter((review) => {
        return review.category === chosenCategory;
      });
      if (sort === "newest-oldest" || sort === null) {
        setCategoryReviews(
          [...categoryFilter].sort(
            (a, b) =>
              moment(b.created_at).format("YYYYMMDDHHmmss") -
              moment(a.created_at).format("YYYYMMDDHHmmss")
          )
        );

        setLoading(false);
      }
      if (sort === "oldest-newest") {
        setCategoryReviews(
          [...categoryFilter].sort(
            (a, b) =>
              moment(a.created_at).format("YYYYMMDDHHmmss") -
              moment(b.created_at).format("YYYYMMDDHHmmss")
          )
        );
      }
      if (sort === "votes_asc") {
        setCategoryReviews(
          [...categoryFilter].sort((a, b) => a.votes - b.votes)
        );
      }
      if (sort === "votes_desc") {
        setCategoryReviews(
          [...categoryFilter].sort((a, b) => b.votes - a.votes)
        );
      }
      if (sort === "comments_asc") {
        setCategoryReviews(
          [...categoryFilter].sort((a, b) => a.comment_count - b.comment_count)
        );
      }
      if (sort === "comments_desc") {
        setCategoryReviews(
          [...categoryFilter].sort((a, b) => b.comment_count - a.comment_count)
        );
      }
    });
  }, [sort, chosenCategory]);

  if (loading === true) {
    return <section>Loading...</section>;
  }
  if (loading === false) {
    return (
      <section>
        Sort By:
        <button
          onClick={() => {
            setSort("newest-oldest");
          }}
        >
          newest to oldest
        </button>
        <button
          onClick={() => {
            setSort("oldest-newest");
          }}
        >
          oldest to newest
        </button>
        <button
          onClick={() => {
            setSort("votes_asc");
          }}
        >
          votes ascending
        </button>
        <button
          onClick={() => {
            setSort("votes_desc");
          }}
        >
          votes Descending
        </button>
        <button
          onClick={() => {
            setSort("comments_asc");
          }}
        >
          comment count ascending
        </button>
        <button
          onClick={() => {
            setSort("comments_desc");
          }}
        >
          comment count Descending
        </button>
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
