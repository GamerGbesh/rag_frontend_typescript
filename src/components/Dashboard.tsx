import {useAuthContext} from "../contexts/AuthContext.tsx";
import LibraryCard from "./LibraryCard.tsx";
import {DashboardProps} from "../interfaces/Props.ts"

function Dashboard({
    data,
    activeFunction,
    disabled
                   }: DashboardProps) {

    const { user, addLibrary, setAddLibrary } = useAuthContext();
    return (
        <>
            {user && !addLibrary && (
                <main className="flex-1 p-6 md:ml-64"> {/* Adjust margin to match sidebar width */}
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6 dark:text-white">Your Libraries</h2>

                        {/*{recent &&
                        <section className="mb-8">
                            <h3 className="text-xl font-semibold mb-4">Recently Viewed</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <LibraryCard
                                        library={recent}
                                        onClick={() => activeFunction(recent)}
                                    />

                            </div>
                        </section>}*/}

                        {/* All Libraries Section */}
                        <section>
                            <div className="flex justify-between items-center mb-4">

                                {!disabled && <button
                                    onClick={() => setAddLibrary(!addLibrary)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    + New Library
                                </button>}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {data && <LibraryCard library={data?.user} onClick={() => activeFunction(data?.user)} />}
                                {data?.body?.map(library => (
                                    <LibraryCard
                                        key={library.id}
                                        library={library}
                                        onClick={() => activeFunction(library)}
                                    />
                                ))}
                            </div>
                        </section>
                    </div>
                </main>
            )}</>
    )
}

export default Dashboard;