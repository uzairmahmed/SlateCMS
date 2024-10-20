import { FC } from 'react';
import { MdDelete } from 'react-icons/md';

interface LinkInputProps {
    links: string[];
    setLinks: (links: string[]) => void;
}

const LinkInput: FC<LinkInputProps> = ({ links, setLinks }) => {
    const addLink = () => {
        setLinks([...links, '']);
    };

    const removeLink = (index: number) => {
        const newLinks = [...links];
        newLinks.splice(index, 1);
        setLinks(newLinks);
    };

    const updateLink = (index: number, value: string) => {
        const newLinks = [...links];
        newLinks[index] = value;
        setLinks(newLinks);
    };

    return (
        <div className="mb-4">
            <div className="flex flex-col gap-2">
                {links.map((link, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder={`Link ${index + 1}`}
                            className="input input-bordered w-full"
                            value={link}
                            onChange={(e) => updateLink(index, e.target.value)}
                        />
                        <button
                            type="button"
                            className="btn btn-square btn-outline btn-error"
                            onClick={() => removeLink(index)}
                        >
                            <MdDelete size={20}/>
                        </button>
                    </div>
                ))}
                <button type="button" className="btn btn-outline btn-sm mt-2" onClick={addLink}>
                    {links.length === 0 ? "Add a Link" : "Add Another Link"}
                </button>
            </div>
        </div>
    );
};

export default LinkInput;
