import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { LoginUser } from '../../services/auth';
import { useForm } from 'react-hook-form';

export default function Login() {
  type FormValues = {
    username: string,
    password: string
  }

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const handleLogin = async (data: FormValues) => {
    const { username, password } = data;

    const login = await LoginUser(username, password);
    if (login) {
      toast.success('Login successful');
    }
    else {
      toast.error('Login failed');
    }
  }

  return (
    <div className="flex justify-center w-full">
      <form onSubmit={handleSubmit(handleLogin)} className="bg-white rounded p-10 shadow-md">
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="username">
            Username
          </label>
          <input
            className={`border border-gray-400 p-2 w-full ${errors.username && 'border-red-400'}`}
            type="text"
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            className={`border border-gray-400 p-2 w-full ${errors.password && 'border-red-400'}`}
            type="password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        <button
          className="bg-twitter-blue text-white font-medium py-2 px-4 rounded hover:bg-blue-500"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  )
}
