import PrivateText from "../PrivateText/PrivateText.jsx";
import Signup from "../SingUp/singup.jsx";
import Login from "../Login/login.jsx";
import Logout from "../Logout/logout.jsx";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
const User = ({currUser, setCurrUser}) => {
    const [show, setShow]=useState(true)
    if(currUser) 
        return (
            <div>
            Hello {currUser.email}
            <PrivateText currUser={currUser}/>
            <Logout setCurrUser={setCurrUser}/>
            </div>
        )
    return (
        <div>
            { show?
                <Login setCurrUser={setCurrUser} setShow={setShow}/>  
                :
                <Signup setCurrUser={setCurrUser}  setShow={setShow} />
            }
        </div>
    )
}
export default User
