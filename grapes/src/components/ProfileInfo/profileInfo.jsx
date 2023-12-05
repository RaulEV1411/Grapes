import React, { useEffect, useState } from 'react';
import ProfileCard from '../ProfileCard/profileCard'
import { useParams } from 'react-router-dom';
import Navbar from '../NavBar/Navbar';

function ProfileInfo({setCurrUser}) {

const [user, setUser] = useState({});
const { id } = useParams()

const fetchUser = async () => {
    try {
    const response = await fetch(`http://localhost:3001/api/v1/users/${id}`, {
        method: 'GET',
        headers: {
        "content-type": "application/json",
        "authorization": localStorage.getItem("token"),
        },
    });

    if (!response.ok) {
        throw new Error('Error fetching user');
    }

    const data = await response.json();
    setUser(data);
    } catch (error) {
    console.error(error);
    }
};

useEffect(() => {
    fetchUser();
}, [id]);

if ( !user.user) {
    return <div>
            <Navbar setCurrUser={setCurrUser} />
            <div id="bodyCarga"> <div className='divCarga'></div> </div>
        </div>;
}
const birthDate = new Date(user.user.birth_date);
const today = new Date();

let age = today.getFullYear() - birthDate.getFullYear();
const month = today.getMonth() - birthDate.getMonth();

if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
}
console.log(user.roles[0].name);
return (
    <div>
        <ProfileCard
        first_name={user.user.first_name}
        last_name={user.user.last_name}
        email={user.user.email}
        birth_date={user.user.birth_date}
        age={age}
        role={user.roles[0].name}
        roles={user.roles[0].name}
        />
    </div>
  )
}

export default ProfileInfo