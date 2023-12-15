import { jwtDecode } from "jwt-decode";
import Login from "../Login/login";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userInfo } from "../../api/api";

const ProtectedComponent = ({ setCurrUser, allowRoles, children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);
            const userId = decoded.sub;
            getUserInfo(userId);
        }
    }, []);

    async function getUserInfo(userId) {
        const obtainData = await userInfo(userId);
        setCurrUser(obtainData);
        if (allowRoles) {
            const userRoles = obtainData.roles.map(role => role.name);
            if (!allowRoles.some(role => userRoles.includes(role))) {
                navigate(-1);
            }
        }
    }

    if (!token) {
        return <Login setCurrUser={setCurrUser} />;
    }
    else {
        return children;
    }
};

export default ProtectedComponent;