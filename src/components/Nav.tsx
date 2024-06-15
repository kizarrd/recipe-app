import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import { Sun, MoonStar } from "lucide-react";

const newRecipePath = "/recipe/new";

function Nav() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const htmlRef = useRef(document.documentElement);
  let location = useLocation();

  useEffect(() => {
    if (isDarkMode) {
      htmlRef.current.classList.add("dark");
    } else {
      htmlRef.current.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <nav className="w-full border-b">
      <div className="mx-auto container p-8 flex justify-between items-center">
        <Link to={""} className="text-3xl font-extrabold">
          Recipe
        </Link>
        <div className="flex justify-end items-center gap-8">
          <Button
            className="rounded-full w-12 h-12"
            size={"icon"}
            variant={"secondary"}
            onClick={toggleDarkMode}
          >
            {isDarkMode ? (
              <Sun className="w-6" />
            ) : (
              <MoonStar className="w-6" />
            )}
          </Button>
          <Button
            // disable button when in a new recipe page
            disabled={location.pathname === newRecipePath ? true : false}
            className="text-base font-bold p-6 rounded-3xl"
          >
            <Link to={newRecipePath}>New Recipe</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
