
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";

const Register = () => {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  const handleGoogleSignIn = () => {
    console.log("Google Sign-In clicked");
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Create an Account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <div className='mb-4'>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input {...register("email", { required: true })} type="email" id="email" placeholder='Email address'
              className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow' />
          </div>
          <div className='mb-4'>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input {...register("password", { required: true })} type="password" id="password" placeholder='Password'
              className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow' />
            {message && <p className="text-red-500 text-xs italic mb-3">{message}</p>}
          </div>
          <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Register
            </button>
          </div>
        </form>
        <p className="inline-block align-baseline font-medium mt-4 text-sm">
          Already have an account? 
          <Link to="/login" className='text-blue-500 hover:text-blue-800'> Login</Link>
        </p>
        <div className="mt-4">
          <button onClick={handleGoogleSignIn} className="w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            <FaGoogle className="mr-2" />
            Sign up with Google
          </button>
        </div>
        <p className="mt-5 text-center text-gray-500 text-xs">&copy;2025 Book Store. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Register;
