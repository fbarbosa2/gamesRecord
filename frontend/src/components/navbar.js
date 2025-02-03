import React , {useState}from "react";
import { IoMenu } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {

    const { user } = useAuth();

    const [width, setWidth] = useState('0%');

    const openSidenav = () => {
        setWidth('15%');
    };

    const closeSidenav = () => {
        setWidth('0%');
    };

    return (
        <div>
            <div className="navbar-menu">
                <button onClick={openSidenav} className="open-menu-button"><IoMenu /></button>
                <h1>gameRecord</h1>
            </div>
            <div className="sidenav" style={{width: width}}>
                <div className="sidenav-close-button">
                    <button onClick={closeSidenav} className="close-menu-button"><IoMdArrowRoundBack /></button>
                </div>
                <a href="/">Home</a>
                <a href="/search">Search</a>
                <a href="/mygames">My Games</a>
                <a href="/profile">Profile</a>
                {user ? <a href="/logout">Logout</a> : <a href="/login">Login / Register</a>}
            </div>
        </div>
        
    );
};

export default Navbar;