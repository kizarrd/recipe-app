import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Recipes from "./pages/Recipes";
import Recipe from "./pages/Recipe";
import CreateRecipe from "./pages/CreateRecipe";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Navigate to='/recipes'/> },
      { path: "/recipes", element: <Recipes /> },
      { path: "/recipe/:recipeId", element: <Recipe />},
      { path: "/recipe/new", element: <CreateRecipe /> }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
