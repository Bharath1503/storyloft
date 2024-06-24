import './App.css';
import LoginForm from './components/LoginForm';
import { HashRouter, Route,Routes,Navigate } from 'react-router-dom'

function App() {
  return (
    <div>
  <HashRouter>
        <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </HashRouter>
   </div>
  );
}

export default App;
