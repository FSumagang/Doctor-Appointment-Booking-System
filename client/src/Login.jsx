import React from 'react'
import { useState } from "react"
import axios from './api/axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Link } from 'react-router-dom'
import useAuth from './pages/components/hooks/useAuth'
import useInput from './pages/components/hooks/useInput'
import useToggle from './pages/components/hooks/useToggle'
import ReCAPTCHA from 'react-google-recaptcha'


const Login = () => {

    const { setAuth } = useAuth()

    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [email, resetEmail, userAttribs] = useInput('email', '')
    const [password, setPassword] = useState('')
    const [check, toggleCheck] = useToggle('persist', false);

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()

    const [verified, setVerified] = useState(false)

    const googleSignIn = (e) => {
      e.preventDefault()
      window.open(
        'http://localhost:3000/auth/google/callback',
        "_self"
      )
    }

    const onChange = () => {
      setVerified(true)
    }

    const handleLoginUser = async (e) => {
  
      e.preventDefault()
  
    if(!email || !password){
        setLoading(false)
        enqueueSnackbar('Login Failed!', {variant: 'error'})
        return
    }

      const data = {
        email,
        password
      }
  
      setLoading(true)
  
    // try {
    //     const response = await axios.post('http://localhost:3000/login', data, {withCredentials: true})

    //     if ( response.data.status === 200) {
    //         setLoading(false)
    //         enqueueSnackbar('Login Successful!', {variant: 'success'})
    //         navigate('/Home')
    //     } else {
    //         setLoading(false)
    //         enqueueSnackbar('Login Failed!', {variant: 'error'})
    //         return
    //     }

    // } catch (error){
    //     console.log('Login Error: '.error)
    //     setLoading(false)
    //     enqueueSnackbar('User does not exist!', { variant: 'error' });
    // }


    try {
      const response = await axios.post('/login',
       JSON.stringify({email, password}),
       {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true
       })
       setPassword('')
      const accessToken = response.data.accessToken
      const roles = response.data.roles
       setAuth({ email, password, roles, accessToken })
       resetEmail()
       setPassword('')
       setLoading(false)
       enqueueSnackbar('Login Successful!', {variant: 'success'})
       navigate('/home')
       console.log(roles + " " + accessToken);
    } catch (error) {
      console.log(error);
      setLoading(false)
      enqueueSnackbar('User details invalid!', { variant:'error' })
    }

    }
  

    return (
        <body class="max-h-screen">
        <section class="border-red-500 bg-gray-200 min-h-screen flex items-center justify-center">
          <div class="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-3xl">
            <div class="md:w-1/2 px-5">
              <h2 class="text-2xl font-bold text-[#002D74]">Login</h2>
              <p class="text-sm mt-4 text-[#002D74]">If you have an account, please login</p>
              <form class="mt-6" action="#" method="POST">
                <div>
                  <label class="block text-gray-700">Email Address</label>
                  <input type="email" name="" id="email" placeholder="Enter Email Address" class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none text-black" autoFocus autocomplete required {...userAttribs}/>
                </div>
      
                <div class="mt-4">
                  <label class="block text-gray-700">Password</label>
                  <input type="password" name="" id="" placeholder="Enter Password" minlength="6" class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                        focus:bg-white focus:outline-none text-black" required onChange={(e) => setPassword(e.target.value)}/>
                </div>
      
                <div class="text-right mt-2">
                  <a href="#" class="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">Forgot Password?</a>
                </div>

                <ReCAPTCHA sitekey="6LfgsEIpAAAAAO-msbte2kHP9doIrnTkFJSePMSI" onChange={onChange} />

                <button type="submit" class="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
                      px-4 py-3 mt-6" onClick={handleLoginUser} disabled={!verified}>Log In</button>
              </form>
      
              <div class="mt-7 grid grid-cols-3 items-center text-gray-500">
                <hr class="border-gray-500" />
                <p class="text-center text-sm">OR</p>
                <hr class="border-gray-500" />
              </div>
      
              <button class="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-black" onClick={googleSignIn}> 
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" class="w-6 h-6" viewBox="0 0 48 48"><defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/></defs><clipPath id="b"><use xlinkHref="#a" overflow="visible"/></clipPath><path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"/><path clipPath="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/><path clipPath="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/><path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/></svg>
                <span class = "ml-4">Login with Google</span>
              </button>
      
              <div class="text-sm flex justify-between items-center mt-3 text-black">
                <p>If you don't have an account...</p>
                <Link to="/Signup">
                    <button class="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400  ">Register</button>
                </Link>
              </div>
            </div>
      
            <div className="w-1/2 md:block hidden ml-5 ">
              <img src="/login.jpg" class="rounded-2xl" alt="page img"/>
            </div>
      
          </div>
        </section>
        </body>
    )
}

export default Login