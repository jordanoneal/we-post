import React, { useState } from 'react'
import { ICreateUserParams } from '../../../../common/src/interfaces';
import { CreateUser } from '../../services/user'

export default function CreateAccount() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [verifyPassword, setVerifyPassword] = useState<string>();

  const handleSubmit = async () => {
    const createParams: ICreateUserParams = {
      firstName,
      lastName,
      email,
      username,
      password,
    }

    if (!firstName || !lastName || !email || !username || !password) {
      console.log('Please fill out all fields');
      return;
    }

    const user = await CreateUser(createParams);

    return user;
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
          <input className='border' type="password" value={verifyPassword} />
        </div>
        <button className='bg-blue-500 p-2 rounded' type='button' onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}
