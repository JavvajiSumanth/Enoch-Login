import { AuthContext } from "context/AuthContext";
import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const MinimalLayout = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
};

export default MinimalLayout;
