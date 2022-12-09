import { Link } from "react-router-dom";
import Categories from "./Categories";

const Nav = ({ categories, setCategories }) => {
  return (
    <nav>
      <section className="nav">
        <div>
          <Link to="/reviews"> All Reviews</Link>
          <Link to="/users"> LogIn</Link>
        </div>
        <div>
          <Categories categories={categories} setCategories={setCategories} />
        </div>
      </section>
    </nav>
  );
};

export default Nav;
