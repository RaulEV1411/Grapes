import { jwtDecode } from "jwt-decode";
import Login from "../Login/login";

const ProtectedComponent = ({
    setCurrUser,
    children,
    }) => {
        const token = localStorage.getItem('token');
        if (token) {
            // console.log(token,"ayudaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
            // const decoded = jwtDecode(token);
            // console.log("PersistenciaAAAAAAAAAAAAAAAAAAAAAAAAAA")
            // const userId = decoded.sub;
            // console.log(decoded)
            // fetch(`http://localhost:3001/api/v1/users/${userId}`, {
            //     headers: {
            //         'Authorization': `Bearer ${token}`,
            //         "content-type": 'application/json'
            //     }
            //     })
            //     .then(response => response.json())
            //     .then(data => {
            //         // setCurrUser(data);
            //     })
            //     .catch(error => {
            //         console.error('Error:', error);
            //     });
        }
        else{
        return <Login  setCurrUser={setCurrUser}/>;
    }
    
    return children;
};

export default ProtectedComponent;