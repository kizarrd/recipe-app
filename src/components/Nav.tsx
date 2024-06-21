import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import { Sun, MoonStar } from "lucide-react";

const newRecipePath = "/recipe/new";

function Nav() {
  let initialDarkModeState = false;
  const storageTheme = localStorage.getItem("theme");
  if (storageTheme) {
    initialDarkModeState = storageTheme === "dark" ? true : false;
  }
  const [isDarkMode, setIsDarkMode] = useState(initialDarkModeState);
  const htmlRef = useRef(document.documentElement);
  let location = useLocation();

  useEffect(() => {
    if (isDarkMode) {
      htmlRef.current.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      htmlRef.current.classList.remove("dark");
      localStorage.setItem("theme", "");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <nav className="w-full border-b">
      <div className="mx-auto container p-4 sm:p-8 flex justify-between items-center">
        <Link to={""} className="text-2xl sm:text-3xl font-extrabold">
          Recipe
        </Link>
        <div className="flex justify-end items-center sm:gap-8 gap-2">
          <Button
            className="rounded-full size-10 sm:size-12 p-0"
            variant={"secondary"}
            onClick={toggleDarkMode}
          >
            {isDarkMode ? (
              <Sun className="size-5 sm:size-6" />
            ) : (
              <MoonStar className="size-5 sm:size-6" />
            )}
          </Button>
          <Button
            // disable button when in a new recipe page
            disabled={location.pathname === newRecipePath ? true : false}
            className="text-sm sm:text-base font-bold p-4 sm:p-6 rounded-3xl"
          >
            <Link to={newRecipePath}>New Recipe</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
