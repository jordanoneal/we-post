import React from 'react';
import CreateAccount from './components/user/CreateAccount';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer />
      <CreateAccount />
    </div>
  );
}

export default App;
