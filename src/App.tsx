import Login from "./feature/Login"
import Signup from "./feature/Signup"
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import Home from "./Layout/Home";
import Register from "./feature/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import PlantCatalog from "./feature/PlantCatalog";
import MyGarden from "./feature/PlantCatalog";
import Blog from "./feature/blog";
import GreenGuide from "./feature/greenGuide";
//import MyGarden from "./feature/PlantCatalog";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mygarden" element={<MyGarden />} />
          <Route path="/community" element={<Blog />} />
          <Route path="/greenguide" element={<GreenGuide />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App