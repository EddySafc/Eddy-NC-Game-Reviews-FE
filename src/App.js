import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Reviews from "./components/Reviews";
import SingleReview from "./components/SingleReview";
import ReviewComments from "./components/ReviewComments";
import Users from "./components/Users";
import { logInContext } from "./components/Users";
import DisplayCategories from "./components/DisplayCategories";

function App() {
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState({});
  const [comments, setComments] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [categories, setCategories] = useState([]);
  const [sortByOrder, setSortByOrder] = useState("ASC");
  const [sortByProperty, setSortByProperty] = useState("created_at");

  return (
    <BrowserRouter>
      <logInContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <div className="App">
          <Header />
          <Nav categories={categories} setCategories={setCategories} />
          <Routes>
            {categories.map((category) => {
              return (
                <Route
                  path={`/category/${category.slug}`}
                  element={
                    <DisplayCategories
                      setSortByOrder={setSortByOrder}
                      setSortByProperty={setSortByProperty}
                      sortByOrder={sortByOrder}
                      sortByProperty={sortByProperty}
                      chosenCategory={category.slug}
                    />
                  }
                />
              );
            })}
            <Route
              path="/"
              element={
                <Reviews
                  setSortByOrder={setSortByOrder}
                  setSortByProperty={setSortByProperty}
                  sortByOrder={sortByOrder}
                  sortByProperty={sortByProperty}
                  setReviews={setReviews}
                  reviews={reviews}
                />
              }
            />

            <Route path="/users" element={<Users />} />
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
      </logInContext.Provider>
    </BrowserRouter>
  );
}

export default App;
