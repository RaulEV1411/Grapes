import { jwtDecode } from "jwt-decode";
import Login from "../Login/login";
import { useEffect } from "react";

const ProtectedComponent = ({
    setCurrUser,
    children
    }) => {
        const token = localStorage.getItem('token');
    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);
            const userId = decoded.sub;
            fetch(`http://localhost:3002/api/v1/users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "content-type": 'application/json'
                }
                })
                .then(response => response.json())
                .then(data => {
                    setCurrUser(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, []);
        if(!token){
        return <Login  setCurrUser={setCurrUser}/>;
        }
        else{
        return children;
        }
};

export default ProtectedComponent;