import { Link, useNavigate } from "react-router-dom";

import logo from '../../assets/logos.png'
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

function Navbar() {

    const { user, logout } = useAuth()
    const [showingMenu, setShowingMenu] = useState(false)
    const nav = useNavigate()
    useEffect(() => {
        const triggerMenu = () => {
            setShowingMenu((showing) => false)
        }
        document.addEventListener('click', triggerMenu)
        return () => {
            document.removeEventListener('click', triggerMenu)
        }
    }, [])

    const AuthBox = useCallback(() => {
        if (!user) {
            return <Link to="/auth/login" className="text-[black] text-[12px] hover:text-[gray]">Login</Link>
        }
        return <div id="auth-box" className="cursor-pointer relative" onClick={(e) => {
            e.stopPropagation()
            setShowingMenu(showing => !showing)
        }}>
            <div onClick={(e) => {
                e.stopPropagation()
            }} id="menu-authbox" style={{boxShadow:'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}} className={`absolute overflow-hidden w-full flex flex-col items-center h-max rounded-br-xl rounded-bl-xl border-[1px] translate-y-[45px] bg-[white]%]${!showingMenu ? ' hidden' : ''}`}>
                {user?.isAdmin && 
                
                <div onClick={() => nav("/model-improvement")} className=" p-2 hover:bg-[lightgray] bg-white transition-all w-full text-center">Model improvement</div>}
                <div className=" p-2 hover:bg-[lightgray]  bg-white  transition-all w-full text-center">Profile</div>
                <div className=" p-2 hover:bg-[lightgray]  bg-white  transition-all w-full text-center" onClick={() => {
                    logout()
                    toast("Logged out! See you next time")
                    setShowingMenu(false)
                }}>Logout</div>
            </div>
            <span className="opacity-[0.7] font-bold md:text-[14px] text-[12px]">Logged in as:</span> <b>{user.name}</b> </div>
    }, [user, showingMenu])

    return (<div className="bg-[white] p-2 flex flex-row justify-between items-center border-b-[1px] border-b-[lightgray]">
        <div className="flex flex-row items-center gap-2 cursor-pointer" onClick={() => {
            nav("/")
        }}>
            <img src={logo} width={50} height={50} />
            <div className="translate-x-2 font-bold text-[13px]">
                Garden Pro
            </div>
        </div>
        <div className="pr-[2rem]">
            <AuthBox />
        </div>

    </div>);
}

export default Navbar;