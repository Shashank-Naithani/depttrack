import React from "react";
import Loader from "../pages/Loader";
import Unauthorized from "../pages/Unauthorized";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const RoutesProtector = ({ adminHrOnly }) => {
  // Redux
  const { user } = useSelector((state) => state.auth);
  const { isAuth } = useSelector((state) => state.auth);
  const { authChecked } = useSelector((state) => state.auth);

  //if not auth checked
  if (!authChecked) return <Loader />;

  //   not logged in
  if (!isAuth) return <Navigate to="/" replace />;

  //   adminHrOnly
  if (adminHrOnly) {
    const deptId = user?.department.id?.toLowerCase();
    const allowed = ["admin", "human-resource"];
    if (!allowed.includes(deptId)) {
      return <Unauthorized />;
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RoutesProtector;
