import { useContext } from "react";
import AuthContext, { AuthContextType } from "../context/AuthProvider";

const useAuth = () => {
    return useContext<AuthContextType>(AuthContext);
};

export default useAuth;