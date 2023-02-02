import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import Login from './components/user/Login';
import Home from './components/Home';
import CreateAccount from './components/user/CreateAccount';
import Account from './components/user/Account';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/createAccount'>Create Account</Link>
          </li>
          <li>
            <Link to='/account/1'>Account</Link>
          </li>
        </ul>
      </nav>

      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="/account/:accountId" element={<Account />} />
        <Route path='*' element={
          <div className="flex items-center justify-center h-full text-center">
            <div className="w-full max-w-xs">
              <h1 className="text-4xl font-bold text-gray-900">404: Not Found</h1>
              <p className="mt-4 text-gray-600">The page you were looking for could not be found.</p>
            </div>
          </div>} />
      </Routes>
    </>
  );
}

export default App;
