import SideBar from "../components/Sidebar.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {MouseEvent, useEffect, useState} from "react";
import api from "../services/api.ts";
import FirstPage from "../components/FirstPage.tsx";
import {useAuthContext} from "../contexts/AuthContext.tsx";
import MemberCard from "../components/MemberCard.tsx";
import DeleteButton from "../components/DeleteButton.tsx";
import Loader from "../components/Loader.tsx";
import ConfirmPopup from "../components/ConfirmPopup.tsx";
import { DetailData } from "../interfaces/DataTypes.ts";

function Detail() {
    const location = useLocation();
    const id = location.state?.id
    const [data, setData] = useState<DetailData | null>(null);
    const [update, setUpdate] = useState(false);
    const [loading, setLoading] = useState(true);
    const {user, personal} = useAuthContext()
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("getMembers", {
                    params: {library_id: id}
                })
                setData(response.data)
            }
            catch (error) {
                console.log(error)
                alert("You are no longer in this library")
                navigate("/")
            }
            finally {
                setLoading(false);
            }
        }
        fetchData()
    }, [update]);


    if (!user) {
        return <FirstPage />;
    }

    async function makeFunction(user_id: number) {
        await api.post("Admins", {
            library_id: id,
            user_id
        })
            .then(res => {console.log(res); setUpdate(!update);})
            .catch(err => {
                console.log(err)
                alert(err.response.data.error)
            })
    }

    async function deleteFunction(user_id: number) {
        await api.delete("removeMember", {
            data: {
                library_id: id,
                user_id
            }
        })
            .then(res => {console.log(res); setUpdate(!update);})
            .catch(err => console.log(err))
    }

    async function removeFunction(user_id: number) {
        await api.delete("Admins", {
            data: {
                library_id: id,
                user_id
            }
        })
            .then(res => {console.log(res); setUpdate(!update);})
            .catch(err => console.log(err))
    }

    async function deleteLibrary() {
        await api.delete("deleteLibrary", {
            data: {
                library_id: id
            }
        })
            .then(res => {console.log(res); navigate("/")})
            .catch(err => console.log(err))
    }

    async function leaveLibrary() {
        await api.delete("leaveLibrary", {
            data: {
                library_id: id,
            }
        })
            .then(res => {console.log(res); navigate("/")})
            .catch(err => console.log(err))
    }


    async function onClick (e: MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        if ((e.target as HTMLButtonElement).value === "No"){
            setShowPopup(false)
        }
        else{
            if (data && data.creator){
                await deleteLibrary()
            }
            else {
                await leaveLibrary()
            }
        }
    }

    return (
        <>
            <SideBar data={data!} />
            {personal !== id &&
                <>
                    {showPopup && data?.creator && <ConfirmPopup text={"Do you want to delete this library"} onClick={onClick}/>}
                    {showPopup && !data?.creator && <ConfirmPopup text={"Do you want to leave this library"} onClick={onClick}/>}
                    {data?.creator ?
                        <DeleteButton onShowPopup={setShowPopup}/>
                        :
                        <DeleteButton message={"Leave Library"} onShowPopup={setShowPopup}/>}
                </>
            }
            <div>
                {data?.members && data?.members.length > 0 &&
                    <p className={"dark:text-white text-2xl italic font-bold"}>Members</p>
                }
                {data?.members && data?.members.length > 0 ? (
                    data?.members.map((member, index) => (
                        <MemberCard content={member} key={index}
                                    makeFunction={makeFunction}
                                    deleteFunction={deleteFunction}
                                    removeFunction={removeFunction}
                                    creator={data?.creator}/>
                    ))
                ):(
                    <>
                        {!loading && (
                            <p className="text-gray-600 dark:text-gray-300 text-center">
                                There are no members in this library
                            </p>
                        )}
                    </>
                )}
                {loading && <Loader text={"Loading..."} />}
            </div>
        </>
    )
}

export default Detail;