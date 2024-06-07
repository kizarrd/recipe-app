import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Recipes from "./pages/Recipes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Navigate to='/recipes'/> },
      { path: "/recipes", element: <Recipes /> },
      // { path: "/recipe/:id", element: <Recipe />},
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
