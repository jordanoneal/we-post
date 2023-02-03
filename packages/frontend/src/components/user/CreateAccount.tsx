import React, { useState } from 'react'
import { ICreateUserParams } from '@common.interfaces';
import { CreateUser } from '../../services/user'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function CreateAccount() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [verifyPassword, setVerifyPassword] = useState<string>('');

  const handleSubmit = async () => {
    const createParams: ICreateUserParams = {
      firstName,
      lastName,
      email,
      username,
      password,
    }

    if (!firstName || !lastName || !email || !username || !password)
      return toast.error('Please fill out all fields');

    const user = await CreateUser(createParams);
    if (user) {
      toast.success('Account created successfully');
      navigateToHome();
      return user;
    }
    return toast.error('Something went wrong. Please try again.')
  }

  const navigateToHome = () => {
    setTimeout(() => {
      navigate('/');
    }, 1000)
  }

  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <form className='w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 rounded-lg shadow-lg'>
        <div className='mb-4'>
          <label htmlFor='firstName' className='block text-gray-700 font-medium mb-2'>First Name</label>
          <input className='w-full p-2 border border-gray-400 rounded' type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className='mb-4'>
          <label htmlFor='lastName' className='block text-gray-700 font-medium mb-2'>Last Name</label>
          <input className='w-full p-2 border border-gray-400 rounded' type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className='mb-4'>
          <label htmlFor='email' className='block text-gray-700 font-medium mb-2'>Email</label>
          <input className='w-full p-2 border border-gray-400 rounded' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='mb-4'>
          <label htmlFor='username' className='block text-gray-700 font-medium mb-2'>Username</label>
          <input className='w-full p-2 border border-gray-400 rounded' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className='mb-4'>
          <label htmlFor='password' className='block text-gray-700 font-medium mb-2'>Password</label>
          <input className='w-full p-2 border border-gray-400 rounded' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='mb-4'>
          <label htmlFor='confirmPassword' className='block text-gray-700 font-medium mb-2'>Verify Password</label>
          <input className='w-full p-2 border border-gray-400 rounded' type="password" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} />
        </div>
        <button className='bg-twitter-blue p-2 mt-3 rounded text-white hover:bg-blue-500' type='button' onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}
