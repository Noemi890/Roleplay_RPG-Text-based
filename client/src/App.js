import { Routes, Route } from 'react-router-dom';
import RegisterPage from './components/user/Register';
import LoginPage from './components/user/Login';
import Profile from './components/profile/ProfileForm';
import './app.css'
import Main from './components/main/Main';
import SelectProfile from './components/profile/SelectProfile';
import Game from './components/game/Game'
import RoleView from './components/roles/RoleView';

const App = () => {
  return (
    <div className='App'>
        <Routes>
          <Route path={'/'} element={<RegisterPage />}/>
          <Route path={'/login'} element={<LoginPage />}/>
          <Route path={'/profile/create'} element={<Profile />}/>
          <Route path={'/profile/select'} element={<SelectProfile />}/>
          <Route path={'/main'} element={<Main />}/>
          <Route path={'/game'} element={<Game />}/>
          <Route path={'/role'} element={<RoleView />}/>
        </Routes>
      </div>
  )
}


export default App;
