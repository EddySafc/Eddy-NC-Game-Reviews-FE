import { patchReviewVotes } from "../requests";
import { useState } from "react";
import { useContext } from "react";
import { logInContext } from "./Users";

export default function Votes({ review_id, review }) {
  const { loggedInUser, setLoggedInUser } = useContext(logInContext);
  const [voteCount, setVoteCount] = useState(review.votes);
  const [upDisabled, setUpDisabled] = useState(false);
  const [downDisabled, setDownDisabled] = useState(false);
  const [upClick, setUpClick] = useState(null);
  const [downClick, setDownClick] = useState(null);
  const [err, setErr] = useState(null);

  const handleClickUp = () => {
    setVoteCount((currCount) => currCount + 1);
    setErr(null);
    setUpDisabled(true);
    setDownDisabled(true);
    setUpClick(true);
    setDownClick(false);
    patchReviewVotes(review_id, 1).catch(() => {
      setVoteCount((currCount) => currCount - 1);
      setUpDisabled(false);
      setDownDisabled(false);
      setUpClick(false);
      setDownClick(null);
      setErr("something went wrong please try again");
    });
  };

  const handleClickDown = () => {
    setVoteCount((currCount) => currCount - 1);
    setErr(null);
    setDownDisabled(true);
    setUpDisabled(true);
    setDownClick(true);
    setUpClick(false);
    patchReviewVotes(review_id, -1).catch(() => {
      setVoteCount((currCount) => currCount + 1);
      setDownDisabled(false);
      setUpDisabled(false);
      setDownClick(false);
      setUpClick(null);
      setErr("something went wrong please try again");
    });
  };

  const handleUndoVote = () => {
    if (upClick === true) {
      setVoteCount((currCount) => currCount - 1);
      setErr(null);
      setDownDisabled(false);
      setUpDisabled(false);
      setUpClick(null);
      patchReviewVotes(review_id, -1).catch(() => {
        setVoteCount((currCount) => currCount + 1);
        setDownDisabled(true);
        setUpDisabled(true);
        setUpClick(false);
        setErr("something went wrong please try again");
      });
    }
    if (downClick === true) {
      setVoteCount((currCount) => currCount + 1);
      setErr(null);
      setUpDisabled(false);
      setDownDisabled(false);
      setDownClick(null);
      patchReviewVotes(review_id, 1).catch(() => {
        setVoteCount((currCount) => currCount - 1);
        setUpDisabled(true);
        setDownDisabled(true);
        setDownClick(false);
        setErr("something went wrong please try again");
      });
    }
  };

  if (err) return <p>{err}</p>;
  if (loggedInUser === "") {
    return (
      <div>
        <p>Votes:{voteCount}</p>
        <button onClick={handleClickUp} disabled>
          UpVote
        </button>
        <button onClick={handleClickDown} disabled>
          DownVote
        </button>
        <button onClick={handleUndoVote} disabled>
          Undo Vote
        </button>
        <p>Must be Logged in to vote</p>
      </div>
    );
  }
  return (
    <div>
      <p>Votes:{voteCount}</p>
      <button onClick={handleClickUp} disabled={upDisabled}>
        UpVote
      </button>
      <button onClick={handleClickDown} disabled={downDisabled}>
        DownVote
      </button>
      <button onClick={handleUndoVote}>Undo Vote</button>
    </div>
  );
}
