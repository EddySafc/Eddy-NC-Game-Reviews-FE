import { useContext } from "react";
import { useState } from "react";
import { logInContext } from "./Users";
import { postReviewComment } from "../requests";
import { useParams } from "react-router-dom";

const AddComment = () => {
  const { loggedInUser, setLoggedInUser } = useContext(logInContext);
  const [newComment, setNewComment] = useState("");
  let review_id = useParams().review_id;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(loggedInUser, newComment, review_id);
    if (newComment !== "") {
      postReviewComment(loggedInUser, newComment, review_id);
    }
    setNewComment("");
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label>
          Comment:
          <input
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
          />
        </label>
        <button type="submit">Submit Comment</button>
      </form>
    </section>
  );
};

export default AddComment;
