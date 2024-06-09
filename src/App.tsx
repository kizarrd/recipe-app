import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Recipes from "./pages/Recipes";
import Recipe from "./pages/Recipe";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Navigate to='/recipes'/> },
      { path: "/recipes", element: <Recipes /> },
      { path: "/recipes/:recipeId", element: <Recipe />},
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
