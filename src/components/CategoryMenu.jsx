import { Link } from "react-router-dom";
import "./CategoryMenu.css";

const CategoryMenu = () => {
  return (
    <div id="categoryContainer">
      <ul id="categoryMenuId">
        <li>
          <Link to="/category/">All</Link>
        </li>
        <li>
          <Link to="/category/brot">Brot</Link>
        </li>
        <li>
          <Link to="/category/brötchen">Brötchen</Link>
        </li>
        <li>
          <Link to="/category/snacks">Snacks</Link>
        </li>
      </ul>
    </div>
  );
};

export default CategoryMenu;
