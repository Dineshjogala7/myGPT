import { Route,Routes } from "react-router-dom"
import Centre from "./components/Centre"
import Navbar from "./components/Navbar"
import Login from "./components/Login"

import AuthContextProvider from "./Context/Authcontext"


const App=()=>{
  return(
    <AuthContextProvider>
      <div className="flex grow">
        <Navbar />
        <main className="w-full flex-grow">
          <Routes>
            <Route path="/" element={<Centre />}/>
            <Route path="/login" element={<Login/>} />
          </Routes>
        </main>
        
      </div>
    </AuthContextProvider>
  )
}

export default App