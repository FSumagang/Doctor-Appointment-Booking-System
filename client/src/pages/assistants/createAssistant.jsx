import React, {useState} from 'react'
import { Button, Label, TextInput } from 'flowbite-react';
import axios from '../../api/axios';
import useAuth from '../components/hooks/useAuth';
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom';
   

const CreateAssistant = () => {

    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const { auth } = useAuth()

    const doctor = auth.accessToken

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        doctor: doctor
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
          });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('assistants/createNewAssistant', formData, {withCredentials: true})
            setFormData({
                email: '',
                password: '',
                firstName: '',
                lastName: ''
            })
            enqueueSnackbar('Added Successfully!', {variant: 'success'})
            navigate('/assistants')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex justify-content-center align-items-center mt-5'>
            <form className="flex max-w-md flex-col gap-4 scale-150 mt-5">
            <div> 
                <div className="mb-2 block">
                    <Label htmlFor="email" value="Assistant's email" />
                </div>
                <TextInput id="email" type="email" value={formData.email} required  onChange={handleChange}/>
            </div>

            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password1" value="Assistant's password" />
                </div>
                <TextInput id="password" type="password" value={formData.password} required onChange={handleChange}/>
            </div>

            <div>
                <div className="mb-2 block">
                    <Label htmlFor="firstName" value="Assistant's  First Name" />
                </div>
                <TextInput id="firstName" type="text" value={formData.firstName} required onChange={handleChange}/>
            </div>

            <div>
                <div className="mb-2 block">
                    <Label htmlFor="lastName" value="Assistant's Last Name" />
                </div>
                <TextInput id="lastName" type="text" value={formData.lastName} required onChange={handleChange}/>
            </div>

            <Button type="submit" onClick={handleSubmit}>Submit</Button>
        </form>
    </div>
     )
}

export default CreateAssistant