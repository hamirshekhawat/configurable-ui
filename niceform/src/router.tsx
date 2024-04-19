import { createBrowserRouter } from "react-router-dom";
import "./index.css";
import Form from "./pages/Form/Form";
import Home from "./pages/Home/Forms/Forms";
import FilledForms from "./pages/FormFilled.tsx/FilledForms";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:id",
    element: <Form />,
  },
  {
    path: "/responses/:id",
    element: <FilledForms />,
  },
  {
    path: "/response/:id",
    element: <Form />,
  },
]);
