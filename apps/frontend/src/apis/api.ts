// api.ts
import axios from 'axios';
import { API_ENDPOINT } from './config';
import { getBearerToken, saveLoginDetails } from './auth';
import { toast } from 'react-toastify';
import { notifyWithCustomToast } from './utility';

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
        saveLoginDetails(response.data)
        await getNotifications()
        return true;
    } catch (error) {
        toast('Error logging in')
        return false
    }
};

export const signUpUser = async (userType: string, email: string, password: string, name: string, phone: string) => {
    const data = {
        email: email,
        password: password,
        name: name,
        phone: phone
    }

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${API_ENDPOINT}/auth/register/${userType === 'teacher' ? 'teacher' : 'student'}`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    };

    try {
        const response = await axios.request(config);
        toast('Created account')
        return true;
    } catch (error) {
        console.log(error);
        toast('Error creating account')
        return false
    }
}


export const getCourses = async (userType: any, userId: any) => {
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${API_ENDPOINT}/courses?userType=${userType}&userId=${userId}`,
            headers: {
                Authorization: getBearerToken(),
            },
        };

        const response = await axios.request(config);
        return response.data;
    } catch (error) {
        toast('Error fetching courses')
        throw error;
    }
}

export const getCourseData = async (courseCode: string) => {
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${API_ENDPOINT}/courses/${courseCode}`,
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
        if (JSON.stringify(response.data).length > 6500) toast.error('Your content may not be fully visible by SlateAI. Please split long lessons into multiple shorter ones.')

    } catch (error) {
        toast('Error posting announcement')
        throw error;
    }
}

export const postContent = async (courseCode: string, title: string, rtf: string, files: File[], links: string[]) => {
    try {
        const formData = new FormData();
        formData.append('title', title);

        formData.append('document', rtf);

        formData.append('links', JSON.stringify(links));

        files.forEach(file => {
            formData.append('files', file);
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${API_ENDPOINT}/courses/${courseCode}/content`,
            headers: {
                Authorization: getBearerToken(),
                'Content-Type': 'multipart/form-data' // Necessary for file uploads
            },
            data: formData
        };

        const response = await axios.request(config);
        toast('Posted content')
        return true
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

export const createCourse = async (name: string, courseCode: string, description: string) => {
    try {
        let data = {
            "name": name,
            "courseCode": courseCode.trim(),
            "description": description
        }

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${API_ENDPOINT}/courses`,
            headers: {
                Authorization: getBearerToken(),
            },
            data: data
        };

        const response = await axios.request(config);
        toast('Created Course')
    } catch (error) {
        toast('Error creating course')
        throw error;
    }
}


export const getStudents = async () => {
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${API_ENDPOINT}/users/students`,
            headers: {
                Authorization: getBearerToken(),
            },
        };

        const response = await axios.request(config);
        return response.data
    } catch (error) {
        toast('Error fetching students')
        throw error;
    }
}

export const assignStudentsToCourse = async (courseCode: string, studentIds: string[]) => {
    try {
        let data = {
            "studentIds": studentIds,
        }

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${API_ENDPOINT}/courses/${courseCode}/assign-students`,
            headers: {
                Authorization: getBearerToken(),
            },
            data: data
        };
        const response = await axios.request(config);
        toast('Assigned Students to Course')
    } catch (error) {
        toast('Error Assigning students to course')
        throw error;
    }

}


export const getTeachers = async () => {
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${API_ENDPOINT}/users/teachers`,
            headers: {
                Authorization: getBearerToken(),
            },
        };

        const response = await axios.request(config);
        return response.data
    } catch (error) {
        toast('Error fetching teachers')
        throw error;
    }
}

export const assignTeachersToCourse = async (courseCode: string, teacherIds: string[]) => {
    try {
        let data = {
            "teacherIds": teacherIds,
        }

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${API_ENDPOINT}/courses/${courseCode}/assign-teachers`,
            headers: {
                Authorization: getBearerToken(),
            },
            data: data
        };
        const response = await axios.request(config);
        toast('Assigned Teachers to Course')
    } catch (error) {
        toast('Error Assigning teachers to course')
        throw error;
    }

}

export const getAllContent = async () => {
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${API_ENDPOINT}/courses/content/all`,
            headers: {
                Authorization: getBearerToken(),
            },
        };

        const response = await axios.request(config);
        return response.data
    } catch (error) {
        toast('Error fetching content')
        throw error;
    }
}

export const getNotifications = async () => {
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${API_ENDPOINT}/notifications`,
            headers: {
                Authorization: getBearerToken(),
            },
        };

        const response = await axios.request(config);
        const notifications = response.data
        notifications.forEach(notification => {
            notifyWithCustomToast(notification.message, notification._id)
        });
        // return response.data
    } catch (error) {
        toast('Error fetching content')
        throw error;
    }
}

export const searchWithQuery = async (query: string, searchWeb: boolean, userId: any) => {
    try {
        let data = {
            "query": query,
            "searchWeb": searchWeb,
            "userId": userId
        }
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${API_ENDPOINT}/knowledge/search`,
            headers: {
                Authorization: getBearerToken(),
            },
            data: data
        };

        const response = await axios.request(config);
        return response.data
    } catch (error) {
        toast('Error fetching content')
        throw error;
    }
}

export const getChatHistory = async (userId: any) => {
    try {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${API_ENDPOINT}/users/${userId}/chat-history`,
            headers: {
                Authorization: getBearerToken(),
            },
        };

        const response = await axios.request(config);
        return response.data
    } catch (error) {
        toast('Error fetching content')
        throw error;
    }
}

export const markNotificationAsRead = async (notificationId: string) => {
    try {
        const config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${API_ENDPOINT}/notifications/${notificationId}`,
            headers: {
                Authorization: getBearerToken(),
            },
        };

        const response = await axios.request(config);
        return true
    } catch (error) {
        toast('Error fetching content')
        throw error;
    }
}