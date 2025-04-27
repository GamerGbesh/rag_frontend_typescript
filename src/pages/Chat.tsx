import {useEffect,  useState} from "react";
import {useLocation} from "react-router-dom";
import Message from "../components/Message.tsx";
import AutoResizingTextarea from "../components/AutoResizingTextArea.tsx";
import api from "../services/api.ts";
import Loader from "../components/Loader.tsx";
import { ChatMessage } from "../interfaces/DataTypes.ts"



function Chat() {
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const location = useLocation()
    const [loading, setLoading] = useState(true);
    const query = location.state?.query
    const course_id = location.state?.course_id
    const library_id = location.state?.library_id

    useEffect(() => {

        chat(query, true)

    }, [])



    async function chat(query: string, start=false){
        console.log("🚀 Calling chat with query:", query, "start:", start);
        if (query.length === 0){
            return
        }
        if (start) setMessages([{content:query, role:"user"}])
        else setMessages((prev) => [...prev, {content: query, role: "user"}])
        setLoading(true)
        api.get("question", {
            params: {
                query,
                course_id: course_id,
                library_id: library_id
            }
        })
            .then((response) => {
                console.log(response)
                setMessages((prev) => [...prev, {content:response.data.LLM_response, role:"chat"}])
            })
            .catch((error) => {console.log(error)})
            .finally(() => setLoading(false))
    }

    return (
        <>
            <div className="flex flex-col h-screen">

                <div className="flex-1 overflow-y-auto p-4 pb-70">
                    {messages?.map((message, index) => (
                        <Message
                            response={message.content}
                            key={index}
                            user={message.role === "user"}
                        />
                    ))}
                    {loading && (
                        <div className="flex justify-center p-4">
                            <Loader />
                        </div>
                    )}
                </div>


                <AutoResizingTextarea
                    placeholder="Type your message..."
                    minRows={1}
                    maxRows={5}
                    handleClick={chat}
                    disabled={loading}
                />
            </div>
        </>
    )
}


export default Chat;