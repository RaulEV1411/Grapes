import { Navigate, useNavigate,Link } from "react-router-dom"

    const Logout =({setCurrUser})=>{
        const navigate = useNavigate()
        const logout=async (setCurrUser)=>{
            try {
                const response=await fetch("http://localhost:3001/logout",{
                    method: "delete",
                    headers: {
                        "content-type": "application/json",
                        "authorization": localStorage.getItem("token")
                    },
                })
                const data=await response.json()
                if(!response.ok) {throw data.error}
                
                localStorage.removeItem("token")
                setCurrUser(null)
                navigate("/login")
            } catch (error) {
                console.log("error", error)
            }
        }
        const handleClick=e=>{
            e.preventDefault()
            logout(setCurrUser)
        }
        return (
            <div className="login-link">
              Are you already registered?, <Link to="/login">Tap!</Link>
                </div>
        )
    }
    export default Logout