import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/zoo/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        // Log the raw response (optional)
        console.log('Raw response:', response);

        const json = await response.json();

        console.log('JSON response:', json); // Log the JSON response

        if (!response.ok) {
            setError(json.error);
            setIsLoading(false);
        } else {
            // Check if _id exists in the JSON response
            if (json._id) {
                // Save user to localStorage including _id
                localStorage.setItem('user', JSON.stringify({
                    _id: json._id,
                    email: json.email,
                    token: json.token,
                    isAdmin: json.isAdmin
                }));

                // Update auth context
                dispatch({ type: 'LOGIN', payload: json });

                setIsLoading(false);
            } else {
                setError("User information not received properly.");
                setIsLoading(false);
            }
        }
    };
    return { login, error, isLoading };
};
