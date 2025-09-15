import { Navigate } from "react-router-dom";
import { useAuth } from "./Authcontext";
const ProtectedRoute=({children})=>{
    const {isAuthenticated}=useAuth();

    return isAuthenticated ? children:<Navigate to="/"/>;

}
export default ProtectedRoute;