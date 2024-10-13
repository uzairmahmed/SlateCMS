import moment from 'moment';

export const formatTime = (datestring: any) => {
    const formattedDate = moment(datestring).format('MMM D, YYYY h:mm A');
    const timeAgo = moment(datestring).fromNow();
    // const displayDate = `${timeAgo} (${formattedDate})`;
    const displayDate = `${formattedDate}`;
    return displayDate
}