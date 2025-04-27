import { marked } from "marked"
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import {MessageProps} from "../interfaces/Props.ts";



function Message({ response, user }: MessageProps) {
    const [processedHtml, setProcessedHtml] = useState("");

    useEffect(() => {
        // Process markdown and sanitize HTML whenever response changes
        const rawHtml = marked(response || "") as string;
        const cleanHtml = DOMPurify.sanitize(rawHtml);
        setProcessedHtml(cleanHtml);
    }, [response]);

    return (
        <div
            className={`p-3 rounded-xl max-w-[70%] w-fit mb-3 break-words relative shadow
    ${user
                ? 'bg-blue-600 text-white ml-auto rounded-br-none'
                : 'bg-gray-200 text-black mr-auto rounded-bl-none'
            }`}
        >
            <span dangerouslySetInnerHTML={{ __html: processedHtml }} />
        </div>

    );
}

export default Message