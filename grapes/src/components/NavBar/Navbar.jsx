import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
function Navbar({setCurrUser}) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isModerator, setIsModerator] = useState(false);
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const userId = decoded.sub;

    useEffect(() => {
        const getUserDetails = async () => {
            const response = await fetch(`http://localhost:3001/api/v1/users/${userId}`, {
                headers: {
            "content-type": "application/json",
            "authorization": localStorage.getItem("token"),
                },
            });

            const data = await response.json();
            setIsAdmin(data.roles.some(role => role.name === 'admin'));
            setIsModerator(data.roles.some(role => role.name === 'moderator'));
            console.log(data.role)
        };

        getUserDetails();
    }, [userId, token]);
  
  const navigate = useNavigate()
  const logout=async ()=>{
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
    <div>
<nav id="navbar">
  <ul className="navbar-items flexbox-col">
    <li className="navbar-logo flexbox-left">
      <a className="navbar-item-inner flexbox">
            <img className="logoAppNav" src="/Logo_Grapes-removebg-preview.png" alt="Logo de la App" />
      </a>
    </li>
    <li className="navbar-item flexbox-left">
      <a className="navbar-item-inner flexbox-left">
        <div className="navbar-item-inner-icon-wrapper flexbox">
          <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-vcard" viewBox="0 0 16 16">
            <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5M9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8m1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5"/>
            <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96c.026-.163.04-.33.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1.006 1.006 0 0 1 1 12z"/>
          </svg>
        </div>
        <span className="link-text">Profile</span>
      </a>
    </li>
    <li className="navbar-item flexbox-left">
      <a className="navbar-item-inner flexbox-left">
        <div className="navbar-item-inner-icon-wrapper flexbox">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg>
        </div>
        <span className="link-text">Search</span>
      </a>
    </li>
    <li className="navbar-item flexbox-left">
      <Link to="/home" className="navbar-item-inner flexbox-left">
        <div className="navbar-item-inner-icon-wrapper flexbox">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
          </svg>
        </div>
        <span className="link-text">Home</span>
      </Link>
    </li>
    <li className="navbar-item flexbox-left">
      <Link to="/subject" className="navbar-item-inner flexbox-left">
        <div className="navbar-item-inner-icon-wrapper flexbox">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-journal-text" viewBox="0 0 16 16">
            <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
            <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
            <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
          </svg>
        </div>
        <span className="link-text">Subjects</span>
      </Link>
    </li>
    {isAdmin ? (
    <li className="navbar-item flexbox-left">
        <a className="navbar-item-inner flexbox-left">
            <div className="navbar-item-inner-icon-wrapper flexbox">
                <ion-icon name="add-circle-outline"></ion-icon>
            </div>
            <span className="link-text">Add Content</span>
        </a>
    </li>
) : isModerator ? (
    <li className="navbar-item flexbox-left">
        <Link to="/request_teacher" className="navbar-item-inner flexbox-left">
            <div className="navbar-item-inner-icon-wrapper flexbox">
                <svg name="checkmark-circle-outline" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-archive" viewBox="0 0 16 16">
                  <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                </svg>
            </div>
            <span className="link-text">Review Request</span>
        </Link>
    </li>
) : (
    <li className="navbar-item flexbox-left">
        <Link to="/new_request" className="navbar-item-inner flexbox-left">
            <div className="navbar-item-inner-icon-wrapper flexbox">
                <svg name="person-add-outline" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16">
                  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z"/>
                  <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"/>
                </svg>
            </div>
            <span className="link-text">Become Admin</span>
        </Link>
    </li>
)}
    <li className="navbar-item flexbox-left">
      <a className="navbar-item-inner flexbox-left">
        <div className="navbar-item-inner-icon-wrapper flexbox">
          <ion-icon name="chatbubbles-outline"></ion-icon>
        </div>
        <span className="link-text"></span>
      </a>
    </li>
    <li className="navbar-item flexbox-left">
      <a onClick={handleClick} className="navbar-item-inner flexbox-left">
        <div className="navbar-item-inner-icon-wrapper flexbox">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
            <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
          </svg>
        </div>
        <span className="link-text">Logout</span>
      </a>
    </li>
  </ul>
</nav>
    </div>
  )
}

export default Navbar