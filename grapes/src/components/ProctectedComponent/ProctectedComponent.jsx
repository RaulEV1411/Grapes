import { jwtDecode } from "jwt-decode";
import Login from "../Login/login";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userInfo } from "../../api/api";

const ProtectedComponent = ({ setCurrUser, allowRoles, children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

// The 'useEffect' hook is used to call the 'getUserInfo' function when the component mounts.
// The 'getUserInfo' function is called with the 'userId' from the decoded token.
    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);
            const userId = decoded.sub;
            getUserInfo(userId);
        }
    }, []);

// The 'getUserInfo' function is an asynchronous function that fetches the user's information.
// It calls the 'userInfo' function, passing in the 'userId'.
// It sets the 'currUser' state to the fetched user information.
// If 'allowRoles' is defined, it checks if the user's roles include any of the 'allowRoles'.
// If not, it navigates back to the previous page.
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