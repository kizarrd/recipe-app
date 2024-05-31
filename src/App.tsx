import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Recipe from "./pages/Recipe";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Navigate to='/recipes'/> },
      { path: "/recipes", element: <Recipe /> },
      // { path: "/recipe/:id", element: <Recipe />},
    ],
  },
]);

function App() {
  const [data, updateData] = useState({});

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://665951ecde346625136bf46a.mockapi.io/api/v1/recipes"
      );
      const json = await response.json();
      console.log(json);
    })();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
