import OpenAI from "openai";
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdMenu, MdSend } from 'react-icons/md';
import { checkLoggedIn } from '../../apis/auth';
import { Message, Content } from '../interfaces';
import { getAllContent, searchWithQuery } from "../../apis/api";
import ReactMarkdown from 'react-markdown';

interface AIChatBotPageProps {

}

const AIChatBotPage: FC<AIChatBotPageProps> = ({ }) => {
    const [inputFieldMessage, setInputFieldMessage] = useState("")
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false)
    const [searchWeb, setSearchWeb] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = checkLoggedIn();
        if (!isLoggedIn) {
            navigate('/login');
        }
        return () => {

        };
    }, []);


    const askChat = async (inputString: string) => {
        setLoading(true)
        const newMessage: Message = {
            from: 'me',
            msg: inputString,
        };
        setMessages(prevMessages => [...prevMessages, newMessage]);
        setInputFieldMessage("")

        const messagePayload = await searchWithQuery(inputString, searchWeb)

        const newMessageResponse: Message = {
            from: 'chat',
            msg: messagePayload,
        };

        setMessages(prevMessages => [...prevMessages, newMessageResponse]);
        setLoading(false)
    }


    return (
        <div className='flex flex-col h-full w-full overflow-y-scroll'>
            <div className='flex flex-row w-full p-5 border-b justify-between items-center'>
                <label htmlFor="sidebar-drawer" className="flex md:hidden btn btn-ghost drawer-button">
                    <MdMenu size={20} />
                </label>

                <h1 className='font-bold text-xl self-center'>SlateAI</h1>
                <div className="label cursor-pointer space-x-5">
                    <span className="label-text">Search the Web?</span>
                    <input type="checkbox" className="toggle" checked={searchWeb} onClick={() => setSearchWeb(!searchWeb)} />
                </div>
            </div>
            <div className="flex-grow overflow-y-scroll p-5">
                <div className="chat chat-start">
                    <div className="chat-bubble">
                        Hey there! I'm SlateAI, your supercharged study buddy! Got questions about your course materials? Whether you're stuck on a tricky concept, need a quick recap, or just want to explore something new, I've got you covered! I can dive deep into your notes and materials to fetch the right answers—complete with quotes and references from your content! Just send me a question to get started, and let's ace this together!
                    </div>
                </div>
                {messages.map((msg) => msg.from === 'chat' ?
                    <div className="chat chat-start">
                        <div className="chat-bubble">
                            <ReactMarkdown>{msg.msg}</ReactMarkdown>
                        </div>
                    </div>
                    :
                    <div className="chat chat-end">
                        <div className="chat-bubble">
                            {msg.msg}
                        </div>
                    </div>
                )}

            </div>

            <div className="w-full p-3 border-t sticky bottom-0 bg-white">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Ask Slate"
                        className="input input-bordered flex-grow mr-2"
                        value={inputFieldMessage}
                        onChange={(e) => setInputFieldMessage(e.target.value)}
                    />

                    <button disabled={loading} onClick={() => askChat(inputFieldMessage)} className="btn btn-neutral btn-circle">{loading ? <span className="loading loading-spinner loading-xs"></span> : <MdSend />}</button>
                </div>
            </div>

        </div>
    );
}
export default AIChatBotPage;