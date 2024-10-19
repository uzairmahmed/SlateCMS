import moment from 'moment';
import { toast } from 'react-toastify';
import { markNotificationAsRead } from './api';

export const formatTime = (datestring: any) => {
    const formattedDate = moment(datestring).format('MMM D, YYYY h:mm A');
    const timeAgo = moment(datestring).fromNow();
    // const displayDate = `${timeAgo} (${formattedDate})`;
    const displayDate = `${formattedDate}`;
    return displayDate
}

export const notifyWithCustomToast = (message: string, notificationId: string) => {
    const handleMarkAsRead = async () => {
        await markNotificationAsRead(notificationId).then(() => {
            toast.dismiss();
        }).catch((err) => {
            console.error('Error marking as read', err);
        });
    };

    toast(`${message}`, {
        autoClose: false,
        closeOnClick: true,
        onClose: () => handleMarkAsRead()
    })
};
