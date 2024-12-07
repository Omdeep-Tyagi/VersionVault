import React, { useEffect } from "react";
import {useNavigate, useRoutes} from 'react-router-dom'
//npm i react-router-dom

// Pages List
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

// Auth Context
import { useAuth } from "./authContext";

const ProjectRoutes = ()=>{
    const {currentUser, setCurrentUser} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        const userIdFromStorage = localStorage.getItem("userId");
        // User authentication state persists in localStorage using a userId.
        // Even if the page is refreshed, the app can retrieve the userId from localStorage and reinitialize the authentication context.

        if(userIdFromStorage && !currentUser){// id avaialbe in local storage but not in context then setting up
            setCurrentUser(userIdFromStorage);
        }

        if(!userIdFromStorage && !["/auth", "/signup"].includes(window.location.pathname))
        {
            navigate("/auth");
        }

        if(userIdFromStorage && window.location.pathname=='/auth'){
            navigate("/");
        }
    }, [currentUser, navigate, setCurrentUser]);// if any of these value change then that will trigger a reload (useEffect)

    let element = useRoutes([
        {
            path:"/",
            element:<Dashboard/>
        },
        {
            path:"/auth",
            element:<Login/>
        },
        {
            path:"/signup",
            element:<Signup/>
        },
        {
            path:"/profile",
            element:<Profile/>
        }
    ]);

    return element;
}

export default ProjectRoutes;