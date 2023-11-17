    import { useRef } from "react"
    import { useNavigate, Link, useParams } from 'react-router-dom'
    import "./login.css"
    const Login = ({setCurrUser, setShow}) =>{
    const formRef=useRef()
    const navigate = useNavigate()
    const login= async (userInfo, setCurrUser)=>{
        const url="http://localhost:3001/login"
        try{
            const response=await fetch(url, {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify(userInfo)
            })
            const data=await response.json()
            if(!response.ok) 
            {throw data.error}
            localStorage.setItem("token", response.headers.get("Authorization"))
            setCurrUser(data) 
            navigate("/")
        }catch(error){
        console.log("error", error)
        }
    }
    const handleSubmit=e=>{
        e.preventDefault()
        const formData=new FormData(formRef.current)
        const data=Object.fromEntries(formData)
        const userInfo={
            "user":{ email: data.email, password: data.password }
        }
        login(userInfo, setCurrUser)
        e.target.reset()
    }
        return(
            <div className="login-container">
                <form className="formLogin" ref={formRef} onSubmit={handleSubmit}>
                    <label>Email:</label>
                    <input className="inputLogin" type="email" name="email" placeholder="email" />
                    <br />
                    <label>Password:</label>
                    <input className="inputLogin" type="password" name="password" placeholder="password" />
                    <br />
                    <input type="submit" value="Login" className="inputLogin"/>
                </form>
                <br />
                <div className="signup-link">
                    Not registered yet, <Link to="/signup">Signup</Link>
                </div>
            </div>
    )
    }
    export default Login