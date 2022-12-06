import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Reviews from "./components/Reviews";
import SingleReview from "./components/SingleReview";
import ReviewComments from "./components/ReviewComments";

function App() {
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState({});
  const [comments, setComments] = useState([]);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Nav />
        <Routes>
          <Route
            path="/"
            element={<Reviews setReviews={setReviews} reviews={reviews} />}
          />
          <Route
            path="/reviews/:review_id"
            element={<SingleReview review={review} setReview={setReview} />}
          />
          <Route
            path="/reviews/:review_id/comments"
            element={
              <ReviewComments comments={comments} setComments={setComments} />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
