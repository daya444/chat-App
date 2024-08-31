import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';

const Login = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  const { login, loading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(inputs);
    if (result) {
      handleLogin();
    }
  };

  const handleLogin = () => {
    console.log("Login successful");
  }

  return (
    <div className='flex flex-col items-center justify-center min-w-95 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Login
          <span className='text-black pl-3'>ChatApp</span>
        </h1>

       
          <div>
            <label className='label p-2' htmlFor='username'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input
              type='text'
              id='username'
              name='username'
              className='input w-full input-bordered h-10'
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
              placeholder='Enter your username'
              autoComplete='username'
            />
          </div>

          <div>
            <label className='label p-2' htmlFor='password'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              type='password'
              id='password'
              name='password'
              className='input w-full input-bordered h-10'
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
              placeholder='Enter your password'
              autoComplete='current-password'
            />
          </div>

          <Link to='/signup' className='mt-3 hover:underline text-sm hover:text-blue-600 inline-block'>
            {"Don't have an account?"}
          </Link>

          <div className='btn btn-block btn-sm mt-2'>
            <button
             onClick={handleSubmit}
             type='submit' className="z-50" disabled={loading}>
              {loading ? <span className='loading loading-spinner'></span> : 'Login'}
            </button>
          </div>
        
      </div>
    </div>
  );
};

export default Login;
