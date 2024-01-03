import { React } from "react";
import { useState } from "react";
import axios from '../../api/axios'
import { useSnackbar } from 'notistack'


export default function AppointmentModal(doctorId) {


  'use strict'

  const { enqueueSnackbar } = useSnackbar()

  const [formData, setFormData] = useState({
    description: "",
    appointmentTime: "",
    appointmentDate: "",
    doctor: doctorId.doctorId
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/appointments/create", {
        ...formData,
      }, {withCredentials: true});
      enqueueSnackbar('Appointment Successfully created!', {variant: 'success'})
      onClose();
    } catch (error) {
      console.error("Failed to create appointment", error);
      enqueueSnackbar('Error in creating Appointment', {variant: 'error'})
    }
  }
  
  const errMessages = document.querySelectorAll('#error')
  
    function toggleError() {
      // Show error message
      errMessages.forEach((el) => {
        el.classList.toggle('hidden')
      })
  
      // Highlight input and label with red
      const allBorders = document.querySelectorAll('.border-gray-200')
      const allTexts = document.querySelectorAll('.text-gray-500')
      allBorders.forEach((el) => {
        el.classList.toggle('border-red-600')
      })
      allTexts.forEach((el) => {
        el.classList.toggle('text-red-600')
      })
    }

  const [showModal, setShowModal] = useState(true);
  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-2 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-black">
                    Appointment Form
                  </h3>
                  <button
                    className="p-1 ml-auto border-0 text-neutral-800 float-right text-3xl leading-none font-semibold"
                    onClick={() => setShowModal(null)}
                  >
                    <span className="text-neutral-800">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                    {/*START OF FORM*/}
                        <div class="bg-gray-100 p-0">
                          <div class="mx-auto max-w-md p-6 bg-white border-0 shadow-lg sm:rounded-3xl">
                            <h1 class="text-2xl font-bold mb-8 text-black">Fill the form with the necessary details</h1>
                            <form id="form" novalidate>
                              <div className="relative z-0 w-full mb-2">
                                <label for="description" className="absolute duration-300 top-3 -z-1 text-gray-500">Enter Description</label>
                                <input
                                  type="text"
                                  name="description"
                                  placeholder="Fever with cough"
                                  required
                                  className="text-black mt-5 border-solid border-black"
                                  onChange={handleChange}
                                />                           
                              </div>

                              <div className="relative z-0 w-full mb-2">
                                <label for="appointmentTime" className="absolute duration-300 top-3 -z-1 text-gray-500">Enter Desired Time</label>
                                  <input
                                    type="text"
                                    name="appointmentTime"
                                    placeholder="10AM"
                                    required
                                    className="text-black mt-5 border-solid border-black"
                                    onChange={handleChange}
                                  />
                              </div>

                              <div className="relative z-0 w-full mb-2">
                                <label for="appointmentDate" className="absolute duration-300 top-3 -z-1 text-gray-500">Enter Desired Date</label>
                                  <input
                                    type="text"
                                    name="appointmentDate"
                                    placeholder="December 10 2023"
                                    required
                                    className="text-black mt-5 border-solid border-black"
                                    onChange={handleChange}
                                  />
                              </div>

                            </form>
                          </div>
                        </div>
                    {/*END OF FORM */}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(null)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      handleSubmit()
                      setShowModal(null)
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}