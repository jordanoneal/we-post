import React from 'react';
import { ICreateUserParams } from '@common.interfaces';
import { CreateUser } from '../../services/user'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function CreateAccount() {
  type FormValues = {
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    verifyPassword: string
  }

  const navigate = useNavigate();
  const { handleSubmit, register, formState: { errors }, watch, setError, clearErrors } = useForm<FormValues>();

  const registerUser = async (data: FormValues) => {
    const { firstName, lastName, email, username, password } = data;

    const createParams: ICreateUserParams = {
      firstName,
      lastName,
      email,
      username,
      password
    }

    const register = await CreateUser(createParams);

    if (register) {
      toast.success('Account created successfully');
      navigateToLogin();
    }
    else {
      toast.error('Account creation failed');
    }
  }

  const navigateToLogin = () => {
    setTimeout(() => {
      navigate('/login');
    }, 1000)
  }

  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <form onSubmit={handleSubmit(registerUser)} className='w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 rounded-lg shadow-lg'>
        <div className='mb-4'>
          <label htmlFor='firstName' className='block text-gray-700 font-medium mb-2'>First Name</label>
          <input {...register('firstName', {
            required: 'First name is required',
            pattern: {
              value: /^[^0-9]+$/i,
              message: 'First name must not contain numbers'
            }
          })}
            className={`w-full p-2 border border-gray-400 rounded ${errors.firstName && 'border-red-400'}`} type="text" />
          {errors.firstName && <p className='text-red-500 text-sm'>{(errors.firstName.message)}</p>}
        </div>
        <div className='mb-4'>
          <label htmlFor='lastName' className='block text-gray-700 font-medium mb-2'>Last Name</label>
          <input {...register('lastName', {
            required: 'Last name is required',
            pattern: {
              value: /^[^0-9]+$/i,
              message: 'Last name must not contain numbers'
            }
          })}
            className={`w-full p-2 border border-gray-400 rounded ${errors.lastName && 'border-red-400'}`} type="text" />
          {errors.lastName && <p className='text-red-500 text-sm'>{(errors.lastName.message)}</p>}
        </div>
        <div className='mb-4'>
          <label htmlFor='email' className='block text-gray-700 font-medium mb-2'>Email</label>
          <input {...register('email', { required: 'Email is required' })}
            className={`w-full p-2 border border-gray-400 rounded ${errors.email && 'border-red-400'}`} type="text" />
          {errors.email && <p className='text-red-500 text-sm'>{(errors.email.message)}</p>}
        </div>
        <div className='mb-4'>
          <label htmlFor='username' className='block text-gray-700 font-medium mb-2'>Username</label>
          <input {...register('username', { required: 'Username is required' })}
            className={`w-full p-2 border border-gray-400 rounded ${errors.username && 'border-red-400'}`} type="text" />
          {errors.username && <p className='text-red-500 text-sm'>{(errors.username.message)}</p>}
        </div>
        <div className='mb-4'>
          <label htmlFor='password' className='block text-gray-700 font-medium mb-2'>Password</label>
          <input {...register('password', { required: 'Password is required' })}
            className={`w-full p-2 border border-gray-400 rounded ${errors.password && 'border-red-400'}`} type="password" />
          {errors.password && <p className='text-red-500 text-sm'>{(errors.password.message)}</p>}
        </div>
        <div className='mb-4'>
          <label htmlFor='verifyPassword' className='block text-gray-700 font-medium mb-2'>Verify Password</label>
          <input {...register('verifyPassword', { required: 'Verify Password is required', validate: (data) => data === watch('password') || 'The passwords do not match' })}
            className={`w-full p-2 border border-gray-400 rounded ${errors.verifyPassword && 'border-red-400'}`} type="password" />
          {errors.verifyPassword && <p className='text-red-500 text-sm'>{(errors.verifyPassword.message)}</p>}
        </div>
        <button className='bg-twitter-blue p-2 mt-3 rounded text-white hover:bg-blue-500' type='submit'>Submit</button>
      </form>
    </div>
  )
}
