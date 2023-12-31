import './styles.scss'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import { Route, Routes, BrowserRouter, Navigate} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthProvider';
function App() {
  console.log(process.env.REACT_APP_apiKey)
  const currentUser = useContext(AuthContext);
  const ProtectedRoute = ({children}) => {
    if( !currentUser ) {
      return (
        <Navigate to="/login"/>
      )
    }
    return children;
  }
  return (
      <BrowserRouter>
        <Routes>
          <Route index element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }/>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register />}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
