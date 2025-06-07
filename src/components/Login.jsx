import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Authcontext";

const Login = () => {
    const navigate = useNavigate();
    const user = useAuth();

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            navigate('/');
            console.log("Logged in user:", user);
        } catch (error) {
            console.error("Google Sign-In Error:", error);
        }
    };

    const handleLogOut = async () => {
        try {
            await signOut(auth);
            navigate('/login'); // Optional: redirect after logout
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    // Add loading state for when user is being determined
    // if (user === undefined) {
    //     return (
    //         <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-slate-500">
    //             <div>Loading...</div>
    //         </div>
    //     );
    // }

  
    if (user && user.email) {
        return (
            <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-slate-200">
                <div className="max-w-md w-full py-4 px-6 bg-white shadow-lg rounded-lg ">
                    <div className="flex items-center justify-center">
                      <img src={user.photoURL} className="h-[100px] w-[100px] object-cover object-center rounded-full"/>
                    </div>
                    <h1 className="text-lg">{user.email}</h1>
                    <p className="mb-4">User Already Logged in</p>
                    <div className="flex items-center justify-center">
                      <button 
                        onClick={handleLogOut}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded "
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-slate-200 flex justify-center items-center">
            <div className="flex flex-col items-center justify-center container">
                <h2 className="text-2xl mb-4 text-white">Welcome to myGPT</h2>
                <button
                    onClick={handleGoogleLogin}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Sign In with Google
                </button>
            </div>
        </div>
    );
};

export default Login;