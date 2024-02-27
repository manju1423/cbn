import logo from "./logo.svg";
import "./App.css";
import Signup from "./component/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Home from "./component/Home";
import Tasks from "./component/Tasks";
import Leaves from "./component/Leaves";
import Editprofile from "./component/Editprofile";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/tasks" element={<Tasks />}></Route>
          <Route path="/leaves" element={<Leaves />}></Route>
          <Route path="/editProfile" element={<Editprofile />}></Route>
        </Routes>
      </BrowserRouter>
      <h1>Hi</h1>
    </div>
  );
}

export default App;
