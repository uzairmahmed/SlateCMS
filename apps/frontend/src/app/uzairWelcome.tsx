import type { FC } from 'react';
import axios from 'axios';

interface uzairWelcomeProps { }

const uzairWelcome: FC<uzairWelcomeProps> = ({ }) => {
    const handleClick = async () => {
        try {
            // Make a GET request to the backend
            const response = await axios.get('http://localhost:3000/api/hello');
            // Display the message in an alert
            alert(response.data.message);
        } catch (error) {
            console.error('There was an error making the request:', error);
        }
    };

    return (<>
        <div className="flex justify-center items-center h-screen">
            <button
                onClick={handleClick}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Say Hello
            </button>
        </div>
    </>);
}
export default uzairWelcome;