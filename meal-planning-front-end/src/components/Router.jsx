//eslint-disable-next-line
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App.jsx";
import ErrorPage from "./ErrorPage.jsx";
import MainPage from "./MainPage.jsx";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      path: "mainPage/:name",
      element: <MainPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
