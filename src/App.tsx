import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import './App.css'
import AppRoutes from './routes/AppRoutes'

function App() {

  return (
    <BrowserRouter>
    <ToastContainer/>
      <AppRoutes/>
    </BrowserRouter>
  )
}

export default App
