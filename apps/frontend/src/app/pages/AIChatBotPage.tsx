import OpenAI from "openai";
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdMenu, MdSend } from 'react-icons/md';
import { checkLoggedIn } from '../../apis/auth';
import { Message, Content } from '../interfaces';
import { getAllContent } from "../../apis/api";

interface AIChatBotPageProps {

}

const AIChatBotPage: FC<AIChatBotPageProps> = ({ }) => {
    const [inputFieldMessage, setInputFieldMessage] = useState("")
    const [content, setContent] = useState<string[]>([])
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();
    const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

    useEffect(() => {
        const isLoggedIn = checkLoggedIn();
        if (!isLoggedIn) {
            navigate('/login');
        }
        getData()
        return () => {

        };
    }, []);

    const getData = async () => {
        const data = await getAllContent() as Content[]
        const payload = data.map(dat => dat.document)
        setContent(payload)
    }


    const askChat = async (inputString: string) => {
        setLoading(true)
        const newMessage: Message = {
            from: 'me',
            msg: inputString,
        };
        setMessages(prevMessages => [...prevMessages, newMessage]);
        setInputFieldMessage("")

        const response = await openai.chat.completions.create({
            model: "gpt-4",  // ensure it's a capable model for long contexts
            messages: [
                {
                    "role": "system",
                    "content": `You are a knowledgeable assistant. Your job is to answer questions by quoting and referring only to the provided content. When answering, if relevant, include direct quotes from the material and cite specific sections or phrases from it.`
                },
                {
                    "role": "assistant",
                    "content": `Here is the course content you must refer to for answering: ${content}`
                },
                {
                    "role": "user",
                    "content": inputString
                }
            ]
        });


        const messagePayload = response.choices[0].message.content
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
                            {msg.msg}
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
                <div className="flex items-center">
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