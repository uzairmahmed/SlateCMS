import type { FC } from 'react';

interface NotificationProps {
    courseCode: string,
    message: string,
    type: string,
}

const NotificationCard: FC<NotificationProps> = ({ courseCode, message, type }) => {
    return (
        <div>
            <h1 className='text-xs'>{type}</h1>
            <h1 className='text-lg font-semibold'>{message}</h1>
            <h1 className='text-xs'>{courseCode}</h1>
        </div>
    );
}
export default NotificationCard;