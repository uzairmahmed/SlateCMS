import { FC } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
    rtf: string;
    setRtf: (value: string) => void;
}

const RichTextEditor: FC<RichTextEditorProps> = ({ rtf, setRtf }) => {
    return (
        <div className="mb-4">
            <ReactQuill value={rtf} onChange={setRtf} className="w-full" />
        </div>
    );
};

export default RichTextEditor;
