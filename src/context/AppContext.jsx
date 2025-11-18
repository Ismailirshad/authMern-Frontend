import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContextProvider = (props) => {

    axios.defaults.withCredentials = true

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(false)

    const getUserData = async () => {
        try {
            const res = await axios.get(backendUrl + '/api/user/data')
            res.data.success ? setUserData(res.data.userData) : ""
            setIsLoggedIn(true)
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
    getUserData();
  }, []);

    const value = {
        backendUrl,
        isLoggedIn, setIsLoggedIn,
        userData, setUserData,
        getUserData
    }
    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}