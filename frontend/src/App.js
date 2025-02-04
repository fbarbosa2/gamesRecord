import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from "./auth/authContext";
import Home from './pages/home';
import Search from './pages/search';
import MyGames from './pages/mygames';
import Profile from './pages/profile';
import Navbar from './components/navbar';
import Login from './pages/login';
import Register from './pages/register';
import GameDetails from './pages/gameDetails';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/mygames" element={<MyGames />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/game/:gameId" element={<GameDetails />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
