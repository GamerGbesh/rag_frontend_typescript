import SideBar from "../components/Sidebar.tsx";
import {useNavigate} from "react-router-dom";
import api from "../services/api.ts";
import {useEffect, useState} from "react";
import {useAuthContext} from "../contexts/AuthContext.tsx";
import FirstPage from "../components/FirstPage.tsx";
import CreateLibrary from "../components/CreateLibrary.tsx";
import "../css/home.css"
import "../css/mobile.css"
import Dashboard from "../components/Dashboard.tsx";
import {Course, HomeData, LibraryInfo, Member} from "../interfaces/DataTypes.ts"

export function Home() {
    const navigate = useNavigate();
    const [data, setData] = useState<HomeData | null>(null);
    const [libraryCount, setLibraryCount] = useState(0);
    const { user, status, setAddLibrary, addLibrary, setSidebarOpen } = useAuthContext()

    useEffect(() => {
        const setting = () => {
            setAddLibrary(false)
            setSidebarOpen(false)
        }
        setting();
    }, []);

    useEffect(() => {
        const fetchData = async () => {

            await api.get("/Libraries").then((response) => {
                setData(response.data);
                setLibraryCount(response.data.body.length + 1)
            })
                .catch ((error) => console.log(error))

        }
        fetchData();
    }, [status])


    const activeFunction = (library: LibraryInfo | Member | Course | number) => {
        if (typeof library !== "number")
        navigate("/Library", {state: {id: library.id}});
    }

    return (
        <>
            <SideBar data={data!} activeFunction={activeFunction} disabled={libraryCount >= 3} />
            {!user ? (
                <FirstPage/>
            ):(
                <>
                    {addLibrary ? <CreateLibrary/> : <Dashboard
                        data={data!}
                        activeFunction={activeFunction}
                        disabled={libraryCount >= 3}
                    />}
                </>
            )}
        </>
    )
}

export default Home;