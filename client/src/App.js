import { Routes, Route } from 'react-router-dom';
import RegisterPage from './components/user/Register';
import LoginPage from './components/user/Login';
import Profile from './components/profile/Profile';
import './app.css'
import Main from './components/main/Main';

const App = () => {
  return (
    <div className='App'>
        <Routes>
          <Route path={'/'} element={<RegisterPage />}/>
          <Route path={'/login'} element={<LoginPage />}/>
          <Route path={'/profile/create'} element={<Profile />}/>
          <Route path={'/main'} element={<Main />}/>
        </Routes>
      </div>
  )
}


export default App;
