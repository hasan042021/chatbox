import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Conversation from "./pages/Conversation";
import Inbox from "./pages/Inbox";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  console.log(import.meta.env.VITE_REACT_APP_API_URL);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/inbox" element={<Conversation />} />
        <Route path="/inbox/:id" element={<Inbox />} />
      </Routes>
    </Router>
  );
}

export default App;
