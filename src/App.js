import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { LoginContext } from "./contexts/LoginContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Gallery from "./Gallery";
import MyPhotos from "./MyPhotos";
import Login from "./Login";
import Upload from "./Upload";
import Log from "./Log";
import PageNotFound from "./PageNotFound";
import SignUp from "./SignUp";
import Unauthorized from "./Unauthorized";

function App() {
  const [loginStatus, setLoginStatus] = useState(false);

  return (
    <>
      <LoginContext.Provider value={{ loginStatus, setLoginStatus }}>
        <Router>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />}></Route>
            <Route path="/gallery" element={<Gallery />}></Route>
            <Route path="/myPhotos" element={<MyPhotos />}></Route>
            <Route path="/upload" element={<Upload />} />
            <Route path="/logs" element={<Log />}></Route>
            <Route path="/signUp" element={<SignUp />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
          <Footer></Footer>
        </Router>
      </LoginContext.Provider>
    </>
  );
}

export default App;
