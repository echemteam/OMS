import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageLoader from "../../components/ui/pageLoader/PageLoader";
import ProtectedRoute from "../Routes/ProtectedRoute";
import Layout from "../../layouts/Layout";

const NotFound = React.lazy(() => import("../../pages/errors/NotFound"));
const Login = React.lazy(() => import("../../pages/login/Login"));

const AppRoutes = (props) => {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route
            name="Layout"
            path="/"
            element={
              <ProtectedRoute>
                <Layout componentRoutes={props.componentRoutes} />
              </ProtectedRoute>
            }
          >
            {props.componentRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                name={"test"}
                element={<route.component />}
              />
            ))}
          </Route>
          <Route exact name="Login" path="/Login" element={<Login />} />
          {/* <Route path="*" element={<Login />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};
export default AppRoutes;
