import { getCategories } from "../requests";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Categories = ({ categories, setCategories }) => {
  useEffect(() => {
    getCategories().then((result) => {
      setCategories(result);
    });
  }, []);

  return (
    <section className="category_links">
      {categories.map((category) => {
        return (
          <ul>
            <li key={category.slug}>
              <Link id="link" to={`/category/${category.slug}`}>
                {category.slug}
              </Link>
            </li>
          </ul>
        );
      })}
    </section>
  );
};

export default Categories;
