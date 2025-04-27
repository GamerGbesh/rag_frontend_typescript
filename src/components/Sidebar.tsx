import {useEffect, useRef, useState} from "react";
import {useAuthContext} from "../contexts/AuthContext.tsx";
import {Link} from "react-router-dom";
import SideCard from "./SideCard.tsx";
import Loader from "./Loader.tsx";
import {SidebarProps} from "../interfaces/Props.ts";
import {LibraryInfo, Course, DetailData} from "../interfaces/DataTypes.ts"

export default function Sidebar({data, activeFunction, disabled}: SidebarProps) {
    const [loading, setLoading] = useState(true)
    const {user, sidebarOpen, setPersonal, setSidebarOpen, setAddLibrary, addLibrary} = useAuthContext()
    const [active, setActive] = useState<number | null>(null);
    const buttonRef = useRef(null);

    function isLibrary (header: string | LibraryInfo): header is LibraryInfo{
        return typeof header === 'object' && 'library_name' in header;
    }

    function isDetail (data: SidebarProps["data"]): data is DetailData{
        return "sub_header" in data
    }


    useEffect(() => {
        const checkLoading = () => {
            if (data){
                setLoading(false)
                if ("user" in data && data.user){
                    setPersonal(data.user.id)
                }
            }
        }
        checkLoading()
    }, [data])

    return (<>
            {user && (
                <>

                    <button
                        className={`fixed top-[100px] left-0 z-100 w-6 
                        h-16 bg-gray-800 text-white flex items-center 
                        justify-center rounded-r-md transition-all duration-300 shadow-md
                        ${sidebarOpen ? "translate-x-[280px]" : "translate-x-0"}`}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
                    >
                        {sidebarOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        )}
                    </button>

                    {/* Sidebar */}
                    <div className={`fixed top-[65px] left-0 w-[280px] h-[calc(100vh-65px)] 
      bg-gray-800 text-white flex flex-col p-6 shadow-sm overflow-y-auto transition-all 
      duration-300 z-100
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                        {loading ? (
                            <Loader text={"Loading..."} />
                        ) : (
                            <>
                                <div className="text-xl font-bold pb-4 mb-4 border-b border-white/20 text-center">
                                    {isLibrary(data.header) ? data?.header.library_name : data?.header}
                                    {data?.header_active &&
                                    <>
                                        <br/> {!("creator" in data) ?
                                        <Link to={"/library/details"}
                                              state={{id:isLibrary(data.header) && data?.header.id}}
                                              className="dark:text-blue-600 text-blue-600"
                                        >Details</Link>
                                        : "sub_header" in data && data?.sub_header && <span
                                        style={{"fontSize": "14px", "fontStyle": "italic"}}
                                    >
                   Entry key: {data?.sub_header}
                   </span>}
                                    </>
                                }
                                </div>

                                <div className="flex-1 flex flex-col gap-2">
                                    <>
                                        {"user" in data && data?.user && <SideCard activeFunction={activeFunction!} item={data?.user}/>}
                                        {!isDetail(data) && data?.body?.map((item: LibraryInfo | Course, index: number) => (
                                            <SideCard item={item}
                                                      key={index}
                                                      activeFunction={activeFunction!}
                                                      index={index}
                                                      setActive={setActive}
                                                      active={active}
                                            />
                                        ))}
                                    </>
                                </div>

                                {data?.active && <div className="my-4 text-center">
                                    {!disabled && <button ref={buttonRef} onClick={() => setAddLibrary(!addLibrary)} className="bg-blue-500 text-white border-none
              rounded-full w-10 h-10 text-xl cursor-pointer transition-all
              inline-flex items-center justify-center hover:bg-blue-600 hover:scale-110">
                                        +
                                    </button>}
                                </div>}
                            </>
                        )}
                    </div>
                </>
            )}
        </>
    )
}