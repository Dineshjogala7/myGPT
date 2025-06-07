import { Menu } from "lucide-react"
import { useState } from "react"
import Modal from "../modals/Modal"
import Login from "./Login"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../Context/Authcontext"

const Navbar = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const user = useAuth()
  const navigate = useNavigate()
  
  const handleLogin = () => {
    navigate('/login')
  }
  
  const handleHome = () => {
    if(user?.email) navigate('/')
    else {
      navigate('/login')
    }
  }
  
  return(
    <div className="w-full bg-gray-200 px-4 py-4 mx-auto fixed z-40 shadow-lg">
      <div className="flex justify-around items-center text-black font-bold">
        <h3 className="text-lg">myGPT</h3>
        <nav className="hidden md:flex items-center justify-between gap-8">
          <button className="px-2 py-2 active:bg-slate-300 rounded-md " onClick={handleHome}>Home</button>                                 
          <button className="px-2 py-2  active:bg-slate-300" onClick={handleLogin}>{user?.email ? 'PROFILE' : 'LOGIN'}</button>
        </nav>
        <button className="md:hidden" onClick={() => {
          setModalOpen(!modalOpen)
        }}><Menu/></button>
      </div>
      {modalOpen && (<Modal/>)}
    </div>
  )
}

export default Navbar