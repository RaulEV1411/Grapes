import { jwtDecode } from "jwt-decode";
import Login from "../Login/login";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedComponent = ({
    setCurrUser,
    allowRoles,
    children
    }) => {
        const navigate = useNavigate();
        const token = localStorage.getItem('token');
    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);
            const userId = decoded.sub;
            fetch(`http://localhost:3001/api/v1/users/${userId}`, {
                headers: {
                    "content-type": "application/json",
                    "authorization": localStorage.getItem("token"),
                }
                })
                .then(response => response.json())
                .then(data => {
                    setCurrUser(data);
                    if (allowRoles) {
                        const userRoles = data.roles.map(role => role.name);
                        if (!allowRoles.some(role => userRoles.includes(role))) {
                            navigate(-1);
                        }
                    }
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