import "./assets/css/Signup.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";

function Signup() {

  const googleAuth = () => {
		window.open(
			'http://localhost:3000/auth/google/callback',
			"_self"
		);
	};

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveUser = (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      address,
    };

    setLoading(true);

    axios
      .post("http://localhost:3000/users", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Registration Successful!", { variant: "success" });
        navigate("/Login");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Registration Failed!", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="text-black">
          <center>Create your Account</center>
        </h2>
        <form>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              placeholder="Enter firstname"
              autoComplete="off"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              placeholder="Enter lastname"
              autoComplete="off"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateOfBirth">Birthday</label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              placeholder="Enter address"
              autoComplete="off"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="form-control"
              required
            >
              <option value="" hidden>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              required
            />
          </div>

          <center>
            <button
              type="submit"
              className="btn-register w-75 rounded-20"
              onClick={handleSaveUser}
            >
              Register
            </button>
          </center>
          <br></br>


          <div class="mt-7 grid grid-cols-3 items-center text-gray-500">
                <hr class="border-gray-500" />
                <p class="text-center text-sm">OR</p>
                <hr class="border-gray-500" />
              </div>
      
              <button class="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-black" onClick={googleAuth}> 
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" class="w-6 h-6" viewBox="0 0 48 48"><defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/></defs><clipPath id="b"><use xlinkHref="#a" overflow="visible"/></clipPath><path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"/><path clipPath="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/><path clipPath="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/><path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/></svg>
                <span class = "ml-4">Login with Google</span>
              </button>



          <div className="form-group d-flex align-items-center">
            <p className="text">Already have an Account?</p>

            <Link to="/Login">
              <button className="btn-login text-decoration-underline text-black ml-70 ">
                Login
              </button>
            </Link>
          </div>
          <hr />
        </form>
      </div>
    </div>
  );
}

export default Signup;
