import { jwtDecode } from "jwt-decode";
import Login from "../Login/login";
import { useEffect } from "react";

const ProtectedComponent = ({
    setCurrUser,
    children,
    }) => {
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            console.log(token,"ayudaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
            const decoded = jwtDecode(token);
            console.log("PersistenciaAAAAAAAAAAAAAAAAAAAAAAAAAA")
            console.log(decoded)
            const userId = decoded.sub;
            console.log(userId)
            console.log(decoded)
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
    }, [])
        if(!setCurrUser){
        return <Login  setCurrUser={setCurrUser}/>;
    }
    
    return children;
};

export default ProtectedComponent;