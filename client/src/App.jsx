import { useState } from 'react';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  const [page, setPage] = useState('login');

  return (
    <div>
      <button onClick={() => setPage('login')}>Login</button>
      <button onClick={() => setPage('register')}>Register</button>

      {page === 'login' && <Login />}
      {page === 'register' && <Register />}
    </div>
  );
}

export default App;
