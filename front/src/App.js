import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AppHeader from './components/header';
import AppFooter from './components/footer';
import Home from './components/home';
import AppLogin from './components/login';
import AppLogout from './components/logout';
import AppRegister from './components/register';
import AppProfile from './components/profile';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <AppHeader/>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<AppProfile />} />
          <Route path="/login" element={<AppLogin />} />
          <Route path="/register" element={<AppRegister />} />
          <Route path="/logout" element={<AppLogout />} />
        </Routes>
        <footer>
          <AppFooter/>
        </footer>
      </div>
    </Router>
  );
}

export default App;
