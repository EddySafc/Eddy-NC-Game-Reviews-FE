import { Link } from "react-router-dom";
import Categories from "./Categories";

const Nav = ({ categories, setCategories }) => {
  return (
    <nav>
      <section>
        <div className="nav">
          <Link id="link" to="/">
            {" "}
            All Reviews
          </Link>
          <Link id="link" to="/users">
            {" "}
            LogIn
          </Link>
        </div>
        <div className="category-nav">
          <Categories categories={categories} setCategories={setCategories} />
        </div>
      </section>
    </nav>
  );
};

export default Nav;
