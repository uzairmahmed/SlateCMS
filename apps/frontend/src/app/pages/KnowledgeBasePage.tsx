import { FC, useEffect, useState } from 'react';
import { checkLoggedIn } from '../../apis/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { MdMenu } from 'react-icons/md';
import { Content } from '../interfaces';
import { getAllContent } from '../../apis/api';
import ContentCard from '../components/ContentCard';

interface KnowledgeBasePageProps {

}

const KnowledgeBasePage: FC<KnowledgeBasePageProps> = ({ }) => {
    const [contents, setContents] = useState<Content[]>([]);
    const [currentDocument, setCurrentDocument] = useState(0);

    const navigate = useNavigate();

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
        const data = await getAllContent()
        setContents(data)
    }


    return (
        <div className='flex flex-col h-full w-full'>
            <div className='flex flex-row w-full p-5 border-b justify-between items-center'>
                <label htmlFor="sidebar-drawer" className="flex md:hidden btn btn-ghost drawer-button">
                    <MdMenu size={20} />
                </label>

                <h1 className='font-bold text-xl self-center'>Knowledge Base</h1>
            </div>

            <div className='flex flex-col md:flex-row h-full'>
                <div className='flex flex-row md:flex-col w-full md:w-48 md:h-full border-b border-r p-4'>
                    {contents.map((content, index) => (
                        <button className='btn btn-link text-black h-fit btn-xs md:btn-md' onClick={() => setCurrentDocument(index)} key={content.title}>
                            <h1 className='text-md'>{content.title}</h1>
                        </button>
                    ))}
                </div>

                <div className='flex flex-col gap-5 p-10 w-full overflow-y-scroll'>
                    {contents.length > 0 ?
                        contents[currentDocument] && <ContentCard content={contents[currentDocument]} />
                        :
                        <div className='flex w-full h-32 bg-slate-100 rounded-xl border items-center'>
                            <h2 className='text-lg w-full align-middle text-center'>No Content</h2>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
export default KnowledgeBasePage;