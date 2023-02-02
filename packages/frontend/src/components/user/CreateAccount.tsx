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
    <div className='flex justify-center items-center w-full h-full'>
      <form>
        <div>
          <label htmlFor='firstName'>First Name</label>
          <input className='border' type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div>
          <label htmlFor='lastName'>Last Name</label>
          <input className='border' type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input className='border' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor='username'>Username</label>
          <input className='border' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input className='border' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label htmlFor='confirmPassword'>Verify Password</label>
          <input className='border' type="password" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} />
        </div>
        <button className='bg-twitter-blue p-2 mt-3 rounded' type='button' onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}
