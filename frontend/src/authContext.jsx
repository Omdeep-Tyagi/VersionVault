// Importing necessary React modules for creating context, managing state, side effects, and consuming the context.
import React, { createContext, useState, useEffect, useContext } from 'react';

// Creating a Context object to hold the authentication data. This object allows global access to the authentication state.
const AuthContext = createContext();

// A custom hook `useAuth` that provides an easy way to consume the `AuthContext` in any component.
export const useAuth = () => {
    return useContext(AuthContext); // Access the AuthContext's value (currentUser and setCurrentUser).
}

// The `AuthProvider` component acts as a wrapper to provide the `AuthContext` to all child components.
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null); // State to store the currently logged-in user's ID.

    // The `useEffect` hook runs once when the component mounts to check if a user ID is stored in localStorage.
    useEffect(() => {
        const userId = localStorage.getItem('userId'); // Retrieve the stored user ID from localStorage.
        if (userId) {
            setCurrentUser(userId); // If a user ID is found, update the `currentUser` state to indicate a logged-in user.
        }
    }, []); // Empty dependency array ensures this effect runs only once on component mount.

    // The `value` object holds the authentication state and functions, making them available to consumers of this context.
    const value = {
        currentUser, // Current logged-in user ID.
        setCurrentUser // Function to update the `currentUser` state.
    };

    // Wrapping the children components with the `AuthContext.Provider` and passing the `value` object as context data.
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Example Use Case:

// Checking Login State: In a protected route, you can use useAuth() to check if currentUser is null and redirect to the login page if necessary.
// Updating Login State: When a user logs in, you can update setCurrentUser with their ID and save it to localStorage.
// This approach ensures the app maintains a consistent authentication state across different components without prop-drilling.