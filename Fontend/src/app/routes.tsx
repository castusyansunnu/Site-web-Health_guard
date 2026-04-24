import { createBrowserRouter } from "react-router";
import { LandingPage } from "./components/LandingPage";
import { LoginPage } from "./components/LoginPage";
import { ManufacturerDashboard } from "./components/ManufacturerDashboard";
import { RegistrationPage } from "./components/RegistrationPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/dashboard",
    Component: ManufacturerDashboard,
  },
   {
    path: "/register",
    Component: RegistrationPage,
  },
]);
