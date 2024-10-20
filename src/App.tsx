import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import rootLoader from "./loaders/rootLoader";
import Root from "./pages/Root";
import Blog from "./pages/Blog";
import blogLoader from "./loaders/blogLoader";
import SearchByTag from "./pages/SearchByTag";
import tagLoader from "./loaders/tagLoader";
import Login from "./pages/Login";
import UserContext from "./contexts/UserContext";
import { useState } from "react";
import { User } from "./interfaces/User";
import Profile from "./pages/Profile";

function App() {
  const [user, setUser] = useState<User>();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,

      children: [
        {
          path: "/",
          element: <Home />,
          loader: rootLoader,
        },
        {
          path: "/blog/:id",
          element: <Blog />,
          loader: blogLoader,
        },
        {
          path: "/tag/:tag",
          element: <SearchByTag />,
          loader: tagLoader,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
  ]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
