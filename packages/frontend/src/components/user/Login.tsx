import React, { useState } from 'react'
import { toast } from 'react-toastify'

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    if (!username || !password) return toast.error('Please fill in all fields')
    // TODO: Handle login
  }

  return (
    <div className="flex justify-center w-full">
      <form className="bg-white rounded p-10 shadow-md">
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="border border-gray-400 p-2 w-full"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="border border-gray-400 p-2 w-full"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-twitter-blue text-white font-medium py-2 px-4 rounded hover:bg-twitter-dark"
          type="button"
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
    </div>
  )
}
