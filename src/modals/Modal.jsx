import { useAuth } from "../Context/Authcontext"
import { useNavigate } from "react-router-dom";

const Modal=()=>{
    const navigate = useNavigate();
    const user = useAuth();
    const handleHome=()=>{
        if(user.email){
            navigate('/')
        }
        else{
            navigate('/login')
        }
    }
    
    const handleLog=()=>{
        navigate('/login')
    }
    return(
        <div className="  top-0 bottom-0 left-0 right-0 bg-opacity-50 z-50 ">
            <div className="flex flex-col gap-2 px-4 max-w-xs mx-auto mt-5 rounded-lg items-center">
                <p onClick={handleHome} className="cursor-pointer">Home</p>
                <p onClick={handleLog} className="cursor-pointer">{user.email ? 'Profile' : 'Login'}</p>
            </div>

        </div>
    )

}
export default Modal