import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Home from "./Home.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import { ApiProvider } from "@reduxjs/toolkit/query/react";
// import { api } from "./apiSlice.js";

import "./index.css";
import { Provider } from "react-redux";
import { store } from "../store.js";
import LoginPage from "./login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={store}>
        <App />
      </Provider>
    ),
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/contact",
        element: <p>Contact Us</p>,
      },
      {
        path: "/tasks",
        element: <Home />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
