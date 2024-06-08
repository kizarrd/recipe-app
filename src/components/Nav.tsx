import { Link } from "react-router-dom";

function Nav() {
  
  return <nav className="mx-auto container p-8 flex justify-between items-center">
    <Link to={''} className="text-yellow-300 ">Recipe</Link>
  </nav>;
}

export default Nav;