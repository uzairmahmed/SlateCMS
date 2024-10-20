import type { FC } from 'react';
import { FaLink, FaTimes } from 'react-icons/fa';

interface LinkPreviewProps {
    link: string;
}

const LinkPreview: FC<LinkPreviewProps> = ({ link }) => {
    
    const renderLinkPreview = (link: string) => {
        return <FaLink size={40} className="text-green-500" />;
    };

    const getDomain = (url: string) => {
        try {
            const { hostname } = new URL(url);
            return hostname;
        } catch (error) {
            return url; 
        }
    };

    return (
        <div key={`${link}-preview`} className="relative flex flex-col items-center p-4 border rounded-lg shadow-md">
            {renderLinkPreview(link)}
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm text-center mt-2 break-all text-blue-500 underline">
                {getDomain(link)}
            </a>
        </div>
    );
};

export default LinkPreview;
