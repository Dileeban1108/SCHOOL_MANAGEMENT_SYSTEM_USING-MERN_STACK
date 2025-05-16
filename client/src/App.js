import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Pages/Register"
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import PrimaryPage from "./Pages/PrimaryPage";
import SecondaryPage from "./Pages/SecondaryPage";
import Announcement from "./Pages/Announcement";
import Event from "./Pages/Event";
import PrimarySection from "./Pages/PrimarySection";
import SecondarySection from "./Pages/SecondarySection";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/primary_application" element={<PrimaryPage/>} />
        <Route path="/secondary_application" element={<SecondaryPage/>} />
        <Route path="/announcement" element={<Announcement/>} />
        <Route path="/event" element={<Event/>} />
        <Route path="/primarysection" element={<PrimarySection/>} />
        <Route path="/secondarysection" element={<SecondarySection/>} />
      </Routes>
    </Router>
  );
}

export default App;
