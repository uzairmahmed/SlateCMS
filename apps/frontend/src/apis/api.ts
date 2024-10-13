// api.ts
import axios from 'axios';
import { API_ENDPOINT } from './config';
import { getBearerToken, saveLoginDetails } from './auth';
import { toast } from 'react-toastify';

export const loginUser = async (email: string, password: string) => {
    const data = JSON.stringify({ email, password });

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${API_ENDPOINT}/auth/login`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    };

    try {
        const response = await axios.request(config);
        saveLoginDetails(response.data.token)
        return true;
    } catch (error) {
        toast('Error logging in')
        return false
    }
};


export const getCourses = async () => {
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${API_ENDPOINT}/courses`,
            headers: {
                Authorization: getBearerToken(),
            },
        };

        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        toast('Error fetching courses')
        throw error;
    }
}

export const getCourseDataWithUsers = async (courseCode: string) => {
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${API_ENDPOINT}/courses/${courseCode}/users`,
            headers: {
                Authorization: getBearerToken(),
            },
        };

        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        toast('Error fetching course data')
        throw error;
    }
}

export const getDiscussionData = async (discussionId: string) => {
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${API_ENDPOINT}/courses/discussions/${discussionId}`,
            headers: {
                Authorization: getBearerToken(),
            },
        };

        const response = await axios.request(config);
        return response.data;
        console.log(response.data);
    } catch (error) {
        toast('Error fetching discussion')
        throw error;
    }
}

export const replyToDiscussion = async (discussionId: string, msg: string) => {
    try {

        let data = {
            "message": msg
        }

        const config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${API_ENDPOINT}/courses/discussions/${discussionId}`,
            headers: {
                Authorization: getBearerToken(),
            },
            data: data
        };

        const response = await axios.request(config);
        return true;
    } catch (error) {
        toast('Error replying to discussion')

        throw error;
    }
}

export const postAnnouncement = async (courseCode: string, title: string, message: string) => {
    try {
        let data = {
            "title": title,
            "message": message
        }

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${API_ENDPOINT}/courses/${courseCode}/announcements`,
            headers: {
                Authorization: getBearerToken(),
            },
            data: data
        };

        const response = await axios.request(config);
        toast('Posted announcement')

    } catch (error) {
        toast('Error posting announcement')
        throw error;
    }
}

export const postContent = async (courseCode: string, title: string, message: string, url: string) => {
    try {
        let data = {
            "title": title,
            "message": message,
            "documentURL": url
        }

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${API_ENDPOINT}/courses/${courseCode}/content`,
            headers: {
                Authorization: getBearerToken(),
            },
            data: data
        };

        const response = await axios.request(config);
        toast('Posted content')
    } catch (error) {
        toast('Error posting announcement')
        throw error;
    }
}

export const postDiscussion = async (courseCode: string, title: string, message: string) => {
    try {
        let data = {
            "title": title,
            "message": message,
        }

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${API_ENDPOINT}/courses/${courseCode}/discussions`,
            headers: {
                Authorization: getBearerToken(),
            },
            data: data
        };

        const response = await axios.request(config);
        toast('Posted discussion post')
    } catch (error) {
        toast('Error posting announcement')
        throw error;
    }
} 