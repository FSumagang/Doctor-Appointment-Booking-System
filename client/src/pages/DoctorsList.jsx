import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import AppointmentModal from "./components/AppointmentModal";
import { useState } from "react";

const DoctorsList = ({ doctor }) => {
    const [showModal, setShowModal] = useState('false')
    const [searchTerm, setSearchTerm] = useState('')

    const toggleModal = () => {
        setShowModal(!showModal)
    }

    const filteredDoctors = doctor.filter((item) => 
        item.specialization.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    )

    return (
        
        
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
            {doctor.map((item) => (
            <div
            key = {item._id}
            className='border-2 border-gray-500 rounded-lg px-6 py-6 m-1 relative hover:shadow-xl'
            >
                <h4 className="absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg">
                    <div className="flex justify-start items-center gap-x-2">
                        <PiBookOpenTextLight className="text-red-300 text-2xl" />
                        <h2 className="my-1">{item.name}</h2>
                    </div>
                </h4>
                <h4 className="absolute top-12 right-2 px-4 py-1 bg-gray-300 rounded-lg">
                    <div className="flex justify-start items-center gap-x-2">
                        <PiBookOpenTextLight className="text-black-300 text-2xl" />
                        <h2 className="my-1">{item.specialization}</h2>
                    </div>
                </h4>
                <div className="flex justify-start items-center gap-x-2 mt-4 p-4">

                    <>
                        <AppointmentModal show={showModal} />
                    </>

                </div>

            </div>

            ))}
        </div>
)
}

export default DoctorsList