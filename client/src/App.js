import { Routes, Route } from 'react-router-dom';
import RegisterPage from './components/user/Register';
import LoginPage from './components/user/Login';
import './app.css'

const App = () => {
  return (
    <div className='App'>
        <Routes>
          <Route path={'/'} element={<RegisterPage />}/>
          <Route path={'/login'} element={<LoginPage />}/>
        </Routes>
      </div>
  )
}


export default App;
