import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "../pages/Register/RegisterPage";
import VerifyEmailPage, {
  VerifyEmailPageLoader,
} from "../pages/VerifyEmailPage/VerifyEmailPage";

export const router = createBrowserRouter([
  // Sample index path
  {
    path: "/",
    element: <div>Hello World!</div>,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/activate/:id/:code",
    element: <VerifyEmailPage />,
    loader: VerifyEmailPageLoader,
  },
]);
