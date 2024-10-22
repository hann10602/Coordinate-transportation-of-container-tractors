import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        children: [
          {
            path: "/",
            element: <></>,
          },
        ],
      },
      {
        path: "auth",
        children: [
          {
            path: "/",
            element: <></>,
          },
        ],
      },
      {
        path: "admin",
        children: [
          {
            path: "/",
            element: <></>,
          },
        ],
      },
    ],
  },
]);
