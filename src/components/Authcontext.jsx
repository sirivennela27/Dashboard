import {createContext,useState,useContext} from "react";

const Authcontext=createContext();

export const AuthProvider=({children})=>{
    const [isAuthenticated,setIsAuthenticated]=useState(false);

    return(
        <Authcontext.Provider value={{isAuthenticated,setIsAuthenticated}}>
            {children}  
        </Authcontext.Provider>
    )
}

export const useAuth=()=>useContext(Authcontext);