import { getReviewsCommentsById } from "../requests";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const ReviewComments = ({ comments, setComments }) => {
  let review_id = useParams().review_id;

  useEffect(() => {
    getReviewsCommentsById(review_id).then((data) => {
      setComments(data);
    });
  }, []);

  return (
    <section>
      <ul>
        {comments.map((comment) => {
          return (
            <li key={comment.comment_id} className="comment_list">
              <p>Author:{comment.author}</p>
              <p>Comment:{comment.body}</p>
              <p>Created at:{comment.created_at}</p>
              <p>Votes:{comment.votes}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ReviewComments;
