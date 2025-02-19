import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../../context/Authcontext";

const AdminRoute = ({ children }) => {
  const { user, isLoading, getUser } = useContext(AuthContext);
  const location = useLocation();
  const userInfo = getUser();
  if (isLoading) {
    return <div>loading.....</div>;
  }
  if (user && userInfo.role === "admin") {
   return children;
  }   else   {
    return <Navigate to="/signin" state={{ from: location }} replace />;
    if(user && userInfo.role === "user") {
      return children;
    }
    return <Navigate to="/signin" state={{ from: location }} replace />;
  } 
 
  
};

export default AdminRoute;
