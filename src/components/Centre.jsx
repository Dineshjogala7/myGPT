import axios from "axios";
import { ArrowUp, LoaderPinwheel, Square, ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../Context/Authcontext";
import { useNavigate } from "react-router-dom";

const Centre = () => {
    // Move ALL useState to the top first
    const [input, setInput] = useState('');
    const [load, setLoad] = useState(false);
    const [response, setResponse] = useState('');
    const [showScroll, setScroll] = useState(false);
    
    // Then refs and other hooks
    const scrollRef = useRef();
    const user = useAuth();
    const navigate = useNavigate();
    
    // Then functions
    const checkifScroll = () => {
        if (scrollRef.current) {
            const ele = scrollRef.current
            const ifScroll = ele.scrollHeight > ele.clientHeight
            setScroll(ifScroll)
        }
    }
    
    // Now useEffect can safely use response
    useEffect(() => {
        if (response) {
            setTimeout(checkifScroll, 100)
        } else {
            setScroll(false)
        }
    }, [response])
    
    const scrolltoBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth',
            })
        }
    }
    
    const handleTask = async () => {
        if (!input.trim()) return;
        
        setLoad(true);
        console.log("Sending request with input:", input);
        
        try {
            const res = await axios.post('http://localhost:3001/gemini', {
                prompt: input,
            });
            setResponse(res.data.result);
        } catch (error) {
            console.error("Error:", error);
            setResponse("Sorry, there was an error processing your request.");
        }
        
        setLoad(false);
        setInput('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleTask();
        }
    };

    if (!user || !user.email) {
        navigate('/login');
        return null;
    }

    return (
        <div className="min-h-screen pb-32 bg-hero-bg bg-center bg-cover ">
            {/* Scrollable content area */}
            <div className="pt-20 px-4">
                <div ref={scrollRef} className="max-h-[calc(100vh-240px)] overflow-y-auto scrollbar-hide">
                    {response && (
                        <div className="bg-transparent z-50 p-4 rounded-lg mb-4 mt-4">
                            <pre className="whitespace-pre-wrap text-sm text-gray-500 leading-relaxed">
                                {response}
                            </pre>
                        </div>
                    )}
                    
                    {load && (
                        <div className="flex items-center gap-2 text-black mt-4">
                            <LoaderPinwheel className="animate-spin text-black" />
                            <span>Generating response...</span>
                        </div>
                    )}
                </div>
                
                {/* Move scroll button outside the scrollable area */}
                {showScroll && (
                    <button 
                        onClick={scrolltoBottom}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 mt-2 absolute left-12 bottom-[5rem]"
                    >
                        <ArrowDown size={16} />
                        
                    </button>
                )}
            </div>

            {/* Fixed input area */}
            <div className="fixed bottom-4 left-0 right-0 px-4">
                <div className="flex items-center justify-center">
                    <div className="relative w-full max-w-[70%]">
                        <textarea
                            className="hover:border-indigo-200 hover:ring-black min-h-[60px] max-h-[300px] p-4 pr-12 bg-transparent border border-2 border-gray-300 shadow-lg w-full rounded-lg outline-none resize-none scrollbar-hide"
                            placeholder="Type your message..."
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            value={input}
                            disabled={load}
                            rows={3}
                        />
                        <button
                            className="absolute bottom-4 right-3 text-black bg-gray-500 p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
                            disabled={load || !input.trim()}
                            onClick={handleTask}
                        >
                            {!load ? <ArrowUp /> : <Square />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Centre;