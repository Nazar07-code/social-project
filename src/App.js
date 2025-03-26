import { Route, Routes } from 'react-router';
import './App.css';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Home from './pages/Home';
import Header from './components/Header/Header';
import User from './components/User/User';
import Posts from './components/Posts/Posts';

const MainLayout = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout><Home /></MainLayout>} />
        <Route path='/me' element={<MainLayout><User /></MainLayout>} />
        <Route path='/me/posts' element={<MainLayout><Posts /></MainLayout>} />

        <Route path='/auth/register' element={<Register />} />
        <Route path='/auth/login' element={<Login />} />
      </Routes>
    </>
  );
}
export default App