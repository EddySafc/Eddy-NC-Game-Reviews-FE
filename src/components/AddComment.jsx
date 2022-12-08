import { useContext } from "react";
import { useState } from "react";
import { logInContext } from "./Users";
import { postReviewComment } from "../requests";
import { useParams } from "react-router-dom";

const AddComment = ({ comments, setComments }) => {
  const { loggedInUser, setLoggedInUser } = useContext(logInContext);
  const [newComment, setNewComment] = useState("");
  const [commentExists, setCommentExists] = useState(true);
  const [postingComment, setPostingComment] = useState(null);
  let review_id = useParams().review_id;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(loggedInUser, newComment, review_id);
    if (newComment !== "") {
      setCommentExists(true);
      setPostingComment(true);
      postReviewComment(loggedInUser, newComment, review_id).then((comment) => {
        setComments((currComments) => {
          return [comment, ...currComments];
        });
      });
      setPostingComment(false);
    }
    if (newComment === "") {
      setCommentExists(false);
    }
    setNewComment("");
  };

  const form = (
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
  );

  const buttonDisabledForm = (
    <form onSubmit={handleSubmit}>
      <label>
        Comment:
        <input
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
        />
      </label>
      <button type="submit" disabled>
        Submit Comment
      </button>
    </form>
  );

  if (loggedInUser === "") {
    return (
      <section>
        {buttonDisabledForm}
        <p>Log In to Enter a Comment</p>
      </section>
    );
  }
  if (commentExists === false) {
    return (
      <section>
        {form}
        <p>No Comment Entered</p>
      </section>
    );
  }
  if (postingComment === null && commentExists === true) {
    return <section>{form}</section>;
  }
  if (postingComment === true && commentExists === true) {
    return (
      <section>
        {buttonDisabledForm}
        <p>Posting your comment</p>
      </section>
    );
  }
  if (postingComment === false && commentExists === true) {
    return (
      <section>
        {form}
        <p>Comment posted</p>
      </section>
    );
  }
};

export default AddComment;
