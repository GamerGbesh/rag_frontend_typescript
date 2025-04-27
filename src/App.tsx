import NavBar from './components/NavBar'
import './css/App.css'
import Home from "./pages/Home.tsx";
import {Route, Routes} from "react-router-dom";
import Signup from "./pages/Signup.tsx";
import Login from "./pages/Login.tsx";
import Library from "./pages/Library.tsx";
import Detail from "./pages/Detail.tsx";
import Logout from "./pages/Logout.tsx";
import Quiz from "./pages/Quiz.tsx";
import Chat from "./pages/Chat.tsx";
import './css/App.css'

function App() {

    return (
        <>
            <NavBar/>
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                    <Route path="/library" element={<Library/>}/>
                    <Route path="/library/details" element={<Detail/>}/>
                    <Route path="/quiz" element={<Quiz/>}/>
                    <Route path="/chat" element={<Chat/>}/>
                </Routes>
            </main>
        </>
    )
}

export default App
