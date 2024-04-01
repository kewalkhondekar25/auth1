import Error from "./components/Error"
import ForgetPassword from "./components/ForgetPassword"
import Header from "./components/Header"
import LogIn from "./components/LogIn"
import SignUp from "./components/SignUp"
import { Button } from "./components/ui/button"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import Profile from "./components/Profile"

function App() {
  return (
    <div className="bg-[#131315] text-white h-screen">
      <Router>
        <Toaster/>
        <Header/>
        <Routes>
          <Route path="/" element={<LogIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/forgetpassword" element={<ForgetPassword/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/*" element={<Error/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
