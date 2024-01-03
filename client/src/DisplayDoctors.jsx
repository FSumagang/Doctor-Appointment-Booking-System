import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from './pages/components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
// import DoctorsList from './pages/DoctorsList'
import Cards from './pages/components/Cards'
// import TestCards from './pages/doctors/testCards';
import './assets/css/tailwind.css'

const showSession = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3000/get-current-user', { withCredentials: true });
      console.log('Session Data:', response.data);
    } catch (error) {
      console.error('Error fetching session data:', error);
    }
  };
  

const DisplayDoctors = (user) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:3000/doctors')
            .then((response) => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='mt-[-32rem]'>
                <div className='flex justify-center items-center'>
                    <Cards users={users} />
                </div>
            </div>
        </div>
    )

}

export default DisplayDoctors