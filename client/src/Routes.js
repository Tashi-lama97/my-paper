import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./core/landingPage/LandingPage";
import NotFound from "./core/NotFound";
import VerifyEmail from "./auth/VerifyEmail";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import PrivateRoute from "./auth/helper/PrivateRoute";
import AdminRoute from "./auth/helper/AdminRoute";
import ProtectedRoute from "./auth/helper/ProtectedRoute";
import DashboardAdmin from "./admin/DashboardAdmin";
import DashboardUser from "./user/DashboardUser";
import VerifyEmailError from "./user/VerifyEmailError";
import MyResumes from "./user/MyResumes";
import Templates from "./user/Templates";
import CreateResume from "./user/CreateResume";
import DownloadPDF from "./user/DownloadPDF";
import UpdateResume from "./user/UpdateResume";
import ContactUs from "./core/ContactUs";
import AllUsers from "./admin/AllUsers";
import AllResumes from "./admin/AllResumes";
import Profile from "./user/Profile";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route
          path="/verifyemail/:verificationToken"
          exact
          component={VerifyEmail}
        />
        <Route path="/forgotpassword" exact component={ForgotPassword} />
        <Route
          path="/resetpassword/:resetToken"
          exact
          component={ResetPassword}
        />
        <Route path="/contactus" exact component={ContactUs} />

        <ProtectedRoute
          path="/emailverificationerror"
          exact
          component={VerifyEmailError}
        />
        <PrivateRoute path="/user/dashboard" exact component={DashboardUser} />
        <PrivateRoute path="/user/myresumes" exact component={MyResumes} />
        <PrivateRoute path="/user/templates" exact component={Templates} />
        <PrivateRoute
          path="/user/createresume/:templateId"
          exact
          component={CreateResume}
        />
        <PrivateRoute
          path="/user/download/:resumeId"
          exact
          component={DownloadPDF}
        />
        <PrivateRoute
          path="/user/updateresume/:resumeId"
          exact
          component={UpdateResume}
        />
        <PrivateRoute path="/user/profile" exact component={Profile} />
        <AdminRoute path="/admin/dashboard" exact component={DashboardAdmin} />
        <AdminRoute path="/admin/users" exact component={AllUsers} />
        <AdminRoute path="/admin/resumes" exact component={AllResumes} />

        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
